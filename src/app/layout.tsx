import './globals.css'
import type { Metadata } from 'next'
import { Cairo, DM_Sans, Fira_Sans, Inter, Poppins, Work_Sans } from 'next/font/google'
import Script from 'next/script'

// const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const hero = DM_Sans({ subsets: ['latin'], variable: '--font-hero' })
const body = DM_Sans({ subsets: ['latin'], variable: '--font-body', weight: '300' })

export const metadata: Metadata = {
    title: 'Derek Werbowy Soft Solutions',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang='en'>
            <Script async src='https://www.googletagmanager.com/gtag/js?id=G-3F1XY3JHCP'></Script>
            <Script id='google analytics'>
                {`            
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-3F1XY3JHCP');`}
            </Script>
            <body
                className={`${hero.variable} ${body.variable} min-w-screen min-h-screen bg-green-50 `}
            >
                {children}
            </body>
        </html>
    )
}
