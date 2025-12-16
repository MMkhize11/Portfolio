import imageUrlBuilder from '@sanity/image-url';
import type { Image } from 'sanity';
import { client } from './client';

const builder = imageUrlBuilder(client);

export function urlForImage(source: Image) {
  return builder.image(source);
}

export function getImageDimensions(image: Image) {
  if (!image?.asset?._ref) {
    return { width: 1200, height: 630 };
  }

  const ref = image.asset._ref as string;
  const [, , dimensions] = ref.split('-');
  const [width, height] = dimensions.split('x').map(Number);

  return { width, height };
}

export function getSanityImageProps(image: Image, alt: string = '') {
  if (!image?.asset?._ref) {
    return {
      src: '/placeholder-image.jpg',
      alt,
    };
  }

  const { width, height } = getImageDimensions(image);

  return {
    src: urlForImage(image).width(width).url(),
    alt: (image as Image & { alt?: string }).alt || alt,
    width,
    height,
    blurDataURL: urlForImage(image).width(24).quality(30).blur(50).url(),
    placeholder: 'blur' as const,
  };
}
