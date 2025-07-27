import type { Meta, StoryObj } from '@storybook/react'
import { Tooltip, TooltipTrigger, TooltipPopup } from './Tooltip'
import { Button } from './Button'

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger>
        <Button>Hover me</Button>
      </TooltipTrigger>
      <TooltipPopup content="This is a tooltip" />
    </Tooltip>
  ),
}

export const WithCustomContent: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger>
        <Button variant="outline">Custom tooltip</Button>
      </TooltipTrigger>
      <TooltipPopup>
        <div className="font-semibold">Custom Content</div>
        <div className="text-xs">With multiple lines</div>
      </TooltipPopup>
    </Tooltip>
  ),
}

export const SanitizedContent: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger>
        <Button variant="ghost">Sanitized HTML</Button>
      </TooltipTrigger>
      <TooltipPopup content="<strong>Bold text</strong> and <script>alert('xss')</script> script" />
    </Tooltip>
  ),
}