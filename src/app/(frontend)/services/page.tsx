import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import { servicePages, SITE } from './data';

const description =
  'Websites, mobile apps, business automation, AI integrations and church websites, built in Johannesburg for small businesses, teams and ministries in South Africa.';

export const metadata: Metadata = {
  title: 'Services: Web, App, Automation & AI Development',
  description,
  alternates: { canonical: '/services' },
  openGraph: { title: 'Services | Mpumelelo Mkhize', description, url: '/services', type: 'website', locale: 'en_ZA', images: ['/og'] },
};

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
    { '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE}/services` },
  ],
};

export default function ServicesIndex() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb).replace(/</g, '\\u003c') }}
      />
      <span className="blob w-[70vw] h-[90vh] absolute -top-[20vh] -right-[20vw] blur-[120px] -z-10 opacity-40 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 md:px-8 pt-28 md:pt-36 pb-16">
        <h1 className="text-[2rem] md:text-5xl font-bold text-white mb-6 leading-[1.1] tracking-[-0.015em] [text-wrap:balance]">
          Services: websites, apps, automation and AI
        </h1>
        <p className="text-lg md:text-xl text-white/70 mb-10 leading-relaxed max-w-3xl">
          I&apos;m a developer and systems builder in Johannesburg, helping small businesses, teams and ministries
          turn manual chaos into working software. Pick the service closest to what you need, or{' '}
          <Link href="/#contact" className="text-orange-500 hover:underline">tell me about your project</Link>.
        </p>
        <div className="h-px mb-10 bg-gradient-to-r from-orange-500/60 via-blue-600/40 to-transparent" />

        <div className="grid md:grid-cols-2 gap-5">
          {servicePages.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="group rounded-2xl border border-white/10 bg-white/5 p-6 hover:border-white/30 transition-colors"
            >
              <h2 className="text-xl font-bold text-white mb-2">{s.name}</h2>
              <p className="text-white/60 mb-4">{s.metaDescription}</p>
              <span className="inline-flex items-center gap-1 text-sm text-orange-500">
                Learn more <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          ))}
        </div>

        <p className="mt-10 text-white/60">
          Want to see the work first? Browse the <Link href="/blog" className="text-orange-500 hover:underline">case studies</Link>{' '}
          or read the <Link href="/faq" className="text-orange-500 hover:underline">FAQ</Link>.
        </p>
      </div>
    </main>
  );
}
