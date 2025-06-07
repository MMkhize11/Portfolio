import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
// import './globals.css'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import StructuredData from '@/components/StructuredData'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://www.mpumelelomkhize.com'),
  title: 'Mpumelelo Mkhize Khabazela - Tech Translator & Full-Stack Developer',
  description: 'Mpumelelo Mkhize - Expert tech translator and full-stack developer specializing in AI, Automations, Firebase, Flutter, Angular, and Python. Building innovative web, mobile, and AI-powered solutions.',
  openGraph: {
    title: 'Mpumelelo Mkhize Khabazela - Tech Translator & Full-Stack Developer',
    description: 'Mpumelelo Mkhize - Expert tech translator and full-stack developer specializing in AI, Automations, Firebase, Flutter, Angular, and Python. Building innovative web, mobile, and AI-powered solutions.',
    url: 'https://www.mpumelelomkhize.com',
    siteName: 'Mpumelelo Mkhize Portfolio',
    locale: 'en_ZA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mpumelelo Mkhize Khabazela - Tech Translator & Full-Stack Developer',
    description: 'Mpumelelo Mkhize - Expert tech translator and full-stack developer specializing in AI, Automations, Firebase, Flutter, Angular, and Python. Building innovative web, mobile, and AI-powered solutions.',
    creator: '@mpumi_khabazela',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add these when you have them
    // google: 'your-google-site-verification',
    // yandex: 'your-yandex-verification',
  },
  alternates: {
    canonical: 'https://www.mpumelelomkhize.com',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {process.env.NEXT_PUBLIC_GA_TRACKING_ID && (
          <GoogleAnalytics GA_MEASUREMENT_ID={process.env.NEXT_PUBLIC_GA_TRACKING_ID} />
        )}
        <StructuredData />
        {children}
      </body>
    </html>
  )
} 