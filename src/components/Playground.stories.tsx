import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Button } from './Button'

const meta: Meta = {
  title: 'Playground/Playground',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

const PlaygroundComponent = () => {
  const [prompt, setPrompt] = useState('Create a primary button')
  const [variant, setVariant] = useState<
    'default' | 'outline' | 'destructive' | 'ghost'
  >('default')
  const [size, setSize] = useState<'sm' | 'md' | 'lg'>('md')
  const [text, setText] = useState('Button')

  const parsePrompt = () => {
    const lowerPrompt = prompt.toLowerCase()

    // Parse variant
    if (lowerPrompt.includes('outline')) setVariant('outline')
    else if (
      lowerPrompt.includes('destructive') ||
      lowerPrompt.includes('danger')
    )
      setVariant('destructive')
    else if (lowerPrompt.includes('ghost')) setVariant('ghost')
    else setVariant('default')

    // Parse size
    if (lowerPrompt.includes('small')) setSize('sm')
    else if (lowerPrompt.includes('large')) setSize('lg')
    else setSize('md')

    // Parse text
    const textMatch = lowerPrompt.match(
      /(?:with text|saying|labeled) ["']([^"']+)["']/
    )
    if (textMatch) {
      setText(textMatch[1])
    } else if (lowerPrompt.includes('button')) {
      setText('Button')
    }
  }

  return (
    <div className="space-y-6 p-6 bg-background rounded-lg border">
      <div className="space-y-2">
        <label htmlFor="prompt-textarea" className="text-sm font-medium">
          AI Prompt (Future Feature Preview)
        </label>
        <textarea
          id="prompt-textarea"
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          className="w-full p-3 border rounded-md bg-background text-foreground"
          rows={3}
          placeholder="Describe the button you want..."
        />
        <button
          onClick={parsePrompt}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm hover:bg-primary-hover"
        >
          Generate Component
        </button>
      </div>

      <div className="border-t pt-4">
        <h3 className="text-lg font-semibold mb-4">Generated Component</h3>
        <div className="flex items-center justify-center p-8 border rounded-md bg-background-muted">
          <Button variant={variant} size={size}>
            {text}
          </Button>
        </div>
      </div>

      <div className="border-t pt-4">
        <h3 className="text-lg font-semibold mb-2">Component Props</h3>
        <pre className="bg-background-muted p-3 rounded-md text-sm overflow-x-auto">
          {`<Button 
  variant="${variant}" 
  size="${size}"
>
  ${text}
</Button>`}
        </pre>
      </div>
    </div>
  )
}

export const Default: Story = {
  render: () => <PlaygroundComponent />,
}
