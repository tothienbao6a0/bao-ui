'use client'

import { useEffect, useState } from 'react'

interface StoryWrapperProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function StoryWrapper({
  children,
  fallback = <div className="animate-pulse h-16 bg-muted rounded"></div>,
}: StoryWrapperProps) {
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

  return <>{children}</>
}
