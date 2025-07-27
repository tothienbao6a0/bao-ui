import { useRef, useEffect } from 'react'
import autoAnimate from '@formkit/auto-animate'
import type {
  AutoAnimateOptions,
  AutoAnimationPlugin,
} from '@formkit/auto-animate'

interface UseAutoAnimateOptions extends AutoAnimateOptions {
  respectReducedMotion?: boolean
}

export function useAutoAnimate<T extends HTMLElement>(
  options: UseAutoAnimateOptions = { duration: 250, easing: 'ease-in-out' }
): [React.RefObject<T>, (enabled: boolean) => void] {
  const elementRef = useRef<T>(null)
  const optionsRef = useRef(options)
  const enabledRef = useRef(true)

  useEffect(() => {
    optionsRef.current = options
  }, [options])

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const { respectReducedMotion = true, ...animateOptions } =
      optionsRef.current

    if (
      respectReducedMotion &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return
    }

    if (!enabledRef.current) return

    const cleanup = autoAnimate(element, animateOptions)
    return cleanup
  }, [])

  const setEnabled = (enabled: boolean) => {
    enabledRef.current = enabled
    if (elementRef.current) {
      if (enabled) {
        const { respectReducedMotion = true, ...animateOptions } =
          optionsRef.current
        if (
          respectReducedMotion &&
          window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ) {
          return
        }
        autoAnimate(elementRef.current, animateOptions)
      }
    }
  }

  return [elementRef, setEnabled]
}

export type { AutoAnimateOptions, AutoAnimationPlugin }
