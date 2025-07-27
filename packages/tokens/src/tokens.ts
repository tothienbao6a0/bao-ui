import plugin from 'tailwindcss/plugin'

export const colors = {
  background: {
    DEFAULT: 'hsl(var(--background))',
    muted: 'hsl(var(--background-muted))',
  },
  foreground: {
    DEFAULT: 'hsl(var(--foreground))',
    muted: 'hsl(var(--foreground-muted))',
  },
  primary: {
    DEFAULT: 'hsl(var(--primary))',
    foreground: 'hsl(var(--primary-foreground))',
    hover: 'hsl(var(--primary-hover))',
  },
  secondary: {
    DEFAULT: 'hsl(var(--secondary))',
    foreground: 'hsl(var(--secondary-foreground))',
    hover: 'hsl(var(--secondary-hover))',
  },
  destructive: {
    DEFAULT: 'hsl(var(--destructive))',
    foreground: 'hsl(var(--destructive-foreground))',
    hover: 'hsl(var(--destructive-hover))',
  },
  border: {
    DEFAULT: 'hsl(var(--border))',
    hover: 'hsl(var(--border-hover))',
  },
  ring: 'hsl(var(--ring))',
}

export const spacing = {
  0: '0px',
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  8: '32px',
  10: '40px',
  12: '48px',
  16: '64px',
  20: '80px',
  24: '96px',
}

export const radius = {
  none: '0px',
  sm: '4px',
  DEFAULT: '6px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  '2xl': '24px',
  full: '9999px',
}

export const motion = {
  duration: {
    fast: '150ms',
    normal: '200ms',
    slow: '300ms',
  },
  easing: {
    default: 'cubic-bezier(0.4, 0, 0.2, 1)',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
}

export const tokens: {
  colors: typeof colors
  spacing: typeof spacing
  radius: typeof radius
  motion: typeof motion
  plugin: ReturnType<typeof plugin>
} = {
  colors,
  spacing,
  radius,
  motion,
  plugin: plugin(({ addBase }) => {
    addBase({
      ':root': {
        '--background': '0 0% 100%',
        '--background-muted': '210 40% 98%',
        '--foreground': '222.2 84% 4.9%',
        '--foreground-muted': '215.4 16.3% 46.9%',
        '--primary': '221.2 83.2% 53.3%',
        '--primary-foreground': '210 40% 98%',
        '--primary-hover': '221.2 83.2% 48%',
        '--secondary': '210 40% 96%',
        '--secondary-foreground': '222.2 84% 4.9%',
        '--secondary-hover': '210 40% 92%',
        '--destructive': '0 84.2% 60.2%',
        '--destructive-foreground': '210 40% 98%',
        '--destructive-hover': '0 84.2% 55%',
        '--border': '214.3 31.8% 91.4%',
        '--border-hover': '214.3 31.8% 85%',
        '--ring': '221.2 83.2% 53.3%',
      },
      '.dark': {
        '--background': '222.2 84% 4.9%',
        '--background-muted': '217.2 32.6% 17.5%',
        '--foreground': '210 40% 98%',
        '--foreground-muted': '215 20.2% 65.1%',
        '--primary': '217.2 91.2% 59.8%',
        '--primary-foreground': '222.2 84% 4.9%',
        '--primary-hover': '217.2 91.2% 65%',
        '--secondary': '217.2 32.6% 17.5%',
        '--secondary-foreground': '210 40% 98%',
        '--secondary-hover': '217.2 32.6% 22%',
        '--destructive': '0 62.8% 30.6%',
        '--destructive-foreground': '210 40% 98%',
        '--destructive-hover': '0 62.8% 35%',
        '--border': '217.2 32.6% 17.5%',
        '--border-hover': '217.2 32.6% 22%',
        '--ring': '217.2 91.2% 59.8%',
      },
      '*': {
        '@apply border-border': {},
      },
      body: {
        '@apply bg-background text-foreground': {},
      },
    })
  }),
}