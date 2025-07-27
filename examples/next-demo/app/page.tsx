'use client'

import { Button } from '@bao-ui/react'
import { useState } from 'react'

export default function Home() {
  const [count, setCount] = useState(0)

  return (
    <main style={{ minHeight: '100vh', padding: '2rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <h1
          style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            marginBottom: '1rem',
          }}
        >
          Welcome to Bao UI
        </h1>
        <p style={{ fontSize: '1.25rem', color: '#666', marginBottom: '2rem' }}>
          Beautiful React components built on Base UI primitives
        </p>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
            maxWidth: '400px',
            margin: '0 auto',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
            }}
          >
            <Button variant="outline" onClick={() => setCount(count - 1)}>
              -
            </Button>
            <span
              style={{
                fontSize: '1.5rem',
                fontFamily: 'monospace',
                minWidth: '3rem',
                textAlign: 'center',
              }}
            >
              {count}
            </span>
            <Button onClick={() => setCount(count + 1)}>+</Button>
          </div>

          <div
            style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}
          >
            <Button variant="default">Default</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="ghost">Ghost</Button>
          </div>

          <div
            style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}
          >
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
          </div>
        </div>

        <div style={{ marginTop: '4rem' }}>
          <h2
            style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              marginBottom: '1rem',
            }}
          >
            Get Started
          </h2>
          <div
            style={{
              backgroundColor: '#f9f9f9',
              borderRadius: '8px',
              padding: '1.5rem',
              maxWidth: '600px',
              margin: '0 auto',
            }}
          >
            <pre
              style={{
                fontSize: '0.875rem',
                textAlign: 'left',
                overflowX: 'auto',
              }}
            >
              <code style={{ color: '#333' }}>
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
