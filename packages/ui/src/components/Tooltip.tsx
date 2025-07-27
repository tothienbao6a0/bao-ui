import { forwardRef } from 'react'
import { Tooltip } from '@base-ui-components/react/tooltip'
import { clsx } from 'clsx'
import DOMPurify from 'dompurify'

export interface TooltipRootProps
  extends React.ComponentProps<typeof Tooltip.Root> {
  children: React.ReactNode
}

export const TooltipRoot = forwardRef<HTMLDivElement, TooltipRootProps>(
  ({ children, ...props }, _ref) => {
    return <Tooltip.Root {...props}>{children}</Tooltip.Root>
  }
)

TooltipRoot.displayName = 'TooltipRoot'

export interface TooltipTriggerProps
  extends React.ComponentProps<typeof Tooltip.Trigger> {
  className?: string
  children?: React.ReactNode
}

export const TooltipTrigger = forwardRef<HTMLElement, TooltipTriggerProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <Tooltip.Trigger
        ref={ref as React.Ref<HTMLElement>}
        className={clsx(className)}
        {...props}
      >
        {children}
      </Tooltip.Trigger>
    )
  }
)

TooltipTrigger.displayName = 'TooltipTrigger'

export interface TooltipPopupProps
  extends React.ComponentProps<typeof Tooltip.Popup> {
  className?: string
  content?: string
  children?: React.ReactNode
}

export const TooltipPopup = forwardRef<HTMLDivElement, TooltipPopupProps>(
  ({ className, content, children, ...props }, ref) => {
    const sanitizedContent = content ? DOMPurify.sanitize(content) : undefined

    return (
      <Tooltip.Portal>
        <Tooltip.Positioner>
          <Tooltip.Popup
            ref={ref}
            className={clsx(
              'z-50 overflow-hidden rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs text-slate-950 shadow-lg',
              className
            )}
            {...props}
          >
            {sanitizedContent ? (
              <span dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
            ) : (
              children
            )}
          </Tooltip.Popup>
        </Tooltip.Positioner>
      </Tooltip.Portal>
    )
  }
)

TooltipPopup.displayName = 'TooltipPopup'

export interface TooltipArrowProps
  extends React.ComponentProps<typeof Tooltip.Arrow> {
  className?: string
}

export const TooltipArrow = forwardRef<HTMLDivElement, TooltipArrowProps>(
  ({ className, ...props }, _ref) => {
    return (
      <Tooltip.Arrow className={clsx('fill-primary', className)} {...props} />
    )
  }
)

TooltipArrow.displayName = 'TooltipArrow'

// Legacy exports for backwards compatibility
export { TooltipRoot as Tooltip }
