'use client'

import { Button } from '@bao-ui/react'
import { useState } from 'react'

export default function Home() {
  const [count, setCount] = useState(0)

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to Bao UI
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Beautiful React components built on Base UI primitives
          </p>

          <div className="space-y-4 max-w-md mx-auto">
            <div className="flex items-center justify-center space-x-4">
              <Button variant="outline" onClick={() => setCount(count - 1)}>
                -
              </Button>
              <span className="text-2xl font-mono min-w-[3rem] text-center">
                {count}
              </span>
              <Button onClick={() => setCount(count + 1)}>+</Button>
            </div>

            <div className="space-x-2">
              <Button variant="default">Default</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="ghost">Ghost</Button>
            </div>

            <div className="space-x-2">
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Get Started
          </h2>
          <div className="bg-gray-50 rounded-lg p-6 max-w-2xl mx-auto">
            <pre className="text-sm text-left overflow-x-auto">
              <code className="text-gray-800">
                {`npm install @bao-ui/react @bao-ui/core @bao-ui/tokens

import { Button } from '@bao-ui/react'

export function MyComponent() {
  return <Button>Click me!</Button>
}`}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </main>
  )
}
