declare module '@bao-ui/react' {
  import * as React from 'react'

  // Badge Components
  export interface BadgeProps {
    variant?:
      | 'default'
      | 'secondary'
      | 'destructive'
      | 'success'
      | 'warning'
      | 'outline'
      | 'ghost'
    size?: 'sm' | 'default' | 'lg'
    className?: string
    children?: React.ReactNode
  }

  export interface StatusBadgeProps {
    status?: 'success' | 'warning' | 'destructive' | 'default' | 'secondary'
    showDot?: boolean
    size?: 'sm' | 'default' | 'lg'
    className?: string
    children?: React.ReactNode
  }

  export interface NotificationBadgeProps {
    count: number
    max?: number
    showZero?: boolean
    className?: string
  }

  export interface InteractiveBadgeProps {
    removable?: boolean
    onRemove?: () => void
    variant?:
      | 'default'
      | 'secondary'
      | 'destructive'
      | 'success'
      | 'warning'
      | 'outline'
      | 'ghost'
    size?: 'sm' | 'default' | 'lg'
    className?: string
    children?: React.ReactNode
  }

  // Input Components
  export interface InputProps {
    size?: 'sm' | 'default' | 'lg'
    invalid?: boolean
    disabled?: boolean
    className?: string
    placeholder?: string
    type?: string
    value?: string
    defaultValue?: string
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  }

  // Checkbox Components
  export interface CheckboxProps {
    label?: string
    description?: string
    indeterminate?: boolean
    size?: 'sm' | 'default' | 'lg'
    checked?: boolean
    defaultChecked?: boolean
    onCheckedChange?: (checked: boolean) => void
    disabled?: boolean
    className?: string
  }

  // Radio Components
  export interface RadioGroupProps {
    label?: string
    description?: string
    items: RadioOption[]
    value?: string
    defaultValue?: string
    onValueChange?: (value: string) => void
    disabled?: boolean
    className?: string
  }

  export interface RadioOption {
    value: string
    label: string
    description?: string
    disabled?: boolean
  }

  // Select Components
  export interface SelectRootProps {
    options: SelectOption[]
    placeholder?: string
    value?: string | null
    onValueChange?: (value: string | null) => void
    disabled?: boolean
    className?: string
    children?: React.ReactNode
  }

  export interface SelectOption {
    value: string
    label: string
    disabled?: boolean
  }

  export interface SelectTriggerProps {
    size?: 'sm' | 'default' | 'lg'
    className?: string
  }

  export interface SelectContentProps {
    className?: string
    children?: React.ReactNode
  }

  export interface SelectItemProps {
    value: string
    disabled?: boolean
    className?: string
    children?: React.ReactNode
  }

  // Switch Components
  export interface SwitchProps {
    label?: string
    description?: string
    size?: 'sm' | 'default' | 'lg'
    checked?: boolean
    defaultChecked?: boolean
    onCheckedChange?: (checked: boolean) => void
    disabled?: boolean
    id?: string
    className?: string
  }

  // Component Exports
  export const Badge: React.FC<BadgeProps>
  export const StatusBadge: React.FC<StatusBadgeProps>
  export const NotificationBadge: React.FC<NotificationBadgeProps>
  export const InteractiveBadge: React.FC<InteractiveBadgeProps>

  export const Input: React.FC<InputProps>

  export const Checkbox: React.FC<CheckboxProps>

  export const RadioGroup: React.FC<RadioGroupProps>

  export const SelectRoot: React.FC<SelectRootProps>
  export const SelectTrigger: React.FC<SelectTriggerProps>
  export const SelectContent: React.FC<SelectContentProps>
  export const SelectItem: React.FC<SelectItemProps>

  export const Switch: React.FC<SwitchProps>
}
