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
  experimental: {
    externalDir: true,
  },
  reactStrictMode: true,
  webpack: (config) => {
    // Allow importing .stories.tsx files
    config.module.rules.push({
      test: /\.stories\.(js|jsx|ts|tsx)$/,
      use: [
        {
          loader: 'babel-loader',
          options: {
            presets: ['next/babel'],
          },
        },
      ],
    })
    
    // Add resolve paths for external packages
    config.resolve.modules = [
      ...(config.resolve.modules || []),
      'node_modules',
      '../packages/ui/node_modules',
      '../node_modules',
    ]
    
    return config
  },
})
