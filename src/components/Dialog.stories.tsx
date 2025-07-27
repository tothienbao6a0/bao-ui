import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import {
  DialogRoot,
  DialogBackdrop,
  DialogPopup,
  DialogTitle,
  DialogClose,
} from './Dialog'
import { Button } from './Button'

const meta: Meta<typeof DialogRoot> = {
  title: 'Components/Dialog',
  component: DialogRoot,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

const DialogExample = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Dialog</Button>
      <DialogRoot open={open} onOpenChange={setOpen}>
        <DialogBackdrop />
        <DialogPopup>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogClose onClick={() => setOpen(false)}>×</DialogClose>
          <p className="mt-4 text-sm text-slate-600">
            This is a dialog example with a backdrop and popup content.
          </p>
          <div className="mt-4 flex gap-2">
            <Button onClick={() => setOpen(false)}>Close</Button>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </div>
        </DialogPopup>
      </DialogRoot>
    </>
  )
}

export const Default: Story = {
  render: () => <DialogExample />,
}
