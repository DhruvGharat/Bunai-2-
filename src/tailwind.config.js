module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        maroon: '#800000',
        mustard: '#FFB400',
        'forest-green': '#228B22',
        'soft-cream': '#FFF6E6',
        'neutral-dark': '#1a1a1a',
        terracotta: '#E2725B',
        clay: '#B66E41',
        sand: '#F4E2D8',
        teal: '#24796C',
        ochre: '#CC7722',
        'tribal-blue': '#2C3E50',
        'tribal-gold': '#D4AF37',
        'tribal-green': '#4E944F',
        'tribal-red': '#A23E48',
        'tribal-brown': '#7C4F20',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif']
      },
      boxShadow: {
        'soft': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        'button': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
      },
      animation: {
        'scale-hover': 'scale-hover 0.2s ease-in-out'
      },
      keyframes: {
        'scale-hover': {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.05)' }
        }
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms')
  ]
}
