'use client'

import { useEffect, useState } from 'react'
import type { StoryObj } from '@storybook/react'

interface StoryRendererProps {
  story: StoryObj<unknown>
  fallback?: React.ReactNode
}

export function StoryRenderer({
  story,
  fallback = <div className="animate-pulse h-16 bg-muted rounded"></div>,
}: StoryRendererProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Delay mounting to ensure complete hydration
    const timer = setTimeout(() => {
      setMounted(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  // Always render fallback during SSR and initial client render
  if (!mounted) {
    return <>{fallback}</>
  }

  // Render the story based on its structure
  if (story.render) {
    // Story has a custom render function
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return <>{story.render(story.args || {}, {} as any)}</>
  } else if (story.args) {
    // Story has args but no render function - this would need the component
    // For now, just show a placeholder
    return (
      <div className="text-muted-foreground">
        Story with args (component render needed)
      </div>
    )
  }

  // Fallback for unknown story structure
  return <div className="text-muted-foreground">Unable to render story</div>
}
