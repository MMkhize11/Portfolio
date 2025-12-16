import { createClient, type QueryParams } from 'next-sanity';
import { apiVersion, dataset, projectId } from '@/sanity/env';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: 'published',
});

export const previewClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  perspective: 'previewDrafts',
  token: process.env.SANITY_API_TOKEN,
});

export async function sanityFetch<T>({
  query,
  params = {},
  revalidate = 60,
  tags = [],
  isDraftMode = false,
}: {
  query: string;
  params?: QueryParams;
  revalidate?: number | false;
  tags?: string[];
  isDraftMode?: boolean;
}): Promise<T> {
  const sanityClient = isDraftMode ? previewClient : client;

  return sanityClient.fetch<T>(query, params, {
    next: {
      revalidate: isDraftMode ? 0 : revalidate,
      tags,
    },
  });
}
