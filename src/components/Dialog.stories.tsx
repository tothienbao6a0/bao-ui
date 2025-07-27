import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Dialog, DialogBackdrop, DialogPopup, DialogTitle, DialogClose } from './Dialog'
import { Button } from './Button'

const meta: Meta<typeof Dialog> = {
  title: 'Components/Dialog',
  component: Dialog,
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
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogBackdrop />
        <DialogPopup>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogClose onClick={() => setOpen(false)}>×</DialogClose>
          <p className="mt-4 text-sm text-foreground-muted">
            This is a dialog example with a backdrop and popup content.
          </p>
          <div className="mt-4 flex gap-2">
            <Button onClick={() => setOpen(false)}>Close</Button>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </div>
        </DialogPopup>
      </Dialog>
    </>
  )
}

export const Default: Story = {
  render: () => <DialogExample />,
}