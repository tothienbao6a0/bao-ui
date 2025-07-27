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
    
    return config
  },
})
