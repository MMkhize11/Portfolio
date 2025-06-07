'use client'

import { useEffect } from 'react'
import { MapPin, Phone, Mail } from 'lucide-react'
import Script from 'next/script'

interface ContactInfoProps {
  email: string
  phone?: string
  address?: {
    street?: string
    city?: string
    state?: string
    country?: string
    postalCode?: string
  }
}

export default function ContactInfo({ email, phone, address }: ContactInfoProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Mpumelelo Mkhize',
    jobTitle: 'Full-Stack Developer & Tech Translator',
    url: 'https://www.mpumelelomkhize.com',
    sameAs: [
      'https://linkedin.com/in/mpumelelohowardmkhize',
      'https://instagram.com/mpumi_khabazela'
    ],
    knowsAbout: [
      'Firebase',
      'Flutter',
      'Angular',
      'Python',
      'Web Development',
      'Mobile Development',
      'Technical Translation'
    ],
    ...(address && { address: {
      '@type': 'PostalAddress',
      streetAddress: address.street
    }}),
    ...(phone && { telephone: phone }),
    ...(email && { email: email })
  }

  return (
    <>
      <Script
        id="contact-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <section className="py-12 px-4 bg-black/20 rounded-lg border border-white/10">
        <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
        <div className="space-y-4">
          {address && (
            <div className="flex items-start gap-3">
              <svg
                className="w-6 h-6 mt-1 text-white/60"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <div>
                <h3 className="text-sm font-medium text-white/60">Address</h3>
                <p className="text-white/90">{address.street}</p>
              </div>
            </div>
          )}
          
          {phone && (
            <div className="flex items-start gap-3">
              <svg
                className="w-6 h-6 mt-1 text-white/60"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <div>
                <h3 className="text-sm font-medium text-white/60">Phone</h3>
                <a
                  href={`tel:${phone}`}
                  className="text-white/90 hover:text-white transition-colors"
                >
                  {phone}
                </a>
              </div>
            </div>
          )}
          
          {email && (
            <div className="flex items-start gap-3">
              <svg
                className="w-6 h-6 mt-1 text-white/60"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <div>
                <h3 className="text-sm font-medium text-white/60">Email</h3>
                <a
                  href={`mailto:${email}`}
                  className="text-white/90 hover:text-white transition-colors"
                >
                  {email}
                </a>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
} 