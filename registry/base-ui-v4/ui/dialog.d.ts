import * as React from 'react'
import { Dialog as BaseDialog } from '@base-ui-components/react/dialog'
declare const Dialog: React.FC<BaseDialog.Root.Props>
declare const DialogTrigger: React.ForwardRefExoticComponent<
  BaseDialog.Trigger.Props & React.RefAttributes<HTMLButtonElement>
>
declare const DialogPortal: typeof BaseDialog.Portal
declare const DialogClose: React.ForwardRefExoticComponent<
  BaseDialog.Close.Props & React.RefAttributes<HTMLButtonElement>
>
declare const DialogOverlay: React.ForwardRefExoticComponent<
  Omit<BaseDialog.Backdrop.Props & React.RefAttributes<HTMLDivElement>, 'ref'> &
    React.RefAttributes<HTMLDivElement>
>
declare const DialogContent: React.ForwardRefExoticComponent<
  Omit<BaseDialog.Popup.Props & React.RefAttributes<HTMLDivElement>, 'ref'> &
    React.RefAttributes<HTMLDivElement>
>
declare const DialogHeader: {
  ({
    className,
    ...props
  }: React.HTMLAttributes<HTMLDivElement>): import('react/jsx-runtime').JSX.Element
  displayName: string
}
declare const DialogFooter: {
  ({
    className,
    ...props
  }: React.HTMLAttributes<HTMLDivElement>): import('react/jsx-runtime').JSX.Element
  displayName: string
}
declare const DialogTitle: React.ForwardRefExoticComponent<
  Omit<
    BaseDialog.Title.Props & React.RefAttributes<HTMLParagraphElement>,
    'ref'
  > &
    React.RefAttributes<HTMLParagraphElement>
>
declare const DialogDescription: React.ForwardRefExoticComponent<
  Omit<
    BaseDialog.Description.Props & React.RefAttributes<HTMLParagraphElement>,
    'ref'
  > &
    React.RefAttributes<HTMLParagraphElement>
>
export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
}
//# sourceMappingURL=dialog.d.ts.map
