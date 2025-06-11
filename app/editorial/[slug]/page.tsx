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

    // Add IDs to the headings in the DOM after a short delay to ensure content is rendered
    setTimeout(() => {
      const headingElements = document.querySelectorAll('h2')
      headingElements.forEach((heading, index) => {
        heading.id = `heading-${index}`
      })

      // Set up Intersection Observer for active heading
      const observer = new IntersectionObserver(
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
    }, 100)
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
      {/* Article Header */}
      <article className="max-w-7xl mx-auto w-full px-4 py-12 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex gap-8"
        >
          {/* Table of Contents */}
          {headings.length > 0 && (
            <div className="hidden lg:block w-[30%] shrink-0 sticky top-24 h-[calc(100vh-8rem)]">
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800/50">
                {/* Table of Contents Header */}
                <div className="px-4 py-3 border-b border-gray-800/50">
                  <div className="flex items-center gap-2">
                    <List className="h-4 w-4 text-primary-red" />
                    <h2 className="text-sm font-semibold text-white">Contents</h2>
                  </div>
                </div>

                {/* Table of Contents List */}
                <ScrollArea className="h-[calc(100vh-14rem)]">
                  <nav className="px-2 py-3">
                    {headings.map((heading, index) => (
                      <div key={heading.id} className="relative">
                        {/* Active indicator line */}
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
                          {/* Add numbering for main sections */}
                          {heading.level === 2 && (
                            <span className="text-gray-500 mr-2 text-xs">
                              {String(index + 1).padStart(2, '0')}.
                            </span>
                          )}
                          {heading.text}
                        </button>
                      </div>
                    ))}
                  </nav>
                </ScrollArea>

                {/* Table of Contents Footer */}
                <div className="px-4 py-2 border-t border-gray-800/50">
                  <p className="text-xs text-gray-500">
                    {headings.length} sections
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className="flex-1 w-[70%]">
            {/* Back Button */}
            <Link href="/editorial" className="inline-flex items-center text-gray-400 hover:text-white mb-8 group">
              <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Articles
            </Link>

            {/* Article Meta */}
            <div className="flex items-center text-gray-400 mb-6 text-sm">
              <div className="flex items-center mr-4">
                <Calendar className="h-4 w-4 mr-1" />
                <span>{articleData.date}</span>
              </div>
              <div className="flex items-center mr-4">
                <Clock className="h-4 w-4 mr-1" />
                <span>{articleData.readTime}</span>
              </div>
              <div className="flex items-center">
                <User className="h-4 w-4 mr-1" />
                <span>By {articleData.author.name}</span>
              </div>
            </div>

            {/* Article Title */}
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {articleData.title}
            </h1>

            {/* Article Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {articleData.tags.map((tag, index) => (
                <span key={index} className="bg-primary-red/10 text-primary-red px-3 py-1 rounded-full text-sm font-medium">
                  {tag}
                </span>
              ))}
            </div>

            {/* Featured Image */}
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

            {/* Article Actions */}
            <div className="flex items-center justify-between mb-12 pb-6 border-b border-gray-800">
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                  <Share2 className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                  <BookmarkPlus className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Article Content */}
            <div className="prose prose-invert prose-lg max-w-none">
              {articleData.content.map((section, index) => {
                switch (section.type) {
                  case "paragraph":
                    return <p key={index} className="text-gray-300 mb-6">{section.text}</p>
                  case "heading":
                    return <h2 key={index} className="text-2xl font-bold mt-12 mb-6">{section.text}</h2>
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

            {/* Related Articles */}
            <div className="mt-16">
              <h2 className="text-2xl font-bold mb-8">Related Articles</h2>
              <div className="grid md:grid-cols-2 gap-8">
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
              </div>
            </div>
          </div>
        </motion.div>
      </article>
    </motion.main>
  )
} 