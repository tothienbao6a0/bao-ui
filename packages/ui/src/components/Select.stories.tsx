import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import {
  SelectRoot,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  type SelectOption,
} from './Select'

const meta: Meta<typeof SelectRoot> = {
  title: 'Components/Select',
  component: SelectRoot,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A customizable select component built on Base UI primitives.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    options: {
      description: 'Array of options for the select',
      control: 'object',
    },
    placeholder: {
      description: 'Placeholder text when no value is selected',
      control: 'text',
    },
    disabled: {
      description: 'Whether the select is disabled',
      control: 'boolean',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const fruits: SelectOption[] = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'orange', label: 'Orange' },
  { value: 'grape', label: 'Grape' },
  { value: 'pineapple', label: 'Pineapple' },
]

const frameworks: SelectOption[] = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'angular', label: 'Angular' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'solid', label: 'Solid' },
]

export const Default: Story = {
  render: () => (
    <div className="w-[200px]">
      <SelectRoot options={fruits} placeholder="Select a fruit...">
        <SelectTrigger />
        <SelectContent>
          {fruits.map(fruit => (
            <SelectItem key={fruit.value} value={fruit.value}>
              {fruit.label}
            </SelectItem>
          ))}
        </SelectContent>
      </SelectRoot>
    </div>
  ),
}

export const WithLabel: Story = {
  render: () => (
    <div className="w-[200px]">
      <SelectRoot options={frameworks} placeholder="Choose framework">
        <SelectTrigger />
        <SelectContent>
          <SelectLabel>Frontend Frameworks</SelectLabel>
          {frameworks.map(framework => (
            <SelectItem key={framework.value} value={framework.value}>
              {framework.label}
            </SelectItem>
          ))}
        </SelectContent>
      </SelectRoot>
    </div>
  ),
}

export const WithSeparator: Story = {
  render: () => {
    const groupedOptions: SelectOption[] = [
      { value: 'apple', label: 'Apple' },
      { value: 'banana', label: 'Banana' },
      { value: 'grape', label: 'Grape' },
    ]

    const vegetables: SelectOption[] = [
      { value: 'carrot', label: 'Carrot' },
      { value: 'broccoli', label: 'Broccoli' },
      { value: 'spinach', label: 'Spinach' },
    ]

    return (
      <div className="w-[200px]">
        <SelectRoot
          options={[...groupedOptions, ...vegetables]}
          placeholder="Select food..."
        >
          <SelectTrigger />
          <SelectContent>
            <SelectLabel>Fruits</SelectLabel>
            {groupedOptions.map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
            <SelectSeparator />
            <SelectLabel>Vegetables</SelectLabel>
            {vegetables.map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </SelectRoot>
      </div>
    )
  },
}

export const Disabled: Story = {
  render: () => (
    <div className="w-[200px]">
      <SelectRoot options={fruits} placeholder="Select a fruit..." disabled>
        <SelectTrigger />
        <SelectContent>
          {fruits.map(fruit => (
            <SelectItem key={fruit.value} value={fruit.value}>
              {fruit.label}
            </SelectItem>
          ))}
        </SelectContent>
      </SelectRoot>
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="w-[200px]">
        <p className="mb-2 text-sm font-medium">Small</p>
        <SelectRoot options={fruits} placeholder="Small select">
          <SelectTrigger size="sm" />
          <SelectContent>
            {fruits.map(fruit => (
              <SelectItem key={fruit.value} value={fruit.value}>
                {fruit.label}
              </SelectItem>
            ))}
          </SelectContent>
        </SelectRoot>
      </div>
      <div className="w-[200px]">
        <p className="mb-2 text-sm font-medium">Default</p>
        <SelectRoot options={fruits} placeholder="Default select">
          <SelectTrigger />
          <SelectContent>
            {fruits.map(fruit => (
              <SelectItem key={fruit.value} value={fruit.value}>
                {fruit.label}
              </SelectItem>
            ))}
          </SelectContent>
        </SelectRoot>
      </div>
      <div className="w-[200px]">
        <p className="mb-2 text-sm font-medium">Large</p>
        <SelectRoot options={fruits} placeholder="Large select">
          <SelectTrigger size="lg" />
          <SelectContent>
            {fruits.map(fruit => (
              <SelectItem key={fruit.value} value={fruit.value}>
                {fruit.label}
              </SelectItem>
            ))}
          </SelectContent>
        </SelectRoot>
      </div>
    </div>
  ),
}

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState<string | null>(null)

    return (
      <div className="space-y-4">
        <div className="w-[200px]">
          <SelectRoot
            options={fruits}
            placeholder="Select a fruit..."
            value={value}
            onValueChange={setValue}
          >
            <SelectTrigger />
            <SelectContent>
              {fruits.map(fruit => (
                <SelectItem key={fruit.value} value={fruit.value}>
                  {fruit.label}
                </SelectItem>
              ))}
            </SelectContent>
          </SelectRoot>
        </div>
        <p className="text-sm text-gray-600">
          Selected value: {value || 'None'}
        </p>
        <button
          onClick={() => setValue(null)}
          className="rounded bg-gray-200 px-3 py-1 text-sm hover:bg-gray-300"
        >
          Clear Selection
        </button>
      </div>
    )
  },
}
