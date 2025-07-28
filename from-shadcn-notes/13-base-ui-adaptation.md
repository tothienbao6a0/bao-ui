# 13. Base UI Adaptation Guide

## Overview

This guide provides comprehensive instructions for adapting the shadcn/ui architecture to work with Base UI instead of Radix UI. It covers all necessary changes from registry definitions to component implementations.

## Key Differences: Radix UI vs Base UI

### Radix UI Approach

```typescript
import * as React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { cn } from '@/lib/utils'

const Dialog = DialogPrimitive.Root
const DialogTrigger = DialogPrimitive.Trigger
```

### Base UI Approach

```typescript
import * as React from 'react'
import { Dialog as BaseDialog } from '@base-ui-components/react/Dialog'
import { cn } from '@/lib/utils'

const Dialog = BaseDialog.Root
const DialogTrigger = BaseDialog.Trigger
```

## Registry System Adaptation

### 1. Update Registry Dependencies

```typescript
// OLD: apps/v4/registry/registry-ui.ts
export const ui: Registry['items'] = [
  {
    name: 'button',
    type: 'registry:ui',
    dependencies: ['@radix-ui/react-slot'],
    registryDependencies: ['utils'],
    files: [{ path: 'ui/button.tsx', type: 'registry:ui' }],
  },
]

// NEW: Base UI version
export const ui: Registry['items'] = [
  {
    name: 'button',
    type: 'registry:ui',
    dependencies: ['@base-ui-components/react'],
    registryDependencies: ['utils'],
    files: [{ path: 'ui/button.tsx', type: 'registry:ui' }],
    baseUI: {
      components: ['Button'],
      version: '0.0.x',
    },
  },
]
```

### 2. Extended Registry Schema

```typescript
// Add Base UI specific fields to registry schema
export const baseUIRegistryItemSchema = registryItemSchema.extend({
  baseUI: z
    .object({
      components: z.array(z.string()).optional(),
      version: z.string().optional(),
      customizations: z.record(z.any()).optional(),
    })
    .optional(),
})

// Update registry type
export type BaseUIRegistryItem = z.infer<typeof baseUIRegistryItemSchema>
```

### 3. Registry Processing Updates

```typescript
// apps/v4/scripts/build-registry.mts
async function buildRegistryIndex() {
  let index = `export const Index: Record<string, any> = {`

  for (const item of registry.items) {
    // ... existing code ...

    // Add Base UI specific metadata
    const baseUIInfo = item.baseUI
      ? `
    baseUI: ${JSON.stringify(item.baseUI)},`
      : ''

    index += `
  "${item.name}": {
    name: "${item.name}",
    // ... other fields ...${baseUIInfo}
  },`
  }

  index += `}`
  await fs.writeFile('registry/__index__.tsx', index)
}
```

## Component Template Updates

### 1. Button Component

```typescript
// NEW: apps/v4/registry/new-york-v4/ui/button.tsx
import * as React from "react"
import { Button as BaseButton } from "@base-ui-components/react/Button"
import { Slot } from "@radix-ui/react-slot" // Keep for asChild pattern
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ComponentPropsWithoutRef<typeof BaseButton>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<
  React.ElementRef<typeof BaseButton>,
  ButtonProps
>(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : BaseButton
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  )
})
Button.displayName = "Button"

export { Button, buttonVariants }
```

### 2. Dialog Component

```typescript
// NEW: apps/v4/registry/new-york-v4/ui/dialog.tsx
import * as React from "react"
import { Dialog as BaseDialog } from "@base-ui-components/react/Dialog"
import { cn } from "@/lib/utils"

const Dialog = BaseDialog.Root
const DialogTrigger = BaseDialog.Trigger
const DialogPortal = BaseDialog.Portal
const DialogClose = BaseDialog.Close

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof BaseDialog.Backdrop>,
  React.ComponentPropsWithoutRef<typeof BaseDialog.Backdrop>
>(({ className, ...props }, ref) => (
  <BaseDialog.Backdrop
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
))
DialogOverlay.displayName = "DialogOverlay"

const DialogContent = React.forwardRef<
  React.ElementRef<typeof BaseDialog.Popup>,
  React.ComponentPropsWithoutRef<typeof BaseDialog.Popup>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <BaseDialog.Popup
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      )}
      {...props}
    >
      {children}
      <BaseDialog.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </BaseDialog.Close>
    </BaseDialog.Popup>
  </DialogPortal>
))
DialogContent.displayName = "DialogContent"

// ... rest of dialog sub-components

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
}
```

