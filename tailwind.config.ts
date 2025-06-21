import { defineConfig } from 'vite'
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0D98BA',
      }
    },
  },
  plugins: [],
}

export default config