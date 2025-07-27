import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import {
  Badge,
  StatusBadge,
  NotificationBadge,
  InteractiveBadge,
} from './Badge'

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A versatile badge component for labels, status indicators, and notifications with dark mode support.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      description: 'Visual variant of the badge',
      control: 'select',
      options: [
        'default',
        'secondary',
        'destructive',
        'success',
        'warning',
        'outline',
        'ghost',
      ],
    },
    size: {
      description: 'Size of the badge',
      control: 'select',
      options: ['sm', 'default', 'lg'],
    },
    children: {
      description: 'Content of the badge',
      control: 'text',
    },
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
        <h3 className="mb-2 text-sm font-medium">Without Dot</h3>
        <div className="flex flex-wrap gap-2">
          <StatusBadge status="success">Active</StatusBadge>
          <StatusBadge status="warning">Pending</StatusBadge>
          <StatusBadge status="destructive">Error</StatusBadge>
          <StatusBadge status="default">Draft</StatusBadge>
          <StatusBadge status="secondary">Archived</StatusBadge>
        </div>
      </div>
      <div>
        <h3 className="mb-2 text-sm font-medium">With Dot Indicator</h3>
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
          <StatusBadge status="default" showDot>
            Idle
          </StatusBadge>
          <StatusBadge status="secondary" showDot>
            Unknown
          </StatusBadge>
        </div>
      </div>
    </div>
  ),
}

export const NotificationBadges: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="mb-2 text-sm font-medium">Count Badges</h3>
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="h-8 w-8 rounded bg-muted"></div>
            <NotificationBadge count={3} className="absolute -right-1 -top-1" />
          </div>
          <div className="relative">
            <div className="h-8 w-8 rounded bg-muted"></div>
            <NotificationBadge
              count={25}
              className="absolute -right-1 -top-1"
            />
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
      </div>
      <div>
        <h3 className="mb-2 text-sm font-medium">Standalone</h3>
        <div className="flex gap-2">
          <NotificationBadge count={1} />
          <NotificationBadge count={42} />
          <NotificationBadge count={999} max={99} />
        </div>
      </div>
    </div>
  ),
}

export const InteractiveBadges: Story = {
  render: () => {
    const [tags, setTags] = useState([
      'React',
      'TypeScript',
      'Tailwind CSS',
      'Storybook',
    ])

    const removeTag = (tagToRemove: string) => {
      setTags(tags.filter(tag => tag !== tagToRemove))
    }

    const addTag = () => {
      const newTag = `Tag ${tags.length + 1}`
      setTags([...tags, newTag])
    }

    return (
      <div className="space-y-4">
        <div>
          <h3 className="mb-2 text-sm font-medium">Removable Tags</h3>
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
          <button
            onClick={addTag}
            className="mt-2 rounded bg-primary px-3 py-1 text-sm text-primary-foreground hover:bg-primary/90"
          >
            Add Tag
          </button>
        </div>
        <div>
          <h3 className="mb-2 text-sm font-medium">Different Variants</h3>
          <div className="flex flex-wrap gap-2">
            <InteractiveBadge
              variant="default"
              removable
              onRemove={() => console.log('Removed default')}
            >
              Default
            </InteractiveBadge>
            <InteractiveBadge
              variant="secondary"
              removable
              onRemove={() => console.log('Removed secondary')}
            >
              Secondary
            </InteractiveBadge>
            <InteractiveBadge
              variant="outline"
              removable
              onRemove={() => console.log('Removed outline')}
            >
              Outline
            </InteractiveBadge>
          </div>
        </div>
      </div>
    )
  },
}

