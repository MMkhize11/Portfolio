import { PortableTextComponents } from '@portabletext/react';
import Image from 'next/image';
import Link from 'next/link';
import { urlForImage } from './image';

export const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) {
        return null;
      }

      return (
        <figure className="my-8">
          <Image
            src={urlForImage(value).width(800).url()}
            alt={value.alt || ''}
            width={800}
            height={450}
            className="rounded-lg"
          />
          {value.caption && (
            <figcaption className="text-center text-sm text-white/60 mt-2">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
    codeBlock: ({ value }) => {
      return (
        <pre className="bg-white/5 border border-white/10 rounded-lg p-4 overflow-x-auto my-6">
          <code className={`language-${value.language || 'text'}`}>
            {value.code}
          </code>
        </pre>
      );
    },
  },
  marks: {
    link: ({ children, value }) => {
      const href = value?.href || '';
      const isExternal = href.startsWith('http');

      if (isExternal) {
        return (
          <a
            href={href}
            target={value?.openInNewTab ? '_blank' : undefined}
            rel={value?.openInNewTab ? 'noopener noreferrer' : undefined}
            className="text-blue-400 hover:underline"
          >
            {children}
          </a>
        );
      }

      return (
        <Link href={href} className="text-blue-400 hover:underline">
          {children}
        </Link>
      );
    },
    code: ({ children }) => (
      <code className="text-blue-300 bg-white/10 px-1 py-0.5 rounded">
        {children}
      </code>
    ),
  },
  block: {
    h1: ({ children }) => (
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-bold text-white mt-10 mb-4">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-bold text-white mt-8 mb-3">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-white/30 pl-4 my-6 text-white/70 italic">
        {children}
      </blockquote>
    ),
    normal: ({ children }) => (
      <p className="text-white/80 leading-relaxed mb-6">{children}</p>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside text-white/80 mb-6 space-y-2">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside text-white/80 mb-6 space-y-2">
        {children}
      </ol>
    ),
  },
};
