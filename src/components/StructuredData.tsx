'use client'

import { useEffect } from 'react'

export default function StructuredData() {
  useEffect(() => {
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
        'Cloud Computing',
        'Technical Translation'
      ],
      description: 'Expert tech translator and full-stack developer specializing in Firebase, Flutter, Angular, and Python. Building innovative web and mobile solutions.',
      alumniOf: {
        '@type': 'Organization',
        name: 'University of Johannesburg',
        url: 'https://www.uj.ac.za'
      },
      worksFor: {
        '@type': 'Organization',
        name: 'Freelance Developer & Tech Translator',
        url: 'https://www.mpumelelomkhize.com'
      }
    }

    // Add the structured data to the page
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.text = JSON.stringify(structuredData)
    document.head.appendChild(script)

    // Cleanup
    return () => {
      document.head.removeChild(script)
    }
  }, [])

  return null
} 