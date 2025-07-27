import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import {
  Input,
  InputRoot,
  InputLabel,
  InputField,
  InputDescription,
  InputError,
} from './Input'

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexible input component with validation states built on Base UI Field primitives.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      description: 'Label text for the input',
      control: 'text',
    },
    placeholder: {
      description: 'Placeholder text',
      control: 'text',
    },
    description: {
      description: 'Helper text below the input',
      control: 'text',
    },
    error: {
      description: 'Error message',
      control: 'text',
    },
    variant: {
      description: 'Visual variant of the input',
      control: 'select',
      options: ['default', 'error', 'success'],
    },
    size: {
      description: 'Size of the input',
      control: 'select',
      options: ['sm', 'default', 'lg'],
    },
    disabled: {
      description: 'Whether the input is disabled',
      control: 'boolean',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: 'Enter your name...',
  },
}

export const WithLabel: Story = {
  args: {
    label: 'Full Name',
    placeholder: 'Enter your full name',
  },
}

export const WithDescription: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'Enter your email',
    description: 'We\'ll never share your email with anyone else.',
  },
}

export const WithError: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password',
    error: 'Password must be at least 8 characters long.',
  },
}

export const Success: Story = {
  args: {
    label: 'Username',
    placeholder: 'Choose a username',
    variant: 'success',
    description: 'Username is available!',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Disabled Input',
    placeholder: 'This input is disabled',
    disabled: true,
    description: 'This field cannot be edited.',
  },
}

export const Sizes: Story = {
  render: () => (
    <div className="space-y-6 w-80">
      <div>
        <h3 className="mb-2 text-sm font-medium">Small</h3>
        <Input
          size="sm"
          label="Small Input"
          placeholder="Small size input"
          description="This is a small input field."
        />
      </div>
      <div>
        <h3 className="mb-2 text-sm font-medium">Default</h3>
        <Input
          label="Default Input"
          placeholder="Default size input"
          description="This is a default input field."
        />
      </div>
      <div>
        <h3 className="mb-2 text-sm font-medium">Large</h3>
        <Input
          size="lg"
          label="Large Input"
          placeholder="Large size input"
          description="This is a large input field."
        />
      </div>
    </div>
  ),
}

export const InputTypes: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <Input
        label="Text"
        type="text"
        placeholder="Enter text"
      />
      <Input
        label="Email"
        type="email"
        placeholder="Enter email address"
      />
      <Input
        label="Password"
        type="password"
        placeholder="Enter password"
      />
      <Input
        label="Number"
        type="number"
        placeholder="Enter number"
      />
      <Input
        label="Date"
        type="date"
      />
      <Input
        label="Search"
        type="search"
        placeholder="Search..."
      />
    </div>
  ),
}

export const ValidationStates: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <Input
        label="Default State"
        placeholder="Default input"
        description="This is a normal input field."
      />
      <Input
        label="Success State"
        variant="success"
        placeholder="Valid input"
        description="Input is valid!"
      />
      <Input
        label="Error State"
        placeholder="Invalid input"
        error="This field is required."
      />
    </div>
  ),
}

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState('')
    const [error, setError] = useState('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value
      setValue(newValue)
      
      if (newValue.length < 3) {
        setError('Must be at least 3 characters')
      } else {
        setError('')
      }
    }

    return (
      <div className="w-80">
        <Input
          label="Controlled Input"
          placeholder="Type something..."
          value={value}
          onChange={handleChange}
          error={error}
          description={!error ? `Character count: ${value.length}` : undefined}
        />
      </div>
    )
  },
}

export const CustomComposition: Story = {
  render: () => (
    <div className="w-80">
      <InputRoot>
        <InputLabel>Custom Composed Input</InputLabel>
        <InputField
          placeholder="This uses individual components"
          className="bg-slate-50"
        />
        <InputDescription>
          This input is composed using individual components for maximum flexibility.
        </InputDescription>
      </InputRoot>
    </div>
  ),
}