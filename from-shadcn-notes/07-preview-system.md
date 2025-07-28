# 07. Component Preview System

## Overview

The component preview system enables live component demonstrations directly within the documentation. It renders actual React components with syntax highlighting, theme switching, and code viewing - all without Storybook.

## Architecture

```
Preview System Flow:
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   MDX Content   │    │ ComponentPreview│    │  Registry Index │
│   <ComponentPre │───▶│    Component    │───▶│   (Lazy Load)   │
│   view name=""/> │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                               │
                               ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Live Preview  │    │   Theme Wrapper │    │   Component     │
│   with Controls │◄───│   & Suspense    │◄───│   Rendering     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## Core Components

### 1. ComponentPreview Component

```typescript
// apps/v4/components/component-preview.tsx
export function ComponentPreview({
  name,
  type,
  className,
  align = "center",
  hideCode = false,
  ...props
}: React.ComponentProps<"div"> & {
  name: string
  align?: "center" | "start" | "end"
  description?: string
  hideCode?: boolean
  type?: "block" | "component" | "example"
}) {
  // Get component from registry index
  const Component = Index[name]?.component

  if (!Component) {
    return (
      <p className="text-muted-foreground text-sm">
        Component{" "}
        <code className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm">
          {name}
        </code>{" "}
        not found in registry.
      </p>
    )
  }

  // Handle block components with iframe
  if (type === "block") {
    return (
      <div className="relative aspect-[4/2.5] w-full overflow-hidden rounded-md border md:-mx-1">
        {/* Static images for mobile */}
        <Image
          src={`/r/styles/new-york-v4/${name}-light.png`}
          alt={name}
          width={1440}
          height={900}
          className="bg-background absolute top-0 left-0 z-20 w-[970px] max-w-none sm:w-[1280px] md:hidden dark:hidden md:dark:hidden"
        />
        <Image
          src={`/r/styles/new-york-v4/${name}-dark.png`}
          alt={name}
          width={1440}
          height={900}
          className="bg-background absolute top-0 left-0 z-20 hidden w-[970px] max-w-none sm:w-[1280px] md:hidden dark:block md:dark:hidden"
        />

        {/* Live iframe for desktop */}
        <div className="bg-background absolute inset-0 hidden w-[1600px] md:block">
          <iframe src={`/view/${name}`} className="size-full" />
        </div>
      </div>
    )
  }

  // Regular component preview with tabs
  return (
    <ComponentPreviewTabs
      className={className}
      align={align}
      hideCode={hideCode}
      component={<Component />}
      source={<ComponentSource name={name} collapsible={false} />}
      {...props}
    />
  )
}
```

### 2. ComponentPreviewTabs Component

```typescript
// apps/v4/components/component-preview-tabs.tsx
export function ComponentPreviewTabs({
  className,
  align = "center",
  hideCode = false,
  component,
  source,
  ...props
}: React.ComponentProps<"div"> & {
  align?: "center" | "start" | "end"
  hideCode?: boolean
  component: React.ReactNode
  source: React.ReactNode
}) {
  return (
    <div className={cn("group relative my-4 flex flex-col space-y-2", className)} {...props}>
      <Tabs defaultValue="preview" className="relative mr-auto w-full">
        <div className="flex items-center justify-between pb-3">
          {!hideCode ? (
            <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
              <TabsTrigger
                value="preview"
                className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
              >
                Preview
              </TabsTrigger>
              <TabsTrigger
                value="code"
                className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
              >
                Code
              </TabsTrigger>
            </TabsList>
          ) : null}
        </div>

        <TabsContent value="preview" className="relative rounded-md border">
          <div
            className={cn("preview flex min-h-[350px] w-full justify-center p-10", {
              "items-center": align === "center",
              "items-start": align === "start",
              "items-end": align === "end",
            })}
          >
            <React.Suspense
              fallback={
                <div className="flex items-center text-sm text-muted-foreground">
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  Loading...
                </div>
              }
            >
              {component}
            </React.Suspense>
          </div>
        </TabsContent>

        {!hideCode ? (
          <TabsContent value="code">
            <div className="flex flex-col space-y-4">
              <div className="w-full rounded-md [&_pre]:my-0 [&_pre]:max-h-[350px] [&_pre]:overflow-auto">
                {source}
              </div>
            </div>
          </TabsContent>
        ) : null}
      </Tabs>
    </div>
  )
}
```

### 3. ComponentSource Component

```typescript
// apps/v4/components/component-source.tsx
export function ComponentSource({
  name,
  collapsible = true,
}: {
  name: string
  collapsible?: boolean
}) {
  const [config] = useConfig()
  const [isOpened, setIsOpened] = React.useState(!collapsible)

  const item = React.useMemo(() => {
    return getRegistryItem(name)
  }, [name])

  const codeString = React.useMemo(() => {
    if (!item?.files?.[0]?.content) {
      return ""
    }

    return item.files[0].content
  }, [item])

  if (!item?.files?.[0]?.content) {
    return (
      <p className="text-sm text-muted-foreground">
        Source code not found for component{" "}
        <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
          {name}
        </code>
        .
      </p>
    )
  }

  return (
    <div className="relative">
      <div className="flex items-center justify-between">
        {collapsible ? (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsOpened(!isOpened)}
            className="h-8 px-2"
          >
            {isOpened ? (
              <ChevronUpIcon className="h-3 w-3" />
            ) : (
              <ChevronDownIcon className="h-3 w-3" />
            )}
            <span className="sr-only">Toggle code</span>
          </Button>
        ) : null}

        <CopyButton
          value={codeString}
          className="h-7 w-7"
        />
      </div>

      <Collapsible open={isOpened} onOpenChange={setIsOpened}>
        <CollapsibleContent>
          <pre className="max-h-[500px] overflow-x-auto rounded-lg bg-zinc-950 py-4 dark:bg-zinc-900">
            <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
              {codeString}
            </code>
          </pre>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}
