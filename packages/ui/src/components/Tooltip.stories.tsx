import type { Meta, StoryObj } from '@storybook/react'
import { TooltipRoot, TooltipTrigger, TooltipPopup } from './Tooltip'
import { Button } from './Button'

const meta: Meta<typeof TooltipRoot> = {
  title: 'Components/Tooltip',
  component: TooltipRoot,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <TooltipRoot>
      <TooltipTrigger>
        <Button>Hover me</Button>
      </TooltipTrigger>
      <TooltipPopup content="This is a tooltip" />
    </TooltipRoot>
  ),
}

export const WithCustomContent: Story = {
  render: () => (
    <TooltipRoot>
      <TooltipTrigger>
        <Button variant="outline">Custom tooltip</Button>
      </TooltipTrigger>
      <TooltipPopup>
        <div className="font-semibold">Custom Content</div>
        <div className="text-xs">With multiple lines</div>
      </TooltipPopup>
    </TooltipRoot>
  ),
}

export const SanitizedContent: Story = {
  render: () => (
    <TooltipRoot>
      <TooltipTrigger>
        <Button variant="ghost">Sanitized HTML</Button>
      </TooltipTrigger>
      <TooltipPopup content="<strong>Bold text</strong> and <script>alert('xss')</script> script" />
    </TooltipRoot>
  ),
}