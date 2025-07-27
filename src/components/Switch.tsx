import { forwardRef } from 'react'
import { Switch as BaseSwitch } from '@base-ui-components/react/switch'
import { Field } from '@base-ui-components/react/field'
import { clsx } from 'clsx'
import { tv, type VariantProps } from 'tailwind-variants'

const switchRootVariants = tv({
  base: [
    'peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent',
    'transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    'focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50',
    'data-[state=checked]:bg-primary data-[state=unchecked]:bg-input',
  ],
  variants: {
    size: {
      sm: 'h-5 w-9',
      default: 'h-6 w-11',
      lg: 'h-7 w-13',
    },
  },
  defaultVariants: {
    size: 'default',
  },
})

const switchThumbVariants = tv({
  base: [
    'pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0',
    'transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0',
  ],
  variants: {
    size: {
      sm: 'h-4 w-4 data-[state=checked]:translate-x-4',
      default: 'h-5 w-5 data-[state=checked]:translate-x-5',
      lg: 'h-6 w-6 data-[state=checked]:translate-x-6',
    },
  },
  defaultVariants: {
    size: 'default',
  },
})

export interface SwitchRootProps
  extends React.ComponentProps<typeof BaseSwitch.Root>,
    VariantProps<typeof switchRootVariants> {
  className?: string
}

export const SwitchRoot = forwardRef<HTMLButtonElement, SwitchRootProps>(
  ({ className, size, ...props }, ref) => (
    <BaseSwitch.Root
      className={clsx(switchRootVariants({ size }), className)}
      {...props}
      ref={ref}
    />
  )
)

SwitchRoot.displayName = 'SwitchRoot'

export interface SwitchThumbProps
  extends React.ComponentProps<typeof BaseSwitch.Thumb>,
    VariantProps<typeof switchThumbVariants> {
  className?: string
}

export const SwitchThumb = forwardRef<HTMLSpanElement, SwitchThumbProps>(
  ({ className, size, ...props }, ref) => (
    <BaseSwitch.Thumb
      className={clsx(switchThumbVariants({ size }), className)}
      {...props}
      ref={ref}
    />
  )
)

SwitchThumb.displayName = 'SwitchThumb'

// Field integration components
export interface SwitchFieldRootProps
  extends React.ComponentProps<typeof Field.Root> {
  className?: string
}

export const SwitchFieldRoot = forwardRef<HTMLDivElement, SwitchFieldRootProps>(
  ({ className, ...props }, ref) => (
    <Field.Root
      className={clsx('flex flex-col space-y-2', className)}
      {...props}
      ref={ref}
    />
  )
)

SwitchFieldRoot.displayName = 'SwitchFieldRoot'

export interface SwitchLabelProps
  extends React.ComponentProps<typeof Field.Label> {
  className?: string
}

export const SwitchLabel = forwardRef<HTMLLabelElement, SwitchLabelProps>(
  ({ className, ...props }, ref) => (
    <Field.Label
      className={clsx(
        'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
        className
      )}
      {...props}
      ref={ref}
    />
  )
)

SwitchLabel.displayName = 'SwitchLabel'

export interface SwitchDescriptionProps
  extends React.ComponentProps<typeof Field.Description> {
  className?: string
}

export const SwitchDescription = forwardRef<
  HTMLParagraphElement,
  SwitchDescriptionProps
>(({ className, ...props }, ref) => (
  <Field.Description
    className={clsx('text-sm text-muted-foreground', className)}
    {...props}
    ref={ref}
  />
))

SwitchDescription.displayName = 'SwitchDescription'

// Convenience component that combines everything
export interface SwitchProps
  extends Omit<SwitchRootProps, 'children'>,
    VariantProps<typeof switchRootVariants> {
  label?: string
  description?: string
  id?: string
}

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
  ({ label, description, id, size, className, ...props }, ref) => {
    const switchElement = (
      <SwitchRoot
        ref={ref}
        id={id}
        size={size}
        className={className}
        {...props}
      >
        <SwitchThumb size={size} />
      </SwitchRoot>
    )

    if (!label && !description) {
      return switchElement
    }

    return (
      <SwitchFieldRoot>
        <div className="flex items-center space-x-2">
          {switchElement}
          {label && <SwitchLabel htmlFor={id}>{label}</SwitchLabel>}
        </div>
        {description && <SwitchDescription>{description}</SwitchDescription>}
      </SwitchFieldRoot>
    )
  }
)

Switch.displayName = 'Switch'
