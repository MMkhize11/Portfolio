import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Resources & Case Studies | Mpumelelo Mkhize - Tech Translator',
  description: 'Explore real-world case studies, project insights, and technical resources. Learn from Flutter apps, AI chatbots, web development projects, and more from a South African developer.',
  keywords: [
    'Flutter case studies',
    'app development case studies',
    'web development portfolio',
    'AI chatbot projects',
    'WhatsApp bot development',
    'South African tech projects',
    'mobile app examples',
    'developer resources'
  ],
  openGraph: {
    title: 'Resources & Case Studies | Mpumelelo Mkhize',
    description: 'Real-world case studies and insights from app and web development projects.',
    type: 'website',
    locale: 'en_ZA',
  },
  alternates: {
    canonical: '/blog',
  },
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
