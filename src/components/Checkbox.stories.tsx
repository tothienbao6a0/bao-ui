import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import {
  Checkbox,
  CheckboxRoot,
  CheckboxIndicator,
  CheckboxFieldRoot,
  CheckboxLabel,
  CheckboxDescription,
} from './Checkbox'

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A customizable checkbox component with support for indeterminate state, built on Base UI primitives.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      description: 'Label text for the checkbox',
      control: 'text',
    },
    description: {
      description: 'Helper text below the checkbox',
      control: 'text',
    },
    size: {
      description: 'Size of the checkbox',
      control: 'select',
      options: ['sm', 'default', 'lg'],
    },
    disabled: {
      description: 'Whether the checkbox is disabled',
      control: 'boolean',
    },
    defaultChecked: {
      description: 'Whether the checkbox is checked by default',
      control: 'boolean',
    },
    indeterminate: {
      description: 'Whether the checkbox is in indeterminate state',
      control: 'boolean',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Accept terms and conditions',
  },
}

export const WithDescription: Story = {
  args: {
    label: 'Send me notifications',
    description: 'Get notified about updates and news.',
  },
}

export const Checked: Story = {
  args: {
    label: 'Pre-checked option',
    defaultChecked: true,
  },
}

export const Disabled: Story = {
  args: {
    label: 'Disabled checkbox',
    disabled: true,
  },
}

export const DisabledChecked: Story = {
  args: {
    label: 'Disabled and checked',
    disabled: true,
    defaultChecked: true,
  },
}

export const Indeterminate: Story = {
  args: {
    label: 'Indeterminate state',
    indeterminate: true,
    description: 'This checkbox is in an indeterminate state.',
  },
}

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <Checkbox size="sm" label="Small" />
        <Checkbox size="default" label="Default" />
        <Checkbox size="lg" label="Large" />
      </div>
    </div>
  ),
}

export const CheckboxGroup: Story = {
  render: () => {
    const [selectedItems, setSelectedItems] = useState<string[]>(['option1'])

    const handleChange = (value: string, checked: boolean) => {
      if (checked) {
        setSelectedItems([...selectedItems, value])
      } else {
        setSelectedItems(selectedItems.filter(item => item !== value))
      }
    }

    return (
      <div className="space-y-3">
        <h3 className="text-sm font-medium">Select your preferences:</h3>
        <Checkbox
          label="Email notifications"
          checked={selectedItems.includes('option1')}
          onCheckedChange={checked => handleChange('option1', checked)}
          description="Receive updates via email"
        />
        <Checkbox
          label="SMS notifications"
          checked={selectedItems.includes('option2')}
          onCheckedChange={checked => handleChange('option2', checked)}
          description="Receive updates via SMS"
        />
        <Checkbox
          label="Push notifications"
          checked={selectedItems.includes('option3')}
          onCheckedChange={checked => handleChange('option3', checked)}
          description="Receive push notifications"
        />
        <div className="mt-4 text-sm text-slate-600">
          Selected:{' '}
          {selectedItems.length > 0 ? selectedItems.join(', ') : 'None'}
        </div>
      </div>
    )
  },
}

export const ParentChildCheckboxes: Story = {
  render: () => {
    const [parentChecked, setParentChecked] = useState(false)
    const [childStates, setChildStates] = useState({
      child1: false,
      child2: false,
      child3: false,
    })

    const childCount = Object.values(childStates).filter(Boolean).length
    const totalChildren = Object.keys(childStates).length
    const isIndeterminate = childCount > 0 && childCount < totalChildren

    const handleParentChange = (checked: boolean) => {
      setParentChecked(checked)
      setChildStates({
        child1: checked,
        child2: checked,
        child3: checked,
      })
    }

    const handleChildChange = (
      childKey: keyof typeof childStates,
      checked: boolean
    ) => {
      const newChildStates = { ...childStates, [childKey]: checked }
      setChildStates(newChildStates)

      const newChildCount = Object.values(newChildStates).filter(Boolean).length
      setParentChecked(newChildCount === totalChildren)
    }

    return (
      <div className="space-y-3">
        <Checkbox
          label="Select all features"
          checked={parentChecked}
          indeterminate={isIndeterminate}
          onCheckedChange={handleParentChange}
          description="Toggle all features on or off"
        />
        <div className="ml-6 space-y-2">
          <Checkbox
            label="Feature A"
            checked={childStates.child1}
            onCheckedChange={checked => handleChildChange('child1', checked)}
          />
          <Checkbox
            label="Feature B"
            checked={childStates.child2}
            onCheckedChange={checked => handleChildChange('child2', checked)}
          />
          <Checkbox
            label="Feature C"
            checked={childStates.child3}
            onCheckedChange={checked => handleChildChange('child3', checked)}
          />
        </div>
      </div>
    )
  },
}

export const CustomComposition: Story = {
  render: () => (
    <div className="space-y-4">
      <CheckboxFieldRoot>
        <div className="flex items-center space-x-3">
          <CheckboxRoot defaultChecked>
            <CheckboxIndicator />
          </CheckboxRoot>
          <div>
            <CheckboxLabel>Custom composed checkbox</CheckboxLabel>
            <CheckboxDescription>
              This uses individual components for maximum flexibility.
            </CheckboxDescription>
          </div>
        </div>
      </CheckboxFieldRoot>
    </div>
  ),
}

export const CustomIcon: Story = {
  render: () => (
    <div className="space-y-3">
      <CheckboxFieldRoot>
        <div className="flex items-center space-x-2">
          <CheckboxRoot>
            <CheckboxIndicator>
              {/* Custom heart icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-4 w-4"
              >
                <path d="M21.2 6.4c0-1.8-1.4-3.2-3.2-3.2-1 0-1.9.5-2.6 1.2L12 8.1 8.6 4.4c-.7-.7-1.6-1.2-2.6-1.2-1.8 0-3.2 1.4-3.2 3.2 0 .9.3 1.7.9 2.3L12 18l8.3-9.3c.6-.6.9-1.4.9-2.3z" />
              </svg>
            </CheckboxIndicator>
          </CheckboxRoot>
          <CheckboxLabel>Like this post</CheckboxLabel>
        </div>
      </CheckboxFieldRoot>
    </div>
  ),
}