export const UseCases: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="mb-3 text-sm font-medium">User Profile</h3>
        <div className="flex items-center gap-3 rounded-lg border border-border p-4">
          <div className="h-10 w-10 rounded-full bg-muted"></div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="font-medium">John Doe</span>
              <StatusBadge status="success" showDot size="sm">
                Pro
              </StatusBadge>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>john.doe@example.com</span>
              <Badge variant="outline" size="sm">
                Admin
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-medium">Product Cards</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-border p-4">
            <div className="mb-2 flex items-start justify-between">
              <h4 className="font-medium">Premium Plan</h4>
              <Badge variant="success">Popular</Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              Everything you need for your growing business.
            </p>
            <div className="mt-3 flex gap-2">
              <Badge variant="outline" size="sm">
                14-day trial
              </Badge>
              <Badge variant="secondary" size="sm">
                No setup fee
              </Badge>
            </div>
          </div>
          <div className="rounded-lg border border-border p-4">
            <div className="mb-2 flex items-start justify-between">
              <h4 className="font-medium">Enterprise Plan</h4>
              <Badge variant="outline">Custom</Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              Advanced features for large organizations.
            </p>
            <div className="mt-3 flex gap-2">
              <Badge variant="outline" size="sm">
                Custom pricing
              </Badge>
              <Badge variant="secondary" size="sm">
                Priority support
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-medium">Navigation with Counts</h3>
        <nav className="space-y-1">
          <div className="flex items-center justify-between rounded px-3 py-2 hover:bg-accent">
            <span>Inbox</span>
            <NotificationBadge count={12} />
          </div>
          <div className="flex items-center justify-between rounded px-3 py-2 hover:bg-accent">
            <span>Drafts</span>
            <NotificationBadge count={3} />
          </div>
          <div className="flex items-center justify-between rounded px-3 py-2 hover:bg-accent">
            <span>Archive</span>
            <NotificationBadge count={0} />
          </div>
        </nav>
      </div>
    </div>
  ),
}

export const StatusIndicators: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="mb-3 text-sm font-medium">Server Status</h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between rounded border border-border px-3 py-2">
            <span className="font-medium">API Server</span>
            <StatusBadge status="success" showDot>
              Operational
            </StatusBadge>
          </div>
          <div className="flex items-center justify-between rounded border border-border px-3 py-2">
            <span className="font-medium">Database</span>
            <StatusBadge status="warning" showDot>
              Slow Response
            </StatusBadge>
          </div>
          <div className="flex items-center justify-between rounded border border-border px-3 py-2">
            <span className="font-medium">CDN</span>
            <StatusBadge status="destructive" showDot>
              Down
            </StatusBadge>
          </div>
        </div>
      </div>
    </div>
  ),
}

export const Playground: Story = {
  render: () => {
    const [variant, setVariant] = useState<
      | 'default'
      | 'secondary'
      | 'destructive'
      | 'success'
      | 'warning'
      | 'outline'
      | 'ghost'
    >('default')
    const [size, setSize] = useState<'sm' | 'default' | 'lg'>('default')
    const [text, setText] = useState('Custom Badge')

    return (
      <div className="space-y-6">
        <div className="flex justify-center">
          <Badge variant={variant} size={size}>
            {text}
          </Badge>
        </div>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="badge-text"
              className="mb-2 block text-sm font-medium"
            >
              Text
            </label>
            <input
              id="badge-text"
              type="text"
              value={text}
              onChange={e => setText(e.target.value)}
              className="w-full rounded border border-border px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="badge-variant"
              className="mb-2 block text-sm font-medium"
            >
              Variant
            </label>
            <select
              id="badge-variant"
              value={variant}
              onChange={e =>
                setVariant(
                  e.target.value as
                    | 'default'
                    | 'secondary'
                    | 'destructive'
                    | 'success'
                    | 'warning'
                    | 'outline'
                    | 'ghost'
                )
              }
              className="w-full rounded border border-border px-3 py-2 text-sm"
            >
              <option value="default">Default</option>
              <option value="secondary">Secondary</option>
              <option value="destructive">Destructive</option>
              <option value="success">Success</option>
              <option value="warning">Warning</option>
              <option value="outline">Outline</option>
              <option value="ghost">Ghost</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="badge-size"
              className="mb-2 block text-sm font-medium"
            >
              Size
            </label>
            <select
              id="badge-size"
              value={size}
              onChange={e => setSize(e.target.value as 'sm' | 'default' | 'lg')}
              className="w-full rounded border border-border px-3 py-2 text-sm"
            >
              <option value="sm">Small</option>
              <option value="default">Default</option>
              <option value="lg">Large</option>
            </select>
          </div>
        </div>
      </div>
    )
  },
}
