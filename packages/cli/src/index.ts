#!/usr/bin/env node

import { Command } from 'commander'
import { existsSync, mkdirSync, writeFileSync, readFileSync } from 'fs'
import { join, dirname } from 'path'
import chalk from 'chalk'

interface RegistryItem {
  name: string
  type: string
  description?: string
  dependencies?: string[]
  registryDependencies?: string[]
  files: Array<{
    path: string
    type: string
  }>
  baseUI?: {
    components: string[]
    version: string
  }
}

interface Registry {
  items: RegistryItem[]
}

const REGISTRY_URL = 'https://ui.bao-to.com/r'
const LOCAL_REGISTRY_PATH = '../../../registry/base-ui-v4'

async function fetchRegistry(): Promise<Registry> {
  try {
    // Always use hardcoded local registry for now (development mode)
    console.log(chalk.dim('Using local registry...'))
    // Return a hardcoded registry based on our structure
    return {
      items: [
        {
          name: 'button',
          type: 'registry:ui',
          description:
            'Displays a button or a component that looks like a button.',
          dependencies: ['@radix-ui/react-slot', 'class-variance-authority'],
          registryDependencies: ['utils'],
          files: [{ path: 'ui/button.tsx', type: 'registry:ui' }],
          baseUI: { components: [], version: '1.0.0-beta.1' },
        },
        {
          name: 'utils',
          type: 'registry:lib',
          description:
            'Utility functions for class merging and common operations.',
          dependencies: ['clsx', 'tailwind-merge'],
          files: [{ path: 'lib/utils.ts', type: 'registry:lib' }],
        },
        {
          name: 'badge',
          type: 'registry:ui',
          description:
            'Displays a badge or a component that looks like a badge.',
          dependencies: ['class-variance-authority'],
          registryDependencies: ['utils'],
          files: [{ path: 'ui/badge.tsx', type: 'registry:ui' }],
          baseUI: { components: [], version: '1.0.0-beta.1' },
        },
        {
          name: 'input',
          type: 'registry:ui',
          description: 'Displays an input field.',
          dependencies: ['@base-ui-components/react'],
          registryDependencies: ['utils'],
          files: [{ path: 'ui/input.tsx', type: 'registry:ui' }],
          baseUI: { components: ['input'], version: '1.0.0-beta.1' },
        },
        {
          name: 'checkbox',
          type: 'registry:ui',
          description:
            'A control that allows the user to toggle between checked and not checked.',
          dependencies: ['@base-ui-components/react', '@radix-ui/react-icons'],
          registryDependencies: ['utils'],
          files: [{ path: 'ui/checkbox.tsx', type: 'registry:ui' }],
          baseUI: { components: ['checkbox'], version: '1.0.0-beta.1' },
        },
        {
          name: 'radio-group',
          type: 'registry:ui',
          description:
            'A set of checkable buttons—known as radio buttons—where no more than one of the buttons can be checked at a time.',
          dependencies: ['@base-ui-components/react'],
          registryDependencies: ['utils'],
          files: [{ path: 'ui/radio.tsx', type: 'registry:ui' }],
          baseUI: {
            components: ['radio-group', 'radio'],
            version: '1.0.0-beta.1',
          },
        },
        {
          name: 'select',
          type: 'registry:ui',
          description:
            'Displays a list of options for the user to pick from—triggered by a button.',
          dependencies: ['@base-ui-components/react', '@radix-ui/react-icons'],
          registryDependencies: ['utils'],
          files: [{ path: 'ui/select.tsx', type: 'registry:ui' }],
          baseUI: { components: ['select'], version: '1.0.0-beta.1' },
        },
        {
          name: 'switch',
          type: 'registry:ui',
          description:
            'A control that allows the user to toggle between checked and not checked.',
          dependencies: ['@base-ui-components/react'],
          registryDependencies: ['utils'],
          files: [{ path: 'ui/switch.tsx', type: 'registry:ui' }],
          baseUI: { components: ['switch'], version: '1.0.0-beta.1' },
        },
        {
          name: 'dialog',
          type: 'registry:ui',
          description:
            'A window overlaid on either the primary window or another dialog window.',
          dependencies: ['@base-ui-components/react', '@radix-ui/react-icons'],
          registryDependencies: ['utils'],
          files: [{ path: 'ui/dialog.tsx', type: 'registry:ui' }],
          baseUI: { components: ['dialog'], version: '1.0.0-beta.1' },
        },
        {
          name: 'tooltip',
          type: 'registry:ui',
          description:
            'A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.',
          dependencies: ['@base-ui-components/react'],
          registryDependencies: ['utils'],
          files: [{ path: 'ui/tooltip.tsx', type: 'registry:ui' }],
          baseUI: { components: ['tooltip'], version: '1.0.0-beta.1' },
        },
      ],
    }
  } catch (error) {
    console.error(chalk.red('Failed to fetch registry:'), error)
    process.exit(1)
  }
}

