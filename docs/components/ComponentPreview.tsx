'use client'

import React, { Suspense, lazy, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/Tabs'
import { Button } from './ui/Button'
import { CopyIcon, CheckIcon } from './ui/Icons'

// Registry mapping for component examples
const REGISTRY_EXAMPLES: Record<string, React.ComponentType> = {
  'button-demo': lazy(() => import('../examples/button-demo')),
  'button-variants': lazy(() => import('../examples/button-variants')),
  'button-sizes': lazy(() => import('../examples/button-sizes')),
  'button-states': lazy(() => import('../examples/button-states')),
  'badge-demo': lazy(() => import('../examples/badge-demo')),
  'badge-variants': lazy(() => import('../examples/badge-variants')),
  'input-demo': lazy(() => import('../examples/input-demo')),
  'checkbox-demo': lazy(() => import('../examples/checkbox-demo')),
  'radio-demo': lazy(() => import('../examples/radio-demo')),
  'select-demo': lazy(() => import('../examples/select-demo')),
  'switch-demo': lazy(() => import('../examples/switch-demo')),
  'dialog-demo': lazy(() => import('../examples/dialog-demo')),
  'tooltip-demo': lazy(() => import('../examples/tooltip-demo')),
}

// Registry source code mapping
const REGISTRY_SOURCE: Record<string, string> = {
  'button-demo': `import { Button } from '@bao-ui/react'

export default function ButtonDemo() {
  return <Button>Click me</Button>
}`,
  'button-variants': `import { Button } from '@bao-ui/react'

export default function ButtonVariants() {
  return (
    <div className="flex flex-wrap gap-2">
      <Button variant="default">Default</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  )
}`,
  'button-sizes': `import { Button } from '@bao-ui/react'

export default function ButtonSizes() {
  return (
    <div className="flex items-center gap-2">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
      <Button size="icon">🎉</Button>
    </div>
  )
}`,
  'button-states': `import { Button } from '@bao-ui/react'

export default function ButtonStates() {
  return (
    <div className="flex flex-wrap gap-2">
      <Button>Default</Button>
      <Button disabled>Disabled</Button>
    </div>
  )
}`,
}

interface ComponentPreviewProps {
  name: string
  align?: 'start' | 'center' | 'end'
  className?: string
  hideCode?: boolean
}

export function ComponentPreview({
  name,
  align = 'center',
  className = '',
  hideCode = false,
}: ComponentPreviewProps) {
  const [copied, setCopied] = useState(false)

  const Component = REGISTRY_EXAMPLES[name]
  const sourceCode = REGISTRY_SOURCE[name]

  const alignmentClasses = {
    start: 'items-start justify-start',
    center: 'items-center justify-center',
    end: 'items-end justify-end',
  }

  if (!Component) {
    return (
      <div className="flex h-[350px] w-full items-center justify-center rounded-md border border-dashed">
        <p className="text-sm text-muted-foreground">
          Component{' '}
          <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
            {name}
          </code>{' '}
          not found.
        </p>
      </div>
    )
  }

  const copyToClipboard = async () => {
    if (!sourceCode) return

    try {
      await navigator.clipboard.writeText(sourceCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy code:', err)
    }
  }

  if (hideCode) {
    return (
      <div className={`relative ${className}`}>
        <div
          className={`preview flex min-h-[350px] w-full p-10 ${alignmentClasses[align]}`}
        >
          <Suspense
            fallback={
              <div className="flex items-center justify-center">
                <div className="h-16 w-32 animate-pulse rounded bg-muted" />
              </div>
            }
          >
            <Component />
          </Suspense>
        </div>
      </div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      <Tabs defaultValue="preview" className="relative mr-auto w-full">
        <div className="flex items-center justify-between pb-3">
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
        </div>
        <TabsContent value="preview" className="relative rounded-md border">
          <div
            className={`preview flex min-h-[350px] w-full p-10 ${alignmentClasses[align]}`}
          >
            <Suspense
              fallback={
                <div className="flex items-center justify-center">
                  <div className="h-16 w-32 animate-pulse rounded bg-muted" />
                </div>
              }
            >
              <Component />
            </Suspense>
          </div>
        </TabsContent>
        <TabsContent value="code">
          <div className="flex flex-col space-y-4">
            <div className="w-full rounded-md [&_pre]:my-0 [&_pre]:max-h-[350px] [&_pre]:overflow-auto">
              <div className="relative">
                <pre className="mb-4 mt-6 overflow-x-auto rounded-lg bg-zinc-950 py-4 dark:bg-zinc-900">
                  <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm text-zinc-50">
                    {sourceCode}
                  </code>
                </pre>
                <Button
                  onClick={copyToClipboard}
                  size="icon"
                  variant="outline"
                  className="absolute right-4 top-4 h-8 w-8"
                >
                  {copied ? (
                    <CheckIcon className="h-3 w-3" />
                  ) : (
                    <CopyIcon className="h-3 w-3" />
                  )}
                  <span className="sr-only">Copy</span>
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
