import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'
import prettier from "eslint-plugin-prettier"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    // Рекомендуемые конфигурации ESLint, React и Prettier
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    ...compat.extends('next/core-web-vitals', 'next/typescript'),
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: { prettier },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        semi: false,
        trailingComma: 'es5',
        printWidth: 80,
      },
    ],
  },
}

export default eslintConfig
