import { Badge } from '@bao-ui/react'

export default function BadgeVariants() {
  return (
    <div className="flex items-center space-x-2">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  )
}
