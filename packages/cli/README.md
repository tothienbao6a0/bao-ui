# @bao-ui/cli

CLI for adding Bao UI components from the registry to your project.

## Installation

```bash
npm install -g @bao-ui/cli
# or
pnpm add -g @bao-ui/cli
# or
yarn global add @bao-ui/cli
```

## Usage

### List all available components

```bash
bao list
# or
bao ls
```

### Add components to your project

```bash
# Add a single component
bao add button

# Add multiple components
bao add button badge input checkbox

# Overwrite existing files
bao add button --overwrite
```

## Available Components

- **button** - Displays a button or a component that looks like a button
- **badge** - Displays a badge or a component that looks like a badge
- **input** - Displays an input field
- **checkbox** - A control that allows the user to toggle between checked and not checked
- **radio-group** - A set of checkable buttons—known as radio buttons
- **select** - Displays a list of options for the user to pick from
- **switch** - A control that allows the user to toggle between checked and not checked
- **dialog** - A window overlaid on either the primary window or another dialog window
- **tooltip** - A popup that displays information related to an element

## How it works

The CLI automatically:

1. **Detects your project structure** - Finds your components directory (`src/components`, `components`, etc.)
2. **Resolves dependencies** - Automatically includes required registry dependencies like `utils`
3. **Installs components** - Copies component files to the correct locations
4. **Shows dependency instructions** - Lists the npm packages you need to install

After adding components, make sure to install the required dependencies:

```bash
npm install @base-ui-components/react @radix-ui/react-slot @radix-ui/react-icons class-variance-authority clsx tailwind-merge
```

## Features

- 🚀 **Fast** - Components are copied directly from the registry
- 🔍 **Smart** - Automatically resolves and includes dependencies
- 🛡️ **Safe** - Won't overwrite existing files unless you use `--overwrite`
- 📁 **Flexible** - Works with different project structures
- 🎨 **Base UI** - Built for Base UI components with hardcoded Tailwind colors

## Examples

```bash
# Set up a complete form
bao add input checkbox radio-group select switch button

# Add UI feedback components
bao add badge tooltip dialog

# List what's available
bao list
```

Built with ❤️ by [Bao To](https://github.com/baototheboo)
