import type { Metadata } from 'next'
import { promises as fs } from 'fs'
import { FAQ } from '@/utils/interfaces'
import FAQList from './faq-list'

export const metadata: Metadata = {
  title: 'FAQ: Web & App Development in South Africa',
  description: 'Frequently asked questions about app development, web development, pricing, process, and services. Get answers about Flutter development, AI integrations, and more.',
  openGraph: {
    title: 'FAQ | Mpumelelo Mkhize',
    description: 'Get answers to common questions about app development, web development, pricing, and process.',
    type: 'website',
    locale: 'en_ZA',
    images: ['/og'],
  },
  alternates: {
    canonical: '/faq',
  },
}

async function getFaqs(): Promise<FAQ[]> {
  try {
    const file = await fs.readFile(process.cwd() + '/src/data/profile.json', 'utf8')
    const faqs: FAQ[] = JSON.parse(file).user.faqs || []
    return faqs.filter((faq) => faq.enabled).sort((a, b) => a.sequence - b.sequence)
  } catch (error) {
    console.error('Error fetching FAQs:', error)
    return []
  }
}

export default async function FAQPage() {
  const faqs = await getFaqs()

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, '\\u003c') }}
      />
      <FAQList faqs={faqs} />
    </>
  )
}
