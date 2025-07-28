import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Switch } from '../../../../registry/base-ui-v4/ui/switch'

const meta: Meta<typeof Switch> = {
  title: 'Registry/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}

export const Controlled: Story = {
  render: () => {
    const [checked, setChecked] = useState(false)
    return (
      <div className="flex items-center space-x-2">
        <Switch
          id="controlled-switch"
          checked={checked}
          onCheckedChange={setChecked}
        />
        <label
          htmlFor="controlled-switch"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {checked ? 'Enabled' : 'Disabled'}
        </label>
      </div>
    )
  },
}
