import antfu from '@antfu/eslint-config'

export default antfu({
  ignores: [
    '**/node_modules/**',
    '**/dist/**',
    '.nuxt/**',
    '.output/**',
  ],
  overrides: [
    {
      files: ['**/*.json', '**/*.jsonc'],
      rules: {
        'jsonc/sort-keys': ['error', 'asc', { caseSensitive: true, natural: true }],
      },
    },
    {
      files: ['**/*.ts', '**/*.js'],
      rules: {
        'node/prefer-global/process': 'off',
      },
    },
  ],
  typescript: true,
  vue: true,
})
