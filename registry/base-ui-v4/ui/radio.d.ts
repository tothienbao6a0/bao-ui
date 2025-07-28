import * as React from 'react'
import { RadioGroup as BaseRadioGroup } from '@base-ui-components/react/radio-group'
import { Radio } from '@base-ui-components/react/radio'
declare const RadioGroup: React.ForwardRefExoticComponent<
  Omit<BaseRadioGroup.Props & React.RefAttributes<HTMLDivElement>, 'ref'> &
    React.RefAttributes<HTMLDivElement>
>
declare const RadioGroupItem: React.ForwardRefExoticComponent<
  Omit<Radio.Root.Props & React.RefAttributes<HTMLButtonElement>, 'ref'> &
    React.RefAttributes<HTMLButtonElement>
>
export { RadioGroup, RadioGroupItem }
//# sourceMappingURL=radio.d.ts.map
