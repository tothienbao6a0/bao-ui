import * as React from 'react'
import { Input as BaseInput } from '@base-ui-components/react/input'
import { cn } from '../lib/utils'

export type InputProps = React.ComponentPropsWithoutRef<typeof BaseInput>

const Input = React.forwardRef<React.ElementRef<typeof BaseInput>, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <BaseInput
        type={type}
        className={cn(
          'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = 'Input'

export { Input }
