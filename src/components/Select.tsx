import { forwardRef } from 'react'
import { Select } from '@base-ui-components/react/select'
import { clsx } from 'clsx'
import { tv, type VariantProps } from 'tailwind-variants'

const selectTriggerVariants = tv({
  base: [
    'flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm',
    'ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
    'disabled:cursor-not-allowed disabled:opacity-50',
  ],
  variants: {
    size: {
      sm: 'h-8 px-2 text-xs',
      default: 'h-10 px-3 text-sm',
      lg: 'h-12 px-4 text-base',
    },
  },
  defaultVariants: {
    size: 'default',
  },
})

const selectContentVariants = tv({
  base: [
    'relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border border-border bg-popover text-popover-foreground shadow-md',
    'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
    'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
    'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2',
    'data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
  ],
})

const selectItemVariants = tv({
  base: [
    'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none',
    'focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
  ],
})

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface SelectRootProps
  extends Omit<React.ComponentProps<typeof Select.Root>, 'items'> {
  options: SelectOption[]
  placeholder?: string
  onValueChange?: (value: string | null) => void
}

export const SelectRoot = forwardRef<HTMLDivElement, SelectRootProps>(
  ({ options, onValueChange, ...props }, _ref) => {
    return (
      <Select.Root
        items={options}
        onValueChange={value => onValueChange?.(value)}
        {...props}
      />
    )
  }
)

SelectRoot.displayName = 'SelectRoot'

export interface SelectTriggerProps
  extends React.ComponentProps<typeof Select.Trigger>,
    VariantProps<typeof selectTriggerVariants> {
  className?: string
}

export const SelectTrigger = forwardRef<HTMLButtonElement, SelectTriggerProps>(
  ({ className, size, ...props }, ref) => {
    return (
      <Select.Trigger
        ref={ref}
        className={clsx(selectTriggerVariants({ size }), className)}
        {...props}
      >
        <Select.Value />
        <Select.Icon className="h-4 w-4 opacity-50">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </Select.Icon>
      </Select.Trigger>
    )
  }
)

SelectTrigger.displayName = 'SelectTrigger'

export interface SelectContentProps
  extends React.ComponentProps<typeof Select.Popup> {
  className?: string
}

export const SelectContent = forwardRef<HTMLDivElement, SelectContentProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <Select.Portal>
        <Select.Positioner sideOffset={4}>
          <Select.Popup
            ref={ref}
            className={clsx(selectContentVariants(), className)}
            {...props}
          >
            <Select.ScrollUpArrow className="flex cursor-default items-center justify-center py-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="m18 15-6-6-6 6" />
              </svg>
            </Select.ScrollUpArrow>
            {children}
            <Select.ScrollDownArrow className="flex cursor-default items-center justify-center py-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </Select.ScrollDownArrow>
          </Select.Popup>
        </Select.Positioner>
      </Select.Portal>
    )
  }
)

SelectContent.displayName = 'SelectContent'

export interface SelectItemProps
  extends React.ComponentProps<typeof Select.Item> {
  className?: string
}

export const SelectItem = forwardRef<HTMLDivElement, SelectItemProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <Select.Item
        ref={ref}
        className={clsx(selectItemVariants(), className)}
        {...props}
      >
        <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
          <Select.ItemIndicator>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <polyline points="20,6 9,17 4,12" />
            </svg>
          </Select.ItemIndicator>
        </span>
        <Select.ItemText>{children}</Select.ItemText>
      </Select.Item>
    )
  }
)

SelectItem.displayName = 'SelectItem'

export interface SelectLabelProps
  extends React.ComponentProps<typeof Select.Label> {
  className?: string
}

export const SelectLabel = forwardRef<HTMLDivElement, SelectLabelProps>(
  ({ className, ...props }, ref) => {
    return (
      <Select.Label
        ref={ref}
        className={clsx(
          'py-1.5 pl-8 pr-2 text-sm font-semibold text-foreground',
          className
        )}
        {...props}
      />
    )
  }
)

SelectLabel.displayName = 'SelectLabel'

export interface SelectSeparatorProps {
  className?: string
}

export const SelectSeparator = forwardRef<HTMLDivElement, SelectSeparatorProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx('-mx-1 my-1 h-px bg-muted', className)}
        {...props}
      />
    )
  }
)

SelectSeparator.displayName = 'SelectSeparator'

// Legacy export for backwards compatibility
export { SelectRoot as Select }
