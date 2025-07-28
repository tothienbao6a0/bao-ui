# 10. CLI Architecture

## Overview

The shadcn CLI is a powerful command-line tool that intelligently installs components, resolves dependencies, and manages project configurations. It's built with Commander.js and provides commands for initialization, component installation, and project management.

## Architecture

```
CLI Architecture:
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   CLI Commands  │    │   Configuration │    │   Registry API  │
│   (add, init)   │───▶│   Management    │───▶│   Integration   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   File System  │    │   Dependency    │    │   Component     │
│   Operations    │    │   Resolution    │    │   Installation  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## Core Commands

### 1. Init Command

```typescript
// packages/shadcn/src/commands/init.ts
export const init = new Command()
  .name('init')
  .description('initialize your project and install dependencies')
  .option('-y, --yes', 'skip confirmation prompt.', false)
  .option('-d, --defaults,', 'use default configuration.', false)
  .option('-c, --cwd <cwd>', 'the working directory.', process.cwd())
  .option('--src-dir', 'use the src directory when creating a project.', false)
  .action(async opts => {
    try {
      const options = initOptionsSchema.parse({
        cwd: path.resolve(opts.cwd),
        ...opts,
      })

      // Check if components.json already exists
      const projectInfo = await getProjectInfo(options.cwd)
      if (projectInfo?.framework && !options.yes) {
        const { proceed } = await prompts({
          type: 'confirm',
          name: 'proceed',
          message: `A ${projectInfo.framework.label} project was detected. Proceed?`,
          initial: true,
        })
        if (!proceed) process.exit(1)
      }

      // Run initialization
      await runInit(options)
    } catch (error) {
      handleError(error)
    }
  })

async function runInit(options: z.infer<typeof initOptionsSchema>) {
  let projectInfo = await getProjectInfo(options.cwd)

  // Detect framework or prompt user
  if (!projectInfo?.framework) {
    projectInfo = await promptForProjectInfo(options.cwd)
  }

  // Create components.json configuration
  const config = await promptForConfig(options.cwd, projectInfo)

  // Write configuration file
  const targetPath = path.resolve(options.cwd, 'components.json')
  await fs.writeFile(targetPath, JSON.stringify(config, null, 2))

  // Install dependencies and setup files
  await addComponents(['index'], config, {
    isNewProject: true,
    silent: options.silent,
  })
}
```

### 2. Add Command

```typescript
// packages/shadcn/src/commands/add.ts
export const add = new Command()
  .name('add')
  .description('add a component to your project')
  .argument('[components...]', 'the components to add')
  .option('-y, --yes', 'skip confirmation prompt.', false)
  .option('-o, --overwrite', 'overwrite existing files.', false)
  .option('-c, --cwd <cwd>', 'the working directory.', process.cwd())
  .option('-a, --all', 'add all available components', false)
  .option('-p, --path <path>', 'the path to add the component to.')
  .action(async (components, opts) => {
    try {
      const options = addOptionsSchema.parse({
        components,
        cwd: path.resolve(opts.cwd),
        ...opts,
      })

      // Load project configuration
      const [{ errors, config }, projectInfo] = await Promise.all([
        preFlightAdd(options),
        getProjectInfo(options.cwd),
      ])

      if (errors[ERRORS.MISSING_CONFIG] || !config) {
        logger.error(
          `Configuration is missing. Please run ${highlighter.info(
            'shadcn init'
          )} to create a components.json file.`
        )
        process.exit(1)
      }

      // Handle component selection
      if (!options.components?.length) {
        options.components = await promptForRegistryComponents(options)
      }

      // Install components
      await addComponents(options.components, config, {
        overwrite: options.overwrite,
        silent: options.yes,
      })
    } catch (error) {
      handleError(error)
    }
  })
