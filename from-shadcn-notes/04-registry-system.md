# 04. Registry System

## Overview

The registry system is the heart of shadcn/ui. It manages component metadata, dependencies, files, and enables the CLI to intelligently install components with their required dependencies.

## Architecture

```
Registry System Flow:
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Component     │    │   Build Script  │    │  Generated      │
│   Definitions   │───▶│   Processing    │───▶│  Index Files    │
│   (registry-*.ts)│    │                 │    │  (__index__.tsx)│
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                │
                                ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   CLI Tool      │    │   Public API    │    │  Component      │
│   Installation  │◄───│   (JSON files)  │◄───│  Files          │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## Registry Structure

### Component Registry Files

```typescript
// apps/v4/registry/registry-ui.ts
import { type Registry } from 'shadcn/registry'

export const ui: Registry['items'] = [
  {
    name: 'button',
    type: 'registry:ui',
    description: 'Displays a button or a component that looks like a button.',
    dependencies: ['@radix-ui/react-slot'],
    registryDependencies: ['utils'],
    files: [
      {
        path: 'ui/button.tsx',
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'accordion',
    type: 'registry:ui',
    dependencies: ['@radix-ui/react-accordion'],
    registryDependencies: ['utils'],
    files: [
      {
        path: 'ui/accordion.tsx',
        type: 'registry:ui',
      },
    ],
  },
]
```

### Registry Schema

```typescript
// Key registry item schema
export const registryItemSchema = z.object({
  name: z.string(),
  type: registryItemTypeSchema,
  description: z.string().optional(),
  dependencies: z.array(z.string()).optional(),
  devDependencies: z.array(z.string()).optional(),
  registryDependencies: z.array(z.string()).optional(),
  files: z.array(registryItemFileSchema).optional(),
  tailwind: z
    .object({
      config: z.record(z.any()).optional(),
    })
    .optional(),
  cssVars: z.record(z.record(z.any())).optional(),
  meta: z.record(z.any()).optional(),
  docs: z.string().optional(),
})

// File schema
export const registryItemFileSchema = z.object({
  path: z.string(),
  content: z.string().optional(),
  type: registryItemTypeSchema.optional(),
  target: z.string().optional(),
})

// Types
export const registryItemTypeSchema = z.enum([
  'registry:ui',
  'registry:block',
  'registry:example',
  'registry:hook',
  'registry:lib',
  'registry:theme',
  'registry:style',
  'registry:page',
  'registry:component',
  'registry:internal',
])
```

## Build Process

### 1. Registry Index Generation

```typescript
// apps/v4/scripts/build-registry.mts
async function buildRegistryIndex() {
  let index = `export const Index: Record<string, any> = {`

  for (const item of registry.items) {
    const componentPath = item.files?.[0]?.path
      ? `@/registry/new-york-v4/${item.files[0].path}`
      : ''

    index += `
  "${item.name}": {
    name: "${item.name}",
    description: "${item.description ?? ''}",
    type: "${item.type}",
    registryDependencies: ${JSON.stringify(item.registryDependencies)},
    files: [${item.files?.map(file => {
      return `{
        path: "registry/new-york-v4/${file.path}",
        type: "${file.type}",
        target: "${file.target ?? ''}"
      }`
    })}],
    component: ${
      componentPath
        ? `React.lazy(async () => {
      const mod = await import("${componentPath}")
      const exportName = Object.keys(mod).find(key => 
        typeof mod[key] === 'function' || typeof mod[key] === 'object'
      ) || item.name
      return { default: mod.default || mod[exportName] }
    })`
        : 'null'
    },
    categories: ${JSON.stringify(item.categories)},
    meta: ${JSON.stringify(item.meta)},
  },`
  }

  index += `}`

  await fs.writeFile('registry/__index__.tsx', index)
}
```

### 2. JSON API Generation

```typescript
// Generated public API files
// public/r/index.json - Main registry index
// public/r/styles/new-york-v4/button.json - Individual component

async function buildRegistryJsonFile() {
  const fixedRegistry = {
    ...registry,
    items: registry.items.map(item => {
      const files = item.files?.map(file => ({
        ...file,
        path: `registry/new-york-v4/${file.path}`,
      }))

      return { ...item, files }
    }),
  }

  await fs.writeFile('registry.json', JSON.stringify(fixedRegistry, null, 2))
}
```

## Component Types

### 1. UI Components (`registry:ui`)

- Basic building blocks (button, input, card)
- Single file components
- Minimal dependencies
- Highly reusable

### 2. Blocks (`registry:block`)

- Complex composed components
- Multiple files (components, pages, data)
- Rich functionality
- Real-world examples

### 3. Examples (`registry:example`)

- Usage demonstrations
- Integration examples
- Best practices

### 4. Hooks (`registry:hook`)

- Custom React hooks
- Utility functions
- State management

### 5. Library (`registry:lib`)

- Utility functions
- Helpers and constants
- Core functionality

## Dependency Resolution

### Registry Dependencies

```typescript
// Component can depend on other registry items
{
  name: "data-table",
  registryDependencies: [
    "button",
    "checkbox",
    "dropdown-menu",
    "input",
    "table"
  ]
}

// CLI resolves dependency tree automatically
async function resolveTree(index, names) {
  const tree = []

  for (const name of names) {
    const entry = index.find(entry => entry.name === name)
    if (!entry) continue

    tree.push(entry)

    if (entry.registryDependencies) {
      const dependencies = await resolveTree(index, entry.registryDependencies)
      tree.push(...dependencies)
    }
  }

  // Remove duplicates
  return tree.filter((component, index, self) =>
    self.findIndex(c => c.name === component.name) === index
  )
}
```

### External Dependencies

```typescript
// NPM dependencies are managed separately
{
  name: "calendar",
  dependencies: [
    "react-day-picker",
    "date-fns"
  ],
  devDependencies: [
    "@types/react-day-picker"
  ]
}
```

## File Processing

### TypeScript Processing

```typescript
// apps/v4/lib/registry.ts
async function getFileContent(file) {
  const raw = await fs.readFile(file.path, 'utf-8')

  const project = new Project({
    compilerOptions: {},
  })

  const sourceFile = project.createSourceFile(tempFile, raw, {
    scriptKind: ScriptKind.TSX,
  })

  let code = sourceFile.getFullText()

  // Convert default exports to named exports
  if (file.type !== 'registry:page') {
    code = code.replaceAll('export default', 'export')
  }

  // Fix import paths
  code = fixImport(code)

  return code
}

// Import path fixing
function fixImport(content) {
  const regex = /@\/(.+?)\/((?:.*?\/)?(?:components|ui|hooks|lib))\/([\w-]+)/g

  return content.replace(regex, (match, path, type, component) => {
    if (type.endsWith('components')) {
      return `@/components/${component}`
    } else if (type.endsWith('ui')) {
      return `@/components/ui/${component}`
    } else if (type.endsWith('hooks')) {
      return `@/hooks/${component}`
    } else if (type.endsWith('lib')) {
      return `@/lib/${component}`
    }
    return match
  })
}
```

## Registry API

### Fetching Components

```typescript
// CLI fetches from public API
export async function fetchRegistry(paths: string[]) {
  const results = await Promise.all(
    paths.map(async path => {
      const url = getRegistryUrl(path)
      const response = await fetch(url)

      if (!response.ok) {
        throw new Error(`Component at ${url} not found`)
      }

      return response.json()
    })
  )

  return results
}

// URL construction
function getRegistryUrl(path: string) {
  const baseUrl = process.env.REGISTRY_URL || 'https://ui.shadcn.com/r'
  return `${baseUrl}/${path}.json`
}
```

### Component Installation

```typescript
// packages/shadcn/src/utils/add-components.ts
export async function addComponents(components: string[], config: Config) {
  // 1. Resolve dependency tree
  const tree = await registryResolveItemsTree(components, config)

  // 2. Update Tailwind config
  await updateTailwindConfig(tree.tailwind?.config, config)

  // 3. Update CSS variables
  await updateCssVars(tree.cssVars, config)

  // 4. Install NPM dependencies
  await updateDependencies(tree.dependencies, tree.devDependencies, config)

  // 5. Write component files
  await updateFiles(tree.files, config)
}
```

## For Base UI Implementation

### Key Changes Needed

1. **Update Registry Definitions**

```typescript
// Replace Radix dependencies with Base UI
export const ui: Registry['items'] = [
  {
    name: 'button',
    type: 'registry:ui',
    dependencies: ['@base-ui-components/react'], // Instead of @radix-ui/react-slot
    registryDependencies: ['utils'],
    files: [{ path: 'ui/button.tsx', type: 'registry:ui' }],
  },
]
```

2. **Modify Build Scripts**

```typescript
// Update import processing for Base UI
function fixImport(content: string) {
  // Handle Base UI imports
  content = content.replace(
    /@base-ui-components\/react\/([\w-]+)/g,
    '@base-ui-components/react'
  )
  return content
}
```

3. **Update File Templates**

```typescript
// Base UI button template
import * as React from "react"
import { Button as BaseButton } from "@base-ui-components/react/Button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(/* variants */)

export interface ButtonProps
  extends React.ComponentPropsWithoutRef<typeof BaseButton>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<
  React.ElementRef<typeof BaseButton>,
  ButtonProps
>(({ className, variant, size, ...props }, ref) => (
  <BaseButton
    className={cn(buttonVariants({ variant, size, className }))}
    ref={ref}
    {...props}
  />
))
```

4. **Schema Updates**

```typescript
// Add Base UI specific metadata
export const baseUIItemSchema = registryItemSchema.extend({
  baseUIVersion: z.string().optional(),
  baseUIComponents: z.array(z.string()).optional(),
})
```

This registry system enables intelligent component management, automatic dependency resolution, and seamless CLI integration - the core innovation that makes shadcn/ui so powerful.
