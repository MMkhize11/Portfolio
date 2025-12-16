import { notFound } from 'next/navigation';
import { draftMode } from 'next/headers';
import { PortableText } from '@portabletext/react';
import { sanityFetch } from '@/lib/sanity/client';
import { postBySlugQuery, postSlugsQuery } from '@/lib/sanity/queries';
import { portableTextComponents } from '@/lib/sanity/portable-text';
import { BackButton } from './back-button';
import type { SanityPost } from '@/types/sanity';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await sanityFetch<string[]>({
    query: postSlugsQuery,
    tags: ['posts'],
  });

  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await sanityFetch<SanityPost | null>({
    query: postBySlugQuery,
    params: { slug },
    tags: ['posts'],
  });

  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const { isEnabled: isDraftMode } = await draftMode();

  const post = await sanityFetch<SanityPost | null>({
    query: postBySlugQuery,
    params: { slug },
    tags: ['posts'],
    isDraftMode,
  });

  if (!post) {
    notFound();
  }

  return (
    <main className="relative">
      <span className="blob size-1/2 absolute -top-20 left-0 blur-[100px] -z-10" />
      <span className="blob size-1/2 absolute top-1/2 right-0 blur-[100px] -z-10" />

      <article className="max-w-4xl mx-auto px-4 py-16">
        <div className="flex items-center gap-4 mb-4">
          <BackButton />
        </div>

        <div className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {post.categories.map((category) => (
              <span
                key={category}
                className="px-3 py-1 text-sm rounded-full bg-white/10 text-white/70"
              >
                {category}
              </span>
            ))}
          </div>
          <p className="text-white/50 text-sm">
            {new Date(post.publishedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>

        <div className="prose prose-invert prose-lg max-w-none">
          <PortableText value={post.content} components={portableTextComponents} />
        </div>
      </article>
    </main>
  );
}
