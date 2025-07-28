import { z } from 'zod'

export const registryItemTypeSchema = z.enum([
  'registry:ui',
  'registry:block',
  'registry:example',
  'registry:hook',
  'registry:lib',
  'registry:theme',
  'registry:style',
  'registry:page',
  'registry:component',
  'registry:internal',
])

export const registryItemFileSchema = z.object({
  path: z.string(),
  content: z.string().optional(),
  type: registryItemTypeSchema.optional(),
  target: z.string().optional(),
})

export const registryItemSchema = z.object({
  name: z.string(),
  type: registryItemTypeSchema,
  description: z.string().optional(),
  dependencies: z.array(z.string()).optional(),
  devDependencies: z.array(z.string()).optional(),
  registryDependencies: z.array(z.string()).optional(),
  files: z.array(registryItemFileSchema).optional(),
  tailwind: z
    .object({
      config: z.record(z.any()).optional(),
    })
    .optional(),
  cssVars: z.record(z.record(z.any())).optional(),
  meta: z.record(z.any()).optional(),
  docs: z.string().optional(),
  // Base UI specific fields
  baseUI: z
    .object({
      components: z.array(z.string()).optional(),
      version: z.string().optional(),
      customizations: z.record(z.any()).optional(),
    })
    .optional(),
})

export const registrySchema = z.object({
  name: z.string(),
  items: z.array(registryItemSchema),
})

export type Registry = z.infer<typeof registrySchema>
export type RegistryItem = z.infer<typeof registryItemSchema>
export type RegistryItemFile = z.infer<typeof registryItemFileSchema>
export type RegistryItemType = z.infer<typeof registryItemTypeSchema>
