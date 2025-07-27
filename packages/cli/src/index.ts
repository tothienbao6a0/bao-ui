#!/usr/bin/env node

import { readFileSync, writeFileSync, existsSync } from 'fs'
import { join } from 'path'
import { createInterface } from 'readline'

interface ComponentOptions {
  name: string
  needsMotion: boolean
}

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
})

function ask(question: string): Promise<string> {
  return new Promise(resolve => {
    rl.question(question, resolve)
  })
}

function generateComponent(options: ComponentOptions): string {
  const { name, needsMotion } = options
  
  return `import { forwardRef } from 'react'
import { clsx } from 'clsx'${needsMotion ? '\nimport { useAutoAnimate } from \'@/hooks\'' : ''}

export interface ${name}Props extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
  asChild?: boolean
  render?: React.ElementType
}

export const ${name} = forwardRef<HTMLDivElement, ${name}Props>(
  ({ className, children, asChild = false, render, ...props }, ref) => {${needsMotion ? '\n    const [animateRef] = useAutoAnimate<HTMLDivElement>()' : ''}
    
    // Base UI polymorphic pattern - support asChild + render prop
    const Component = render || (asChild ? 'div' : 'div')
    
    return (
      <Component
        ref={${needsMotion ? 'animateRef' : 'ref'}}
        className={clsx(
          '${name.toLowerCase()}-component',
          className
        )}
        {...props}
      >
        {children}
      </Component>
    )
  }
)

${name}.displayName = '${name}'`
}

function generateTest(name: string): string {
  return `import { render, screen } from '@testing-library/react'
import { ${name} } from './${name}'

describe('${name}', () => {
  it('renders children correctly', () => {
    render(<${name}>Test content</${name}>)
    expect(screen.getByText('Test content')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(<${name} className="custom-class">Test</${name}>)
    expect(screen.getByText('Test')).toHaveClass('custom-class')
  })

  it('forwards ref correctly', () => {
    const ref = { current: null }
    render(<${name} ref={ref}>Test</${name}>)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })
})`
}

function generateStory(name: string): string {
  return `import type { Meta, StoryObj } from '@storybook/react'
import { ${name} } from './${name}'

const meta: Meta<typeof ${name}> = {
  title: 'Components/${name}',
  component: ${name},
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Default ${name}',
  },
}

export const CustomStyling: Story = {
  args: {
    children: 'Styled ${name}',
    className: 'bg-primary text-primary-foreground p-4 rounded-md',
  },
}`
}

async function addComponent() {
  try {
    const args = process.argv.slice(2)
    
    if (args.length === 0) {
      console.error('Usage: npx bao add <ComponentName>')
      process.exit(1)
    }

    const componentName = args[0]
    
    if (!/^[A-Z][a-zA-Z0-9]*$/.test(componentName)) {
      console.error('Component name must be PascalCase (e.g., MyComponent)')
      process.exit(1)
    }

    const needsMotionAnswer = await ask('Need motion layer? (y/N): ')
    const needsMotion = needsMotionAnswer.toLowerCase() === 'y' || needsMotionAnswer.toLowerCase() === 'yes'

    const options: ComponentOptions = {
      name: componentName,
      needsMotion,
    }

    // Generate files
    const componentPath = join(process.cwd(), 'src', 'components', `${componentName}.tsx`)
    const testPath = join(process.cwd(), 'src', 'components', `${componentName}.test.tsx`)
    const storyPath = join(process.cwd(), 'src', 'components', `${componentName}.stories.tsx`)
    const indexPath = join(process.cwd(), 'src', 'components', 'index.ts')

    // Check if component already exists
    if (existsSync(componentPath)) {
      console.error(`Component ${componentName} already exists!`)
      process.exit(1)
    }

    // Write component file
    writeFileSync(componentPath, generateComponent(options))
    console.log(`✅ Created ${componentName}.tsx`)

    // Write test file
    writeFileSync(testPath, generateTest(componentName))
    console.log(`✅ Created ${componentName}.test.tsx`)

    // Write story file
    writeFileSync(storyPath, generateStory(componentName))
    console.log(`✅ Created ${componentName}.stories.tsx`)

    // Update index.ts
    if (existsSync(indexPath)) {
      const indexContent = readFileSync(indexPath, 'utf-8')
      const exportLine = `export { ${componentName}, type ${componentName}Props } from './${componentName}'`
      
      if (!indexContent.includes(exportLine)) {
        const updatedContent = indexContent + '\n' + exportLine
        writeFileSync(indexPath, updatedContent)
        console.log(`✅ Updated components/index.ts`)
      }
    }

    console.log(`\\n🎉 Component ${componentName} created successfully!`)
    
  } catch (error) {
    console.error('Error creating component:', error)
    process.exit(1)
  } finally {
    rl.close()
  }
}

// Run the CLI
addComponent()