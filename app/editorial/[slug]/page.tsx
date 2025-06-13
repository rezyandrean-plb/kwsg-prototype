"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, Clock, User, Tag, Share2, BookmarkPlus, List } from "lucide-react"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"

// Add TableOfContents type
type TableOfContents = {
  id: string
  text: string
  level: number
}

// Add article content type
type ArticleContent = {
  type: "paragraph" | "heading" | "image" | "quote"
  text?: string
  src?: string
  alt?: string
}

// Add article type
type Article = {
  title: string
  excerpt: string
  featuredImage: string
  date: string
  readTime: string
  author: {
    name: string
    role: string
    image: string
    bio: string
  }
  content: ArticleContent[]
  tags: string[]
}

// Sample article data for testing
const articleData: Article = {
  title: "The Future of Luxury Living in Singapore",
  excerpt: "Explore how luxury residential developments are evolving to meet the demands of modern homeowners.",
  featuredImage: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80",
  date: "March 15, 2024",
  readTime: "5 min read",
  author: {
    name: "John Smith",
    role: "Senior Real Estate Analyst",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80",
    bio: "With over 15 years of experience in real estate analysis, John provides expert insights into market trends and investment opportunities."
  },
  content: [
    {
      type: "heading",
      text: "Introduction to Luxury Living"
    },
    {
      type: "paragraph",
      text: "Singapore's luxury real estate market continues to evolve, offering unprecedented opportunities for discerning homeowners and investors alike."
    },
    {
      type: "heading",
      text: "Emerging Trends in Luxury Developments"
    },
    {
      type: "paragraph",
      text: "The latest luxury developments are incorporating cutting-edge technology and sustainable features to create truly exceptional living spaces."
    },
    {
      type: "heading",
      text: "Smart Home Integration"
    },
    {
      type: "paragraph",
      text: "Modern luxury homes are becoming increasingly intelligent, with integrated systems for security, climate control, and entertainment."
    },
    {
      type: "heading",
      text: "Sustainable Luxury"
    },
    {
      type: "paragraph",
      text: "Sustainability is no longer just a trend but a fundamental aspect of luxury living in Singapore."
    }
  ],
  tags: ["Luxury Living", "Market Trends", "Smart Homes", "Sustainability"]
}

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

