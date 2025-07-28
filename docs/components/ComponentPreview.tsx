'use client'

import { useEffect, useState } from 'react'

interface ComponentPreviewProps {
  children: React.ReactNode
  align?: 'start' | 'center' | 'end'
  className?: string
}

export function ComponentPreview({
  children,
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

  return (
    <div
      className={`preview flex min-h-[350px] w-full justify-center p-10 ${alignmentClasses[align]} ${className}`}
      data-align={align}
    >
      <div className="flex flex-wrap items-center gap-2">{children}</div>
    </div>
  )
}
