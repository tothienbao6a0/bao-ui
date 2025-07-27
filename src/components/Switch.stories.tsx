import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import {
  Switch,
  SwitchRoot,
  SwitchThumb,
  SwitchFieldRoot,
  SwitchLabel,
  SwitchDescription,
} from './Switch'

const meta: Meta<typeof Switch> = {
  title: 'Components/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A toggle switch component built on Base UI primitives with proper field integration and accessibility.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      description: 'Label text for the switch',
      control: 'text',
    },
    description: {
      description: 'Helper text below the switch',
      control: 'text',
    },
    size: {
      description: 'Size of the switch',
      control: 'select',
      options: ['sm', 'default', 'lg'],
    },
    disabled: {
      description: 'Whether the switch is disabled',
      control: 'boolean',
    },
    defaultChecked: {
      description: 'Whether the switch is checked by default',
      control: 'boolean',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Enable notifications',
  },
}

export const WithDescription: Story = {
  args: {
    label: 'Marketing emails',
    description: 'Receive emails about new products and features.',
  },
}

export const Checked: Story = {
  args: {
    label: 'Auto-save',
    description: 'Automatically save your work every 5 minutes.',
    defaultChecked: true,
  },
}

export const Disabled: Story = {
  args: {
    label: 'Disabled switch',
    description: 'This switch cannot be toggled.',
    disabled: true,
  },
}

export const DisabledChecked: Story = {
  args: {
    label: 'Read-only setting',
    description: 'This setting is managed by your administrator.',
    disabled: true,
    defaultChecked: true,
  },
}

export const Sizes: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="mb-3 text-sm font-medium">Small</h3>
        <div className="space-y-3">
          <Switch size="sm" label="Small switch" />
          <Switch
            size="sm"
            label="With description"
            description="This is a small switch."
          />
        </div>
      </div>
      <div>
        <h3 className="mb-3 text-sm font-medium">Default</h3>
        <div className="space-y-3">
          <Switch label="Default switch" />
          <Switch
            label="With description"
            description="This is a default sized switch."
          />
        </div>
      </div>
      <div>
        <h3 className="mb-3 text-sm font-medium">Large</h3>
        <div className="space-y-3">
          <Switch size="lg" label="Large switch" />
          <Switch
            size="lg"
            label="With description"
            description="This is a large switch."
          />
        </div>
      </div>
    </div>
  ),
}

export const WithoutLabel: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <Switch size="sm" />
        <Switch />
        <Switch size="lg" />
      </div>
      <p className="text-sm text-muted-foreground">
        Switches can be used without labels for inline controls.
      </p>
    </div>
  ),
}

export const SettingsPanel: Story = {
  render: () => {
    const [settings, setSettings] = useState({
      notifications: true,
      marketing: false,
      analytics: true,
      autoSave: false,
      darkMode: true,
    })

    const handleToggle = (key: keyof typeof settings) => (checked: boolean) => {
      setSettings(prev => ({ ...prev, [key]: checked }))
    }

    return (
      <div className="w-80 space-y-6">
        <h2 className="text-lg font-semibold">Settings</h2>

        <div className="space-y-4">
          <Switch
            label="Push notifications"
            description="Receive push notifications on your device."
            checked={settings.notifications}
            onCheckedChange={handleToggle('notifications')}
          />

          <Switch
            label="Marketing emails"
            description="Receive emails about new products and features."
            checked={settings.marketing}
            onCheckedChange={handleToggle('marketing')}
          />

          <Switch
            label="Analytics"
            description="Help us improve by sharing anonymous usage data."
            checked={settings.analytics}
            onCheckedChange={handleToggle('analytics')}
          />

          <Switch
            label="Auto-save"
            description="Automatically save your work every 5 minutes."
            checked={settings.autoSave}
            onCheckedChange={handleToggle('autoSave')}
          />

          <Switch
            label="Dark mode"
            description="Use dark theme across the application."
            checked={settings.darkMode}
            onCheckedChange={handleToggle('darkMode')}
          />
        </div>

        <div className="rounded-lg bg-muted p-4">
          <h3 className="font-medium">Current Settings:</h3>
          <pre className="mt-2 text-xs">
            {JSON.stringify(settings, null, 2)}
          </pre>
        </div>
      </div>
    )
  },
}

export const Controlled: Story = {
  render: () => {
    const [checked, setChecked] = useState(false)

    return (
      <div className="space-y-4">
        <Switch
          label="Controlled switch"
          description="This switch is controlled by external state."
          checked={checked}
          onCheckedChange={setChecked}
        />
        <div className="text-sm text-muted-foreground">
          Current state: {checked ? 'On' : 'Off'}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setChecked(true)}
            className="rounded bg-primary px-3 py-1 text-sm text-primary-foreground hover:bg-primary/90"
          >
            Turn On
          </button>
          <button
            onClick={() => setChecked(false)}
            className="rounded bg-secondary px-3 py-1 text-sm text-secondary-foreground hover:bg-secondary/80"
          >
            Turn Off
          </button>
        </div>
      </div>
    )
  },
}

export const CustomComposition: Story = {
  render: () => (
    <div className="space-y-6">
      <SwitchFieldRoot>
        <div className="flex items-center justify-between">
          <div>
            <SwitchLabel>Custom layout switch</SwitchLabel>
            <SwitchDescription>
              This uses individual components for maximum flexibility.
            </SwitchDescription>
          </div>
          <SwitchRoot defaultChecked>
            <SwitchThumb />
          </SwitchRoot>
        </div>
      </SwitchFieldRoot>

      <SwitchFieldRoot>
        <div className="flex items-center justify-between rounded-lg border border-border p-4">
          <div className="flex-1">
            <SwitchLabel className="text-base">Premium Features</SwitchLabel>
            <SwitchDescription>
              Enable advanced features and unlimited usage.
            </SwitchDescription>
          </div>
          <div className="ml-4">
            <SwitchRoot size="lg">
              <SwitchThumb size="lg" />
            </SwitchRoot>
          </div>
        </div>
      </SwitchFieldRoot>
    </div>
  ),
}

export const FormIntegration: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      newsletter: false,
      twoFactor: true,
      publicProfile: false,
      emailNotifications: true,
    })

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      alert(`Form submitted: ${JSON.stringify(formData, null, 2)}`)
    }

    const handleFieldChange =
      (field: keyof typeof formData) => (checked: boolean) => {
        setFormData(prev => ({ ...prev, [field]: checked }))
      }

    return (
      <form onSubmit={handleSubmit} className="w-80 space-y-6">
        <h2 className="text-lg font-semibold">Account Settings</h2>

        <div className="space-y-4">
          <Switch
            label="Newsletter subscription"
            description="Receive our weekly newsletter."
            checked={formData.newsletter}
            onCheckedChange={handleFieldChange('newsletter')}
          />

          <Switch
            label="Two-factor authentication"
            description="Add an extra layer of security to your account."
            checked={formData.twoFactor}
            onCheckedChange={handleFieldChange('twoFactor')}
          />

          <Switch
            label="Public profile"
            description="Make your profile visible to other users."
            checked={formData.publicProfile}
            onCheckedChange={handleFieldChange('publicProfile')}
          />

          <Switch
            label="Email notifications"
            description="Receive notifications about account activity."
            checked={formData.emailNotifications}
            onCheckedChange={handleFieldChange('emailNotifications')}
          />
        </div>

        <button
          type="submit"
          className="w-full rounded bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
        >
          Save Settings
        </button>
      </form>
    )
  },
}
