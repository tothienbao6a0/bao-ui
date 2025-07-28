import * as React from 'react'
import { Tooltip } from '@base-ui-components/react/tooltip'
import { cn } from '../lib/utils'

const TooltipProvider = Tooltip.Provider

const TooltipRoot = Tooltip.Root

const TooltipTrigger = Tooltip.Trigger

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof Tooltip.Popup>,
  React.ComponentPropsWithoutRef<typeof Tooltip.Popup>
>(({ className, ...props }, ref) => (
  <Tooltip.Popup
    ref={ref}
    className={cn(
      'z-50 rounded-md bg-slate-900 px-3 py-1.5 text-xs text-slate-50 animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 dark:bg-slate-50 dark:text-slate-900',
      className
    )}
    {...props}
  />
))
TooltipContent.displayName = 'TooltipContent'

export {
  TooltipProvider,
  TooltipRoot as Tooltip,
  TooltipTrigger,
  TooltipContent,
}
