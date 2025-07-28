import { useState } from 'react'
import { Input } from '@bao-ui/react'

export function DefaultInput() {
  return <Input placeholder="Enter your name..." />
}

export function WithLabelInput() {
  return <Input label="Full Name" placeholder="Enter your full name" />
}

export function WithDescriptionInput() {
  return (
    <Input
      label="Email Address"
      placeholder="Enter your email"
      description="We'll never share your email with anyone else."
    />
  )
}

export function ValidationStatesInput() {
  return (
    <div className="space-y-4 w-80">
      <Input
        label="Default State"
        placeholder="Default input"
        description="This is a normal input field."
      />
      <Input
        label="Success State"
        variant="success"
        placeholder="Valid input"
        description="Input is valid!"
      />
      <Input
        label="Error State"
        placeholder="Invalid input"
        error="This field is required."
      />
    </div>
  )
}

export function SizesInput() {
  return (
    <div className="space-y-6 w-80">
      <div>
        <h3 className="mb-2 text-sm font-medium">Small</h3>
        <Input
          size="sm"
          label="Small Input"
          placeholder="Small size input"
          description="This is a small input field."
        />
      </div>
      <div>
        <h3 className="mb-2 text-sm font-medium">Default</h3>
        <Input
          label="Default Input"
          placeholder="Default size input"
          description="This is a default input field."
        />
      </div>
      <div>
        <h3 className="mb-2 text-sm font-medium">Large</h3>
        <Input
          size="lg"
          label="Large Input"
          placeholder="Large size input"
          description="This is a large input field."
        />
      </div>
    </div>
  )
}

export function InputTypesExample() {
  return (
    <div className="space-y-4 w-80">
      <Input label="Text" type="text" placeholder="Enter text" />
      <Input label="Email" type="email" placeholder="Enter email address" />
      <Input label="Password" type="password" placeholder="Enter password" />
      <Input label="Number" type="number" placeholder="Enter number" />
      <Input label="Date" type="date" />
      <Input label="Search" type="search" placeholder="Search..." />
    </div>
  )
}

export function ControlledInput() {
  const [value, setValue] = useState('')
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setValue(newValue)

    if (newValue.length < 3) {
      setError('Must be at least 3 characters')
    } else {
      setError('')
    }
  }

  return (
    <div className="w-80">
      <Input
        label="Controlled Input"
        placeholder="Type something..."
        value={value}
        onChange={handleChange}
        error={error}
        description={!error ? `Character count: ${value.length}` : undefined}
      />
    </div>
  )
}

export function CustomCompositionInput() {
  return (
    <div className="w-80 space-y-2">
      <label className="text-sm font-medium">Custom Composed Input</label>
      <Input
        placeholder="This uses individual components"
        className="bg-slate-50"
      />
      <p className="text-xs text-muted-foreground">
        This input is composed using individual components for maximum
        flexibility.
      </p>
    </div>
  )
}
