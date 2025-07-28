# 01. Monorepo Structure

## Overview

Shadcn/ui uses a monorepo architecture with pnpm workspaces and Turborepo. This enables code sharing, unified tooling, and efficient builds across multiple applications and packages.

## Directory Structure

```
ui/
├── apps/                          # Applications
│   ├── www/                       # Main documentation site (port 3333)
│   │   ├── app/                   # Next.js 13+ app directory
│   │   ├── components/            # Site-specific components
│   │   ├── content/               # MDX documentation files
│   │   ├── registry/              # Component registry (v3 style)
│   │   ├── scripts/               # Build and utility scripts
│   │   ├── styles/                # Global styles
│   │   ├── components.json        # CLI configuration
│   │   ├── contentlayer.config.js # Content processing
│   │   └── package.json
│   │
│   └── v4/                        # V4 documentation site (port 4000)
│       ├── app/                   # Next.js app directory
│       ├── components/            # Site-specific components
│       ├── content/               # MDX documentation files
│       ├── registry/              # Component registry (v4 style)
│       ├── scripts/               # Build scripts
│       ├── styles/                # Global styles with v4 features
│       ├── components.json        # CLI configuration
│       └── package.json
│
├── packages/                      # Shared packages
│   └── shadcn/                    # CLI package
│       ├── src/                   # Source code
│       │   ├── commands/          # CLI commands (add, init, etc.)
│       │   ├── registry/          # Registry API and utilities
│       │   ├── utils/             # Shared utilities
│       │   └── index.ts           # CLI entry point
│       ├── test/                  # Test fixtures and specs
│       └── package.json
│
├── templates/                     # Project templates
│   └── monorepo-next/             # Monorepo template
│
├── scripts/                       # Root-level scripts
├── package.json                   # Root package.json
├── pnpm-workspace.yaml            # Workspace configuration
├── turbo.json                     # Turborepo configuration
└── README.md
```

## Workspace Configuration

### pnpm-workspace.yaml

```yaml
packages:
  - 'apps/*'
  - 'packages/*'
  - '!**/test/**'
```

### Root package.json

```json
{
  "name": "ui",
  "private": true,
  "workspaces": ["apps/*", "packages/*"],
  "scripts": {
    "dev": "turbo run dev --parallel",
    "build": "turbo run build",
    "build:registry": "pnpm --filter=www,v4 build:registry",
    "www:dev": "pnpm --filter=www dev",
    "v4:dev": "pnpm --filter=v4 dev",
    "shadcn:dev": "pnpm --filter=shadcn dev"
  }
}
```

## App Configurations

### www App (Main Documentation)

- **Port**: 3333
- **Framework**: Next.js 14 with app router
- **Content**: Contentlayer v2 for MDX processing
- **Registry**: Traditional component registry structure
- **Tailwind**: v3.4.6 with CSS variables
- **Purpose**: Primary documentation and component showcase

### v4 App (Modern Documentation)

- **Port**: 4000
- **Framework**: Next.js 15 with app router
- **Content**: Fumadocs for MDX processing
- **Registry**: Modern registry with enhanced features
- **Tailwind**: v4.1.7 with new features
- **Purpose**: Next-generation documentation platform

## Shared Dependencies

### Development Tools

```json
{
  "turbo": "^1.9.9",
  "prettier": "^2.8.8",
  "eslint": "^8.41.0",
  "typescript": "^5.5.3"
}
```

### Build Tools

```json
{
  "postcss": "^8.4.24",
  "autoprefixer": "^10.4.14",
  "tailwindcss": "3.4.6",
  "tsx": "^4.1.4"
}
```

## Key Features

### 1. Workspace Isolation

- Each app has its own `node_modules` and dependencies
- Shared dependencies are hoisted to root level
- Independent build and deployment processes

### 2. Code Sharing

- CLI package shared between apps
- Utility functions and types shared
- Component registry centrally managed

### 3. Parallel Development

- Run multiple apps simultaneously
- Independent hot reloading
- Isolated development environments

### 4. Unified Tooling

- Shared ESLint, Prettier, TypeScript configurations
- Consistent build processes via Turborepo
- Centralized dependency management

## Scripts and Commands

### Development

```bash
# Start all apps in parallel
pnpm dev

# Start specific app
pnpm www:dev    # Main docs (port 3333)
pnpm v4:dev     # V4 docs (port 4000)
pnpm cli:dev    # CLI development mode
```

### Build

```bash
# Build entire monorepo
pnpm build

# Build registry files
pnpm build:registry

# Build specific components
pnpm --filter=www build
pnpm --filter=v4 build
```

### Registry Management

```bash
# Build component registry
pnpm registry:build

# Capture component screenshots
pnpm registry:capture
```

## For Base UI Implementation

### Recommended Structure

```
your-ui-lib/
├── apps/
│   ├── docs/                     # Main documentation
│   └── playground/               # Component playground
├── packages/
│   ├── cli/                      # Your CLI tool
│   ├── components/               # Base UI components
│   └── core/                     # Shared utilities
└── templates/
    └── starter/                  # Starter template
```

### Key Adaptations Needed

1. **Replace Radix dependencies** with Base UI equivalents
2. **Update registry schemas** to handle Base UI component patterns
3. **Modify build scripts** to process Base UI imports correctly
4. **Adapt CLI templates** for Base UI component structure
5. **Update documentation** to reflect Base UI usage patterns
