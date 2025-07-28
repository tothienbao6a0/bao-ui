import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@/components': resolve(__dirname, './src/components'),
      '@/hooks': resolve(__dirname, './src/hooks'),
      '@/lib': resolve(__dirname, './registry/base-ui-v4/lib'),
      '@/registry': resolve(__dirname, './registry'),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'BaoUI',
      formats: ['es', 'umd'],
      fileName: format => `bao-ui.${format}.js`,
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'framer-motion',
        '@base-ui-components/react',
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'framer-motion': 'Motion',
          '@base-ui-components/react': 'BaseUI',
        },
      },
    },
    sourcemap: true,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
  },
})
