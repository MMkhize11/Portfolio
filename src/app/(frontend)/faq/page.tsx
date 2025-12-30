'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Search, ChevronDown, HelpCircle, DollarSign, Settings, Code, Users } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { SectionHeading, SlideIn, Transition } from '@/components/ui'
import { FAQ } from '@/utils/interfaces'

const categoryIcons: Record<string, React.ReactNode> = {
  'Pricing': <DollarSign className="w-4 h-4" />,
  'Process': <Settings className="w-4 h-4" />,
  'Technical': <Code className="w-4 h-4" />,
  'General': <Users className="w-4 h-4" />,
}

const categoryColors: Record<string, string> = {
  'Pricing': 'from-green-600/20 to-emerald-500/10',
  'Process': 'from-blue-600/20 to-indigo-500/10',
  'Technical': 'from-purple-600/20 to-violet-500/10',
  'General': 'from-orange-600/20 to-amber-500/10',
}

export default function FAQPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const categories = ['Pricing', 'Process', 'Technical', 'General']

  useEffect(() => {
    fetch('/api/faq')
      .then(res => res.json())
      .then(({ faqs }) => {
        setFaqs(faqs)
      })
      .catch(error => {
        console.error('Error fetching FAQs:', error)
      })
  }, [])

  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = !selectedCategory || faq.category === selectedCategory

    return matchesSearch && matchesCategory && faq.enabled
  })

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
  }

  // Generate FAQ Schema for SEO
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": filteredFaqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  }

  return (
    <main className="relative min-h-screen">
      {/* FAQ Schema for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Background decorations */}
      <span className="blob size-1/2 absolute -top-20 left-0 blur-[100px] -z-10" />
      <span className="blob size-1/2 absolute top-1/2 right-0 blur-[100px] -z-10" />

      <section className="max-w-5xl mx-auto px-4 py-16">
        {/* Header */}
        <SectionHeading className="md:pl-0 mb-6">
          <div className="flex items-center gap-6">
            <Link href="/" className="hover:opacity-70 transition-opacity">
              <ArrowLeft className="w-10 h-10 md:w-12 md:h-12" />
            </Link>
            <div>
              <SlideIn className="text-3xl md:text-5xl">Frequently Asked</SlideIn>
              <br />
              <SlideIn className="text-3xl md:text-5xl text-white/40">Questions</SlideIn>
            </div>
          </div>
        </SectionHeading>

        <Transition>
          <p className="text-white/60 text-lg md:text-xl max-w-2xl mb-12">
            Find answers to common questions about my services, process, pricing, and more.
            Can&apos;t find what you&apos;re looking for? <Link href="/#contact" className="text-primary hover:underline">Get in touch</Link>.
          </p>
        </Transition>

        {/* Search */}
        <Transition transition={{ delay: 0.2 }}>
          <div className="relative max-w-2xl mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-white/40 focus:outline-none focus:border-primary/50 transition-colors"
            />
          </div>
        </Transition>

        {/* Category filters */}
        <Transition transition={{ delay: 0.3 }}>
          <div className="flex flex-wrap gap-3 mb-12">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 ${
                !selectedCategory
                  ? 'bg-primary text-black border-primary font-medium'
                  : 'border-white/10 text-white/60 hover:border-white/30 hover:text-white'
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-primary text-black border-primary font-medium'
                    : 'border-white/10 text-white/60 hover:border-white/30 hover:text-white'
                }`}
              >
                {categoryIcons[category]}
                {category}
              </button>
            ))}
          </div>
        </Transition>

        {/* FAQ List */}
        <div className="space-y-4">
          {filteredFaqs.length === 0 ? (
            <Transition>
              <div className="text-center py-12">
                <p className="text-white/40 text-lg">No questions found matching your search.</p>
              </div>
            </Transition>
          ) : (
            filteredFaqs.map((faq, index) => (
              <Transition key={faq._id} transition={{ delay: 0.1 + index * 0.05 }}>
                <div
                  className={`
                    group relative overflow-hidden rounded-2xl border border-white/10
                    bg-gradient-to-br ${categoryColors[faq.category]} backdrop-blur-sm
                    transition-all duration-300 hover:border-white/20
                  `}
                >
                  <button
                    onClick={() => toggleExpand(faq._id)}
                    className="w-full text-left p-6 flex items-start justify-between gap-4"
                  >
                    <div className="flex items-start gap-4">
                      <span className="flex-shrink-0 w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                        {categoryIcons[faq.category]}
                      </span>
                      <div>
                        <span className="text-xs text-white/40 uppercase tracking-wider mb-1 block">
                          {faq.category}
                        </span>
                        <h3 className="text-lg md:text-xl font-medium text-white">
                          {faq.question}
                        </h3>
                      </div>
                    </div>
                    <motion.div
                      animate={{ rotate: expandedId === faq._id ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex-shrink-0 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center"
                    >
                      <ChevronDown className="w-5 h-5 text-white/60" />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {expandedId === faq._id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pl-20">
                          <p className="text-white/70 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Transition>
            ))
          )}
        </div>

        {/* CTA Section */}
        <Transition transition={{ delay: 0.5 }}>
          <div className="mt-16 text-center">
            <div className="inline-block p-8 rounded-3xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20">
              <h3 className="text-2xl md:text-3xl font-semibold mb-4">
                Still have questions?
              </h3>
              <p className="text-white/60 mb-6 max-w-md mx-auto">
                I&apos;m here to help. Book a free discovery call or send me a message.
              </p>
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-black font-medium hover:bg-primary/90 transition-colors"
              >
                Get in Touch
                <ArrowLeft className="w-4 h-4 rotate-180" />
              </Link>
            </div>
          </div>
        </Transition>
      </section>
    </main>
  )
}
