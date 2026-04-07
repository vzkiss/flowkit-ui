import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';

const eslintConfig = defineConfig([
  ...nextVitals,
  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'public/r/**',
    '.registry/**',
    'next-env.d.ts',
    '.source/**',
  ]),
]);

export default eslintConfig;