import { groq } from 'next-sanity';

export const postsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    coverImage {
      asset->,
      alt
    },
    "categories": categories[]->title,
    tags
  }
`;

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    coverImage {
      asset->,
      alt
    },
    "categories": categories[]->title,
    tags,
    content
  }
`;

export const postSlugsQuery = groq`
  *[_type == "post" && defined(slug.current)][].slug.current
`;

export const categoriesQuery = groq`
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    slug,
    description
  }
`;

export const postsByCategoryQuery = groq`
  *[_type == "post" && $category in categories[]->title] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    coverImage {
      asset->,
      alt
    },
    "categories": categories[]->title,
    tags
  }
`;

export const searchPostsQuery = groq`
  *[_type == "post" && (
    title match $searchTerm ||
    excerpt match $searchTerm ||
    pt::text(content) match $searchTerm
  )] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    coverImage {
      asset->,
      alt
    },
    "categories": categories[]->title,
    tags
  }
`;
