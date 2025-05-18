import { promises as fs } from 'fs';
import { notFound } from 'next/navigation';
import { BlogPost } from '@/types/blog';
import Link from 'next/link';
import { ChevronLeftIcon } from '@heroicons/react/24/solid';
import { BackButton } from './back-button';

interface BlogPreview {
  posts: BlogPost[];
}

export default async function BlogPostPage(
  props: {
    params: Promise<{ slug: string }>;
  }
) {
  const params = await props.params;
  // Read the blog data
  const blogFile = await fs.readFile(process.cwd() + '/src/data/blog.json', 'utf8');
  const blogData = JSON.parse(blogFile) as BlogPreview;

  // Find the post with matching slug
  const post = blogData.posts.find((post) => post.slug === params.slug);

  // If post not found, return 404
  if (!post) {
    notFound();
  }

  return (
    <main className="relative">
      <span className="blob size-1/2 absolute -top-20 left-0 blur-[100px] -z-10" />
      <span className="blob size-1/2 absolute top-1/2 right-0 blur-[100px] -z-10" />
      
      <article className="max-w-4xl mx-auto px-4 py-16">
        <div className="flex items-center gap-4 mb-8">
          <BackButton />
          <h1 className="text-3xl md:text-4xl font-bold">{post.title}</h1>
        </div>
        <div className="prose prose-invert max-w-none">
          {post.content}
        </div>
      </article>
    </main>
  );
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  const blogFile = await fs.readFile(process.cwd() + '/src/data/blog.json', 'utf8');
  const blogData = JSON.parse(blogFile) as BlogPreview;

  return blogData.posts.map((post) => ({
    slug: post.slug,
  }));
} 