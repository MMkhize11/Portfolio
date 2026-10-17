const SITE = 'https://www.mpumelelomkhize.com'
const PERSON = `${SITE}/#person`
const BUSINESS = `${SITE}/#business`
const IMAGE = `${SITE}/assets/images/brand/profileImage.jpg`

const offer = (name: string) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name } })

const graph = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': PERSON,
      name: 'Mpumelelo Mkhize',
      alternateName: ['Mpumelelo Khabazela Mkhize', 'Khabazela', 'The Tech Translator'],
      jobTitle: 'Systems Builder & Tech Translator',
      url: SITE,
      image: IMAGE,
      email: 'mmkhize11@gmail.com',
      description:
        'The Tech Translator — turning manual chaos into working systems: websites, apps, automations & AI integrations for small businesses, teams, and ministries.',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Johannesburg',
        addressRegion: 'Gauteng',
        addressCountry: 'ZA',
      },
      alumniOf: { '@type': 'CollegeOrUniversity', name: 'University of Johannesburg', url: 'https://www.uj.ac.za' },
      knowsAbout: [
        'AI Development', 'Automation Solutions', 'Chatbot Development', 'Firebase', 'Flutter',
        'Angular', 'Python', 'Web Development', 'Mobile Development', 'Cloud Computing',
        'Technical Translation', 'AI Integration',
      ],
      sameAs: [
        'https://www.linkedin.com/in/mpumelelohowardmkhize/',
        'https://www.instagram.com/mpumi_khabazela/',
      ],
    },
    {
      '@type': 'ProfessionalService',
      '@id': BUSINESS,
      name: 'The Tech Translator',
      url: SITE,
      image: IMAGE,
      founder: { '@id': PERSON },
      areaServed: ['South Africa', 'Worldwide'],
      address: { '@type': 'PostalAddress', addressLocality: 'Johannesburg', addressCountry: 'ZA' },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Services',
        itemListElement: ['App Development', 'Web App Development', 'Automation', 'AI Integrations'].map(offer),
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE}/#website`,
      name: 'The Tech Translator',
      url: SITE,
      publisher: { '@id': BUSINESS },
    },
  ],
}

export default function StructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, '\\u003c') }}
    />
  )
}
