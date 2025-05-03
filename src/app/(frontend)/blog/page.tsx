'use client'

import BlogCard from "@/components/BlogCard";
import { SectionHeading, SlideIn, Transition } from "@/components/ui";
import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";
import { useState, useEffect } from "react";
import { BlogPost } from "@/types/blog";

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    // Fetch posts from the API endpoint
    fetch('/api/blog')
      .then(res => res.json())
      .then(({ posts }) => {
        setPosts(posts);
        // Extract unique categories
        const uniqueCategories = Array.from(
          new Set(posts.flatMap((post: BlogPost) => post.categories))
        );
        setCategories(uniqueCategories as string[]);
      })
      .catch(error => {
        console.error('Error fetching blog posts:', error);
      });
  }, []);

  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = !selectedCategory || post.categories.includes(selectedCategory);
    
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="relative">
      <span className="blob size-1/2 absolute -top-20 left-0 blur-[100px] -z-10" />
      <span className="blob size-1/2 absolute top-1/2 right-0 blur-[100px] -z-10" />
      
      <section className="max-w-7xl mx-auto px-4 py-16">
        <SectionHeading className="md:pl-28 mb-12">
          <div className="flex items-center gap-6">
            <Link 
              href="/" 
              className="hover:text-white/80 transition-colors"
            >
              <ArrowLeft className="w-10 h-10 md:w-12 md:h-12" />
            </Link>
            <SlideIn className="text-3xl md:text-4xl">Welcome to my blog</SlideIn>
          </div>
        </SectionHeading>

        {/* Search input */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
            <input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg py-2 pl-10 pr-4 
                focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
            />
          </div>
        </div>

        {/* Category chips */}
        <div className="flex flex-wrap gap-2 mb-8 max-w-2xl mx-auto">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-1 rounded-full border transition-colors ${
              selectedCategory === null
                ? 'bg-white/20 border-white/20'
                : 'border-white/10 hover:border-white/20'
            }`}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-1 rounded-full border transition-colors ${
                selectedCategory === category
                  ? 'bg-white/20 border-white/20'
                  : 'border-white/10 hover:border-white/20'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {filteredPosts.map((post: BlogPost) => (
            <Transition key={post.slug}>
              <BlogCard post={post} />
            </Transition>
          ))}
        </div>
      </section>
    </main>
  );
} 