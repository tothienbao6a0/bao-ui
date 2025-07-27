import { forwardRef } from 'react'
import { Checkbox } from '@base-ui-components/react/checkbox'
import { Field } from '@base-ui-components/react/field'
import { clsx } from 'clsx'
import { tv, type VariantProps } from 'tailwind-variants'

const checkboxVariants = tv({
  base: [
    'peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground',
    'data-[state=indeterminate]:bg-primary data-[state=indeterminate]:text-primary-foreground',
  ],
  variants: {
    size: {
      sm: 'h-3 w-3',
      default: 'h-4 w-4',
      lg: 'h-5 w-5',
    },
  },
  defaultVariants: {
    size: 'default',
  },
})

const labelVariants = tv({
  base: [
    'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground',
  ],
})

export interface CheckboxRootProps
  extends React.ComponentProps<typeof Checkbox.Root>,
    VariantProps<typeof checkboxVariants> {
  className?: string
}

export const CheckboxRoot = forwardRef<HTMLButtonElement, CheckboxRootProps>(
  ({ className, size, ...props }, ref) => {
    return (
      <Checkbox.Root
        ref={ref}
        className={clsx(checkboxVariants({ size }), className)}
        {...props}
      />
    )
  }
)

CheckboxRoot.displayName = 'CheckboxRoot'

export interface CheckboxIndicatorProps
  extends React.ComponentProps<typeof Checkbox.Indicator> {
  className?: string
}

export const CheckboxIndicator = forwardRef<
  HTMLSpanElement,
  CheckboxIndicatorProps
>(({ className, children, ...props }, ref) => {
  return (
    <Checkbox.Indicator
      ref={ref}
      className={clsx(
        'flex items-center justify-center text-current',
        className
      )}
      {...props}
    >
      {children || (
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
      )}
    </Checkbox.Indicator>
  )
})

CheckboxIndicator.displayName = 'CheckboxIndicator'

// Indeterminate icon component
export const CheckboxIndeterminate = () => (
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
    <line x1="5" x2="19" y1="12" y2="12" />
  </svg>
)

// Field wrapper components
export interface CheckboxFieldRootProps
  extends React.ComponentProps<typeof Field.Root> {
  className?: string
}

export const CheckboxFieldRoot = forwardRef<
  HTMLDivElement,
  CheckboxFieldRootProps
>(({ className, ...props }, ref) => {
  return (
    <Field.Root ref={ref} className={clsx('space-y-2', className)} {...props} />
  )
})

CheckboxFieldRoot.displayName = 'CheckboxFieldRoot'

export interface CheckboxLabelProps
  extends React.ComponentProps<typeof Field.Label> {
  className?: string
}

export const CheckboxLabel = forwardRef<HTMLLabelElement, CheckboxLabelProps>(
  ({ className, ...props }, ref) => {
    return (
      <Field.Label
        ref={ref}
        className={clsx(labelVariants(), className)}
        {...props}
      />
    )
  }
)

CheckboxLabel.displayName = 'CheckboxLabel'

export interface CheckboxDescriptionProps
  extends React.ComponentProps<typeof Field.Description> {
  className?: string
}

export const CheckboxDescription = forwardRef<
  HTMLDivElement,
  CheckboxDescriptionProps
>(({ className, ...props }, ref) => {
  return (
    <Field.Description
      ref={ref}
      className={clsx('text-sm text-muted-foreground', className)}
      {...props}
    />
  )
})

CheckboxDescription.displayName = 'CheckboxDescription'

// Compound component for easy usage
export interface CheckboxProps extends Omit<CheckboxRootProps, 'children'> {
  label?: string
  description?: string
  indeterminate?: boolean
}

export const CheckboxField = forwardRef<HTMLButtonElement, CheckboxProps>(
  ({ label, description, indeterminate, className, ...props }, ref) => {
    return (
      <CheckboxFieldRoot className={className}>
        <Field.Control>
          <div className="flex items-center space-x-2">
            <CheckboxRoot ref={ref} {...props}>
              <CheckboxIndicator>
                {indeterminate ? <CheckboxIndeterminate /> : null}
              </CheckboxIndicator>
            </CheckboxRoot>
            {label && <CheckboxLabel>{label}</CheckboxLabel>}
          </div>
        </Field.Control>
        {description && (
          <CheckboxDescription>{description}</CheckboxDescription>
        )}
      </CheckboxFieldRoot>
    )
  }
)

CheckboxField.displayName = 'CheckboxField'

// Legacy export for backwards compatibility
export { CheckboxField as Checkbox }
