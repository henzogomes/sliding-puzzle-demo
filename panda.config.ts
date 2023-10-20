import { defineConfig, defineRecipe } from '@pandacss/dev'
import { defineTextStyles } from '@pandacss/dev'

export const textStyles = defineTextStyles({
  typographyH1: {
    description: 'H1 typography',
    value: {
      fontWeight: 700,
      fontSize: '28px'
    }
  }
})

export const pageSectionContainer = defineRecipe({
  className: 'pageSectionContainer',
  description: 'Page section container',
  base: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px 0',
    maxWidth: '980px',
    width: '100%',
    margin: '0 auto'
  }
})

export const textShadow = defineRecipe({
  className: 'textShadow',
  description: 'Text shadow',
  base: {
    textShadow: '1px 1px 1px #000'
  }
})

export const desktopOnly = defineRecipe({
  className: 'desktopOnly',
  description: 'Desktop only',
  base: {
    lgOnly: {
      display: 'block'
    },
    lgDown: {
      display: 'none'
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
      recipes: {
        desktopOnly: desktopOnly,
        pageSectionContainer: pageSectionContainer,
        textShadow: textShadow
      },
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
  globalCss: {
    '::selection': {
      backgroundColor: 'primary'
    }
  },

  // The output directory for your css system
  outdir: 'styled-system'
})
