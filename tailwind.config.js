/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0fbff',
          100: '#d0f0ff',
          200: '#a7e3ff',
          300: '#73cfff',
          400: '#3cb9ff',
          500: '#0a9dff',
          600: '#0080ff',
          700: '#0066d6',
          800: '#0053ad',
          900: '#00448c',
        },
        secondary: {
          50: '#fff6e5',
          100: '#ffe8b8',
          200: '#ffd88a',
          300: '#ffc95c',
          400: '#ffba2e',
          500: '#ffab00',
          600: '#e69a00',
          700: '#cc8800',
          800: '#b37700',
          900: '#996600',
        },
        accent: {
          50: '#f9f5ff',
          100: '#eedaff',
          200: '#d8b4ff',
          300: '#c28eff',
          400: '#ab68ff',
          500: '#9542ff',
          600: '#841dff',
          700: '#7a00f8',
          800: '#6600cc',
          900: '#520099',
        },
        success: {
          50: '#e8faf0',
          100: '#c1f0d6',
          200: '#9ae6bc',
          300: '#73dca2',
          400: '#4cd288',
          500: '#26c86e',
          600: '#1eb863',
          700: '#16a758',
          800: '#0e964d',
          900: '#067842',
        },
        error: {
          50: '#ffeaea',
          100: '#ffcccc',
          200: '#ff9999',
          300: '#ff6666',
          400: '#ff3333',
          500: '#ff0000',
          600: '#e60000',
          700: '#cc0000',
          800: '#b30000',
          900: '#990000',
        }
      },
      fontFamily: {
        cartoon: ['Comic Neue', 'cursive'],
        round: ['Varela Round', 'sans-serif'],
        kids: ['Bubblegum Sans', 'cursive']
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'scale': 'scale 2s ease-in-out infinite',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        scale: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
        '4xl': '3rem',
      },
      boxShadow: {
        'soft': '0 4px 10px rgba(0, 0, 0, 0.05)',
        'kid': '0 6px 0 rgba(0, 0, 0, 0.2)',
        'pressable': '0 4px 0 rgba(0, 0, 0, 0.2)',
        'pressed': '0 2px 0 rgba(0, 0, 0, 0.2)',
      }
    }
  },
  plugins: [],
}