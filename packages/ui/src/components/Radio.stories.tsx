import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import {
  RadioGroup,
  RadioGroupRoot,
  RadioRoot,
  RadioIndicator,
  RadioItem,
  RadioFieldRoot,
  RadioFieldLabel,
  RadioFieldDescription,
} from './Radio'

const meta: Meta<typeof RadioGroup> = {
  title: 'Components/Radio',
  component: RadioGroup,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A radio button group component built on Base UI primitives with proper field integration.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      description: 'Label text for the radio group',
      control: 'text',
    },
    description: {
      description: 'Helper text below the radio group',
      control: 'text',
    },
    items: {
      description: 'Array of radio options',
      control: 'object',
    },
    disabled: {
      description: 'Whether the entire radio group is disabled',
      control: 'boolean',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const notificationOptions = [
  { value: 'all', label: 'All notifications' },
  { value: 'mentions', label: 'Direct messages and mentions' },
  { value: 'none', label: 'Nothing' },
]

const paymentOptions = [
  {
    value: 'card',
    label: 'Credit Card',
    description: 'Pay with your credit or debit card',
  },
  {
    value: 'paypal',
    label: 'PayPal',
    description: 'Pay with your PayPal account',
  },
  {
    value: 'apple',
    label: 'Apple Pay',
    description: 'Pay with Touch ID or Face ID',
  },
]

export const Default: Story = {
  args: {
    label: 'Notifications',
    items: notificationOptions,
    defaultValue: 'all',
  },
}

export const WithDescription: Story = {
  args: {
    label: 'Email notifications',
    description: 'Choose what notifications you want to receive via email.',
    items: notificationOptions,
    defaultValue: 'mentions',
  },
}

export const WithItemDescriptions: Story = {
  args: {
    label: 'Payment Method',
    description: 'Choose your preferred payment method.',
    items: paymentOptions,
    defaultValue: 'card',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Disabled Options',
    items: notificationOptions.map(item => ({ ...item, disabled: true })),
    defaultValue: 'all',
  },
}

export const Sizes: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="mb-3 text-sm font-medium">Small</h3>
        <RadioGroupRoot defaultValue="option1">
          <RadioItem size="sm" value="option1" label="Small radio" />
          <RadioItem size="sm" value="option2" label="Another option" />
        </RadioGroupRoot>
      </div>
      <div>
        <h3 className="mb-3 text-sm font-medium">Default</h3>
        <RadioGroupRoot defaultValue="option1">
          <RadioItem value="option1" label="Default radio" />
          <RadioItem value="option2" label="Another option" />
        </RadioGroupRoot>
      </div>
      <div>
        <h3 className="mb-3 text-sm font-medium">Large</h3>
        <RadioGroupRoot defaultValue="option1">
          <RadioItem size="lg" value="option1" label="Large radio" />
          <RadioItem size="lg" value="option2" label="Another option" />
        </RadioGroupRoot>
      </div>
    </div>
  ),
}

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState('card')

    return (
      <div className="space-y-4">
        <RadioGroup
          label="Payment Method"
          description="Select your preferred payment method."
          items={paymentOptions}
          value={value}
          onValueChange={setValue}
        />
        <div className="text-sm text-muted-foreground">
          Selected:{' '}
          {paymentOptions.find(option => option.value === value)?.label}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setValue('paypal')}
            className="rounded bg-secondary px-3 py-1 text-sm hover:bg-secondary/80"
          >
            Select PayPal
          </button>
          <button
            onClick={() => setValue('apple')}
            className="rounded bg-secondary px-3 py-1 text-sm hover:bg-secondary/80"
          >
            Select Apple Pay
          </button>
        </div>
      </div>
    )
  },
}

export const MixedStates: Story = {
  render: () => {
    const mixedOptions = [
      { value: 'enabled1', label: 'Enabled option 1' },
      { value: 'enabled2', label: 'Enabled option 2' },
      { value: 'disabled1', label: 'Disabled option 1', disabled: true },
      { value: 'disabled2', label: 'Disabled option 2', disabled: true },
    ]

    return (
      <RadioGroup
        label="Mixed States"
        description="Some options are disabled."
        items={mixedOptions}
        defaultValue="enabled1"
      />
    )
  },
}

export const CustomComposition: Story = {
  render: () => (
    <RadioFieldRoot>
      <RadioFieldLabel>Custom Composed Radio Group</RadioFieldLabel>
      <RadioFieldDescription>
        This uses individual components for maximum flexibility.
      </RadioFieldDescription>
      <RadioGroupRoot defaultValue="custom1">
        <div className="flex items-center space-x-2">
          <RadioRoot value="custom1">
            <RadioIndicator />
          </RadioRoot>
          <div>
            <label htmlFor="custom1" className="text-sm font-medium">
              Custom Option 1
            </label>
            <p className="text-xs text-muted-foreground">
              With custom layout and styling
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <RadioRoot value="custom2">
            <RadioIndicator />
          </RadioRoot>
          <div>
            <label htmlFor="custom2" className="text-sm font-medium">
              Custom Option 2
            </label>
            <p className="text-xs text-muted-foreground">
              Another custom option
            </p>
          </div>
        </div>
      </RadioGroupRoot>
    </RadioFieldRoot>
  ),
}

export const FormExample: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      plan: 'pro',
      billing: 'monthly',
      notifications: 'all',
    })

    const handleChange = (field: string) => (value: string) => {
      setFormData(prev => ({ ...prev, [field]: value }))
    }

    return (
      <div className="space-y-6 max-w-md">
        <h2 className="text-lg font-semibold">Account Settings</h2>

        <RadioGroup
          label="Plan"
          items={[
            {
              value: 'free',
              label: 'Free',
              description: '$0/month - Basic features',
            },
            {
              value: 'pro',
              label: 'Pro',
              description: '$10/month - All features',
            },
            {
              value: 'enterprise',
              label: 'Enterprise',
              description: 'Custom pricing',
            },
          ]}
          value={formData.plan}
          onValueChange={handleChange('plan')}
        />

        <RadioGroup
          label="Billing Cycle"
          items={[
            { value: 'monthly', label: 'Monthly' },
            { value: 'yearly', label: 'Yearly', description: 'Save 20%' },
          ]}
          value={formData.billing}
          onValueChange={handleChange('billing')}
        />

        <RadioGroup
          label="Email Notifications"
          description="Choose what emails you want to receive."
          items={[
            { value: 'all', label: 'All notifications' },
            { value: 'important', label: 'Important only' },
            { value: 'none', label: 'None' },
          ]}
          value={formData.notifications}
          onValueChange={handleChange('notifications')}
        />

        <div className="rounded-lg bg-muted p-4">
          <h3 className="font-medium">Form Data:</h3>
          <pre className="mt-2 text-xs">
            {JSON.stringify(formData, null, 2)}
          </pre>
        </div>
      </div>
    )
  },
}
