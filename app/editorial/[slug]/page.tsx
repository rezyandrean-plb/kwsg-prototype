"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, Clock, User, Tag, Share2, BookmarkPlus } from "lucide-react"
import { motion } from "framer-motion"

// Types
interface Article {
  slug: string
  title: string
  excerpt: string
  content: Array<{
    type: 'paragraph' | 'heading' | 'image' | 'quote'
    text?: string
    src?: string
    alt?: string
  }>
  featuredImage: string
  date: string
  readTime: string
  author: {
    name: string
    role: string
    image: string
    bio: string
  }
  tags: string[]
  category: string
}

// Dummy data based on featured article
const articleData: Article = {
  slug: "future-of-new-launch-properties",
  title: "The Future of New Launch Properties in a Post-Pandemic World",
  excerpt: "The real estate landscape has undergone significant transformation since the pandemic. This article explores how new launch properties are adapting to changing buyer preferences, technological advancements, and market dynamics.",
  content: [
    {
      type: "paragraph",
      text: "The real estate landscape has undergone significant transformation since the pandemic. This article explores how new launch properties are adapting to changing buyer preferences, technological advancements, and market dynamics."
    },
    {
      type: "heading",
      text: "Changing Buyer Preferences"
    },
    {
      type: "paragraph",
      text: "The pandemic has fundamentally altered how people view their living spaces. Homebuyers now prioritize features that support remote work, wellness, and sustainable living. Developers are responding with innovative designs that incorporate dedicated home offices, green spaces, and smart home technology."
    },
    {
      type: "image",
      src: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&q=80",
      alt: "Modern Living Space"
    },
    {
      type: "heading",
      text: "Technological Integration"
    },
    {
      type: "paragraph",
      text: "Smart home technology is no longer a luxury but an expectation. New launch properties are incorporating advanced systems for security, climate control, and energy management. These features not only enhance the living experience but also contribute to long-term property value."
    },
    {
      type: "quote",
      text: "The integration of technology in new launch properties is not just about convenience—it's about creating sustainable, future-proof living spaces that adapt to residents' evolving needs."
    },
    {
      type: "heading",
      text: "Market Dynamics"
    },
    {
      type: "paragraph",
      text: "The post-pandemic market has seen a shift in investment patterns, with more emphasis on properties that offer both lifestyle benefits and strong potential for appreciation. Location remains crucial, but buyers are now considering additional factors such as community amenities and environmental sustainability."
    },
    {
      type: "heading",
      text: "Looking Ahead"
    },
    {
      type: "paragraph",
      text: "As we move forward, the new launch property market will continue to evolve. Developers who can successfully balance innovation with practical living needs will likely see the greatest success. For buyers, understanding these trends is crucial for making informed investment decisions."
    }
  ],
  featuredImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80",
  date: "May 2, 2024",
  readTime: "8 min read",
  author: {
    name: "Sarah Johnson",
    role: "Real Estate Market Analyst",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80",
    bio: "Sarah Johnson is a seasoned real estate market analyst with over 10 years of experience in Singapore's property market. She specializes in new launch properties and market trends analysis."
  },
  tags: ["Market Trends", "New Launches", "Investment"],
  category: "Market Analysis"
}

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

export default function BlogPostPage() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen flex flex-col bg-black text-white"
    >
      {/* Article Header */}
      <article className="max-w-4xl mx-auto w-full px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
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
              className="object-cover"
              priority
            />
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
        </motion.div>
      </article>
    </motion.main>
  )
} 