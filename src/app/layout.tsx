import Background from '@/components/Background'
import './globals.css'
import type { Metadata } from 'next'
import { DM_Sans, Lemon } from 'next/font/google'
import Script from 'next/script'

const hero = DM_Sans({ subsets: ['latin'], variable: '--font-hero' })
const body = DM_Sans({ subsets: ['latin'], variable: '--font-body', weight: '300' })
const lemon = Lemon({ subsets: ['latin'], variable: '--font-lemon', weight: '400' })

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
                id='body'
                className={`${hero.variable} ${body.variable} ${lemon.variable} min-w-screen min-h-screen bg-green-50 -z-20 overflow-x-clip`}
            >
                <Background />
                {children}
            </body>
        </html>
    )
}
