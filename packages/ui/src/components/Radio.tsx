import { forwardRef } from 'react'
import { Radio } from '@base-ui-components/react/radio'
import { RadioGroup } from '@base-ui-components/react/radio-group'
import { Field } from '@base-ui-components/react/field'
import { clsx } from 'clsx'
import { tv, type VariantProps } from 'tailwind-variants'

const radioVariants = tv({
  base: [
    'aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    'disabled:cursor-not-allowed disabled:opacity-50',
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

export interface RadioGroupRootProps
  extends React.ComponentProps<typeof RadioGroup> {
  className?: string
}

export const RadioGroupRoot = forwardRef<HTMLDivElement, RadioGroupRootProps>(
  ({ className, ...props }, ref) => {
    return (
      <RadioGroup
        ref={ref}
        className={clsx('grid gap-2', className)}
        {...props}
      />
    )
  }
)

RadioGroupRoot.displayName = 'RadioGroupRoot'

export interface RadioRootProps
  extends React.ComponentProps<typeof Radio.Root>,
    VariantProps<typeof radioVariants> {
  className?: string
}

export const RadioRoot = forwardRef<HTMLButtonElement, RadioRootProps>(
  ({ className, size, ...props }, ref) => {
    return (
      <Radio.Root
        ref={ref}
        className={clsx(radioVariants({ size }), className)}
        {...props}
      />
    )
  }
)

RadioRoot.displayName = 'RadioRoot'

export interface RadioIndicatorProps
  extends React.ComponentProps<typeof Radio.Indicator> {
  className?: string
}

export const RadioIndicator = forwardRef<HTMLSpanElement, RadioIndicatorProps>(
  ({ className, ...props }, ref) => {
    return (
      <Radio.Indicator
        ref={ref}
        className={clsx('flex items-center justify-center', className)}
        {...props}
      >
        <div className="h-2.5 w-2.5 rounded-full bg-current" />
      </Radio.Indicator>
    )
  }
)

RadioIndicator.displayName = 'RadioIndicator'

// Field wrapper components
export interface RadioFieldRootProps
  extends React.ComponentProps<typeof Field.Root> {
  className?: string
}

export const RadioFieldRoot = forwardRef<HTMLDivElement, RadioFieldRootProps>(
  ({ className, ...props }, ref) => {
    return (
      <Field.Root
        ref={ref}
        className={clsx('space-y-3', className)}
        {...props}
      />
    )
  }
)

RadioFieldRoot.displayName = 'RadioFieldRoot'

export interface RadioFieldLabelProps
  extends React.ComponentProps<typeof Field.Label> {
  className?: string
}

export const RadioFieldLabel = forwardRef<
  HTMLLabelElement,
  RadioFieldLabelProps
>(({ className, ...props }, ref) => {
  return (
    <Field.Label
      ref={ref}
      className={clsx(
        'text-sm font-medium leading-none text-foreground',
        className
      )}
      {...props}
    />
  )
})

RadioFieldLabel.displayName = 'RadioFieldLabel'

export interface RadioFieldDescriptionProps
  extends React.ComponentProps<typeof Field.Description> {
  className?: string
}

export const RadioFieldDescription = forwardRef<
  HTMLDivElement,
  RadioFieldDescriptionProps
>(({ className, ...props }, ref) => {
  return (
    <Field.Description
      ref={ref}
      className={clsx('text-sm text-muted-foreground', className)}
      {...props}
    />
  )
})

RadioFieldDescription.displayName = 'RadioFieldDescription'

// Radio Item component for easy usage
export interface RadioItemProps extends Omit<RadioRootProps, 'children'> {
  label: string
  description?: string
}

export const RadioItem = forwardRef<HTMLButtonElement, RadioItemProps>(
  ({ label, description, className, ...props }, ref) => {
    return (
      <div className="flex items-center space-x-2">
        <RadioRoot ref={ref} className={className} {...props}>
          <RadioIndicator />
        </RadioRoot>
        <div className="grid gap-1.5 leading-none">
          <label
            htmlFor={props.value}
            className={clsx(labelVariants(), 'cursor-pointer')}
          >
            {label}
          </label>
          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
        </div>
      </div>
    )
  }
)

RadioItem.displayName = 'RadioItem'

// Compound component for easy usage
export interface RadioGroupProps extends Omit<RadioGroupRootProps, 'children'> {
  label?: string
  description?: string
  items: Array<{
    value: string
    label: string
    description?: string
    disabled?: boolean
  }>
}

export const RadioGroupField = forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ label, description, items, className, ...props }, ref) => {
    return (
      <RadioFieldRoot className={className}>
        {label && <RadioFieldLabel>{label}</RadioFieldLabel>}
        {description && (
          <RadioFieldDescription>{description}</RadioFieldDescription>
        )}
        <RadioGroupRoot ref={ref} {...props}>
          {items.map(item => (
            <RadioItem
              key={item.value}
              value={item.value}
              label={item.label}
              description={item.description}
              disabled={item.disabled}
            />
          ))}
        </RadioGroupRoot>
      </RadioFieldRoot>
    )
  }
)

RadioGroupField.displayName = 'RadioGroupField'

// Legacy exports for backwards compatibility
export { RadioGroupField as RadioGroup }
