# 15. Development Workflow

## Overview

This guide outlines the complete development workflow for building and maintaining a component library using the shadcn/ui architecture adapted for Base UI.

## Getting Started

### 1. Repository Setup

```bash
# Clone your adapted repository
git clone https://github.com/your-org/your-base-ui-lib.git
cd your-base-ui-lib

# Install dependencies
pnpm install

# Start development servers
pnpm dev
```

### 2. Development Environment

```bash
# Start documentation sites in parallel
pnpm dev                 # All apps
pnpm docs:dev           # Main docs only
pnpm playground:dev     # Playground only

# CLI development
pnpm cli:dev            # CLI in watch mode
pnpm cli:test           # Run CLI tests
```

### 3. Project Structure Understanding

```
your-base-ui-lib/
├── apps/
│   ├── docs/           # Documentation site
│   └── playground/     # Component playground
├── packages/
│   ├── cli/           # CLI tool
│   ├── components/    # Base UI components
│   └── core/         # Shared utilities
└── registry/         # Component registry
```

## Component Development Workflow

### 1. Creating a New Component

```bash
# 1. Create component file
mkdir -p packages/components/src/button
touch packages/components/src/button/button.tsx
touch packages/components/src/button/index.ts

# 2. Create registry entry
# Edit registry/registry-ui.ts

# 3. Create documentation
mkdir -p apps/docs/content/components
touch apps/docs/content/components/button.mdx

# 4. Create examples
mkdir -p apps/docs/examples/button
touch apps/docs/examples/button/button-demo.tsx
```

### 2. Component Development Process

#### Step 1: Base Implementation

```typescript
// packages/components/src/button/button.tsx
import * as React from "react"
import { Button as BaseButton } from "@base-ui-components/react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../utils"

const buttonVariants = cva(
  // Base styles
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
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

export const Button = React.forwardRef<
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
```

#### Step 2: Registry Registration

```typescript
// registry/registry-ui.ts
export const ui: Registry['items'] = [
  // ... other components
  {
    name: 'button',
    type: 'registry:ui',
    description: 'Displays a button or a component that looks like a button.',
    dependencies: ['@base-ui-components/react', '@radix-ui/react-slot'],
    registryDependencies: ['utils'],
    files: [
      {
        path: 'ui/button.tsx',
        type: 'registry:ui',
      },
    ],
    baseUI: {
      components: ['Button'],
      version: '0.0.x',
    },
  },
]
```

#### Step 3: Create Examples

```typescript
// apps/docs/examples/button/button-demo.tsx
import { Button } from "@/registry/components/ui/button"

export default function ButtonDemo() {
  return (
    <div className="flex items-center space-x-2">
      <Button>Default</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  )
}
```

#### Step 4: Documentation

````mdx
---
title: Button
description: Displays a button or a component that looks like a button.
component: true
---

<ComponentPreview name="button-demo">

```tsx
import { Button } from '@/components/ui/button'

export default function ButtonDemo() {
  return <Button>Click me</Button>
}
```
````

</ComponentPreview>

## Installation

<Tabs defaultValue="cli">

<TabsList>
  <TabsTrigger value="cli">CLI</TabsTrigger>
  <TabsTrigger value="manual">Manual</TabsTrigger>
</TabsList>

<TabsContent value="cli">

```bash
npx your-ui-cli@latest add button
```

</TabsContent>

<TabsContent value="manual">

<ComponentSource name="button" />

</TabsContent>

</Tabs>

## Usage

```tsx
import { Button } from '@/components/ui/button'
```

```tsx
<Button variant="outline">Button</Button>
```

## Examples

### Variants

<ComponentPreview name="button-variants" />

### Sizes

<ComponentPreview name="button-sizes" />

### With Icon

<ComponentPreview name="button-with-icon" />

### As Child

<ComponentPreview name="button-as-child" />
```

### 3. Testing Workflow

#### Unit Tests

```typescript
// packages/components/src/button/__tests__/button.test.tsx
import { render, screen } from "@testing-library/react"
import { Button } from "../button"

describe("Button", () => {
  it("renders correctly", () => {
    render(<Button>Test Button</Button>)
    expect(screen.getByRole("button")).toHaveTextContent("Test Button")
  })

  it("applies variant classes correctly", () => {
    render(<Button variant="destructive">Destructive</Button>)
    expect(screen.getByRole("button")).toHaveClass("bg-destructive")
  })

  it("forwards ref correctly", () => {
    const ref = React.createRef<HTMLButtonElement>()
    render(<Button ref={ref}>Button</Button>)
    expect(ref.current).toBeInstanceOf(HTMLButtonElement)
  })
})
```

#### Visual Testing

```typescript
// apps/docs/__tests__/visual/button.test.tsx
import { test, expect } from '@playwright/test'

test.describe('Button Visual Tests', () => {
  test('button variants', async ({ page }) => {
    await page.goto('/docs/components/button')

    // Wait for component to load
    await page.waitForSelector('[data-testid="button-demo"]')

    // Take screenshot
    await expect(page.locator('[data-testid="button-demo"]')).toHaveScreenshot(
      'button-variants.png'
    )
  })

  test('button states', async ({ page }) => {
    await page.goto('/docs/components/button')

    // Test hover state
    await page.hover('[data-testid="button-default"]')
    await expect(
      page.locator('[data-testid="button-default"]')
    ).toHaveScreenshot('button-hover.png')

    // Test focus state
    await page.focus('[data-testid="button-default"]')
    await expect(
      page.locator('[data-testid="button-default"]')
    ).toHaveScreenshot('button-focus.png')
  })
})
```

### 4. Registry Build Process

```bash
# Build registry files
pnpm registry:build

