import './globals.css'
import type { Metadata } from 'next'
import { Cairo, DM_Sans, Fira_Sans, Inter, Poppins, Work_Sans } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const hero = DM_Sans({ subsets: ['latin'], variable: '--font-hero' })
const body = DM_Sans({ subsets: ['latin'], variable: '--font-body', weight: '300' })
export const metadata: Metadata = {
    title: 'DW Soft Solutions',
    description: 'Derek Werbowy Soft Solutions',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang='en'>
            <body
                className={`${hero.variable} ${body.variable} min-w-screen min-h-screen bg-green-50 `}
            >
                {children}
            </body>
        </html>
    )
}
