import type { Meta, StoryObj } from '@storybook/react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../../../../registry/base-ui-v4/ui/tooltip'
import { Button } from '../../../../registry/base-ui-v4/ui/button'

const meta: Meta<typeof Tooltip> = {
  title: 'Registry/Tooltip',
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
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Hover me</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Add to library</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
}

export const WithDelay: Story = {
  render: () => (
    <TooltipProvider delayDuration={800}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Hover with delay</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>This tooltip has a longer delay</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
}
