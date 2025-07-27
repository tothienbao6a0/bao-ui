# bao-ui v0.1.0

> AI-native React component & logic system built on Base UI primitives

## 🚀 Value Proposition

**bao-ui** is a production-ready component library that beats shadcn/ui on theming & packaging. Built with:

- **Base UI** primitives for robust accessibility
- **Tailwind v4** with token-first design system
- **Smooth animations** with prefers-reduced-motion support
- **Optional Framer Motion** integration
- **Secure defaults** with DOMPurify sanitization
- **Monorepo architecture** for modularity

## 📦 Packages

| Package | Description | Version |
|---------|-------------|---------|
| `@bao/ui` | Styled React components | ![npm](https://img.shields.io/npm/v/@bao/ui) |
| `@bao/core` | Headless primitives & hooks | ![npm](https://img.shields.io/npm/v/@bao/core) |
| `@bao/tokens` | Design tokens & Tailwind plugin | ![npm](https://img.shields.io/npm/v/@bao/tokens) |
| `@bao/cli` | Component scaffolding CLI | ![npm](https://img.shields.io/npm/v/@bao/cli) |

## ⚡ Quick Start

```bash
# Install the packages
pnpm add @bao/ui @bao/tokens

# Or with CLI
npx @bao/cli add button
```

### Setup

1. **Configure Tailwind** - Add to your `tailwind.config.js`:

```ts
import { plugin } from '@bao/tokens/tailwind'

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  plugins: [plugin],
}
```

2. **Import styles** in your app:

```ts
import '@bao/ui/styles.css'
```

## 📖 Usage Example

```tsx
import { Button, DialogRoot, DialogBackdrop, DialogPopup, TooltipRoot } from '@bao/ui'

function App() {
  return (
    <div className="p-8">
      <TooltipRoot>
        <TooltipTrigger>
          <Button variant="outline" size="lg">
            Click me
          </Button>
        </TooltipTrigger>
        <TooltipPopup content="Hello from bao-ui!" />
      </TooltipRoot>
    </div>
  )
}
```

## 🛠️ Development

```bash
# Clone & install
git clone https://github.com/yourusername/bao-ui
cd bao-ui
pnpm install

# Development
pnpm dev          # Start Storybook
pnpm test         # Run tests
pnpm lint         # Lint code
pnpm build        # Build all packages

# Add new component
npx @bao/cli add MyComponent
```

## 🎨 Components

| Component | Description | Status |
|-----------|-------------|---------|
| Button | Multi-variant button with Tailwind styling | ✅ |
| Dialog | Modal dialog with Base UI primitives | ✅ |
| Tooltip | Content tooltip with XSS protection | ✅ |

## 🗺️ Roadmap

### Phase 0: Foundation ✅
- Monorepo with 4 publishable packages
- Core components (Button, Dialog, Tooltip)
- Token-based theming system
- Storybook documentation

### Phase 1: CLI & Templates 🔄
- Enhanced CLI with templates
- Component scaffolding
- Auto peer-dependency management

### Phase 2: Advanced Features 🚧
- Form components with validation
- Data visualization components
- Animation presets
- Next.js example app

## 🔄 Release Process

We use [Changesets](https://github.com/changesets/changesets) for version management:

```bash
# Add a changeset
pnpm changeset

# Version packages
pnpm version-packages

# Release
pnpm release
```

## 📄 License

MIT © 2025 Bao To

---

**Built with ❤️ for the future of AI-native development**