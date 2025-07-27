import { forwardRef } from 'react'
import { clsx } from 'clsx'
import { tv, type VariantProps } from 'tailwind-variants'

const badgeVariants = tv({
  base: [
    'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors',
    'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  ],
  variants: {
    variant: {
      default:
        'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
      secondary:
        'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
      destructive:
        'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
      success:
        'border-transparent bg-green-500 text-white hover:bg-green-500/80 dark:bg-green-600 dark:hover:bg-green-600/80',
      warning:
        'border-transparent bg-yellow-500 text-white hover:bg-yellow-500/80 dark:bg-yellow-600 dark:hover:bg-yellow-600/80',
      outline:
        'text-foreground border-border hover:bg-accent hover:text-accent-foreground',
      ghost:
        'border-transparent text-foreground hover:bg-accent hover:text-accent-foreground',
    },
    size: {
      sm: 'px-2 py-0.5 text-xs',
      default: 'px-2.5 py-0.5 text-xs',
      lg: 'px-3 py-1 text-sm',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
})

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  className?: string
}

export const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(badgeVariants({ variant, size }), className)}
        {...props}
      />
    )
  }
)

Badge.displayName = 'Badge'

// Status badge with dot indicator
export interface StatusBadgeProps extends Omit<BadgeProps, 'variant'> {
  status: 'success' | 'warning' | 'destructive' | 'default' | 'secondary'
  showDot?: boolean
}

export const StatusBadge = forwardRef<HTMLDivElement, StatusBadgeProps>(
  ({ status, showDot = false, className, children, ...props }, ref) => {
    const dotColors = {
      success: 'bg-green-500',
      warning: 'bg-yellow-500',
      destructive: 'bg-red-500',
      default: 'bg-primary',
      secondary: 'bg-muted-foreground',
    }

    return (
      <Badge
        ref={ref}
        variant={status === 'success' || status === 'warning' ? status : status}
        className={clsx('flex items-center gap-1.5', className)}
        {...props}
      >
        {showDot && (
          <div
            className={clsx('h-1.5 w-1.5 rounded-full', dotColors[status])}
            aria-hidden="true"
          />
        )}
        {children}
      </Badge>
    )
  }
)

StatusBadge.displayName = 'StatusBadge'

// Notification badge (for counts)
export interface NotificationBadgeProps extends Omit<BadgeProps, 'children'> {
  count: number
  max?: number
  showZero?: boolean
}

export const NotificationBadge = forwardRef<
  HTMLDivElement,
  NotificationBadgeProps
>(({ count, max = 99, showZero = false, className, ...props }, ref) => {
  if (count === 0 && !showZero) {
    return null
  }

  const displayCount = count > max ? `${max}+` : count.toString()

  return (
    <Badge
      ref={ref}
      variant="destructive"
      size="sm"
      className={clsx(
        'min-w-[1.25rem] justify-center px-1 py-0 text-xs font-bold',
        className
      )}
      {...props}
    >
      {displayCount}
    </Badge>
  )
})

NotificationBadge.displayName = 'NotificationBadge'

// Interactive badge (clickable)
export interface InteractiveBadgeProps extends BadgeProps {
  onRemove?: () => void
  removable?: boolean
}

export const InteractiveBadge = forwardRef<
  HTMLDivElement,
  InteractiveBadgeProps
>(({ onRemove, removable = false, className, children, ...props }, ref) => {
  return (
    <Badge
      ref={ref}
      className={clsx(
        removable && 'pr-1.5',
        (onRemove || removable) && 'cursor-pointer hover:opacity-80',
        className
      )}
      {...props}
    >
      <span className="flex items-center gap-1">
        {children}
        {removable && onRemove && (
          <button
            type="button"
            onClick={e => {
              e.stopPropagation()
              onRemove()
            }}
            className="ml-1 rounded-full p-0.5 hover:bg-black/10 focus:outline-none focus:ring-1 focus:ring-white dark:hover:bg-white/10"
            aria-label="Remove"
          >
            <svg
              className="h-3 w-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </span>
    </Badge>
  )
})

InteractiveBadge.displayName = 'InteractiveBadge'
