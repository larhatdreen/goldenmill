/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        'mobileMd': '360px', //360-480
        'mobileLg': '480px', //480-768
        'tablet': '640px',
        'laptop': '1220px', //1220-1280
        'desktopSm': '1280px', //1280-1366
        'desktopMd': '1366px', //1366-1440
        'desktopLg' : '1440px', //1440-1700
        'desktopFHD' : '1700px', //1700-1920
        'desktop2K' : '1920px', //1920-2560
        'desktop4k': '2560px', //2560-...
      },
      colors: {
        main: '#1A1B1C',
        navSelect: '#D5CDBD',
        navUnselect: '#A19F9B',
        dropdown: '#202020',
        footerBase: '#17181A',
        footerBottom: '#0F1013',
        footerBottomText: '#605C53',
        gold_: '#82653E',
        blue_: '#265C84',
        gold_svg: '#544B3C',
        grey_svg: "#2C2D2F",
        lightYellow_svg: "#969284",
        dark: {
          bg: '#1A1B1C',
          card: '#28292a',
          text: {
            primary: '#D5CDBD',
            secondary: '#605C54',
            muted: '#969284'
          },
          border: '#3A3B3C',
          hover: '#82653E'
        }
      },
      fontFamily: {
        'labgrotesque': ['LabGrotesque'],
        'labgrotesquebold': ['LabGrotesqueBold'],
        'bebas': ['BebasNeueRegular'],
        'adventpro': ['AdventProRegular'],
        'adventprolight': ['AdventProLight'],
        'bebasLight': ['BebasNeueLight'],
      },
      transitionProperty: {
        'height': 'height',
      },
      keyframes: {
        slideUp: {
          '0%': { 
            transform: 'translateY(100%)',
            opacity: '0'
          },
          '100%': { 
            transform: 'translateY(0)',
            opacity: '1'
          }
        },
        ring: {
          '0%, 100%': { 
            transform: 'rotate(0deg) scale(1)',
            filter: 'brightness(1)'
          },
          '5%, 15%': { 
            transform: 'rotate(25deg) scale(1.1)',
            filter: 'brightness(1.2)'
          },
          '10%, 20%': { 
            transform: 'rotate(-20deg) scale(1.1)',
            filter: 'brightness(1.1)'
          },
          '25%': {
            transform: 'rotate(0deg) scale(1)',
            filter: 'brightness(1)'
          },
          '35%': {
            transform: 'rotate(15deg) scale(1.05)',
            filter: 'brightness(1.1)'
          },
          '40%': {
            transform: 'rotate(-10deg) scale(1.05)',
            filter: 'brightness(1.05)'
          },
          '45%': {
            transform: 'rotate(0deg) scale(1)',
            filter: 'brightness(1)'
          }
        },
        shine: {
          '0%': {
            transform: 'translateX(-100%) translateY(-100%)',
            opacity: '0'
          },
          '10%': {
            transform: 'translateX(0%) translateY(0%)',
            opacity: '0.5'
          },
          '20%': {
            transform: 'translateX(100%) translateY(100%)',
            opacity: '0'
          },
          '100%': {
            transform: 'translateX(100%) translateY(100%)',
            opacity: '0'
          }
        },
        bounce: {
          '0%, 100%': {
            transform: 'translateY(0)',
          },
          '5%, 15%': {
            transform: 'translateY(2px)',
          },
          '10%, 20%': {
            transform: 'translateY(-2px)',
          }
        },
        glow: {
          '0%, 100%': {
            boxShadow: '0 0 5px rgba(130, 101, 62, 0.5)'
          },
          '50%': {
            boxShadow: '0 0 20px rgba(130, 101, 62, 0.8)'
          }
        }
      },
      animation: {
        slideUp: 'slideUp 0.6s ease-out',
        ring: 'ring 4s ease-in-out infinite',
        shine: 'shine 4s ease-in-out infinite',
        bounce: 'bounce 4s ease-in-out infinite',
        glow: 'glow 2s infinite'
      }
    }
  },
  plugins: [],
}