```

## Configuration Management

### components.json Schema

```typescript
// Configuration schema
export const configSchema = z.object({
  $schema: z.string().optional(),
  style: z.string(),
  rsc: z.boolean().default(true),
  tsx: z.boolean().default(true),
  tailwind: z.object({
    config: z.string(),
    css: z.string(),
    baseColor: z.string(),
    cssVariables: z.boolean().default(true),
    prefix: z.string().default("").optional(),
  }),
  aliases: z.object({
    components: z.string(),
    utils: z.string(),
    ui: z.string().optional(),
    lib: z.string().optional(),
    hooks: z.string().optional(),
  }),
  iconLibrary: z.string().optional(),
})

// Example components.json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "iconLibrary": "lucide"
}
```

### Configuration Resolution

```typescript
// packages/shadcn/src/utils/get-config.ts
export async function getConfig(cwd: string): Promise<Config | null> {
  const configPath = path.resolve(cwd, 'components.json')

  // Check if config file exists
  if (!existsSync(configPath)) {
    return null
  }

  // Read and parse config
  const configContent = await fs.readFile(configPath, 'utf8')
  const config = JSON.parse(configContent)

  // Validate config schema
  const result = configSchema.safeParse(config)
  if (!result.success) {
    throw new Error(`Invalid configuration found at ${configPath}`)
  }

  // Resolve paths
  const resolvedConfig = {
    ...result.data,
    resolvedPaths: {
      cwd,
      tailwindConfig: path.resolve(cwd, result.data.tailwind.config),
      tailwindCss: path.resolve(cwd, result.data.tailwind.css),
      utils: await resolveImport(result.data.aliases.utils, cwd),
      components: await resolveImport(result.data.aliases.components, cwd),
      ui: result.data.aliases.ui
        ? await resolveImport(result.data.aliases.ui, cwd)
        : path.resolve(cwd, 'components/ui'),
    },
  }

  return resolvedConfig
}
```

## Component Installation

### Dependency Resolution

```typescript
// packages/shadcn/src/utils/add-components.ts
export async function addComponents(
  components: string[],
  config: Config,
  options: {
    overwrite?: boolean
    silent?: boolean
    isNewProject?: boolean
  }
) {
  // 1. Resolve component dependency tree
  const tree = await registryResolveItemsTree(components, config)

  if (!tree) {
    throw new Error('Failed to fetch components from registry.')
  }

  // 2. Validate file targets are safe
  try {
    validateFilesTarget(tree.files ?? [], config.resolvedPaths.cwd)
  } catch (error) {
    throw error
  }

  // 3. Update Tailwind configuration
  await updateTailwindConfig(tree.tailwind?.config, config, {
    silent: options.silent,
  })

  // 4. Update CSS variables
  await updateCssVars(tree.cssVars, config, {
    cleanupDefaultNextStyles: options.isNewProject,
    silent: options.silent,
  })

  // 5. Install NPM dependencies
  await updateDependencies(tree.dependencies, tree.devDependencies, config, {
    silent: options.silent,
  })

  // 6. Write component files
  await updateFiles(tree.files, config, {
    overwrite: options.overwrite,
    silent: options.silent,
  })
}
```

### File Operations

```typescript
// packages/shadcn/src/utils/updaters/update-files.ts
export async function updateFiles(
  files: z.infer<typeof registryItemFileSchema>[] | null,
  config: Config,
  options: {
    overwrite?: boolean
    silent?: boolean
  }
) {
  if (!files?.length) return

  const filesCreated: string[] = []
  const filesUpdated: string[] = []
  const filesSkipped: string[] = []

  for (const file of files) {
    const filePath = path.resolve(config.resolvedPaths.cwd, file.target!)

    // Ensure directory exists
    await fs.mkdir(path.dirname(filePath), { recursive: true })

    // Check if file exists
    const fileExists = existsSync(filePath)

    if (fileExists && !options.overwrite) {
      filesSkipped.push(file.target!)
      continue
    }

    // Write file content
    await fs.writeFile(filePath, file.content!)

    if (fileExists) {
      filesUpdated.push(file.target!)
    } else {
      filesCreated.push(file.target!)
    }
  }

  // Log results
  if (!options.silent) {
    if (filesCreated.length) {
      logger.info(`Created ${filesCreated.length} files:`)
      filesCreated.forEach(file => logger.info(`  ${file}`))
    }
    if (filesUpdated.length) {
      logger.info(`Updated ${filesUpdated.length} files:`)
      filesUpdated.forEach(file => logger.info(`  ${file}`))
    }
    if (filesSkipped.length) {
      logger.info(`Skipped ${filesSkipped.length} files:`)
      filesSkipped.forEach(file => logger.info(`  ${file}`))
    }
  }
}
```

### Dependency Management

```typescript
// packages/shadcn/src/utils/updaters/update-dependencies.ts
export async function updateDependencies(
  dependencies: string[] | null,
  devDependencies: string[] | null,
  config: Config,
  options: { silent?: boolean }
) {
  if (!dependencies?.length && !devDependencies?.length) return

  const packageManager = await detectPackageManager(config.resolvedPaths.cwd)

  const deps = dependencies?.filter(Boolean) ?? []
  const devDeps = devDependencies?.filter(Boolean) ?? []

  if (deps.length) {
    await installDependencies(deps, packageManager, false, options.silent)
  }

  if (devDeps.length) {
    await installDependencies(devDeps, packageManager, true, options.silent)
  }
}

