import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  dts: {
    compilerOptions: {
      composite: false,
      declaration: true,
      declarationMap: true,
    },
  },
  clean: true,
  external: ['vue', '@mono/utils'],
  splitting: false,
  sourcemap: true,
  treeshake: true,
});
