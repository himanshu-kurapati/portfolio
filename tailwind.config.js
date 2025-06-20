/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                dark: '#010101',
                'dark-secondary': '#010101',
                primary: '#7f5af0',
                secondary: '#2cb67d',
                accent: '#ff6b35',
                'text-primary': '#ffffff',
                'text-secondary': '#a1a1aa',
                'text-muted': '#71717a',
                // Card colors for shadcn compatibility
                background: '#010101',
                foreground: '#ffffff',
                card: '#010101',
                'card-foreground': '#ffffff',
                border: '#27272a',
                'muted-foreground': '#a1a1aa',
                gray: {
                    50: '#f9fafb',
                    100: '#f3f4f6',
                    200: '#e5e7eb',
                    300: '#d1d5db',
                    400: '#9ca3af',
                    500: '#6b7280',
                    600: '#4b5563',
                    700: '#374151',
                    800: '#1f2937',
                    900: '#111827',
                }
            },
            fontFamily: {
                sans: ['Quantico', 'Pixelify Sans', 'monospace', 'system-ui', 'sans-serif'],
                'pixelify': ['Pixelify Sans', 'monospace', 'sans-serif'],
                'quantico': ['Quantico', 'monospace', 'sans-serif'],
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
                'glass': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
            },
            backdropBlur: {
                xs: '2px',
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'glow': 'glow 2s ease-in-out infinite alternate',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                glow: {
                    from: { boxShadow: '0 0 20px #7f5af0' },
                    to: { boxShadow: '0 0 30px #7f5af0, 0 0 40px #7f5af0' },
                }
            },
        },
    },
    plugins: [],
} 