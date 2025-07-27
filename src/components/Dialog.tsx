import { forwardRef } from 'react'
import {
  Dialog as BaseDialog,
  DialogBackdrop as BaseDialogBackdrop,
  DialogPopup as BaseDialogPopup,
  DialogTitle as BaseDialogTitle,
  DialogClose as BaseDialogClose,
} from '@mui/base/Dialog'
import { clsx } from 'clsx'

export interface DialogProps extends React.ComponentProps<typeof BaseDialog> {
  children: React.ReactNode
}

export const Dialog = forwardRef<HTMLDivElement, DialogProps>(
  ({ children, ...props }, ref) => {
    return (
      <BaseDialog ref={ref} {...props}>
        {children}
      </BaseDialog>
    )
  }
)

Dialog.displayName = 'Dialog'

export interface DialogBackdropProps extends React.ComponentProps<typeof BaseDialogBackdrop> {
  className?: string
}

export const DialogBackdrop = forwardRef<HTMLDivElement, DialogBackdropProps>(
  ({ className, ...props }, ref) => {
    return (
      <BaseDialogBackdrop
        ref={ref}
        className={clsx(
          'fixed inset-0 z-50 bg-black/50 backdrop-blur-sm',
          'data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out',
          '@media (prefers-reduced-motion: reduce) { animation: none }',
          className
        )}
        {...props}
      />
    )
  }
)

DialogBackdrop.displayName = 'DialogBackdrop'

export interface DialogPopupProps extends React.ComponentProps<typeof BaseDialogPopup> {
  className?: string
}

export const DialogPopup = forwardRef<HTMLDivElement, DialogPopupProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <BaseDialogPopup
        ref={ref}
        className={clsx(
          'fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2',
          'bg-background p-6 shadow-lg rounded-lg border border-border',
          'data-[state=open]:animate-scale-in data-[state=closed]:animate-scale-out',
          '@media (prefers-reduced-motion: reduce) { animation: none }',
          className
        )}
        {...props}
      >
        {children}
      </BaseDialogPopup>
    )
  }
)

DialogPopup.displayName = 'DialogPopup'

export interface DialogTitleProps extends React.ComponentProps<typeof BaseDialogTitle> {
  className?: string
}

export const DialogTitle = forwardRef<HTMLHeadingElement, DialogTitleProps>(
  ({ className, ...props }, ref) => {
    return (
      <BaseDialogTitle
        ref={ref}
        className={clsx('text-lg font-semibold leading-none tracking-tight', className)}
        {...props}
      />
    )
  }
)

DialogTitle.displayName = 'DialogTitle'

export interface DialogCloseProps extends React.ComponentProps<typeof BaseDialogClose> {
  className?: string
}

export const DialogClose = forwardRef<HTMLButtonElement, DialogCloseProps>(
  ({ className, ...props }, ref) => {
    return (
      <BaseDialogClose
        ref={ref}
        className={clsx(
          'absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100',
          'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
          'disabled:pointer-events-none',
          className
        )}
        {...props}
      />
    )
  }
)

DialogClose.displayName = 'DialogClose'