### 3. Select Component

```typescript
// NEW: apps/v4/registry/new-york-v4/ui/select.tsx
import * as React from "react"
import { Select as BaseSelect } from "@base-ui-components/react/Select"
import { ChevronDownIcon, CheckIcon } from "@radix-ui/react-icons"
import { cn } from "@/lib/utils"

const Select = BaseSelect.Root
const SelectGroup = BaseSelect.Group
const SelectValue = BaseSelect.Value

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof BaseSelect.Trigger>,
  React.ComponentPropsWithoutRef<typeof BaseSelect.Trigger>
>(({ className, children, ...props }, ref) => (
  <BaseSelect.Trigger
    ref={ref}
    className={cn(
      "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className
    )}
    {...props}
  >
    {children}
    <BaseSelect.Icon asChild>
      <ChevronDownIcon className="h-4 w-4 opacity-50" />
    </BaseSelect.Icon>
  </BaseSelect.Trigger>
))
SelectTrigger.displayName = "SelectTrigger"

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof BaseSelect.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof BaseSelect.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <BaseSelect.ScrollUpButton
    ref={ref}
    className={cn("flex cursor-default items-center justify-center py-1", className)}
    {...props}
  >
    <ChevronUpIcon />
  </BaseSelect.ScrollUpButton>
))
SelectScrollUpButton.displayName = "SelectScrollUpButton"

// ... continue with other select components

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
}
```

## Build System Adaptations

### 1. Import Processing Updates

```typescript
// apps/v4/lib/registry.ts - Enhanced for Base UI
export function fixImport(content: string): string {
  return (
    content
      // Base UI imports
      .replace(
        /@base-ui-components\/react\/([A-Z][\w]*)/g,
        '@base-ui-components/react/$1'
      )
      // Maintain existing shadcn patterns
      .replace(
        /@\/(.+?)\/((?:.*?\/)?(?:components|ui|hooks|lib))\/([\w-]+)/g,
        (match, path, type, component) => {
          if (type.endsWith('components')) return `@/components/${component}`
          if (type.endsWith('ui')) return `@/components/ui/${component}`
          if (type.endsWith('hooks')) return `@/hooks/${component}`
          if (type.endsWith('lib')) return `@/lib/${component}`
          return match
        }
      )
      // Ensure React imports are consistent
      .replace(
        /import \* as React from "react"/g,
        'import * as React from "react"'
      )
  )
}
```

### 2. Dependency Detection

```typescript
// Enhanced dependency detection for Base UI
export function extractBaseUIDependencies(content: string): string[] {
  const dependencies = new Set<string>()

  // Base UI components
  const baseUIMatches = content.matchAll(
    /from ["']@base-ui-components\/react(?:\/([A-Z][\w]*))?["']/g
  )

  for (const match of baseUIMatches) {
    dependencies.add('@base-ui-components/react')
  }

  // Additional Base UI utilities
  if (content.includes('useBaseUI') || content.includes('createBaseUI')) {
    dependencies.add('@base-ui-components/react')
  }

  return Array.from(dependencies)
}
```

### 3. Component Analysis

```typescript
// Analyze Base UI component usage
export function analyzeBaseUIComponents(content: string): {
  components: string[]
  hooks: string[]
  patterns: string[]
} {
  const components = new Set<string>()
  const hooks = new Set<string>()
  const patterns = new Set<string>()

  // Extract Base UI component usage
  const componentMatches = content.matchAll(
    /(?:import|from)\s+.*?@base-ui-components\/react(?:\/([A-Z][\w]*))?/g
  )

  for (const match of componentMatches) {
    if (match[1]) {
      components.add(match[1])
    }
  }

  // Extract hook usage
  const hookMatches = content.matchAll(/use([A-Z][\w]*)/g)
  for (const match of hookMatches) {
    if (
      match[1].startsWith('Base') ||
      BASE_UI_HOOKS.includes(`use${match[1]}`)
    ) {
      hooks.add(`use${match[1]}`)
    }
  }

  // Detect common patterns
  if (content.includes('data-[state=')) patterns.add('data-attributes')
  if (content.includes('asChild')) patterns.add('as-child')
  if (content.includes('forwardRef')) patterns.add('forward-ref')

  return {
    components: Array.from(components),
    hooks: Array.from(hooks),
    patterns: Array.from(patterns),
  }
}
```

