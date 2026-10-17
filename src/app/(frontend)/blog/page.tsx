import type { Metadata } from 'next'
import { sanityFetch } from '@/lib/sanity/client'
import { postsQuery } from '@/lib/sanity/queries'
import { urlForImage } from '@/lib/sanity/image'
import type { SanityPost } from '@/types/sanity'
import type { BlogPost } from '@/types/blog'
import BlogList from './blog-list'

export const metadata: Metadata = {
  title: 'Case Studies & Resources',
  description: 'Explore real-world case studies, project insights, and technical resources. Learn from Flutter apps, AI chatbots, web development projects, and more from a South African developer.',
  openGraph: {
    title: 'Case Studies & Resources | Mpumelelo Mkhize',
    description: 'Real-world case studies and insights from app and web development projects.',
    type: 'website',
    locale: 'en_ZA',
    images: ['/og'],
  },
  alternates: {
    canonical: '/blog',
  },
}

export default async function BlogPage() {
  let posts: BlogPost[] = []
  try {
    const raw = await sanityFetch<SanityPost[]>({ query: postsQuery, tags: ['posts'] })
    posts = raw.map((post) => ({
      id: post._id,
      title: post.title,
      slug: post.slug.current,
      excerpt: post.excerpt || '',
      content: '',
      coverImage: post.coverImage?.asset
        ? urlForImage(post.coverImage).width(600).url()
        : '/placeholder-image.jpg',
      date: post.publishedAt,
      categories: post.categories || [],
      tags: post.tags || [],
    }))
  } catch (error) {
    console.error('Error fetching blog posts:', error)
  }

  return <BlogList posts={posts} />
}
