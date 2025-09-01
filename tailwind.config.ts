import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: { navy: '#0A1A2F', gold: '#D4AF37' },
        ink: '#101828'
      },
      boxShadow: { softxl: '0 20px 40px rgba(0,0,0,0.08)' }
    }
  },
  plugins: []
}
export default config
