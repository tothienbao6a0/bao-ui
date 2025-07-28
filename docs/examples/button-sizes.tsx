import { Button } from '../../packages/ui/src/components/Button'

export default function ButtonSizes() {
  return (
    <div className="flex items-center gap-2">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
      <Button size="icon">🎉</Button>
    </div>
  )
}