export default function BlogPostPage() {
  const [headings, setHeadings] = useState<TableOfContents[]>([])
  const [activeId, setActiveId] = useState<string>("")

  // Extract headings from content and create table of contents
  useEffect(() => {
    // Extract headings from the article content
    const toc = articleData.content
      .filter(section => section.type === "heading")
      .map((section, index) => ({
        id: `heading-${index}`,
        text: section.text || "",
        level: 2 // All headings in our content are h2
      }))
    setHeadings(toc)

    // Set up Intersection Observer for active heading
    const headingElements = Array.from(document.querySelectorAll('h2[id^="heading-"]'));
    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: "-20% 0px -80% 0px",
        threshold: 0
      }
    )
    headingElements.forEach((heading) => observer.observe(heading))
    return () => observer.disconnect()
  }, [])

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const offset = 100 // Adjust this value based on your header height
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      })
    }
  }

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen flex flex-col bg-black text-white"
    >
      {/* Back Button at the very top */}
      <div className="max-w-7xl mx-auto w-full px-4 pt-16">
        <Link href="/editorial" className="inline-flex items-center text-gray-400 hover:text-white mb-8 group">
          <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back
        </Link>
      </div>

      <article className="max-w-7xl mx-auto w-full px-4 py-12 relative">
        {/* Centered Title, Meta, and Tags above the image */}
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 text-center">
            {articleData.title}
          </h1>
          <div className="flex justify-center items-center text-gray-400 mb-4 text-sm gap-2">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{articleData.date}</span>
            <span>•</span>
            <Clock className="h-4 w-4 mr-1" />
            <span>08.45 AM</span>
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            {articleData.tags.map((tag, index) => (
              <span key={index} className="bg-white text-primary-red px-3 py-1 rounded-full text-sm font-medium">
                {tag}
              </span>
            ))}
          </div>
        </div>
        {/* Featured Image - now full width */}
        <div className="relative w-full aspect-[16/9] mb-12 rounded-xl overflow-hidden">
          <Image
            src={articleData.featuredImage}
            alt={articleData.title}
            fill
            className="object-cover brightness-[0.4]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/20" />
        </div>
        {/* Content and TOC below image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 lg:grid-cols-4 gap-8"
        >
          {/* Table of Contents */}
          {headings.length > 0 && (
            <div className="hidden lg:block lg:col-span-1">
              <div className="sticky top-32 flex flex-col px-2">
                <div className="mb-4">
                  <div className="flex items-center gap-2">
                  <List className="h-4 w-4 text-primary-red" />
                  <h2 className="text-sm font-semibold text-white">Contents</h2>
                  </div>
                </div>
                <ScrollArea className="h-[calc(100vh-18rem)]">
                  <nav className="px-2 py-3">
                    {headings.map((heading, index) => (
                      <div key={heading.id} className="relative">
                        {activeId === heading.id && (
                          <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary-red rounded-full" />
                        )}
                        <button
                          onClick={() => scrollToHeading(heading.id)}
                          className={`w-full text-left px-3 py-2 text-sm rounded-md transition-all duration-200 ${
                            activeId === heading.id
                              ? "bg-primary-red/10 text-primary-red font-medium"
                              : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                          }`}
                          style={{
                            paddingLeft: `${(heading.level - 1) * 12 + 12}px`,
                            fontSize: `${16 - (heading.level - 1) * 2}px`
                          }}
                        >
                          {heading.text}
                        </button>
                        {index === 3 && (
                          <div className="my-8">
                            <p className="text-gray-400 text-base font-semibold mb-2">Share Article</p>
                            <div className="flex gap-3">
                              <a href="#" className="text-gray-400 hover:text-white" aria-label="Share on LinkedIn">
                                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.968v5.699h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.563 2.838-1.563 3.036 0 3.6 2.001 3.6 4.601v5.595z"/></svg>
                              </a>
                              <a href="#" className="text-gray-400 hover:text-white" aria-label="Share on Twitter">
                                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557a9.93 9.93 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724c-.951.564-2.005.974-3.127 1.195a4.916 4.916 0 0 0-8.38 4.482c-4.083-.205-7.697-2.162-10.125-5.134a4.822 4.822 0 0 0-.664 2.475c0 1.708.87 3.216 2.188 4.099a4.904 4.904 0 0 1-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.936 4.936 0 0 1-2.224.084c.627 1.956 2.444 3.377 4.6 3.417a9.867 9.867 0 0 1-6.102 2.104c-.396 0-.787-.023-1.175-.069a13.945 13.945 0 0 0 7.548 2.212c9.057 0 14.009-7.514 14.009-14.009 0-.213-.005-.425-.014-.636a10.012 10.012 0 0 0 2.457-2.548z"/></svg>
                              </a>
                              <a href="#" className="text-gray-400 hover:text-white" aria-label="Share on Facebook">
                                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.733 0-1.325.592-1.325 1.326v21.348c0 .733.592 1.326 1.325 1.326h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.312h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.326v-21.349c0-.734-.593-1.326-1.324-1.326z"/></svg>
                              </a>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </nav>
                </ScrollArea>
              </div>
            </div>
          )}
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Article Content */}
            <div className="prose prose-invert prose-lg max-w-none">
              {articleData.content.map((section, index) => {
                switch (section.type) {
                  case "paragraph":
                    return <p key={index} className="text-gray-300 mb-6">{section.text}</p>
                  case "heading":
                    return <h2 key={index} id={`heading-${index}`} className="text-2xl font-bold mt-12 mb-6">{section.text}</h2>
                  case "image":
                    return (
                      <div key={index} className="relative w-full aspect-[16/9] my-12 rounded-xl overflow-hidden">
                        <Image
                          src={section.src || ''}
                          alt={section.alt || ''}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )
                  case "quote":
                    return (
                      <blockquote key={index} className="border-l-4 border-primary-red pl-6 my-8 italic text-gray-300">
                        "{section.text}"
                      </blockquote>
                    )
                  default:
                    return null
                }
              })}
            </div>
            {/* Author Bio */}
            <div className="mt-16 p-6 bg-gray-900 rounded-xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden">
                  <Image
                    src={articleData.author.image}
                    alt={articleData.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{articleData.author.name}</h3>
                  <p className="text-gray-400">{articleData.author.role}</p>
                </div>
              </div>
              <p className="text-gray-300">
                {articleData.author.bio}
              </p>
            </div>
          </div>
        </motion.div>
        {/* Related Articles - new full width section */}
        <section className="max-w-7xl mx-auto w-full px-4 mt-24">
          <h2 className="text-2xl font-bold mb-8">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Link href="#" className="group">
              <div className="bg-gray-900 rounded-xl overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80"
                    alt="Investment Strategies"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary-red transition-colors">
                    Investment Strategies for New Launch Properties
                  </h3>
                  <p className="text-gray-400 text-sm">Apr 22, 2024 • 7 min read</p>
                </div>
              </div>
            </Link>
            <Link href="#" className="group">
              <div className="bg-gray-900 rounded-xl overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80"
                    alt="Sustainable Development"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary-red transition-colors">
                    The Rise of Sustainable New Developments
                  </h3>
                  <p className="text-gray-400 text-sm">Apr 15, 2024 • 6 min read</p>
                </div>
              </div>
            </Link>
            <Link href="#" className="group">
              <div className="bg-gray-900 rounded-xl overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80"
                    alt="Luxury Living"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary-red transition-colors">
                    The Future of Luxury Living in Singapore
                  </h3>
                  <p className="text-gray-400 text-sm">Mar 15, 2024 • 5 min read</p>
                </div>
              </div>
            </Link>
          </div>
        </section>
      </article>
    </motion.main>
  )
} 