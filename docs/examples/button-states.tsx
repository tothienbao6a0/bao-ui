import { Button } from '@bao-ui/react'

export default function ButtonStates() {
  return (
    <div className="flex flex-wrap gap-2">
      <Button>Default</Button>
      <Button disabled>Disabled</Button>
    </div>
  )
}
