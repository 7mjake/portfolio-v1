import path from 'node:path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: { alias: { '@': path.resolve(process.cwd()) } },
  test: {
    environment: 'node',
    exclude: ['tests/e2e/**', 'node_modules/**', '.next/**'],
    coverage: { reporter: ['text', 'json'] },
  },
})
