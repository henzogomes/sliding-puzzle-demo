import { defineConfig } from '@pandacss/dev'
import { defineTextStyles } from '@pandacss/dev'

export const textStyles = defineTextStyles({
  typographyH1: {
    description: 'H1 typography',
    value: {
      fontWeight: 700,
      fontSize: '36px'
    }
  }
})

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ['./src/**/*.{js,jsx,ts,tsx}'],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {
      textStyles
    },
    tokens: {
      colors: {
        primary: { value: '#875d5180' },
        secondary: { value: '#422e31' },
        accent: { value: '#d6c894' }
      }
    }
  },

  // The output directory for your css system
  outdir: 'styled-system'
})
