'use client'

import BlogCard from "@/components/BlogCard";
import { SectionHeading, SlideIn, Transition } from "@/components/ui";
import Link from "next/link";
import { ArrowLeft, Search, Sparkles, Clock, TrendingUp, BookOpen, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { BlogPost } from "@/types/blog";

type SortOption = 'latest' | 'popular' | 'alphabetical';

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>('latest');
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

  const filteredPosts = posts
    .filter((post) => {
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = !selectedCategory || post.categories.includes(selectedCategory);

      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'latest':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'alphabetical':
          return a.title.localeCompare(b.title);
        case 'popular':
        default:
          return 0; // Keep original order for popular (could add view count later)
      }
    });

  // Featured post (first post or most recent)
  const featuredPost = posts[0];
  const remainingPosts = filteredPosts.filter(p => p.slug !== featuredPost?.slug);

  return (
    <main className="relative min-h-screen">
      <span className="blob size-1/2 absolute -top-20 left-0 blur-[100px] -z-10" />
      <span className="blob size-1/2 absolute top-1/2 right-0 blur-[100px] -z-10" />

      <section className="max-w-7xl mx-auto px-4 py-16">
        {/* Header */}
        <SectionHeading className="md:pl-0 mb-6">
          <div className="flex items-center gap-6">
            <Link href="/" className="hover:opacity-70 transition-opacity">
              <ArrowLeft className="w-10 h-10 md:w-12 md:h-12" />
            </Link>
            <div>
              <SlideIn className="text-3xl md:text-5xl">Resources</SlideIn>
              <br />
              <SlideIn className="text-3xl md:text-5xl text-white/40">& Case Studies</SlideIn>
            </div>
          </div>
        </SectionHeading>

        <Transition>
          <p className="text-white/60 text-lg md:text-xl max-w-3xl mb-12">
            Explore real projects, client success stories, and insights on how technology
            can solve business challenges. Learn from detailed case studies and practical guides.
          </p>
        </Transition>

        {/* Featured Post */}
        {featuredPost && !searchQuery && !selectedCategory && (
          <Transition transition={{ delay: 0.2 }}>
            <div className="mb-12">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-primary" />
                <span className="text-primary font-medium text-sm uppercase tracking-wider">Featured</span>
              </div>
              <Link href={`/blog/${featuredPost.slug}`}>
                <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-primary/20 to-primary/5 backdrop-blur-sm transition-all duration-500 hover:border-primary/30 hover:scale-[1.01]">
                  <div className="grid md:grid-cols-2 gap-6 p-6 md:p-8">
                    {/* Image */}
                    <div className="relative aspect-video md:aspect-auto md:h-full rounded-2xl overflow-hidden">
                      <img
                        src={featuredPost.coverImage}
                        alt={featuredPost.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="flex flex-col justify-center">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {featuredPost.categories.slice(0, 3).map((cat) => (
                          <span key={cat} className="px-3 py-1 text-xs rounded-full bg-white/10 text-white/70">
                            {cat}
                          </span>
                        ))}
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-primary transition-colors">
                        {featuredPost.title}
                      </h2>
                      <p className="text-white/60 mb-6 line-clamp-3">
                        {featuredPost.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-white/40">
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            5 min read
                          </span>
                          <span>{new Date(featuredPost.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                        <span className="flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all">
                          Read More <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </Transition>
        )}

        {/* Search and Filters */}
        <Transition transition={{ delay: 0.3 }}>
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            {/* Search input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-white/40 focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>

            {/* Sort options */}
            <div className="flex gap-2">
              <button
                onClick={() => setSortBy('latest')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all ${
                  sortBy === 'latest'
                    ? 'bg-white/10 border-white/20 text-white'
                    : 'border-white/10 text-white/50 hover:border-white/20 hover:text-white/70'
                }`}
              >
                <Clock className="w-4 h-4" />
                <span className="hidden sm:inline">Latest</span>
              </button>
              <button
                onClick={() => setSortBy('popular')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all ${
                  sortBy === 'popular'
                    ? 'bg-white/10 border-white/20 text-white'
                    : 'border-white/10 text-white/50 hover:border-white/20 hover:text-white/70'
                }`}
              >
                <TrendingUp className="w-4 h-4" />
                <span className="hidden sm:inline">Popular</span>
              </button>
              <button
                onClick={() => setSortBy('alphabetical')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all ${
                  sortBy === 'alphabetical'
                    ? 'bg-white/10 border-white/20 text-white'
                    : 'border-white/10 text-white/50 hover:border-white/20 hover:text-white/70'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span className="hidden sm:inline">A-Z</span>
              </button>
            </div>
          </div>
        </Transition>

        {/* Category chips */}
        <Transition transition={{ delay: 0.4 }}>
          <div className="flex flex-wrap gap-2 mb-10">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-full border transition-all duration-300 ${
                selectedCategory === null
                  ? 'bg-primary text-black border-primary font-medium'
                  : 'border-white/10 text-white/60 hover:border-white/30 hover:text-white'
              }`}
            >
              All Resources
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full border transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-primary text-black border-primary font-medium'
                    : 'border-white/10 text-white/60 hover:border-white/30 hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </Transition>

        {/* Results count */}
        <Transition transition={{ delay: 0.45 }}>
          <p className="text-white/40 text-sm mb-6">
            Showing {searchQuery || selectedCategory ? remainingPosts.length : filteredPosts.length} resources
            {selectedCategory && ` in ${selectedCategory}`}
            {searchQuery && ` matching "${searchQuery}"`}
          </p>
        </Transition>

        {/* Posts grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(searchQuery || selectedCategory ? remainingPosts : filteredPosts).map((post: BlogPost, index) => (
            <Transition key={post.slug} transition={{ delay: 0.1 + index * 0.05 }}>
              <BlogCard post={post} />
            </Transition>
          ))}
        </div>

        {/* Empty state */}
        {filteredPosts.length === 0 && (
          <Transition>
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-white/20" />
              </div>
              <h3 className="text-xl font-medium mb-2">No resources found</h3>
              <p className="text-white/40 mb-6">Try adjusting your search or filter criteria</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory(null);
                }}
                className="px-6 py-2 rounded-full border border-white/20 hover:border-white/40 transition-colors"
              >
                Clear filters
              </button>
            </div>
          </Transition>
        )}

        {/* Quick links to other pages */}
        <Transition transition={{ delay: 0.6 }}>
          <div className="mt-16 grid md:grid-cols-2 gap-6">
            <Link href="/faq" className="group">
              <div className="p-6 rounded-2xl border border-white/10 bg-white/5 hover:border-primary/30 transition-all">
                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                  Have Questions?
                </h3>
                <p className="text-white/50 text-sm mb-4">
                  Check out our FAQ for answers to common questions about services, pricing, and process.
                </p>
                <span className="text-primary text-sm flex items-center gap-2">
                  View FAQ <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          </div>
        </Transition>
      </section>
    </main>
  );
}
