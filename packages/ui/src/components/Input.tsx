import { forwardRef } from 'react'
import { Field } from '@base-ui-components/react/field'
import { Input as BaseInput } from '@base-ui-components/react/input'
import { clsx } from 'clsx'
import { tv, type VariantProps } from 'tailwind-variants'

const inputVariants = tv({
  base: [
    'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm',
    'ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium',
    'placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    'disabled:cursor-not-allowed disabled:opacity-50',
  ],
  variants: {
    variant: {
      default: 'border-input',
      error: 'border-destructive focus-visible:ring-destructive',
      success: 'border-green-500 focus-visible:ring-green-500',
    },
    size: {
      sm: 'h-8 px-2 text-xs',
      default: 'h-10 px-3 text-sm',
      lg: 'h-12 px-4 text-base',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
})

const labelVariants = tv({
  base: 'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
  variants: {
    variant: {
      default: 'text-foreground',
      error: 'text-destructive',
      success: 'text-green-600',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

export interface InputRootProps
  extends React.ComponentProps<typeof Field.Root> {
  className?: string
}

export const InputRoot = forwardRef<HTMLDivElement, InputRootProps>(
  ({ className, ...props }, ref) => {
    return (
      <Field.Root
        ref={ref}
        className={clsx('space-y-2', className)}
        {...props}
      />
    )
  }
)

InputRoot.displayName = 'InputRoot'

export interface InputLabelProps
  extends React.ComponentProps<typeof Field.Label>,
    VariantProps<typeof labelVariants> {
  className?: string
}

export const InputLabel = forwardRef<HTMLLabelElement, InputLabelProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <Field.Label
        ref={ref}
        className={clsx(labelVariants({ variant }), className)}
        {...props}
      />
    )
  }
)

InputLabel.displayName = 'InputLabel'

export interface InputFieldProps
  extends Omit<React.ComponentProps<typeof BaseInput>, 'size'>,
    VariantProps<typeof inputVariants> {
  className?: string
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ className, variant, size, type = 'text', ...props }, ref) => {
    return (
      <Field.Control>
        <BaseInput
          ref={ref}
          type={type}
          className={clsx(inputVariants({ variant, size }), className)}
          {...props}
        />
      </Field.Control>
    )
  }
)

InputField.displayName = 'InputField'

export interface InputDescriptionProps
  extends React.ComponentProps<typeof Field.Description> {
  className?: string
}

export const InputDescription = forwardRef<
  HTMLDivElement,
  InputDescriptionProps
>(({ className, ...props }, ref) => {
  return (
    <Field.Description
      ref={ref}
      className={clsx('text-sm text-muted-foreground', className)}
      {...props}
    />
  )
})

InputDescription.displayName = 'InputDescription'

export interface InputErrorProps
  extends React.ComponentProps<typeof Field.Error> {
  className?: string
}

export const InputError = forwardRef<HTMLDivElement, InputErrorProps>(
  ({ className, ...props }, ref) => {
    return (
      <Field.Error
        ref={ref}
        className={clsx('text-sm text-destructive', className)}
        {...props}
      />
    )
  }
)

InputError.displayName = 'InputError'

// Compound component for easy usage
export interface InputProps extends Omit<InputFieldProps, 'variant'> {
  label?: string
  description?: string
  error?: string
  variant?: 'default' | 'error' | 'success'
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { label, description, error, variant = 'default', className, ...props },
    ref
  ) => {
    const finalVariant = error ? 'error' : variant

    return (
      <InputRoot className={className}>
        {label && <InputLabel variant={finalVariant}>{label}</InputLabel>}
        <InputField ref={ref} variant={finalVariant} {...props} />
        {description && !error && (
          <InputDescription>{description}</InputDescription>
        )}
        {error && <InputError>{error}</InputError>}
      </InputRoot>
    )
  }
)

Input.displayName = 'Input'
