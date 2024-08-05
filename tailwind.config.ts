import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        fontFamily: {
            hero: ['var(--font-hero'],
            body: ['var(--font-body)'],
            lemon: ['var(--font-lemon)'],
            quote: ['var(--font-quote)'],
            gill: ['var(--font-gill-sans)'],
        },
    },
    plugins: [],
}
export default config
