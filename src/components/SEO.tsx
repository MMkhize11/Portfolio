'use client'

import { Metadata } from 'next'

interface SEOProps {
  title?: string
  description?: string
  canonical?: string
  ogImage?: string
  ogType?: 'website' | 'article'
  twitterCard?: 'summary' | 'summary_large_image'
  noIndex?: boolean
}

const defaultSEO = {
  title: 'Mpumelelo Mkhize Khabazela - Tech Translator & Full-Stack Developer',
  description: 'Mpumelelo Mkhize - Expert tech translator and full-stack developer specializing in Firebase, Flutter, Angular, and Python. Building innovative web and mobile solutions.',
  ogImage: 'https://www.mpumelelomkhize.com/og-image.jpg',
  ogType: 'website' as const,
  twitterCard: 'summary_large_image' as const,
}

export function generateMetadata({
  title,
  description,
  canonical,
  ogImage,
  ogType,
  twitterCard,
  noIndex,
}: SEOProps = {}): Metadata {
  const siteTitle = title ? `${title} | Mpumelelo Mkhize` : defaultSEO.title
  const siteDescription = description || defaultSEO.description
  const siteUrl = 'https://www.mpumelelomkhize.com'
  const canonicalUrl = canonical ? `${siteUrl}${canonical}` : siteUrl
  const ogImageUrl = ogImage || defaultSEO.ogImage

  return {
    title: siteTitle,
    description: siteDescription,
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: siteTitle,
      description: siteDescription,
      url: canonicalUrl,
      siteName: 'Mpumelelo Mkhize Portfolio',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: 'Mpumelelo Mkhize - Tech Translator & Full-Stack Developer',
        },
      ],
      locale: 'en_ZA',
      type: ogType || defaultSEO.ogType,
    },
    twitter: {
      card: twitterCard || defaultSEO.twitterCard,
      title: siteTitle,
      description: siteDescription,
      images: [ogImageUrl],
      creator: '@mpumi_khabazela',
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

// This component is for client-side meta tag updates
export default function SEO({
  title,
  description,
  canonical,
  ogImage,
  ogType,
  twitterCard,
  noIndex,
}: SEOProps) {
  const metadata = generateMetadata({
    title,
    description,
    canonical,
    ogImage,
    ogType,
    twitterCard,
    noIndex,
  })

  return null // This component doesn't render anything, it's just for type safety
} 