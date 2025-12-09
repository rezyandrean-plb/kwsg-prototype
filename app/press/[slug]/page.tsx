"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, Clock, User, Tag, Share2, BookmarkPlus, List, ExternalLink } from "lucide-react"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useParams } from "next/navigation"
import { getSafeImageUrl } from "@/lib/image-utils"
import { allArticles, Article } from "../../lib/press-articles";

// Add TableOfContents type
type TableOfContents = {
  id: string
  text: string
  level: number
}

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

export default function PressArticlePage() {
  const params = useParams()
  const slug = params.slug as string
  const [headings, setHeadings] = useState<TableOfContents[]>([])
  const [activeId, setActiveId] = useState<string>("")

  // Find the article based on slug
  const article = allArticles.find((article: Article) => article.slug === slug)

  if (!article) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
          <Link href="/press" className="text-[#B40101] hover:text-[#B40101]/80">
            Back to Press
          </Link>
        </div>
      </div>
    )
  }

  // Extract headings from article content and create table of contents
  useEffect(() => {
    if (article.articleContent) {
      // Create a temporary div to parse the HTML content
      const tempDiv = document.createElement('div')
      tempDiv.innerHTML = article.articleContent
      
      // Extract headings from the parsed content
      const headingElements = tempDiv.querySelectorAll('h2, h3')
      const toc = Array.from(headingElements).map((heading, index) => ({
        id: `heading-${index}`,
        text: heading.textContent || "",
        level: parseInt(heading.tagName.charAt(1))
      }))
      setHeadings(toc)

      // Set up Intersection Observer for active heading
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

      // Observe headings after content is rendered and add IDs to them
      setTimeout(() => {
        const renderedHeadings = Array.from(document.querySelectorAll('.prose h2, .prose h3'))
        renderedHeadings.forEach((heading, index) => {
          heading.id = `heading-${index}`
          observer.observe(heading)
        })
      }, 100)

      return () => observer.disconnect()
    }
  }, [article])

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const offset = 120 // Adjust this value based on your header height
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      })
      
      // Update active heading immediately
      setActiveId(id)
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
        <Link href="/press" className="inline-flex items-center text-gray-400 hover:text-white mb-8 group mt-4 md:mt-0">
          <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Press
        </Link>
      </div>

      <article className="max-w-7xl mx-auto w-full px-4 py-12 relative">
        {/* Centered Title, Meta, and Tags above the image */}
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 text-center">
            {article.title}
          </h1>
          <div className="flex justify-center items-center text-gray-400 mb-4 text-sm gap-2">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{new Date(article.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}</span>
            <span>•</span>
            <Clock className="h-4 w-4 mr-1" />
            <span>5 min read</span>
            <span>•</span>
            <span>{article.source}</span>
          </div>
          {/* Tags section removed as it's not in the new data structure */}
        </div>

        {/* Featured Image - now full width */}
        <div className="relative w-full aspect-[16/9] mb-12 rounded-xl overflow-hidden">
          <Image
            src={getSafeImageUrl(article.imageUrl, "/placeholder.svg")}
            alt={article.title}
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
                <div className="mb-3">
                  <div className="flex items-center gap-2">
                    <List className="h-3 w-3 text-gray-500" />
                    <h2 className="text-xs font-medium text-gray-400">Contents</h2>
                  </div>
                </div>
                <ScrollArea className="h-[calc(100vh-18rem)]">
                  <nav className="px-1 py-2">
                    {headings.map((heading, index) => (
                      <div key={heading.id} className="relative">
                        {activeId === heading.id && (
                          <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gray-500 rounded-full" />
                        )}
                        <button
                          onClick={() => scrollToHeading(heading.id)}
                          className={`w-full text-left px-2 py-1 text-xs rounded transition-all duration-200 ${
                            activeId === heading.id
                              ? "bg-gray-800/30 text-gray-300 font-medium"
                              : "text-gray-500 hover:text-gray-300 hover:bg-gray-800/20"
                          }`}
                          style={{
                            paddingLeft: `${(heading.level - 1) * 8 + 8}px`,
                            fontSize: `${12 - (heading.level - 1) * 1}px`
                          }}
                        >
                          {heading.text}
                        </button>
                        {index === headings.length - 1 && (
                          <div className="my-6">
                            <p className="text-gray-500 text-xs font-medium mb-2">Share</p>
                            <div className="flex gap-2">
                              <a href="#" className="text-gray-500 hover:text-gray-300" aria-label="Share on LinkedIn">
                                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.968v5.699h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.563 2.838-1.563 3.036 0 3.6 2.001 3.6 4.601v5.595z"/></svg>
                              </a>
                              <a href="#" className="text-gray-500 hover:text-gray-300" aria-label="Share on Twitter">
                                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557a9.93 9.93 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724c-.951.564-2.005.974-3.127 1.195a4.916 4.916 0 0 0-8.38 4.482c-4.083-.205-7.697-2.162-10.125-5.134a4.822 4.822 0 0 0-.664 2.475c0 1.708.87 3.216 2.188 4.099a4.904 4.904 0 0 1-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.936 4.936 0 0 1-2.224.084c.627 1.956 2.444 3.377 4.6 3.417a9.867 9.867 0 0 1-6.102 2.104c-.396 0-.787-.023-1.175-.069a13.945 13.945 0 0 0 7.548 2.212c9.057 0 14.009-7.514 14.009-14.009 0-.213-.005-.425-.014-.636a10.012 10.012 0 0 0 2.457-2.548z"/></svg>
                              </a>
                              <a href="#" className="text-gray-500 hover:text-gray-300" aria-label="Share on Facebook">
                                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.733 0-1.325.592-1.325 1.326v21.348c0 .733.592 1.326 1.325 1.326h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.312h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.326v-21.349c0-.734-.593-1.326-1.324-1.326z"/></svg>
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
              <div 
                className="[&_.article-content]:text-white [&_.article-content_h2]:text-2xl [&_.article-content_h2]:font-bold [&_.article-content_h2]:mb-4 [&_.article-content_h2]:mt-6 [&_.article-content_h3]:text-xl [&_.article-content_h3]:font-semibold [&_.article-content_h3]:mb-3 [&_.article-content_h3]:mt-4 [&_.article-content_p]:text-white/90 [&_.article-content_p]:mb-4 [&_.article-content_ul]:list-disc [&_.article-content_ul]:pl-6 [&_.article-content_ul]:mb-4 [&_.article-content_li]:text-white/90 [&_.article-content_li]:mb-1 [&_.article-content_strong]:text-white [&_.article-content_em]:text-white/80"
                dangerouslySetInnerHTML={{ __html: article.articleContent || '' }}
              />
            </div>

            {/* Source Link */}
            <div className="mt-8 p-6 bg-gray-900/50 border border-gray-800 rounded-xl backdrop-blur-sm">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <h3 className="text-xl font-bold text-white">Original Source</h3>
                <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
                  <p className="text-gray-400 text-sm">This article was originally published on {article.source}</p>
                  <a
                    href={article.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#B40101] hover:bg-[#B40101]/90 text-white font-semibold rounded-lg transition-all duration-200 hover:scale-105 whitespace-nowrap"
                  >
                    Read on {article.source}
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Related Articles - new full width section */}
        <section className="max-w-7xl mx-auto w-full px-4 mt-24">
          <h2 className="text-2xl font-bold mb-8">More Press Coverage</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allArticles
              .filter((relatedArticle: Article) => relatedArticle.slug !== article.slug)
              .slice(0, 3)
              .map((relatedArticle: Article, index: number) => (
                <Link key={relatedArticle.slug} href={`/press/${relatedArticle.slug}`} className="group">
                  <div className="bg-gray-900 rounded-xl overflow-hidden">
                    <div className="relative h-48">
                      <Image
                        src={getSafeImageUrl(relatedArticle.imageUrl, "/placeholder.svg")}
                        alt={relatedArticle.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2 group-hover:text-[#B40101] transition-colors line-clamp-2">
                        {relatedArticle.title}
                      </h3>
                      <p className="text-gray-400 text-sm">
                        {new Date(relatedArticle.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })} • {relatedArticle.source}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </section>
      </article>
    </motion.main>
  )
} 