async function installDependencies(
  dependencies: string[],
  packageManager: string,
  isDev: boolean,
  silent?: boolean
) {
  const command = getInstallCommand(packageManager, isDev)
  const fullCommand = `${command} ${dependencies.join(' ')}`

  if (!silent) {
    logger.info(
      `Installing ${isDev ? 'dev ' : ''}dependencies: ${dependencies.join(', ')}`
    )
  }

  return new Promise<void>((resolve, reject) => {
    exec(fullCommand, (error, stdout, stderr) => {
      if (error) {
        reject(error)
      } else {
        resolve()
      }
    })
  })
}
```

## Registry Integration

### Component Fetching

```typescript
// packages/shadcn/src/registry/api.ts
export async function fetchRegistry(
  paths: string[],
  options: { useCache?: boolean } = {}
) {
  const results = await Promise.all(
    paths.map(async path => {
      const url = getRegistryUrl(path)

      // Check cache first
      if (options.useCache && registryCache.has(url)) {
        return registryCache.get(url)
      }

      const response = await fetch(url)

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(
            `Component at ${url} was not found. Please make sure it's a valid component.`
          )
        }
        throw new Error(`Failed to fetch component: ${response.statusText}`)
      }

      const result = await response.json()

      // Cache result
      if (options.useCache) {
        registryCache.set(url, result)
      }

      return result
    })
  )

  return results
}

export function getRegistryUrl(path: string): string {
  const registryUrl = process.env.REGISTRY_URL || 'https://ui.shadcn.com/r'
  return `${registryUrl}/${path}.json`
}
```

### Tree Resolution

```typescript
// Resolve component dependency tree
export async function registryResolveItemsTree(
  names: string[],
  config: Config
) {
  const registryItems = await resolveRegistryItems(names, config)
  const result = await fetchRegistry(registryItems)
  const payload = z.array(registryItemSchema).parse(result)

  if (!payload?.length) return null

  // Flatten all files, dependencies, etc.
  const tree = {
    dependencies: [] as string[],
    devDependencies: [] as string[],
    files: [] as Array<z.infer<typeof registryItemFileSchema>>,
    tailwind: { config: {} as Record<string, any> },
    cssVars: {} as Record<string, Record<string, any>>,
    docs: '',
  }

  for (const item of payload) {
    if (item.dependencies?.length) {
      tree.dependencies.push(...item.dependencies)
    }
    if (item.devDependencies?.length) {
      tree.devDependencies.push(...item.devDependencies)
    }
    if (item.files?.length) {
      tree.files.push(...item.files)
    }
    if (item.tailwind?.config) {
      tree.tailwind.config = {
        ...tree.tailwind.config,
        ...item.tailwind.config,
      }
    }
    if (item.cssVars) {
      tree.cssVars = { ...tree.cssVars, ...item.cssVars }
    }
  }

  // Remove duplicates
  tree.dependencies = [...new Set(tree.dependencies)]
  tree.devDependencies = [...new Set(tree.devDependencies)]

  return tree
}
```

## Error Handling

### Custom Error Types

```typescript
// packages/shadcn/src/utils/errors.ts
export class ComponentNotFoundError extends Error {
  constructor(component: string) {
    super(`Component "${component}" not found in registry.`)
    this.name = 'ComponentNotFoundError'
  }
}

