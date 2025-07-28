import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'
import { Badge } from './Badge'
import { Input } from './Input'
import { Checkbox } from './Checkbox'
import { RadioGroup, RadioGroupItem } from './Radio'
import { Switch } from './Switch'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './Select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './Dialog'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './Tooltip'

const meta: Meta = {
  title: 'Registry/Playground',
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const AllComponents: Story = {
  render: () => (
    <TooltipProvider>
      <div className="space-y-8 max-w-2xl">
        <section>
          <h2 className="text-lg font-semibold mb-4">Buttons</h2>
          <div className="flex flex-wrap gap-2">
            <Button>Default</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-4">Badges</h2>
          <div className="flex flex-wrap gap-2">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-4">Form Controls</h2>
          <div className="space-y-4">
            <Input placeholder="Enter your name..." />

            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <label htmlFor="terms" className="text-sm font-medium">
                Accept terms and conditions
              </label>
            </div>

            <RadioGroup defaultValue="option1">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="option1" id="option1" />
                <label htmlFor="option1" className="text-sm font-medium">
                  Option 1
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="option2" id="option2" />
                <label htmlFor="option2" className="text-sm font-medium">
                  Option 2
                </label>
              </div>
            </RadioGroup>

            <div className="flex items-center space-x-2">
              <Switch id="notifications" />
              <label htmlFor="notifications" className="text-sm font-medium">
                Enable notifications
              </label>
            </div>

            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue>
                  {(value: string | undefined) => value || 'Select option'}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="option1">Option 1</SelectItem>
                <SelectItem value="option2">Option 2</SelectItem>
                <SelectItem value="option3">Option 3</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-4">Dialog & Tooltip</h2>
          <div className="flex gap-4">
            <Dialog>
              <DialogTrigger>
                <Button>Open Dialog</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Example Dialog</DialogTitle>
                  <DialogDescription>
                    This is an example dialog using our registry components.
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>

            <Tooltip>
              <TooltipTrigger>
                <Button variant="outline">Hover for tooltip</Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>This is a tooltip</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </section>
      </div>
    </TooltipProvider>
  ),
}
