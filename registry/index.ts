import { type Registry } from './schema'
import { ui } from './registry-ui'

export const registry: Registry = {
  name: 'bao-ui',
  items: [...ui],
}

export default registry
export { ui }
export * from './schema'
