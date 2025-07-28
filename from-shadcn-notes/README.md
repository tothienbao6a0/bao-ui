# Shadcn/UI Architecture Documentation

Comprehensive documentation for building a component library like shadcn/ui but with Base UI instead of Radix.

## Documentation Structure

### 📁 Core Architecture

- **[01-monorepo-structure.md](./01-monorepo-structure.md)** - Overall repository structure and workspace organization
- **[02-build-system.md](./02-build-system.md)** - Turbo, pnpm, and build configuration
- **[03-app-architecture.md](./03-app-architecture.md)** - Next.js apps structure and configuration

### 🔧 Registry System

- **[04-registry-system.md](./04-registry-system.md)** - Component indexing and distribution system
- **[05-build-scripts.md](./05-build-scripts.md)** - Registry generation and build processes
- **[06-component-metadata.md](./06-component-metadata.md)** - Component definitions and schemas

### 🎨 Documentation System

- **[07-preview-system.md](./07-preview-system.md)** - Live component preview implementation
- **[08-mdx-integration.md](./08-mdx-integration.md)** - MDX and documentation rendering
- **[09-theme-system.md](./09-theme-system.md)** - Theming and CSS variable implementation

### 🛠 CLI System

- **[10-cli-architecture.md](./10-cli-architecture.md)** - Command-line tool implementation
- **[11-component-installation.md](./11-component-installation.md)** - Component installation and updates
- **[12-workspace-management.md](./12-workspace-management.md)** - Monorepo and workspace handling

### 🚀 Implementation Guide

- **[13-base-ui-adaptation.md](./13-base-ui-adaptation.md)** - Adapting the system for Base UI
- **[14-deployment-setup.md](./14-deployment-setup.md)** - Hosting and deployment configuration
- **[15-development-workflow.md](./15-development-workflow.md)** - Development and contribution workflow

## Key Insights

### What Makes Shadcn/UI Special

1. **Open Code Distribution**: Components are distributed as source code, not as packages
2. **Registry-Based Architecture**: A custom registry system manages component metadata and dependencies
3. **Semantic Theming**: Uses semantic color tokens instead of numbered scales
4. **Live Documentation**: Custom preview system renders components live in documentation
5. **Smart CLI**: Intelligent component installation with dependency resolution

### Technical Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Shadcn/UI Architecture                  │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐     │
│  │  Apps       │    │  Registry   │    │  CLI        │     │
│  │  ├─ v4      │    │  ├─ Index   │    │  ├─ Add     │     │
│  │  ├─ www     │◄───┤  ├─ Schema  │◄───┤  ├─ Init    │     │
│  │  └─ docs    │    │  └─ Build   │    │  └─ Build   │     │
│  └─────────────┘    └─────────────┘    └─────────────┘     │
│                                                             │
│  ┌─────────────────────────────────────────────────────────┤
│  │              Component Flow                             │
│  │                                                         │
│  │  Registry → Build Scripts → Index → Preview → CLI      │
│  │     ↓           ↓             ↓        ↓       ↓        │
│  │  Metadata → Static Files → Lazy → Live → Install       │
│  └─────────────────────────────────────────────────────────┘
└─────────────────────────────────────────────────────────────┘
```

### Base UI Adaptation Strategy

1. **Registry Adaptation**: Update component definitions to use Base UI primitives
2. **Theme Integration**: Maintain semantic theming but adapt for Base UI styling
3. **Build Process**: Modify build scripts to handle Base UI imports and dependencies
4. **CLI Updates**: Update component templates and installation logic
5. **Documentation**: Adapt preview system for Base UI components

## Getting Started

1. Read **[01-monorepo-structure.md](./01-monorepo-structure.md)** for overall architecture
2. Study **[04-registry-system.md](./04-registry-system.md)** for component management
3. Review **[07-preview-system.md](./07-preview-system.md)** for documentation system
4. Check **[13-base-ui-adaptation.md](./13-base-ui-adaptation.md)** for Base UI specific changes

## Tech Stack

- **Framework**: Next.js 14+
- **Styling**: Tailwind CSS v3/v4
- **Documentation**: MDX + Contentlayer/Fumadocs
- **Build System**: Turbo + pnpm
- **Component System**: Radix UI → Base UI (your adaptation)
- **CLI**: Commander.js + TypeScript

This documentation provides everything you need to build a sustainable, smart component library that rivals shadcn/ui but with Base UI as the foundation.
