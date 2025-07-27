'use client'

import { useEffect, useState } from 'react'

interface ClientOnlyProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function ClientOnly({ children, fallback = null }: ClientOnlyProps) {
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  // Always render fallback on server-side
  if (typeof window === 'undefined') {
    return <>{fallback}</>
  }

  // Show fallback until client has mounted to prevent hydration mismatches
  if (!hasMounted) {
    return <>{fallback}</>
  }

  // Only render children after client has mounted
  return <>{children}</>
}