# This generates:
# - registry/__index__.tsx (component index)
# - public/r/*.json (API files)
# - Static type definitions
```

#### Build Script Details

```typescript
// scripts/build-registry.ts
async function buildComponent(component: RegistryItem) {
  // 1. Process TypeScript files
  const processedFiles = await processComponentFiles(component.files)

  // 2. Extract dependencies
  const dependencies = extractDependencies(processedFiles)

  // 3. Generate metadata
  const metadata = await generateComponentMetadata(component)

  // 4. Create registry entry
  return {
    ...component,
    files: processedFiles,
    dependencies,
    metadata,
  }
}
```

## CLI Development Workflow

### 1. CLI Testing

```bash
# Test CLI locally
cd packages/cli
pnpm build
pnpm test

# Test with actual projects
cd test-projects/next-app
pnpm exec your-ui-cli init
pnpm exec your-ui-cli add button
```

### 2. CLI Command Development

```typescript
// packages/cli/src/commands/add.ts
export const add = new Command()
  .name('add')
  .description('add components to your project')
  .argument('[components...]', 'components to add')
  .option('-o, --overwrite', 'overwrite existing files')
  .action(async (components, options) => {
    // 1. Load configuration
    const config = await getConfig(process.cwd())

    // 2. Resolve component dependencies
    const tree = await resolveComponentTree(components, config)

    // 3. Install components
    await installComponents(tree, config, options)
  })
```

### 3. Registry API Development

```typescript
// packages/cli/src/registry/api.ts
export async function fetchComponent(name: string): Promise<RegistryItem> {
  const url = `${REGISTRY_URL}/components/${name}.json`
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Component ${name} not found`)
  }

  return response.json()
}
```

## Documentation Workflow

### 1. Content Creation

```bash
# Create new documentation page
touch apps/docs/content/guides/new-guide.mdx

# Add to navigation
# Edit apps/docs/config/docs.ts
```

### 2. Component Documentation

````mdx
## <!-- Template for component docs -->

title: ComponentName
description: Brief description of the component
component: true

---

<ComponentPreview name="component-demo">

```tsx
// Usage example
```
````

</ComponentPreview>

## Installation

<ComponentInstallation name="component-name" />

## Usage

<ComponentUsage name="component-name" />

## Examples

### Basic Example

<ComponentPreview name="component-basic" />

### Advanced Example

<ComponentPreview name="component-advanced" />

## API Reference

<ComponentAPI name="component-name" />
```

### 3. Example Development

```typescript
// apps/docs/examples/component/component-demo.tsx
import { Component } from "@/registry/components/ui/component"

export default function ComponentDemo() {
  return (
    <div className="p-4">
      <Component>Example content</Component>
    </div>
  )
}
```

## Release Process

### 1. Version Management

```bash
# Update component versions
pnpm changeset add

# Version packages
pnpm changeset version

# Create release
pnpm changeset publish
```

### 2. Registry Updates

```bash
# Update registry with new components
pnpm registry:build

# Deploy registry API
pnpm deploy:registry

# Update CLI with new registry
pnpm cli:publish
```

### 3. Documentation Updates

```bash
# Build documentation
pnpm docs:build

# Deploy documentation
pnpm docs:deploy
```

### 4. CI/CD Pipeline

```yaml
# .github/workflows/release.yml
name: Release
on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
      - run: pnpm install
      - run: pnpm test
      - run: pnpm build

  visual-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
      - run: pnpm install
      - run: pnpm playwright install
      - run: pnpm test:visual

  release:
    needs: [test, visual-test]
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
      - run: pnpm install
      - run: pnpm build
      - run: pnpm changeset publish
        env:
          NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
```

## Monitoring and Analytics

### 1. Component Usage Tracking

```typescript
// Track component usage in CLI
export function trackComponentInstall(componentName: string) {
  if (process.env.NODE_ENV === 'production') {
    analytics.track('component_installed', {
      component: componentName,
      version: packageVersion,
      timestamp: new Date().toISOString(),
    })
  }
}
```

### 2. Documentation Analytics

```typescript
// Track documentation page views
export function trackPageView(page: string) {
  if (typeof window !== 'undefined') {
    gtag('event', 'page_view', {
      page_title: page,
      page_location: window.location.href,
    })
  }
}
```

### 3. Error Monitoring

```typescript
// CLI error tracking
export function trackError(error: Error, context: string) {
  if (process.env.NODE_ENV === 'production') {
    sentry.captureException(error, {
      tags: { context },
      extra: { version: packageVersion },
    })
  }
}
```

## Best Practices

### 1. Component Development

- **Start with Base UI**: Always begin with Base UI primitives
- **Semantic Variants**: Use meaningful variant names, not colors
- **Accessibility First**: Ensure all components are accessible
- **TypeScript**: Full TypeScript support with proper types
- **Testing**: Unit tests, visual tests, and accessibility tests

### 2. Documentation

- **Live Examples**: All examples should be interactive
- **Clear API**: Document all props and their types
- **Use Cases**: Show real-world usage scenarios
- **Migration Guides**: Help users migrate from other libraries

### 3. Registry Management

- **Dependency Tracking**: Accurate dependency graphs
- **Version Compatibility**: Ensure component compatibility
- **File Organization**: Logical file structure
- **Metadata**: Rich metadata for better tooling

### 4. CLI Development

- **Error Handling**: Graceful error handling and recovery
- **Progress Feedback**: Clear progress indicators
- **Configuration**: Flexible configuration options
- **Compatibility**: Support multiple frameworks and versions

This workflow ensures high-quality components, comprehensive documentation, and a smooth developer experience.
