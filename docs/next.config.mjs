import nextra from 'nextra'

const withNextra = nextra({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
})

export default withNextra({
  eslint: {
    // ESLint managed on the root level
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
  },
})
