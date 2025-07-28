import { Switch } from '../../packages/ui/src/components/Switch'

export default function SwitchDemo() {
  return (
    <div className="flex items-center space-x-2">
      <Switch />
      <label className="text-sm font-medium">Airplane Mode</label>
    </div>
  )
}
