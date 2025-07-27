# @bao/ui

## 1.1.0

### Minor Changes

- feda10f: Add comprehensive component library to the published package
  - **Switch**: Toggle switch component with Base UI integration, multiple sizes, and field integration
  - **Badge**: Versatile badge component with multiple variants (default, secondary, destructive, success, warning, outline, ghost)
  - **StatusBadge**: Status indicators with optional dot indicators
  - **NotificationBadge**: Count badges with overflow handling
  - **InteractiveBadge**: Removable badges for tags and filters
  - **Select**: Dropdown select component with Base UI integration and comprehensive styling
  - **Input**: Input field component with validation states and field integration
  - **Checkbox**: Checkbox component with indeterminate state support
  - **Radio**: Radio button groups with Base UI primitives

  All components include:
  - Full dark mode support using semantic color tokens
  - Multiple size variants (sm, default, lg)
  - Comprehensive TypeScript interfaces
  - Proper accessibility with ARIA attributes
  - Complete Storybook stories and documentation
  - Fixed naming conflicts and type issues for proper package publishing

## 2.0.0

### Major Changes

- b46980b: Initial release of bao-ui component library v1.0.0
  - Complete monorepo structure with 4 packages
  - Base UI integration with useRender patterns
  - Clean shadcn/ui-style components (Button, Dialog, Tooltip)
  - Automated release workflow with changesets
  - CLI for scaffolding components
  - TypeScript support throughout
  - Comprehensive testing and Storybook documentation

### Patch Changes

- Updated dependencies [b46980b]
  - @bao/core@2.0.0
  - @bao/tokens@2.0.0

## 1.0.0

### Major Changes

- a7d4369: Initial v0.1.0 release with monorepo architecture
  - **Monorepo structure** with 4 publishable packages
  - **Base UI integration** with useRender polymorphic components
  - **Tailwind-first styling** with visible contrast on all backgrounds
  - **CLI scaffolding** with render prop wrapper support
  - **Comprehensive testing** and Storybook documentation
  - **Changesets workflow** with linked versioning

### Patch Changes

- Updated dependencies [a7d4369]
  - @bao/core@1.0.0
  - @bao/tokens@1.0.0
