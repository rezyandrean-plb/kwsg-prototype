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

// Add TableOfContents type
type TableOfContents = {
  id: string
  text: string
  level: number
}

// Add article type for press articles
type PressArticle = {
  slug: string
  title: string
  description: string
  imageUrl: string
  link: string
  date: string
  year: string
  source: string
  articleContent: string
  readTime: string
  author?: {
    name: string
    role: string
    image: string
    bio: string
  }
  tags: string[]
}

// Press articles data
const pressArticles: PressArticle[] = [
  {
    slug: "kw-singapore-debuts-with-10m-valuation-pledges-to-disrupt-property-agency-model",
    title: "KW Singapore Debuts with $10M Valuation, Pledges to Disrupt Property Agency Model",
    description: "KW Singapore launches with a $10 million valuation, introducing an innovative property agency model that combines technology, training, and entrepreneurial opportunities for real estate professionals.",
    imageUrl: "https://techcoffeehouse.com/wp-content/uploads/2025/07/kw-singapore-debuts.jpg",
    link: "https://techcoffeehouse.com/2025/07/07/kw-singapore-debuts-with-10m-valuation-pledges-to-disrupt-property-agency-model/",
    date: "2025-07-07",
    year: "2025",
    source: "Tech Coffee House",
    readTime: "5 min read",
    tags: ["KW Singapore", "Real Estate", "Innovation", "Technology"],
    articleContent: `
      <div class="article-content">
        <h2>KW Singapore Debuts with $10M Valuation, Pledges to Disrupt Property Agency Model</h2>
        
        <p><strong>SINGAPORE</strong> - KW Singapore, the latest entrant in Singapore's competitive real estate market, has officially launched with a $10 million valuation and ambitious plans to revolutionize the traditional property agency model.</p>
        
        <h3>Revolutionary Business Model</h3>
        <p>The company introduces a unique hybrid approach that combines the best of traditional real estate practices with cutting-edge technology and entrepreneurial opportunities. Unlike conventional agencies that focus solely on property transactions, KW Singapore offers a comprehensive ecosystem for real estate professionals.</p>
        
        <h3>Key Innovations</h3>
        <ul>
          <li><strong>Technology Integration:</strong> Advanced CRM systems and AI-powered market analysis tools</li>
          <li><strong>Training Programs:</strong> Comprehensive professional development and certification courses</li>
          <li><strong>Entrepreneurial Support:</strong> Business coaching and mentorship for independent agents</li>
          <li><strong>Revenue Sharing:</strong> Transparent profit-sharing model with agents</li>
        </ul>
        
        <h3>Market Impact</h3>
        <p>Industry experts predict that KW Singapore's entry could significantly impact the local real estate landscape, particularly in how agencies operate and how agents are compensated. The company's focus on technology and training addresses long-standing gaps in the Singapore property market.</p>
        
        <h3>Leadership Team</h3>
        <p>Led by experienced real estate professionals with backgrounds in technology and business development, KW Singapore brings together expertise from multiple sectors to create a more efficient and profitable model for property transactions.</p>
        
        <h3>Future Plans</h3>
        <p>The company plans to expand its operations across Singapore and potentially into neighboring markets, with a focus on sustainable growth and maintaining high service standards.</p>
        
        <p><em>For more information about KW Singapore and their innovative approach to real estate, visit their official website or contact their team directly.</em></p>
      </div>
    `
  },
  {
    slug: "real-estate-franchise-keller-williams-expands-in-singapore",
    title: "Real Estate Franchise Keller Williams Expands in Singapore",
    description: "Keller Williams, one of the world's largest real estate franchises, continues its expansion in Singapore with innovative technology and training programs for local property consultants.",
    imageUrl: "https://img.tepcdn.com/img-style/simplecrop_article/88304311.jpeg",
    link: "https://www.edgeprop.sg/property-news/real-estate-franchise-keller-williams-expands-singapore",
    date: "2025-07-07",
    year: "2025",
    source: "EdgeProp",
    readTime: "4 min read",
    tags: ["Keller Williams", "Expansion", "Singapore", "Real Estate"],
    articleContent: `
      <div class="article-content">
        <h2>Real Estate Franchise Keller Williams Expands in Singapore</h2>
        
        <p><strong>SINGAPORE</strong> - Keller Williams, one of the world's largest real estate franchises, continues its expansion in Singapore with innovative technology and training programs for local property consultants.</p>
        
        <h3>Global Expansion Strategy</h3>
        <p>The company's entry into the Singapore market represents a strategic move to tap into the region's growing real estate sector. With its proven business model and technology-driven approach, Keller Williams aims to establish a strong presence in the competitive Singapore property market.</p>
        
        <h3>Technology and Training Focus</h3>
        <p>KW Singapore brings with it advanced technology platforms and comprehensive training programs designed to enhance the capabilities of local property consultants. The company's emphasis on professional development and technological innovation sets it apart from traditional agencies.</p>
        
        <h3>Market Opportunities</h3>
        <p>The Singapore real estate market presents significant opportunities for growth, with increasing demand for professional property services and a growing emphasis on technology-driven solutions.</p>
        
        <h3>Innovation in Real Estate</h3>
        <p>By combining traditional real estate expertise with modern technology, KW Singapore is positioned to lead the transformation of the local property industry.</p>
      </div>
          `
    },
    {
      slug: "keller-williams-singapore-enters-market-with-sgd-10m-platform",
      title: "Keller Williams Singapore Enters Market with SGD $10M Platform",
      description: "Keller Williams Singapore has entered the Singapore property market with a seed valuation of SGD $10 million, unveiling a platform-based business model for real estate consultants.",
      imageUrl: "https://itbrief.asia/wp-content/uploads/2025/07/kw-singapore-platform.jpg",
      link: "https://itbrief.asia/story/keller-williams-singapore-enters-market-with-sgd-10m-platform",
      date: "2025-07-08",
      year: "2025",
      source: "IT Brief Asia",
      readTime: "6 min read",
      tags: ["KW Singapore", "Platform Model", "Technology", "Real Estate"],
      articleContent: `
        <div class="article-content">
          <h2>Keller Williams Singapore Enters Market with SGD $10M Platform</h2>
          
          <p><strong>SINGAPORE</strong> - Keller Williams Singapore has entered the Singapore property market with a seed valuation of SGD $10 million, unveiling a platform-based business model for real estate consultants.</p>
          
          <h3>Consultant-Focused Model</h3>
          <p>The agency introduces a structure that allows realtors to retain up to 94% of their commissions. The business model is built upon providing agents with access to in-house media production resources, AI-driven client prospecting technology, and ongoing skills development through the KW Training Academy.</p>
          
          <h3>Digital Transformation Focus</h3>
          <p>KW Singapore's framework addresses recent recommendations by the Council for Estate Agencies (CEA), whose Real Estate Industry Transformation Map has emphasised the importance of empowering agents with digital tools and professional training. This approach aligns with shifting expectations in the property sector as both realtors and clients increasingly turn to digital channels and content platforms.</p>
          
          <h3>Media as a Service</h3>
          <p>The firm is responding to new consumer habits by investing in media production and marketing support for realtors. As highlighted in recent reports, more agents are engaging clients through TikTok, YouTube and other digital channels to connect with younger, digitally native property buyers. KW Singapore's Media-as-a-Service provision includes on-site media studios, curated vendors for property marketing, and AI tools to enhance content creation and distribution efforts.</p>
          
          <h3>Technology Integration</h3>
          <p>Additionally, KW Training Academy aims to build technical competency among consultants, equipping new agents with data-driven frameworks for advising on new property developments. The agency is placing particular emphasis on training in areas such as pricing comparisons, project benchmarking and bespoke buyer and seller consultations, with delivery through both online and in-person formats.</p>
          
          <h3>Growth Plans</h3>
          <p>The company has set a target to expand its base to 500 realtors by the end of 2025, focusing on individuals and teams interested in brand building, professional development, and higher commission rates through the agency's scalable structure. KW Singapore is prioritising the new launch segment for the next two years as part of its market strategy, offering added value to both property consumers and developers through enhanced technical advisory services.</p>
        </div>
      `
    },
    {
      slug: "real-estate-franchise-keller-williams-expands-to-singapore",
      title: "Real Estate Franchise Keller Williams Expands to Singapore",
      description: "US-headquartered real estate agency Keller Williams (KW) is launching a company in Singapore under its international franchising arm, Keller Williams Worldwide.",
      imageUrl: "https://sg.news.yahoo.com/real-estate-franchise-keller-williams-090122965.html",
      link: "https://sg.news.yahoo.com/real-estate-franchise-keller-williams-090122965.html",
      date: "2025-07-07",
      year: "2025",
      source: "Yahoo News Singapore",
      readTime: "4 min read",
      tags: ["Keller Williams", "Franchise", "Singapore", "Expansion"],
      articleContent: `
        <div class="article-content">
          <h2>Real Estate Franchise Keller Williams Expands to Singapore</h2>
          
          <p><strong>SINGAPORE</strong> - US-headquartered real estate agency Keller Williams (KW) is launching a company in Singapore under its international franchising arm, Keller Williams Worldwide.</p>
          
          <h3>Leadership and Structure</h3>
          <p>KW Singapore will be led by Melvin Lim, who is also the co-founder and CEO of PropertyLimBrothers (PLB). In a press release, KW Singapore says it operates as a standalone business separate from PLB.</p>
          
          <h3>Platform-Based Business Model</h3>
          <p>According to the company, KW Singapore will bring a "platform-based business model" to Singapore's property sector, where agents will have a performance-driven structure that could allow them to retain up to 94% of their commissions.</p>
          
          <h3>Support Services</h3>
          <p>KW Singapore agents will also have access to support services, including in-house media production, AI-led client prospecting, and KW Training Academy programs designed to enhance their professional capabilities and market knowledge.</p>
          
          <h3>Market Entry Strategy</h3>
          <p>The entry into Singapore represents a strategic expansion for Keller Williams, leveraging the country's robust real estate market and the growing demand for innovative property services. The company's focus on technology and training aligns with Singapore's broader digital transformation initiatives.</p>
        </div>
      `
    },
    {
      slug: "us-real-estate-agency-keller-williams-expands-into-singapore",
      title: "US Real Estate Agency Keller Williams Expands Into Singapore",
      description: "US-headquartered real estate agency Keller Williams is launching a company in Singapore under its international franchising arm, Keller Williams Worldwide.",
      imageUrl: "https://www.mingtiandi.com/real-estate/crelist/roundup-hong-kong-retail-rent-slump-set-to-continue/",
      link: "https://www.mingtiandi.com/real-estate/crelist/roundup-hong-kong-retail-rent-slump-set-to-continue/",
      date: "2025-07-08",
      year: "2025",
      source: "Mingtiandi",
      readTime: "5 min read",
      tags: ["Keller Williams", "US Expansion", "Singapore Market", "Real Estate"],
      articleContent: `
        <div class="article-content">
          <h2>US Real Estate Agency Keller Williams Expands Into Singapore</h2>
          
          <p><strong>SINGAPORE</strong> - US-headquartered real estate agency Keller Williams is launching a company in Singapore under its international franchising arm, Keller Williams Worldwide.</p>
          
          <h3>Leadership Appointment</h3>
          <p>KW Singapore will be led by Melvin Lim, the co-founder and CEO of PropertyLimBrothers, operating as a stand-alone business separate from PLB. This strategic appointment brings together proven expertise in the Singaporean real estate market with Keller Williams' global franchise model.</p>
          
          <h3>Market Entry Context</h3>
          <p>The expansion into Singapore comes at a time when the local real estate market is experiencing significant transformation, with increasing demand for innovative property services and technology-driven solutions. Keller Williams' entry represents a major development in the region's property sector.</p>
          
          <h3>Franchise Model Benefits</h3>
          <p>As part of the Keller Williams Worldwide network, KW Singapore will benefit from the global brand's established systems, training programs, and technology platforms while maintaining the flexibility to adapt to local market conditions and regulatory requirements.</p>
          
          <h3>Industry Impact</h3>
          <p>The launch of KW Singapore is expected to introduce new competition and innovation to the local real estate market, potentially setting new standards for agent training, technology integration, and client service in the Singapore property sector.</p>
        </div>
      `
    }
  ]

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
  const article = pressArticles.find(article => article.slug === slug)

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

      // Observe headings after content is rendered
      setTimeout(() => {
        const renderedHeadings = Array.from(document.querySelectorAll('h2[id^="heading-"], h3[id^="heading-"]'))
        renderedHeadings.forEach((heading) => observer.observe(heading))
      }, 100)

      return () => observer.disconnect()
    }
  }, [article])

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
        <Link href="/press" className="inline-flex items-center text-gray-400 hover:text-white mb-8 group">
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
            <span>{article.readTime}</span>
            <span>•</span>
            <span>{article.source}</span>
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            {article.tags.map((tag, index) => (
              <span key={index} className="bg-white text-[#B40101] px-3 py-1 rounded-full text-sm font-medium">
                {tag}
              </span>
            ))}
          </div>
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
                <div className="mb-4">
                  <div className="flex items-center gap-2">
                    <List className="h-4 w-4 text-[#B40101]" />
                    <h2 className="text-sm font-semibold text-white">Contents</h2>
                  </div>
                </div>
                <ScrollArea className="h-[calc(100vh-18rem)]">
                  <nav className="px-2 py-3">
                    {headings.map((heading, index) => (
                      <div key={heading.id} className="relative">
                        {activeId === heading.id && (
                          <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#B40101] rounded-full" />
                        )}
                        <button
                          onClick={() => scrollToHeading(heading.id)}
                          className={`w-full text-left px-3 py-2 text-sm rounded-md transition-all duration-200 ${
                            activeId === heading.id
                              ? "bg-[#B40101]/10 text-[#B40101] font-medium"
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
              <div 
                className="[&_.article-content]:text-white [&_.article-content_h2]:text-2xl [&_.article-content_h2]:font-bold [&_.article-content_h2]:mb-4 [&_.article-content_h2]:mt-6 [&_.article-content_h3]:text-xl [&_.article-content_h3]:font-semibold [&_.article-content_h3]:mb-3 [&_.article-content_h3]:mt-4 [&_.article-content_p]:text-white/90 [&_.article-content_p]:mb-4 [&_.article-content_ul]:list-disc [&_.article-content_ul]:pl-6 [&_.article-content_ul]:mb-4 [&_.article-content_li]:text-white/90 [&_.article-content_li]:mb-1 [&_.article-content_strong]:text-white [&_.article-content_em]:text-white/80"
                dangerouslySetInnerHTML={{ __html: article.articleContent }}
              />
            </div>

            {/* Source Link */}
            <div className="mt-8 p-6 bg-gray-900 rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-2">Original Source</h3>
                  <p className="text-gray-400">This article was originally published on {article.source}</p>
                </div>
                <a
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#B40101] hover:text-[#B40101]/80 font-semibold"
                >
                  Read on {article.source}
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Related Articles - new full width section */}
        <section className="max-w-7xl mx-auto w-full px-4 mt-24">
          <h2 className="text-2xl font-bold mb-8">More Press Coverage</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pressArticles
              .filter(relatedArticle => relatedArticle.slug !== article.slug)
              .slice(0, 3)
              .map((relatedArticle, index) => (
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