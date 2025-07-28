import { RadioGroup, RadioGroupItem } from '@bao-ui/react'

export default function RadioDemo() {
  return (
    <RadioGroup defaultValue="comfortable">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="default" />
        <label className="text-sm font-medium">Default</label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="comfortable" />
        <label className="text-sm font-medium">Comfortable</label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="compact" />
        <label className="text-sm font-medium">Compact</label>
      </div>
    </RadioGroup>
  )
}
