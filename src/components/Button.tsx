import { forwardRef } from 'react'
import { Button as BaseButton } from '@mui/base/Button'
import { tv, type VariantProps } from 'tailwind-variants'
import { clsx } from 'clsx'

const buttonVariants = tv({
  base: [
    'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    '@media (prefers-reduced-motion: reduce) { transition: none }',
  ],
  variants: {
    variant: {
      default: 'bg-primary text-primary-foreground hover:bg-primary-hover',
      outline: 'border border-border bg-background hover:bg-background-muted hover:text-foreground',
      destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive-hover',
      ghost: 'hover:bg-background-muted hover:text-foreground',
    },
    size: {
      sm: 'h-9 rounded-md px-3',
      md: 'h-10 px-4 py-2',
      lg: 'h-11 rounded-md px-8',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
})

export interface ButtonProps
  extends Omit<React.ComponentProps<typeof BaseButton>, 'className'>,
    VariantProps<typeof buttonVariants> {
  className?: string
  asChild?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = BaseButton

    return (
      <Comp
        className={clsx(buttonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      />
    )
  }
)

Button.displayName = 'Button'