export class ConfigNotFoundError extends Error {
  constructor(cwd: string) {
    super(`Configuration file not found at ${cwd}/components.json`)
    this.name = 'ConfigNotFoundError'
  }
}

export function handleError(error: unknown) {
  if (error instanceof ComponentNotFoundError) {
    logger.error(error.message)
    logger.info("Run 'shadcn add' to see available components.")
  } else if (error instanceof ConfigNotFoundError) {
    logger.error(error.message)
    logger.info("Run 'shadcn init' to create a configuration file.")
  } else {
    logger.error('An unexpected error occurred:')
    logger.error(error)
  }

  process.exit(1)
}
```

## Monorepo Support

### Workspace Detection

```typescript
// packages/shadcn/src/utils/get-config.ts
export async function getWorkspaceConfig(config: Config) {
  // Look for workspace root
  const workspaceRoot = await findWorkspaceRoot(config.resolvedPaths.cwd)

  if (!workspaceRoot) return null

  // Check for UI package in workspace
  const uiPackagePath = path.resolve(workspaceRoot, 'packages/ui')
  const uiConfigPath = path.resolve(uiPackagePath, 'components.json')

  if (!existsSync(uiConfigPath)) return null

  // Load UI package config
  const uiConfig = await getConfig(uiPackagePath)

  return {
    ui: uiConfig,
    root: workspaceRoot,
  }
}

async function findWorkspaceRoot(cwd: string): Promise<string | null> {
  let currentDir = cwd

  while (currentDir !== path.dirname(currentDir)) {
    // Check for workspace indicators
    const indicators = [
      'pnpm-workspace.yaml',
      'lerna.json',
      'nx.json',
      'rush.json',
    ]

    for (const indicator of indicators) {
      if (existsSync(path.resolve(currentDir, indicator))) {
        return currentDir
      }
    }

    currentDir = path.dirname(currentDir)
  }

  return null
}
```

## For Base UI Implementation

### Key Adaptations

1. **Update Registry URLs**

```typescript
export function getRegistryUrl(path: string): string {
  const registryUrl =
    process.env.REGISTRY_URL || 'https://your-base-ui-lib.com/r'
  return `${registryUrl}/${path}.json`
}
```

2. **Base UI Dependencies**

```typescript
// Update dependency lists for Base UI
const BASE_UI_DEPENDENCIES = [
  '@base-ui-components/react',
  'class-variance-authority',
  'clsx',
  'tailwind-merge',
]

// Add Base UI specific configuration
export const baseUIConfigSchema = configSchema.extend({
  baseUI: z
    .object({
      version: z.string().default('latest'),
      components: z.array(z.string()).optional(),
    })
    .optional(),
})
```

3. **Component Templates**

```typescript
// Update init templates for Base UI
const BASE_UI_TEMPLATES = {
  button: `import * as React from "react"
import { Button as BaseButton } from "@base-ui-components/react/Button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(/* ... */)

export interface ButtonProps
  extends React.ComponentPropsWithoutRef<typeof BaseButton>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<
  React.ElementRef<typeof BaseButton>,
  ButtonProps
>(({ className, variant, size, ...props }, ref) => (
  <BaseButton
    className={cn(buttonVariants({ variant, size, className }))}
    ref={ref}
    {...props}
  />
))
`,
}
```

4. **Import Processing Updates**

```typescript
// Update import fixing for Base UI
function fixBaseUIImports(content: string) {
  return content
    .replace(
      /@base-ui-components\/react\/([A-Z][\w]*)/g,
      '@base-ui-components/react'
    )
    .replace(/from "react"/g, 'import * as React from "react"')
}
```

This CLI architecture enables seamless component installation and project management, making it easy for developers to adopt and use your component library.