```

## Registry Integration

### Component Lazy Loading

```typescript
// Registry index generation with lazy loading
export const Index: Record<string, any> = {
  "button": {
    name: "button",
    component: React.lazy(async () => {
      const mod = await import("@/registry/new-york-v4/ui/button.tsx")
      const exportName = Object.keys(mod).find(key =>
        typeof mod[key] === 'function' || typeof mod[key] === 'object'
      ) || 'button'
      return { default: mod.default || mod[exportName] }
    }),
    // ... other metadata
  }
}

// Usage in preview
const Component = Index[name]?.component
return <Component />
```

### Registry Helper Functions

```typescript
// apps/v4/lib/registry.ts
export function getRegistryComponent(name: string) {
  return Index[name]?.component
}

export async function getRegistryItem(name: string) {
  const item = Index[name]

  if (!item) {
    return null
  }

  // Process files and fix import paths
  let files: typeof result.data.files = []
  for (const file of item.files) {
    const content = await getFileContent(file)
    const relativePath = path.relative(process.cwd(), file.path)

    files.push({
      ...file,
      path: relativePath,
      content,
    })
  }

  // Fix file paths for target locations
  files = fixFilePaths(files)

  return {
    ...item,
    files,
  }
}
```

## MDX Integration

### Custom MDX Components

```typescript
// apps/www/components/mdx-components.tsx
const components = {
  // ... other components
  ComponentPreview,
  ComponentExample,
  ComponentSource,
  // ... more components
}

export function Mdx({ code }: { code: string }) {
  const Component = useMDXComponent(code)
  return (
    <div className="mdx">
      <Component components={components} />
    </div>
  )
}
```

### Usage in Documentation

```mdx
<!-- In a .mdx file -->

# Button Component

<ComponentPreview name="button-demo" />

## Installation

<ComponentSource name="button" />

## Examples

<ComponentPreview name="button-variants" hideCode />
```

## Isolated View System

### Block View Pages

```typescript
// apps/v4/app/(view)/view/[name]/page.tsx
export default async function BlockPage({
  params,
}: {
  params: Promise<{ name: string }>
}) {
  const { name } = await params
  const item = await getCachedRegistryItem(name)
  const Component = getRegistryComponent(name)

  if (!item || !Component) {
    return notFound()
  }

  return (
    <div className={cn("bg-background", item.meta?.container)}>
      <Component />
    </div>
  )
}

// Static generation for all blocks
export async function generateStaticParams() {
  const { Index } = await import("@/registry/__index__")
  const index = z.record(registryItemSchema).parse(Index)

  return Object.values(index)
    .filter((block) =>
      [
        "registry:block",
        "registry:component",
        "registry:example",
        "registry:internal",
      ].includes(block.type)
    )
    .map((block) => ({
      name: block.name,
    }))
}
```

## Theme Integration

### Theme Wrapper

```typescript
// Theme context for preview components
export function ThemeWrapper({
  defaultTheme = "zinc",
  children
}: {
  defaultTheme?: string
  children: React.ReactNode
}) {
  return (
    <div className={cn("themes-wrapper", defaultTheme)}>
      {children}
    </div>
  )
}
```

### Style Switching

```typescript
// Style switcher for www app
export function StyleSwitcher() {
  const [config, setConfig] = useConfig()

  return (
    <Select
      value={config.style}
      onValueChange={(value) =>
        setConfig({
          ...config,
          style: value as Style["name"],
        })
      }
    >
      <SelectTrigger className="h-7 w-[145px] text-xs">
        <SelectValue placeholder="Select style" />
      </SelectTrigger>
      <SelectContent>
        {styles.map((style) => (
          <SelectItem key={style.name} value={style.name} className="text-xs">
            {style.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
```

## Error Handling

### Component Not Found

```typescript
if (!Component) {
  return (
    <p className="text-muted-foreground text-sm">
      Component{" "}
      <code className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm">
        {name}
      </code>{" "}
      not found in registry.
    </p>
  )
}
```

### Suspense Fallback

```typescript
<React.Suspense
  fallback={
    <div className="flex items-center text-sm text-muted-foreground">
      <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
      Loading...
    </div>
  }
>
  {component}
</React.Suspense>
```

## For Base UI Implementation

### Key Adaptations

1. **Update Preview Components**

```typescript
// Ensure Base UI components render correctly
const Component = Index[name]?.component

// May need Base UI specific providers
return (
  <BaseUIProvider>
    <Component />
  </BaseUIProvider>
)
```

2. **Registry Integration**

```typescript
// Update registry helpers for Base UI patterns
export function getBaseUIRegistryItem(name: string) {
  const item = Index[name]

  // Handle Base UI specific processing
  if (item?.baseUIComponents) {
    // Process Base UI component metadata
  }

  return item
}
```

3. **Theme System Updates**

```typescript
// Adapt theme wrapper for Base UI
export function BaseUIThemeWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="base-ui-theme-wrapper">
      {children}
    </div>
  )
}
```

4. **Import Processing**

```typescript
// Update import fixing for Base UI
function fixBaseUIImports(content: string) {
  return content.replace(
    /@base-ui-components\/react\/([A-Z][\w]*)/g,
    '@base-ui-components/react'
  )
}
```

This preview system creates a seamless documentation experience where users can see components in action, view their source code, and understand their usage patterns - all without leaving the documentation site.
