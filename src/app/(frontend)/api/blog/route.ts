import { NextResponse } from 'next/server';
import { sanityFetch } from '@/lib/sanity/client';
import { postsQuery, postsByCategoryQuery, searchPostsQuery } from '@/lib/sanity/queries';
import { urlForImage } from '@/lib/sanity/image';
import type { SanityPost } from '@/types/sanity';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');

    let posts: SanityPost[];

    if (search) {
      posts = await sanityFetch<SanityPost[]>({
        query: searchPostsQuery,
        params: { searchTerm: `*${search}*` },
        tags: ['posts'],
      });
    } else if (category) {
      posts = await sanityFetch<SanityPost[]>({
        query: postsByCategoryQuery,
        params: { category },
        tags: ['posts'],
      });
    } else {
      posts = await sanityFetch<SanityPost[]>({
        query: postsQuery,
        tags: ['posts'],
      });
    }

    const transformedPosts = posts.map((post) => ({
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
    }));

    return NextResponse.json({ posts: transformedPosts });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
}
