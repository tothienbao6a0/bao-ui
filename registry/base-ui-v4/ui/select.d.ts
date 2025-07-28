import * as React from 'react'
import { Select } from '@base-ui-components/react/select'
declare const SelectRoot: Select.Root
declare const SelectTrigger: React.ForwardRefExoticComponent<
  Omit<Select.Trigger.Props & React.RefAttributes<HTMLElement>, 'ref'> &
    React.RefAttributes<HTMLElement>
>
declare const SelectValue: React.ForwardRefExoticComponent<
  Omit<Select.Value.Props & React.RefAttributes<HTMLSpanElement>, 'ref'> &
    React.RefAttributes<HTMLSpanElement>
>
declare const SelectContent: React.ForwardRefExoticComponent<
  Omit<Select.Popup.Props & React.RefAttributes<Element>, 'ref'> &
    React.RefAttributes<Element>
>
declare const SelectItem: React.ForwardRefExoticComponent<
  Omit<Select.Item.Props & React.RefAttributes<HTMLDivElement>, 'ref'> &
    React.RefAttributes<HTMLDivElement>
>
export {
  SelectRoot as Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
}
//# sourceMappingURL=select.d.ts.map
