import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import {
  Badge,
  StatusBadge,
  NotificationBadge,
  InteractiveBadge,
} from '@bao-ui/react'

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Badge',
  },
}

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="ghost">Ghost</Badge>
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <div className="text-center">
        <div className="mb-2">
          <Badge size="sm">Small</Badge>
        </div>
        <p className="text-xs text-muted-foreground">Small</p>
      </div>
      <div className="text-center">
        <div className="mb-2">
          <Badge size="default">Default</Badge>
        </div>
        <p className="text-xs text-muted-foreground">Default</p>
      </div>
      <div className="text-center">
        <div className="mb-2">
          <Badge size="lg">Large</Badge>
        </div>
        <p className="text-xs text-muted-foreground">Large</p>
      </div>
    </div>
  ),
}

export const StatusBadges: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="mb-3 text-sm font-medium">Without dot indicator</h3>
        <div className="flex flex-wrap gap-2">
          <StatusBadge status="success">Active</StatusBadge>
          <StatusBadge status="warning">Pending</StatusBadge>
          <StatusBadge status="destructive">Error</StatusBadge>
        </div>
      </div>
      <div>
        <h3 className="mb-3 text-sm font-medium">With dot indicator</h3>
        <div className="flex flex-wrap gap-2">
          <StatusBadge status="success" showDot>
            Online
          </StatusBadge>
          <StatusBadge status="warning" showDot>
            Away
          </StatusBadge>
          <StatusBadge status="destructive" showDot>
            Offline
          </StatusBadge>
        </div>
      </div>
    </div>
  ),
}

export const NotificationBadges: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <div className="relative">
        <div className="h-8 w-8 rounded bg-muted"></div>
        <NotificationBadge count={3} className="absolute -right-1 -top-1" />
      </div>
      <div className="relative">
        <div className="h-8 w-8 rounded bg-muted"></div>
        <NotificationBadge
          count={150}
          max={99}
          className="absolute -right-1 -top-1"
        />
      </div>
      <div className="relative">
        <div className="h-8 w-8 rounded bg-muted"></div>
        <NotificationBadge
          count={0}
          showZero
          className="absolute -right-1 -top-1"
        />
      </div>
    </div>
  ),
}

export const InteractiveBadges: Story = {
  render: () => {
    const [tags, setTags] = useState(['React', 'TypeScript', 'CSS'])

    const removeTag = (tagToRemove: string) => {
      setTags(tags.filter(tag => tag !== tagToRemove))
    }

    return (
      <div className="flex flex-wrap gap-2">
        {tags.map(tag => (
          <InteractiveBadge
            key={tag}
            variant="secondary"
            removable
            onRemove={() => removeTag(tag)}
          >
            {tag}
          </InteractiveBadge>
        ))}
      </div>
    )
  },
}

export const UseCases: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="mb-3 text-sm font-medium">E-commerce Product Tags</h3>
        <div className="flex flex-wrap gap-2">
          <Badge variant="success">Free Shipping</Badge>
          <Badge variant="warning">Limited Stock</Badge>
          <Badge variant="outline">New Arrival</Badge>
          <Badge variant="secondary">Best Seller</Badge>
        </div>
      </div>
      <div>
        <h3 className="mb-3 text-sm font-medium">Status Indicators</h3>
        <div className="flex flex-wrap gap-2">
          <StatusBadge status="success" showDot>
            Online
          </StatusBadge>
          <StatusBadge status="warning" showDot>
            Away
          </StatusBadge>
          <StatusBadge status="destructive" showDot>
            Offline
          </StatusBadge>
        </div>
      </div>
    </div>
  ),
}