## CLI Adaptations

### 1. Base UI Templates

```typescript
// packages/shadcn/src/templates/base-ui.ts
export const BASE_UI_TEMPLATES = {
  button: `import * as React from "react"
import { Button as BaseButton } from "@base-ui-components/react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ComponentPropsWithoutRef<typeof BaseButton>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<
  React.ElementRef<typeof BaseButton>,
  ButtonProps
>(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : BaseButton
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  )
})
Button.displayName = "Button"

export { Button, buttonVariants }`,

  utils: `import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}`,

  // Add more Base UI templates...
}
```

### 2. Configuration Schema Updates

```typescript
// Enhanced configuration for Base UI
export const baseUIConfigSchema = configSchema.extend({
  baseUI: z
    .object({
      version: z.string().default('latest'),
      components: z.array(z.string()).optional(),
      customizations: z.record(z.any()).optional(),
    })
    .optional(),

  // Enhanced aliases for Base UI
  aliases: z.object({
    components: z.string(),
    utils: z.string(),
    ui: z.string().optional(),
    lib: z.string().optional(),
    hooks: z.string().optional(),
    'base-ui': z.string().optional(), // New Base UI alias
  }),
})

// Default Base UI configuration
export const DEFAULT_BASE_UI_CONFIG = {
  $schema: 'https://your-base-ui-lib.com/schema.json',
  style: 'default',
  rsc: true,
  tsx: true,
  tailwind: {
    config: 'tailwind.config.ts',
    css: 'app/globals.css',
    baseColor: 'neutral',
    cssVariables: true,
  },
  baseUI: {
    version: 'latest',
    components: [],
  },
  aliases: {
    components: '@/components',
    utils: '@/lib/utils',
    ui: '@/components/ui',
    lib: '@/lib',
    hooks: '@/hooks',
    'base-ui': '@base-ui-components/react',
  },
  iconLibrary: 'lucide',
}
```

### 3. Registry URL Updates

```typescript
// Update registry endpoints for Base UI
export function getRegistryUrl(path: string): string {
  const registryUrl =
    process.env.REGISTRY_URL || 'https://your-base-ui-lib.com/r'
  return `${registryUrl}/${path}.json`
}

// Base UI specific registry paths
export const BASE_UI_REGISTRY_PATHS = {
  index: 'index.json',
  styles: 'styles',
  components: 'components',
  blocks: 'blocks',
  examples: 'examples',
  hooks: 'hooks',
  lib: 'lib',
}
```

## Theme System Integration

### 1. CSS Variables Compatibility

```css
/* Maintain shadcn theming but add Base UI specific variables */
:root {
  /* Existing shadcn variables */
  --background: 0 0% 100%;
  --foreground: 240 10% 3.9%;
  --primary: 240 5.9% 10%;
  --primary-foreground: 0 0% 98%;

  /* Base UI specific variables */
  --base-ui-focus-ring: var(--ring);
  --base-ui-border-radius: var(--radius);
  --base-ui-transition-duration: 150ms;

  /* Component state variables for Base UI */
  --base-ui-open: 1;
  --base-ui-closed: 0;
}

/* Base UI data attribute styling */
[data-state='open'] {
  --base-ui-state: var(--base-ui-open);
}

[data-state='closed'] {
  --base-ui-state: var(--base-ui-closed);
}
```

### 2. Animation Integration

```css
/* Base UI compatible animations */
@keyframes baseui-fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes baseui-fade-out {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

@keyframes baseui-scale-in {
  from {
    transform: scale(0.95);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

/* Apply animations to Base UI components */
[data-state='open'] {
  animation:
    baseui-fade-in 150ms ease-out,
    baseui-scale-in 150ms ease-out;
}

[data-state='closed'] {
  animation: baseui-fade-out 150ms ease-in;
}
```

## Documentation System Updates

### 1. Preview Component Updates

```typescript
// Ensure Base UI components render correctly in previews
export function ComponentPreview({ name, ...props }: ComponentPreviewProps) {
  const Component = Index[name]?.component

  if (!Component) {
    return <ComponentNotFound name={name} />
  }

  return (
    <ComponentPreviewTabs
      {...props}
      component={
        <BaseUIProvider>
          <React.Suspense fallback={<ComponentLoading />}>
            <Component />
          </React.Suspense>
        </BaseUIProvider>
      }
      source={<ComponentSource name={name} />}
    />
  )
}

// Base UI Provider for previews
function BaseUIProvider({ children }: { children: React.ReactNode }) {
  return (
    <div className="base-ui-preview-wrapper">
      {children}
    </div>
  )
}
```

