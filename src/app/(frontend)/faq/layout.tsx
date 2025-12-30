import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FAQ - Mpumelelo Mkhize | App & Web Developer South Africa',
  description: 'Frequently asked questions about app development, web development, pricing, process, and services. Get answers about Flutter development, AI integrations, and more in Johannesburg, South Africa.',
  keywords: [
    'app development FAQ',
    'web development questions',
    'Flutter developer South Africa',
    'app development cost South Africa',
    'mobile app developer Johannesburg',
    'AI integration services',
    'software development pricing',
    'tech consultant FAQ'
  ],
  openGraph: {
    title: 'FAQ - Mpumelelo Mkhize | Tech Translator',
    description: 'Get answers to common questions about app development, web development, pricing, and process.',
    type: 'website',
    locale: 'en_ZA',
  },
  alternates: {
    canonical: '/faq',
  },
}

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
