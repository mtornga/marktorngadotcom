import type { Config } from "tailwindcss";
import typography from '@tailwindcss/typography';

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Neo-brutalist color palette
        'neo-bg': '#FAFAFA',
        'neo-surface': '#FFFFFF',
        'neo-primary': '#FF006E',
        'neo-secondary': '#FFD60A',
        'neo-accent': '#00F5FF',
        'neo-text': '#1A1A1A',
        'neo-border': '#1A1A1A',
      },
      fontFamily: {
        heading: ['var(--font-space-grotesk)', 'sans-serif'],
        body: ['var(--font-inter)', 'sans-serif'],
      },
      boxShadow: {
        'neo': '8px 8px 0 rgba(26, 26, 26, 1)',
        'neo-sm': '4px 4px 0 rgba(26, 26, 26, 1)',
        'neo-lg': '12px 12px 0 rgba(26, 26, 26, 1)',
        'neo-hover': '4px 4px 0 rgba(26, 26, 26, 1)',
      },
      borderWidth: {
        'neo': '4px',
        'neo-thick': '6px',
      },
      typography: {
        DEFAULT: {
          css: {
            '--tw-prose-body': '#1A1A1A',
            '--tw-prose-headings': '#FF006E',
            '--tw-prose-links': '#FF006E',
            '--tw-prose-bold': '#1A1A1A',
            '--tw-prose-code': '#00F5FF',
            '--tw-prose-pre-bg': '#1A1A1A',
            '--tw-prose-pre-code': '#FAFAFA',
            maxWidth: 'none',
            color: 'var(--tw-prose-body)',
            fontSize: '1.125rem',
            lineHeight: '1.75',
            fontFamily: 'var(--font-inter)',
            h1: {
              fontFamily: 'var(--font-space-grotesk)',
              fontWeight: '700',
              color: 'var(--tw-prose-headings)',
            },
            h2: {
              fontFamily: 'var(--font-space-grotesk)',
              fontWeight: '700',
              color: 'var(--tw-prose-headings)',
            },
            h3: {
              fontFamily: 'var(--font-space-grotesk)',
              fontWeight: '700',
              color: 'var(--tw-prose-headings)',
            },
            a: {
              color: 'var(--tw-prose-links)',
              textDecoration: 'underline',
              textDecorationThickness: '4px',
              textUnderlineOffset: '4px',
              fontWeight: '700',
              '&:hover': {
                color: '#00F5FF',
              },
            },
            code: {
              color: 'var(--tw-prose-code)',
              fontWeight: '600',
              backgroundColor: '#1A1A1A',
              padding: '0.25rem 0.5rem',
              borderRadius: '0',
              border: '2px solid #1A1A1A',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            pre: {
              backgroundColor: 'var(--tw-prose-pre-bg)',
              color: 'var(--tw-prose-pre-code)',
              border: '4px solid #1A1A1A',
              borderRadius: '0',
              padding: '1.5rem',
            },
            ul: {
              listStyleType: 'square',
            },
            strong: {
              fontWeight: '700',
            },
          },
        },
      },
    },
  },
  plugins: [typography],
};

export default config;