### 2. Component Analysis Integration

```typescript
// Enhanced component source with Base UI analysis
export function ComponentSource({ name }: { name: string }) {
  const item = getRegistryItem(name)
  const analysis = analyzeBaseUIComponents(item?.files?.[0]?.content || "")

  return (
    <div className="component-source">
      <div className="component-info">
        <div className="base-ui-components">
          <h4>Base UI Components Used:</h4>
          <ul>
            {analysis.components.map(component => (
              <li key={component}>
                <code>@base-ui-components/react/{component}</code>
              </li>
            ))}
          </ul>
        </div>

        {analysis.hooks.length > 0 && (
          <div className="base-ui-hooks">
            <h4>Base UI Hooks Used:</h4>
            <ul>
              {analysis.hooks.map(hook => (
                <li key={hook}><code>{hook}</code></li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <ComponentCodeBlock content={item?.files?.[0]?.content} />
    </div>
  )
}
```

## Migration Strategy

### 1. Phased Migration Approach

```typescript
// Migration phases for existing shadcn users
export const MIGRATION_PHASES = {
  PHASE_1: {
    name: 'Core Components',
    components: ['button', 'input', 'label', 'card'],
    description: 'Migrate fundamental building blocks',
  },

  PHASE_2: {
    name: 'Interactive Components',
    components: ['dialog', 'dropdown-menu', 'select', 'popover'],
    description: 'Migrate complex interactive components',
  },

  PHASE_3: {
    name: 'Advanced Components',
    components: ['data-table', 'calendar', 'command', 'navigation-menu'],
    description: 'Migrate advanced composed components',
  },
}

// Migration helper
export async function migrateToBaseUI(
  components: string[],
  phase: keyof typeof MIGRATION_PHASES
) {
  const phaseInfo = MIGRATION_PHASES[phase]

  logger.info(`Starting ${phaseInfo.name} migration...`)
  logger.info(phaseInfo.description)

  // Check current components
  const currentComponents = await getCurrentComponents()
  const conflictingComponents = components.filter(c =>
    currentComponents.includes(c)
  )

  if (conflictingComponents.length > 0) {
    const { proceed } = await prompts({
      type: 'confirm',
      name: 'proceed',
      message: `The following components will be overwritten: ${conflictingComponents.join(', ')}. Continue?`,
    })

    if (!proceed) {
      return
    }
  }

  // Perform migration
  await addComponents(components, config, {
    overwrite: true,
    migration: true,
  })

  logger.success(`${phaseInfo.name} migration completed!`)
}
```

### 2. Compatibility Layer

```typescript
// Temporary compatibility layer for gradual migration
export const RadixToBaseUICompat = {
  // Map Radix patterns to Base UI equivalents
  '*Primitive.Root': 'Base*.Root',
  '*Primitive.Trigger': 'Base*.Trigger',
  '*Primitive.Content': 'Base*.Popup',
  '*Primitive.Portal': 'Base*.Portal',

  // Data attribute mappings
  'data-[state=open]': 'data-[state=open]', // Same
  'data-[state=closed]': 'data-[state=closed]', // Same
  'data-[side=top]': 'data-[placement^=top]', // Different
}

// Migration utility to update existing files
export function migrateRadixToBaseUI(content: string): string {
  let migratedContent = content

  // Replace import statements
  migratedContent = migratedContent.replace(
    /@radix-ui\/react-([a-z-]+)/g,
    (match, component) => {
      const baseUIComponent = RADIX_TO_BASE_UI_MAP[component]
      return baseUIComponent
        ? `@base-ui-components/react/${baseUIComponent}`
        : match
    }
  )

  // Replace component references
  Object.entries(RadixToBaseUICompat).forEach(([radix, baseUI]) => {
    const regex = new RegExp(radix.replace('*', '\\w+'), 'g')
    migratedContent = migratedContent.replace(regex, baseUI.replace('*', '$1'))
  })

  return migratedContent
}
```

This comprehensive adaptation guide provides everything needed to successfully migrate the shadcn/ui architecture to work with Base UI while maintaining all the powerful features that make shadcn/ui so successful.
