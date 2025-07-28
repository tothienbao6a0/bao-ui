import * as React from 'react'
import { type VariantProps } from 'class-variance-authority'
declare const badgeVariants: (
  props?:
    | ({
        variant?:
          | 'default'
          | 'destructive'
          | 'outline'
          | 'secondary'
          | 'ghost'
          | 'success'
          | 'warning'
          | null
          | undefined
        size?: 'default' | 'sm' | 'lg' | null | undefined
      } & import('class-variance-authority/types').ClassProp)
    | undefined
) => string
export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}
declare const Badge: React.ForwardRefExoticComponent<
  BadgeProps & React.RefAttributes<HTMLDivElement>
>
export { Badge, badgeVariants }
//# sourceMappingURL=badge.d.ts.map
