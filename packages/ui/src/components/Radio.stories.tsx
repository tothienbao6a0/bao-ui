import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import {
  RadioGroup,
  RadioGroupItem,
} from '../../../../registry/base-ui-v4/ui/radio'

const meta: Meta<typeof RadioGroup> = {
  title: 'Registry/RadioGroup',
  component: RadioGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState('option1')
    return (
      <RadioGroup value={value} onValueChange={setValue}>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option1" id="option1" />
          <label
            htmlFor="option1"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Option 1
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option2" id="option2" />
          <label
            htmlFor="option2"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Option 2
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option3" id="option3" />
          <label
            htmlFor="option3"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Option 3
          </label>
        </div>
      </RadioGroup>
    )
  },
}
