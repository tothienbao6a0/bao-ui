import { Checkbox } from '@bao-ui/react'

export default function CheckboxDemo() {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox />
      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        Accept terms and conditions
      </label>
    </div>
  )
}
