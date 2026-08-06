import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        // Hangout Brand Colors
        hangout: {
          navy: '#0A0E1A',
          'navy-2': '#0F1525',
          'navy-3': '#161D2F',
          violet: '#7C3AED',
          'violet-light': '#9B5BFF',
          teal: '#06B6D4',
          'teal-light': '#22D3EE',
          rose: '#F43F5E',
          amber: '#F59E0B',
          emerald: '#34D399',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['"Cal Sans"', 'Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.75rem' }],
      },
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
        sidebar: '72px',
        'channel-sidebar': '240px',
      },
      keyframes: {
        // UI Animations
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        // Brand Animations
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'glow-pulse': {
          '0%, 100%': {
            opacity: '1',
            boxShadow: '0 0 20px rgba(124, 58, 237, 0.4)',
          },
          '50%': {
            opacity: '0.8',
            boxShadow: '0 0 40px rgba(124, 58, 237, 0.8)',
          },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.85)', opacity: '0.9' },
          '100%': { transform: 'scale(1.6)', opacity: '0' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'slide-up': {
          from: { transform: 'translateY(16px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-down': {
          from: { transform: 'translateY(-16px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-in-right': {
          from: { transform: 'translateX(20px)', opacity: '0' },
          to: { transform: 'translateX(0)', opacity: '1' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'scale-in': {
          from: { transform: 'scale(0.9)', opacity: '0' },
          to: { transform: 'scale(1)', opacity: '1' },
        },
        'typing-bounce': {
          '0%, 60%, 100%': { transform: 'translateY(0)' },
          '30%': { transform: 'translateY(-5px)' },
        },
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        aurora: {
          '0%': {
            backgroundPosition: '0% 50%',
            transform: 'rotate(0deg) scale(1)',
          },
          '33%': {
            backgroundPosition: '50% 100%',
            transform: 'rotate(120deg) scale(1.1)',
          },
          '66%': {
            backgroundPosition: '100% 0%',
            transform: 'rotate(240deg) scale(0.9)',
          },
          '100%': {
            backgroundPosition: '0% 50%',
            transform: 'rotate(360deg) scale(1)',
          },
        },
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        'bounce-in': {
          '0%': { transform: 'scale(0)', opacity: '0' },
          '60%': { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'wave': {
          '0%': { transform: 'rotate(0deg)' },
          '10%': { transform: 'rotate(14deg)' },
          '20%': { transform: 'rotate(-8deg)' },
          '30%': { transform: 'rotate(14deg)' },
          '40%': { transform: 'rotate(-4deg)' },
          '50%': { transform: 'rotate(10deg)' },
          '60%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        float: 'float 4s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'pulse-ring': 'pulse-ring 1.5s ease-out infinite',
        shimmer: 'shimmer 2s infinite',
        'slide-up': 'slide-up 0.3s ease-out',
        'slide-down': 'slide-down 0.3s ease-out',
        'slide-in-right': 'slide-in-right 0.3s ease-out',
        'fade-in': 'fade-in 0.2s ease-out',
        'scale-in': 'scale-in 0.2s ease-out',
        'typing-bounce': 'typing-bounce 1.4s ease-in-out infinite',
        'gradient-x': 'gradient-x 4s ease infinite',
        aurora: 'aurora 12s ease-in-out infinite',
        'spin-slow': 'spin-slow 8s linear infinite',
        'bounce-in': 'bounce-in 0.4s cubic-bezier(0.36, 0.07, 0.19, 0.97)',
        wave: 'wave 1.8s ease-in-out',
      },
      boxShadow: {
        'glow-sm': '0 0 10px -3px rgba(124, 58, 237, 0.4)',
        glow: '0 0 20px -5px rgba(124, 58, 237, 0.5)',
        'glow-lg': '0 0 40px -10px rgba(124, 58, 237, 0.6)',
        'glow-teal': '0 0 20px -5px rgba(6, 182, 212, 0.5)',
        'glow-rose': '0 0 20px -5px rgba(244, 63, 94, 0.5)',
        'glow-emerald': '0 0 20px -5px rgba(52, 211, 153, 0.5)',
        premium: '0 32px 64px -16px rgba(0, 0, 0, 0.6)',
        glass: 'inset 0 1px 0 rgba(255,255,255,0.08), 0 8px 32px rgba(0,0,0,0.4)',
        card: '0 4px 24px -4px rgba(0, 0, 0, 0.4)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-violet-teal':
          'linear-gradient(135deg, rgba(124, 58, 237, 0.8), rgba(6, 182, 212, 0.8))',
        'gradient-navy':
          'linear-gradient(180deg, #0F1525 0%, #0A0E1A 100%)',
        noise:
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E\")",
      },
      backdropBlur: {
        xs: '2px',
        '4xl': '72px',
      },
      transitionTimingFunction: {
        spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
      },
      zIndex: {
        sidebar: '40',
        header: '50',
        modal: '100',
        toast: '200',
      },
    },
  },
  plugins: [],
}

export default config
