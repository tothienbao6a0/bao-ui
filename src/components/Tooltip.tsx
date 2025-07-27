import { forwardRef } from 'react'
import {
  Tooltip as BaseTooltip,
  TooltipTrigger as BaseTooltipTrigger,
  TooltipPopup as BaseTooltipPopup,
  TooltipArrow as BaseTooltipArrow,
} from '@mui/base/Tooltip'
import { clsx } from 'clsx'
import DOMPurify from 'dompurify'

export interface TooltipProps extends React.ComponentProps<typeof BaseTooltip> {
  children: React.ReactNode
}

export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  ({ children, ...props }, ref) => {
    return (
      <BaseTooltip ref={ref} {...props}>
        {children}
      </BaseTooltip>
    )
  }
)

Tooltip.displayName = 'Tooltip'

export interface TooltipTriggerProps extends React.ComponentProps<typeof BaseTooltipTrigger> {
  className?: string
}

export const TooltipTrigger = forwardRef<HTMLElement, TooltipTriggerProps>(
  ({ className, ...props }, ref) => {
    return (
      <BaseTooltipTrigger
        ref={ref as React.Ref<HTMLElement>}
        className={clsx(className)}
        {...props}
      />
    )
  }
)

TooltipTrigger.displayName = 'TooltipTrigger'

export interface TooltipPopupProps extends React.ComponentProps<typeof BaseTooltipPopup> {
  className?: string
  content?: string
}

export const TooltipPopup = forwardRef<HTMLDivElement, TooltipPopupProps>(
  ({ className, content, children, ...props }, ref) => {
    const sanitizedContent = content ? DOMPurify.sanitize(content) : undefined

    return (
      <BaseTooltipPopup
        ref={ref}
        className={clsx(
          'z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground',
          'animate-slide-in data-[state=closed]:animate-slide-out',
          '@media (prefers-reduced-motion: reduce) { animation: none }',
          className
        )}
        side="top"
        sideOffset={8}
        {...props}
      >
        {sanitizedContent ? (
          <span dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
        ) : (
          children
        )}
        <TooltipArrow className="fill-primary" />
      </BaseTooltipPopup>
    )
  }
)

TooltipPopup.displayName = 'TooltipPopup'

export interface TooltipArrowProps extends React.ComponentProps<typeof BaseTooltipArrow> {
  className?: string
}

export const TooltipArrow = forwardRef<SVGSVGElement, TooltipArrowProps>(
  ({ className, ...props }, ref) => {
    return (
      <BaseTooltipArrow
        ref={ref}
        className={clsx('fill-primary', className)}
        {...props}
      />
    )
  }
)

TooltipArrow.displayName = 'TooltipArrow'