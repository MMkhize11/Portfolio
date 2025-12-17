import { notFound } from 'next/navigation';
import { draftMode } from 'next/headers';
import { PortableText } from '@portabletext/react';
import Image from 'next/image';
import { sanityFetch } from '@/lib/sanity/client';
import { postBySlugQuery, postSlugsQuery } from '@/lib/sanity/queries';
import { portableTextComponents } from '@/lib/sanity/portable-text';
import { urlForImage } from '@/lib/sanity/image';
import { BackButton } from './back-button';
import { ReadingProgress } from './reading-progress';
import type { SanityPost } from '@/types/sanity';
import type { Metadata } from 'next';
import { Calendar, Clock, Tag } from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

// Calculate reading time
function calculateReadingTime(content: any[]): number {
  const text = content
    ?.map((block) => {
      if (block._type === 'block' && block.children) {
        return block.children.map((child: any) => child.text).join('');
      }
      return '';
    })
    .join(' ') || '';

  const wordsPerMinute = 200;
  const wordCount = text.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
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

  const readingTime = calculateReadingTime(post.content);
  const coverImageUrl = post.coverImage?.asset?._ref
    ? urlForImage(post.coverImage).width(1920).height(1080).url()
    : null;

  return (
    <main className="relative min-h-screen">
      {/* Reading Progress Bar */}
      <ReadingProgress />

      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden">
        {/* Background Image */}
        {coverImageUrl ? (
          <Image
            src={coverImageUrl}
            alt={post.coverImage?.alt || post.title}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-blue-600/20" />
        )}

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/40 to-transparent" />

        {/* Back Button */}
        <div className="absolute top-6 left-4 md:left-8 z-20">
          <BackButton />
        </div>

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 lg:p-16">
          <div className="max-w-4xl mx-auto">
            {/* Categories */}
            <div className="flex flex-wrap gap-2 mb-4">
              {post.categories.map((category) => (
                <span
                  key={category}
                  className="px-3 py-1 text-xs md:text-sm font-medium rounded-full bg-gradient-to-r from-orange-500/20 to-blue-600/20 border border-white/20 text-white/90 backdrop-blur-sm"
                >
                  {category}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
              {post.title}
            </h1>

            {/* Excerpt */}
            {post.excerpt && (
              <p className="text-lg md:text-xl text-white/70 mb-6 max-w-2xl leading-relaxed">
                {post.excerpt}
              </p>
            )}

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 md:gap-6 text-white/60 text-sm md:text-base">
              <div className="flex items-center gap-2">
                <Calendar size={18} className="text-orange-500" />
                <time dateTime={post.publishedAt}>
                  {new Date(post.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={18} className="text-blue-500" />
                <span>{readingTime} min read</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Decorative Blobs */}
      <span className="blob size-1/2 absolute top-[60vh] left-0 blur-[100px] -z-10 opacity-50" />
      <span className="blob size-1/2 absolute top-[100vh] right-0 blur-[100px] -z-10 opacity-50" />

      {/* Article Content */}
      <article className="relative">
        <div className="max-w-3xl mx-auto px-4 md:px-8 py-12 md:py-16">
          {/* Content */}
          <div className="prose prose-invert prose-lg max-w-none">
            <PortableText value={post.content} components={portableTextComponents} />
          </div>

          {/* Tags Section */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-white/10">
              <div className="flex items-center gap-2 mb-4">
                <Tag size={20} className="text-orange-500" />
                <h3 className="text-lg font-semibold text-white">Tags</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-2 text-sm rounded-full bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:text-white transition-colors cursor-default"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Navigation */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <BackButton variant="full" />
          </div>
        </div>
      </article>
    </main>
  );
}