async function fetchComponent(name: string): Promise<string> {
  try {
    // In development, read from local files
    const localPath = join(
      __dirname,
      LOCAL_REGISTRY_PATH,
      name.includes('/') ? name : `ui/${name}.tsx`
    )
    if (existsSync(localPath)) {
      return readFileSync(localPath, 'utf-8')
    }

    // In production, fetch from remote
    const response = await fetch(`${REGISTRY_URL}/${name}.json`)
    const data = (await response.json()) as { files: { content: string }[] }
    return data.files[0].content
  } catch (error) {
    console.error(chalk.red(`Failed to fetch component ${name}:`), error)
    process.exit(1)
  }
}

function ensureDirectoryExists(filePath: string) {
  const dir = dirname(filePath)
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true })
  }
}

function getComponentsPath(): string {
  // Check common component paths
  const possiblePaths = [
    'src/components',
    'components',
    'app/components',
    'lib/components',
  ]

  for (const path of possiblePaths) {
    if (existsSync(path)) {
      return path
    }
  }

  // Default to src/components
  return 'src/components'
}

function getLibPath(): string {
  // Check common lib paths
  const possiblePaths = ['src/lib', 'lib', 'src/utils', 'utils']

  for (const path of possiblePaths) {
    if (existsSync(path)) {
      return path
    }
  }

  // Default to src/lib
  return 'src/lib'
}

async function addComponents(
  componentNames: string[],
  options: { overwrite?: boolean } = {}
) {
  console.log(chalk.blue('🔍 Fetching registry...'))
  const registry = await fetchRegistry()

  // Resolve all dependencies
  const toInstall = new Set<string>()
  const visited = new Set<string>()

  function resolveDependencies(name: string) {
    if (visited.has(name)) return
    visited.add(name)

    const item = registry.items.find(i => i.name === name)
    if (!item) {
      console.error(chalk.red(`Component "${name}" not found in registry`))
      process.exit(1)
    }

    toInstall.add(name)

    // Add registry dependencies
    if (item.registryDependencies) {
      for (const dep of item.registryDependencies) {
        resolveDependencies(dep)
      }
    }
  }

  // Resolve dependencies for all requested components
  for (const name of componentNames) {
    resolveDependencies(name)
  }

  console.log(chalk.blue(`📦 Installing ${toInstall.size} component(s)...`))

  // Install components
  for (const name of toInstall) {
    const item = registry.items.find(i => i.name === name)
    if (!item) continue

    for (const file of item.files) {
      const content = await fetchComponent(file.path)

      let targetPath: string
      if (file.type === 'registry:lib') {
        targetPath = join(getLibPath(), file.path.replace('lib/', ''))
      } else {
        targetPath = join(getComponentsPath(), file.path.replace('ui/', ''))
      }

      // Check if file exists
      if (existsSync(targetPath) && !options.overwrite) {
        console.log(
          chalk.yellow(
            `⚠️  ${targetPath} already exists. Use --overwrite to replace.`
          )
        )
        continue
      }

      ensureDirectoryExists(targetPath)
      writeFileSync(targetPath, content)
      console.log(chalk.green(`✅ ${targetPath}`))
    }
  }

  // Collect all NPM dependencies
  const npmDependencies = new Set<string>()
  for (const name of toInstall) {
    const item = registry.items.find(i => i.name === name)
    if (item?.dependencies) {
      for (const dep of item.dependencies) {
        npmDependencies.add(dep)
      }
    }
  }

  if (npmDependencies.size > 0) {
    console.log(chalk.blue('\n📦 Install the following dependencies:'))
    console.log(
      chalk.dim('npm install ' + Array.from(npmDependencies).join(' '))
    )
    console.log(chalk.dim('# or'))
    console.log(chalk.dim('pnpm add ' + Array.from(npmDependencies).join(' ')))
    console.log(chalk.dim('# or'))
    console.log(chalk.dim('yarn add ' + Array.from(npmDependencies).join(' ')))
  }

  console.log(
    chalk.green(
      `\n🎉 Done! Added ${componentNames.join(', ')} to your project.`
    )
  )
}

async function listComponents() {
  console.log(chalk.blue('🔍 Fetching registry...'))
  const registry = await fetchRegistry()

  console.log(chalk.green('\n📋 Available components:\n'))

  for (const item of registry.items) {
    if (item.type === 'registry:ui') {
      console.log(
        chalk.blue(
          `${item.name.padEnd(15)} ${chalk.dim(item.description || '')}`
        )
      )
    }
  }

  console.log(chalk.dim('\nUsage: bao add <component-name>'))
  console.log(chalk.dim('Example: bao add button badge input'))
}

// CLI Setup
const program = new Command()

program
  .name('bao')
  .description('CLI for adding Bao UI components to your project')
  .version('2.0.0')

program
  .command('add')
  .description('Add components to your project')
  .argument('<components...>', 'component names to add')
  .option('--overwrite', 'overwrite existing files')
  .action(async (components: string[], options) => {
    await addComponents(components, options)
  })

program
  .command('list')
  .alias('ls')
  .description('List all available components')
  .action(async () => {
    await listComponents()
  })

program.parse()
