# bao-ui v0.0.1

> AI-native React component & logic system built on @mui/base-ui primitives

## 🚀 Value Proposition

**bao-ui** is a production-ready component library that beats shadcn/ui on theming & packaging. Built with:

- **@mui/base-ui** primitives for robust accessibility
- **Tailwind v4** with token-first design system
- **Smooth animations** with prefers-reduced-motion support
- **Optional Framer Motion** integration
- **Secure defaults** with DOMPurify sanitization
- **Future-ready** for Generative UI phases

## ⚡ Quick Start

```bash
# Install the package
npm install @bao/ui

# Peer dependencies
npm install react react-dom tailwindcss
```

### Setup

1. **Configure Tailwind** - Add to your `tailwind.config.js`:

```ts
import { tokens } from '@bao/ui/theme'

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: tokens.colors,
      spacing: tokens.spacing,
      borderRadius: tokens.radius,
    },
  },
  plugins: [tokens.plugin],
}
```

2. **Import styles** in your app:

```ts
import '@bao/ui/styles.css'
```

## 📖 Usage Example

```tsx
import { Button, Dialog, DialogBackdrop, DialogPopup, Tooltip } from '@bao/ui'

function App() {
  return (
    <div className="p-8">
      <Tooltip>
        <TooltipTrigger>
          <Button variant="outline" size="lg">
            Click me
          </Button>
        </TooltipTrigger>
        <TooltipPopup content="Hello from bao-ui!" />
      </Tooltip>
    </div>
  )
}
```

## 🗺️ Roadmap

### Phase 0: Foundation ✅
- Core components (Button, Dialog, Tooltip)
- Token-based theming system
- Storybook documentation
- CLI scaffolder (`npx bao add ComponentName`)

### Phase 1: Generative UI 🔄
- Schema-driven component generation
- Prompt-to-UI conversion
- AI-assisted component variations
- Real-time design token extraction

### Phase 2: Advanced Features 🚧
- Form components with validation
- Data visualization components
- Animation presets
- Advanced accessibility patterns

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
pnpm build        # Build library

# Add new component
npx bao add MyComponent
```

## 🎨 Components

| Component | Description | Status |
|-----------|-------------|---------|
| Button | Multi-variant button with MUI Base | ✅ |
| Dialog | Modal dialog with backdrop | ✅ |
| Tooltip | Content tooltip with XSS protection | ✅ |

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Code Standards

- Use **TypeScript** for all code
- Follow **Prettier** formatting (run `pnpm format`)
- Write **tests** for new components
- Update **Storybook** documentation
- Ensure **accessibility** compliance

## 🔒 Security

We take security seriously. Please see [SECURITY.md](./SECURITY.md) for:

- Vulnerability reporting process
- Security best practices
- CSP configuration guidance

## 📦 Deployment

### Storybook (Chromatic)

Storybook is automatically deployed on push via Chromatic:

```bash
pnpm chromatic --project-token YOUR_TOKEN
```

### Package (Vercel)

The library demo is deployed to Vercel:

```bash
pnpm build-storybook
# Deploy storybook-static/ directory
```

## 📄 License

MIT © 2025 Bao To

---

**Built with ❤️ for the future of AI-native development**