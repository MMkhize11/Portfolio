import { notFound } from 'next/navigation';
import { draftMode } from 'next/headers';
import { PortableText } from '@portabletext/react';
import Image from 'next/image';
import { sanityFetch } from '@/lib/sanity/client';
import { postBySlugQuery, postSlugsQuery } from '@/lib/sanity/queries';
import { portableTextComponents, blockText, headingId } from '@/lib/sanity/portable-text';
import { urlForImage } from '@/lib/sanity/image';
import { BackButton } from './back-button';
import { ReadingProgress } from './reading-progress';
import { ArticleNav } from './article-nav';
import type { SanityPost } from '@/types/sanity';
import type { Metadata } from 'next';
import { Calendar, Clock, Tag, ArrowRight, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { EmailCapture } from '@/components/email-capture';

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

  const headings = post.content
    .filter((block) => block._type === 'block' && block.style === 'h2')
    .map((block) => ({ id: headingId(block), text: blockText(block) }));

  return (
    <main className="relative min-h-screen">
      {/* Reading Progress Bar */}
      <ReadingProgress />

      {/* Chapter list + back to top */}
      <ArticleNav headings={headings} />

      {/* Ambient glow, one layer behind header and body so there's no seam between them */}
      <span className="blob w-[70vw] h-[90vh] absolute -top-[20vh] -right-[20vw] blur-[120px] -z-10 opacity-40 pointer-events-none" />
      <span className="blob w-[60vw] h-[80vh] absolute top-[70vh] -left-[25vw] blur-[120px] -z-10 opacity-25 pointer-events-none" />

      {/* Back Button */}
      <div className="absolute top-6 left-4 md:left-8 z-20">
        <BackButton />
      </div>

      <article className="relative">
        <div className="max-w-3xl mx-auto px-4 md:px-8 pb-16">
          {/* Header, sharing the body's column so title and text line up */}
          <header className="pt-28 md:pt-36">
            {/* Categories */}
            <div className="flex flex-wrap gap-2 mb-6">
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
            <h1 className="text-[2rem] md:text-5xl lg:text-[3.25rem] font-bold text-white mb-6 leading-[1.1] tracking-[-0.015em] [text-wrap:balance]">
              {post.title}
            </h1>

            {/* Excerpt */}
            {post.excerpt && (
              <p className="text-lg md:text-xl text-white/70 mb-8 leading-relaxed">
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

            {coverImageUrl && (
              <div className="relative aspect-video mt-10 rounded-2xl overflow-hidden border border-white/10">
                <Image
                  src={coverImageUrl}
                  alt={post.coverImage?.alt || post.title}
                  fill
                  sizes="(min-width: 768px) 768px, 100vw"
                  className="object-cover"
                  priority
                />
              </div>
            )}

            {/* Hand-off from header to body */}
            <div className="h-px mt-10 mb-10 md:mb-12 bg-gradient-to-r from-orange-500/60 via-blue-600/40 to-transparent" />
          </header>

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

          {/* CTA + Email Capture, side by side from md up */}
          <div className="mt-12 pt-8 border-t border-white/10 grid md:grid-cols-2 gap-6">
            <div className="h-full bg-gradient-to-br from-primary/10 to-blue-600/10 border border-white/10 rounded-2xl p-6 md:p-8">
              <div className="flex flex-col items-start gap-4">
                <div className="p-3 bg-primary/20 rounded-full">
                  <MessageCircle size={24} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                    Want similar results for your business?
                  </h3>
                  <p className="text-white/60 mb-6">
                    Let&apos;s discuss how I can help translate your ideas into solutions that deliver real value.
                  </p>
                  <div className="flex flex-col gap-3">
                    <Link
                      href="/#contact"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-black font-medium rounded-full hover:bg-primary/90 transition-colors"
                    >
                      Start a conversation
                      <ArrowRight size={18} />
                    </Link>
                    <Link
                      href="/blog"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-white/20 text-white font-medium rounded-full hover:border-white/40 transition-colors"
                    >
                      View more case studies
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <EmailCapture
              title="Get notified of new case studies"
              description="Subscribe to receive updates when I publish new project deep-dives and tech insights."
            />
          </div>

          {/* Bottom Navigation */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <BackButton variant="full" />
          </div>
        </div>
      </article>
    </main>
  );
}
