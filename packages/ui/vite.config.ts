import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'BaoUI',
      formats: ['es'],
      fileName: 'index',
    },
    rollupOptions: {
      external: id => {
        return [
          'react',
          'react-dom',
          'react/jsx-runtime',
          '@base-ui-components/react',
          '@bao-ui/core',
          '@bao-ui/tokens',
          'framer-motion',
          'clsx',
          'dompurify',
          'tailwind-variants',
        ].some(ext => id === ext || id.startsWith(ext + '/'))
      },
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
})
