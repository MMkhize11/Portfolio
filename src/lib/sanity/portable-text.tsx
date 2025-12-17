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
        <figure className="my-10">
          <div className="relative rounded-2xl overflow-hidden border border-white/10">
            <Image
              src={urlForImage(value).width(1200).url()}
              alt={value.alt || ''}
              width={1200}
              height={675}
              className="w-full h-auto"
            />
          </div>
          {value.caption && (
            <figcaption className="text-center text-sm text-white/50 mt-3 italic">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
    codeBlock: ({ value }) => {
      return (
        <div className="my-8 rounded-2xl overflow-hidden border border-white/10">
          <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/10">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500/60" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <span className="w-3 h-3 rounded-full bg-green-500/60" />
            </div>
            {value.language && (
              <span className="ml-auto text-xs text-white/40 font-mono">
                {value.language}
              </span>
            )}
          </div>
          <pre className="bg-white/[0.02] p-4 overflow-x-auto">
            <code className={`language-${value.language || 'text'} text-sm font-mono text-white/80`}>
              {value.code}
            </code>
          </pre>
        </div>
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
            className="text-orange-400 hover:text-orange-300 underline underline-offset-2 decoration-orange-400/30 hover:decoration-orange-300/50 transition-colors"
          >
            {children}
          </a>
        );
      }

      return (
        <Link
          href={href}
          className="text-orange-400 hover:text-orange-300 underline underline-offset-2 decoration-orange-400/30 hover:decoration-orange-300/50 transition-colors"
        >
          {children}
        </Link>
      );
    },
    code: ({ children }) => (
      <code className="text-orange-300 bg-orange-500/10 px-1.5 py-0.5 rounded-md font-mono text-sm">
        {children}
      </code>
    ),
    strong: ({ children }) => (
      <strong className="font-bold text-white">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="italic text-white/90">{children}</em>
    ),
  },
  block: {
    h1: ({ children }) => (
      <h1 className="text-3xl md:text-4xl font-bold text-white mt-12 mb-6 first:mt-0">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl md:text-3xl font-bold text-white mt-12 mb-4 pb-2 border-b border-white/10">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl md:text-2xl font-semibold text-white mt-10 mb-4">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg md:text-xl font-semibold text-white mt-8 mb-3">
        {children}
      </h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-8 pl-6 border-l-4 border-gradient-to-b from-orange-500 to-blue-600 relative">
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-orange-500 to-blue-600 rounded-full" />
        <div className="pl-2 text-lg text-white/70 italic leading-relaxed">
          {children}
        </div>
      </blockquote>
    ),
    normal: ({ children }) => (
      <p className="text-white/80 leading-relaxed mb-6 text-base md:text-lg">
        {children}
      </p>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-none text-white/80 mb-6 space-y-3 ml-1">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-none text-white/80 mb-6 space-y-3 ml-1 counter-reset-list">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="flex items-start gap-3 text-base md:text-lg leading-relaxed">
        <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-gradient-to-r from-orange-500 to-blue-600 flex-shrink-0" />
        <span>{children}</span>
      </li>
    ),
    number: ({ children }) => (
      <li className="flex items-start gap-3 text-base md:text-lg leading-relaxed counter-increment-list">
        <span className="mt-0.5 w-6 h-6 rounded-full bg-gradient-to-r from-orange-500/20 to-blue-600/20 border border-white/10 flex items-center justify-center text-sm text-white/70 flex-shrink-0 font-medium">
          <span className="counter-list" />
        </span>
        <span>{children}</span>
      </li>
    ),
  },
};
