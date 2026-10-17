import type { MetadataRoute } from 'next'
import { promises as fs } from 'fs'
import path from 'path'
import { sanityFetch } from '@/lib/sanity/client'

const SITE = 'https://www.mpumelelomkhize.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await sanityFetch<{ slug: string; _updatedAt: string }[]>({
    query: `*[_type == "post" && defined(slug.current)]{ "slug": slug.current, _updatedAt }`,
    tags: ['posts'],
  })

  let services: { slug: string }[] = []
  try {
    services = JSON.parse(await fs.readFile(path.join(process.cwd(), 'src/data/service-pages.json'), 'utf8'))
  } catch {
    // ponytail: file is optional; skip service pages if missing
  }

  return [
    { url: `${SITE}/` },
    { url: `${SITE}/blog` },
    { url: `${SITE}/faq` },
    ...(services.length ? [{ url: `${SITE}/services` }] : []),
    ...services.map((s) => ({ url: `${SITE}/services/${s.slug}` })),
    ...posts.map((p) => ({ url: `${SITE}/blog/${p.slug}`, lastModified: p._updatedAt })),
  ]
}
