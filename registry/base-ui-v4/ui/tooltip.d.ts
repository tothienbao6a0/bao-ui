import * as React from 'react'
import { Tooltip } from '@base-ui-components/react/tooltip'
declare const TooltipProvider: React.FC<Tooltip.Provider.Props>
declare const TooltipRoot: typeof Tooltip.Root
declare const TooltipTrigger: React.ForwardRefExoticComponent<
  Tooltip.Trigger.Props & React.RefAttributes<HTMLElement>
>
declare const TooltipContent: React.ForwardRefExoticComponent<
  Omit<Tooltip.Popup.Props & React.RefAttributes<HTMLDivElement>, 'ref'> &
    React.RefAttributes<HTMLDivElement>
>
export {
  TooltipProvider,
  TooltipRoot as Tooltip,
  TooltipTrigger,
  TooltipContent,
}
//# sourceMappingURL=tooltip.d.ts.map
