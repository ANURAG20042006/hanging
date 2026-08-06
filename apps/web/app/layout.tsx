import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from './providers'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const viewport: Viewport = {
  themeColor: '#0A0E1A',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export const metadata: Metadata = {
  title: {
    default: 'Hangout — The Digital Home for Friends',
    template: '%s | Hangout',
  },
  description:
    'A private, invite-only platform where friend groups communicate, share memories, watch content together, and play games.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    title: 'Hangout',
    statusBarStyle: 'black-translucent',
  },
  openGraph: {
    type: 'website',
    siteName: 'Hangout',
    title: 'Hangout — The Digital Home for Friends',
    description: 'Private clubhouse for your friend group. Chat, watch, play, plan — all in one place.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hangout — The Digital Home for Friends',
  },
  formatDetection: { telephone: false },
  keywords: ['friends', 'chat', 'games', 'movies', 'planning', 'clubhouse', 'social'],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body className={`${inter.variable} font-sans min-h-screen bg-[#0A0E1A] text-white antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
