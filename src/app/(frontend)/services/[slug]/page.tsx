import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight, Check, MessageCircle } from 'lucide-react';
import { servicePages, getServicePage, caseStudyTitles, SITE } from '../data';

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return servicePages.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = getServicePage((await params).slug);
  if (!page) return {};
  return {
    title: page.title,
    description: page.metaDescription,
    alternates: { canonical: `/services/${page.slug}` },
    openGraph: {
      title: page.title,
      description: page.metaDescription,
      url: `/services/${page.slug}`,
      type: 'website',
      locale: 'en_ZA',
      images: ['/og'],
    },
  };
}

export default async function ServicePage({ params }: Props) {
  const page = getServicePage((await params).slug);
  if (!page) notFound();

  const url = `${SITE}/services/${page.slug}`;
  const siblings = servicePages.filter((p) => p.slug !== page.slug);

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': `${url}#service`,
      name: page.name,
      serviceType: page.name,
      description: page.metaDescription,
      url,
      provider: { '@id': `${SITE}/#business` },
      areaServed: { '@type': 'Country', name: 'South Africa' },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
        { '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE}/services` },
        { '@type': 'ListItem', position: 3, name: page.name, item: url },
      ],
    },
  ];

  return (
    <main className="relative min-h-screen overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <span className="blob w-[70vw] h-[90vh] absolute -top-[20vh] -right-[20vw] blur-[120px] -z-10 opacity-40 pointer-events-none" />
      <span className="blob w-[60vw] h-[80vh] absolute top-[70vh] -left-[25vw] blur-[120px] -z-10 opacity-25 pointer-events-none" />

      <article className="max-w-3xl mx-auto px-4 md:px-8 pb-16">
        <header className="pt-28 md:pt-36">
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-white/60">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/services" className="hover:text-white">Services</Link>
            <span className="mx-2">/</span>
            <span className="text-white/90">{page.name}</span>
          </nav>
          <h1 className="text-[2rem] md:text-5xl lg:text-[3.25rem] font-bold text-white mb-6 leading-[1.1] tracking-[-0.015em] [text-wrap:balance]">
            {page.h1}
          </h1>
          <p className="text-lg md:text-xl text-white/70 mb-8 leading-relaxed">{page.intro}</p>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-black font-medium rounded-full hover:bg-primary/90 transition-colors"
          >
            Start a conversation <ArrowRight size={18} />
          </Link>
          <div className="h-px mt-10 mb-10 md:mb-12 bg-gradient-to-r from-orange-500/60 via-blue-600/40 to-transparent" />
        </header>

        <div className="prose prose-invert prose-lg max-w-none">
          {page.sections.map((s) => (
            <section key={s.heading}>
              <h2>{s.heading}</h2>
              {s.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </section>
          ))}

          {page.testimonial && (
            <blockquote>
              <p>&ldquo;{page.testimonial.quote}&rdquo;</p>
              <footer className="not-italic text-base text-white/60">
                {page.testimonial.name}, {page.testimonial.role}
              </footer>
            </blockquote>
          )}

          <h2>What you get</h2>
        </div>
        <ul className="mt-6 grid gap-3">
          {page.deliverables.map((d) => (
            <li key={d} className="flex gap-3 text-white/80">
              <Check size={20} className="text-orange-500 shrink-0 mt-1" />
              <span>{d}</span>
            </li>
          ))}
        </ul>

        <section className="mt-12 pt-8 border-t border-white/10">
          <h2 className="text-2xl font-bold text-white mb-4">Related case studies</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {page.caseStudies.map((slug) => (
              <Link
                key={slug}
                href={`/blog/${slug}`}
                className="group rounded-2xl border border-white/10 bg-white/5 p-5 hover:border-white/30 transition-colors"
              >
                <span className="block text-white font-medium mb-2">{caseStudyTitles[slug] ?? slug}</span>
                <span className="inline-flex items-center gap-1 text-sm text-orange-500">
                  Read the case study <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </section>

        {page.faqs && page.faqs.length > 0 && (
          <section className="mt-12 pt-8 border-t border-white/10">
            <h2 className="text-2xl font-bold text-white mb-4">Common questions</h2>
            <div className="grid gap-3">
              {page.faqs.map((f) => (
                <details key={f.q} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <summary className="cursor-pointer text-white font-medium">{f.q}</summary>
                  <p className="mt-3 text-white/70">{f.a}</p>
                </details>
              ))}
            </div>
            <p className="mt-4 text-white/60">
              More answers on the <Link href="/faq" className="text-orange-500 hover:underline">FAQ page</Link>.
            </p>
          </section>
        )}

        <section className="mt-12 pt-8 border-t border-white/10">
          <h2 className="text-2xl font-bold text-white mb-4">Other services</h2>
          <div className="flex flex-wrap gap-2">
            {siblings.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="px-4 py-2 text-sm rounded-full bg-white/5 border border-white/10 text-white/80 hover:bg-white/10 hover:text-white transition-colors"
              >
                {s.name}
              </Link>
            ))}
          </div>
        </section>

        <div className="mt-12 bg-gradient-to-br from-primary/10 to-blue-600/10 border border-white/10 rounded-2xl p-6 md:p-8">
          <div className="p-3 bg-primary/20 rounded-full w-fit mb-4">
            <MessageCircle size={24} className="text-primary" />
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-white mb-2">Tell me what you&apos;re working on</h2>
          <p className="text-white/60 mb-6">
            No jargon, no pressure. Just a conversation about what you need and whether I&apos;m the right fit.
          </p>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-black font-medium rounded-full hover:bg-primary/90 transition-colors"
          >
            Start a conversation <ArrowRight size={18} />
          </Link>
        </div>
      </article>
    </main>
  );
}
