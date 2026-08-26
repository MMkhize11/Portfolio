import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
// import './globals.css'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import Clarity from '@/components/Clarity'
import StructuredData from '@/components/StructuredData'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://www.mpumelelomkhize.com'),
  title: 'Mpumelelo Khabazela Mkhize - The Tech Translator',
  description: 'Mpumelelo Mkhize, The Tech Translator — turning manual chaos into working systems: websites, apps, automations & AI for small businesses, teams & ministries.',
  openGraph: {
    title: 'Mpumelelo Khabazela Mkhize - The Tech Translator',
    description: 'Mpumelelo Mkhize, The Tech Translator — turning manual chaos into working systems: websites, apps, automations & AI for small businesses, teams & ministries.',
    url: 'https://www.mpumelelomkhize.com',
    siteName: 'Mpumelelo Mkhize Portfolio',
    locale: 'en_ZA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mpumelelo Khabazela Mkhize - The Tech Translator',
    description: 'Mpumelelo Mkhize, The Tech Translator — turning manual chaos into working systems: websites, apps, automations & AI for small businesses, teams & ministries.',
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
        <GoogleAnalytics GA_MEASUREMENT_ID="G-YKMJBZ5M3E" />
        <Clarity projectId="utpyyc989u" />
        <StructuredData />
        {children}
      </body>
    </html>
  )
} 