# @bao-ui/react

Styled React components built on Base UI primitives.

## Installation

```bash
npm install @bao-ui/react
```

## Usage

Import the components you need and include the CSS file:

```tsx
import { Button, Dialog, DialogTrigger, DialogContent } from '@bao-ui/react'
import '@bao-ui/react/styles.css'

function App() {
  return (
    <Dialog>
      <DialogTrigger>
        <Button>Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <h2>Dialog Title</h2>
        <p>Dialog content goes here.</p>
      </DialogContent>
    </Dialog>
  )
}
```

## CLI

Use the CLI to quickly add components to your project:

```bash
# Install the CLI
npm install -g @bao-ui/cli

# Add components to your project
bao-ui add button dialog
```

## Available Components

- **Button** - Interactive button with multiple variants
- **Badge** - Status, notification, and interactive badges
- **Input** - Form input with label and validation
- **Checkbox** - Checkbox with field wrapper
- **Radio** - Radio group with field wrappers
- **Select** - Dropdown select with items
- **Switch** - Toggle switch with field wrapper
- **Dialog** - Modal dialog with backdrop
- **Tooltip** - Contextual tooltip popup

## Features

- 🎨 **Tailwind CSS** - Styled with Tailwind utility classes
- 🧩 **Base UI** - Built on accessible Base UI primitives
- 📱 **Responsive** - Mobile-first responsive design
- 🌙 **Dark Mode** - Built-in dark mode support
- 🎯 **TypeScript** - Full TypeScript support
- 🔧 **Customizable** - Easy to customize and extend

## Requirements

- React 18+
- Tailwind CSS
- Base UI Components

## Documentation

Visit the [documentation](http://localhost:6006) to view all components and examples.

## License

Licensed under the MIT license.
