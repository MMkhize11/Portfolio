import Link from 'next/link';
import Image from 'next/image';
import { BlogPost } from '@/types/blog';

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="...">
      <div className="rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm hover:border-white/20 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1">
        <div className="relative aspect-video">
          <Image
            src={post.coverImage || '/placeholder-image.jpg'} 
            alt={post.title}
            fill
            className="object-cover rounded-t-lg"
          />
        </div>
        <div className="p-4">
          <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
          <p className="text-white/60 line-clamp-2">{post.excerpt}</p>
          <div className="mt-4 text-sm text-white/40">
            {new Date(post.date).toLocaleDateString()}
          </div>
        </div>
      </div>
    </Link>
  );
} 