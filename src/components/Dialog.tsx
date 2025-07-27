import { forwardRef } from 'react'
import { Dialog } from '@base-ui-components/react/dialog'
import { clsx } from 'clsx'

export interface DialogRootProps
  extends React.ComponentProps<typeof Dialog.Root> {
  children: React.ReactNode
}

export const DialogRoot = forwardRef<HTMLDivElement, DialogRootProps>(
  ({ children, ...props }, _ref) => {
    return <Dialog.Root {...props}>{children}</Dialog.Root>
  }
)

DialogRoot.displayName = 'DialogRoot'

export interface DialogBackdropProps
  extends React.ComponentProps<typeof Dialog.Backdrop> {
  className?: string
}

export const DialogBackdrop = forwardRef<HTMLDivElement, DialogBackdropProps>(
  ({ className, ...props }, ref) => {
    return (
      <Dialog.Portal>
        <Dialog.Backdrop
          ref={ref}
          className={clsx(
            'fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out',
            'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
            className
          )}
          {...props}
        />
      </Dialog.Portal>
    )
  }
)

DialogBackdrop.displayName = 'DialogBackdrop'

export interface DialogPopupProps
  extends React.ComponentProps<typeof Dialog.Popup> {
  className?: string
  children?: React.ReactNode
}

export const DialogPopup = forwardRef<HTMLDivElement, DialogPopupProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <Dialog.Portal>
        <Dialog.Popup
          ref={ref}
          className={clsx(
            'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4',
            'border border-border bg-background p-6 shadow-lg duration-200 rounded-lg',
            className
          )}
          {...props}
        >
          {children}
        </Dialog.Popup>
      </Dialog.Portal>
    )
  }
)

DialogPopup.displayName = 'DialogPopup'

export interface DialogTitleProps
  extends React.ComponentProps<typeof Dialog.Title> {
  className?: string
}

export const DialogTitle = forwardRef<HTMLHeadingElement, DialogTitleProps>(
  ({ className, ...props }, ref) => {
    return (
      <Dialog.Title
        ref={ref}
        className={clsx(
          'text-lg font-semibold leading-none tracking-tight text-foreground',
          className
        )}
        {...props}
      />
    )
  }
)

DialogTitle.displayName = 'DialogTitle'

export interface DialogCloseProps
  extends React.ComponentProps<typeof Dialog.Close> {
  className?: string
}

export const DialogClose = forwardRef<HTMLButtonElement, DialogCloseProps>(
  ({ className, ...props }, ref) => {
    return (
      <Dialog.Close
        ref={ref}
        className={clsx(
          'absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100',
          'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
          'disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground',
          className
        )}
        {...props}
      />
    )
  }
)

DialogClose.displayName = 'DialogClose'

// Legacy export for backwards compatibility
export { DialogRoot as Dialog }
