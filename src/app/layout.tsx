import './globals.css'
import type { Metadata } from 'next'
import { Cairo, Fira_Sans, Inter, Poppins, Work_Sans } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const workSans = Work_Sans({ subsets: ['latin'], variable: '--font-hero' })
const cairo = Fira_Sans({ subsets: ['latin'], variable: '--font-body', weight: '300' })
export const metadata: Metadata = {
    title: 'DW Soft Solutions',
    description: 'Derek Werbowy Soft Solutions',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang='en'>
            <body
                className={`${inter.variable} ${workSans.variable} ${cairo.variable} min-w-screen min-h-screen bg-green-50`}
            >
                {children}
            </body>
        </html>
    )
}
