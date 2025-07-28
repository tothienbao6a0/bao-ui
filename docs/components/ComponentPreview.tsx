'use client'

import { useEffect, useState } from 'react'
import type { StoryObj } from '@storybook/react'

interface ComponentPreviewProps {
  story: StoryObj<unknown>
  align?: 'start' | 'center' | 'end'
  className?: string
}

export function ComponentPreview({
  story,
  align = 'center',
  className = '',
}: ComponentPreviewProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  const alignmentClasses = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
  }

  if (!mounted) {
    return (
      <div
        className={`preview flex min-h-[350px] w-full justify-center p-10 ${alignmentClasses[align]} ${className}`}
      >
        <div className="animate-pulse h-16 w-32 bg-muted rounded"></div>
      </div>
    )
  }

  const renderStory = () => {
    if (story.render) {
      return story.render(story.args || {}, {} as any)
    } else if (story.args) {
      return (
        <div className="text-muted-foreground">
          Story with args (component render needed)
        </div>
      )
    }
    return <div className="text-muted-foreground">Unable to render story</div>
  }

  return (
    <div
      className={`preview flex min-h-[350px] w-full justify-center p-10 ${alignmentClasses[align]} ${className}`}
      data-align={align}
    >
      <div className="flex flex-wrap items-center gap-2">{renderStory()}</div>
    </div>
  )
}
