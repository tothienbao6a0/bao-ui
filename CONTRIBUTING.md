# Contributing to bao-ui

## Development Setup

```bash
# Clone and install
git clone https://github.com/yourusername/bao-ui
cd bao-ui
pnpm install

# Development
pnpm dev          # Start Storybook
pnpm test         # Run tests
pnpm lint         # Lint code
pnpm build        # Build all packages
```

## Release Process

We use [Changesets](https://github.com/changesets/changesets) for version management:

### 1. Create a changeset

```bash
pnpm changeset
```

### 2. Version packages

```bash
pnpm version-packages
```

### 3. Setup NPM Token (Required for CI releases)

Before running releases, you need to add an `NPM_TOKEN` secret to the repository:

1. Go to [npm.com](https://npmjs.com) and generate an automation token
2. Navigate to **GitHub → Settings → Secrets and variables → Actions**
3. Click **"New repository secret"**
4. Name: `NPM_TOKEN`
5. Value: Your npm automation token
6. Click **"Add secret"**

This token allows the GitHub Actions CI to publish packages to npm automatically.

### 4. Release

```bash
pnpm release
```

## Component Guidelines

- Follow Base UI patterns with `render` prop support for polymorphism
- Include `asChild` prop for composition
- Use Tailwind classes with semantic naming
- Add comprehensive tests and Storybook stories
- Follow existing naming conventions

## Adding Components

Use the CLI for consistent component scaffolding:

```bash
npx @bao/cli add MyComponent
```

This generates:

- Component file with Base UI polymorphic API
- Test file with comprehensive coverage
- Storybook story with examples
- Updates component index exports
