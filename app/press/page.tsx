"use client";

import { useState, useEffect } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";
import { getSafeImageUrl } from "@/lib/image-utils";

// Real press articles data with actual press coverage
const allArticles = [
    {
      title: "KW Singapore Debuts with $10M Valuation, Pledges to Disrupt Property Agency Model",
      description:
        "KW Singapore launches with a $10 million valuation, introducing an innovative property agency model that combines technology, training, and entrepreneurial opportunities for real estate professionals.",
      imageUrl: "/placeholder.svg",
      link: "https://techcoffeehouse.com/2025/07/07/kw-singapore-debuts-with-10m-valuation-pledges-to-disrupt-property-agency-model/",
      date: "2025-07-07",
      year: "2025",
      source: "Tech Coffee House",
      slug: "kw-singapore-debuts-with-10m-valuation-pledges-to-disrupt-property-agency-model",
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
      title: "Keller Williams Singapore Enters Market with SGD $10M Platform",
      description:
        "Keller Williams Singapore has entered the Singapore property market with a seed valuation of SGD $10 million, unveiling a platform-based business model for real estate consultants.",
      imageUrl: "/placeholder.svg",
      link: "https://itbrief.asia/story/keller-williams-singapore-enters-market-with-sgd-10m-platform",
      date: "2025-07-08",
      year: "2025",
      source: "IT Brief Asia",
      slug: "keller-williams-singapore-enters-market-with-sgd-10m-platform",
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
      title: "Real Estate Franchise Keller Williams Expands to Singapore",
      description:
        "US-headquartered real estate agency Keller Williams (KW) is launching a company in Singapore under its international franchising arm, Keller Williams Worldwide.",
      imageUrl: "/placeholder.svg",
      link: "https://sg.news.yahoo.com/real-estate-franchise-keller-williams-090122965.html",
      date: "2025-07-07",
      year: "2025",
      source: "Yahoo News Singapore",
      slug: "real-estate-franchise-keller-williams-expands-to-singapore",
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
      title: "US Real Estate Agency Keller Williams Expands Into Singapore",
      description:
        "US-headquartered real estate agency Keller Williams is launching a company in Singapore under its international franchising arm, Keller Williams Worldwide.",
      imageUrl: "/placeholder.svg",
      link: "https://www.mingtiandi.com/real-estate/crelist/roundup-hong-kong-retail-rent-slump-set-to-continue/",
      date: "2025-07-08",
      year: "2025",
      source: "Mingtiandi",
      slug: "us-real-estate-agency-keller-williams-expands-into-singapore",
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
    },
    {
      title: "Real Estate Franchise Keller Williams Expands in Singapore",
      description:
        "Keller Williams, one of the world's largest real estate franchises, continues its expansion in Singapore with innovative technology and training programs for local property consultants.",
      imageUrl: "https://img.tepcdn.com/img-style/simplecrop_article/88304311.jpeg",
      link: "https://www.edgeprop.sg/property-news/real-estate-franchise-keller-williams-expands-singapore",
      date: "2025-07-07",
      year: "2025",
      source: "EdgeProp",
      slug: "real-estate-franchise-keller-williams-expands-in-singapore",
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
        </div>
      `
    },
    {
      title: "Real Estate Franchise Keller Williams Expands to Singapore",
      description:
        "US-headquartered real estate agency Keller Williams (KW) is launching a company in Singapore under its international franchising arm, Keller Williams Worldwide.",
      imageUrl: "/placeholder.svg",
      link: "https://sg.news.yahoo.com/real-estate-franchise-keller-williams-090122965.html",
      date: "2025-07-07",
      year: "2025",
      source: "Yahoo News Singapore",
      slug: "real-estate-franchise-keller-williams-expands-to-singapore",
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
    }
  ]

// Define the article type
interface Article {
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  date: string;
  year: string;
  source: string;
  slug?: string;
  articleContent?: string;
}

export default function PressPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedYear, setSelectedYear] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 6;

  // Get available years from articles
  const availableYears = [...new Set(allArticles.map((article: Article) => 
    new Date(article.date).getFullYear().toString()
  ))].sort((a, b) => parseInt(b) - parseInt(a));

  // Filter articles based on search term and year
  const filteredArticles = allArticles.filter((article: Article) => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.source.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesYear = selectedYear === "all" || 
                       new Date(article.date).getFullYear().toString() === selectedYear;
    return matchesSearch && matchesYear;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);
  const startIndex = (currentPage - 1) * articlesPerPage;
  const currentArticles = filteredArticles.slice(startIndex, startIndex + articlesPerPage);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedYear]);

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] md:min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black" />
        <div className="absolute inset-0 bg-black/60" />
        <motion.div 
          className="relative z-10 text-center max-w-4xl mx-auto px-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h1 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight text-white px-4 sm:px-0"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            KW Singapore in the <span className=" text-[#B40101] italic"> <br></br> Press</span>
          </motion.h1>
          <motion.p 
            className="text-base sm:text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl mx-auto px-4 sm:px-0"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            Stay up-to-date with the latest media coverage and articles 
            <br className="hidden sm:block"></br> featuring KW Singapore's innovations and
            achievements.
          </motion.p>
        </motion.div>

        {/* Scroll indicator */}
        <motion.button 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0, ease: "easeOut" }}
          onClick={() => {
            document.getElementById('filters-section')?.scrollIntoView({ 
              behavior: 'smooth' 
            });
          }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hover:scale-110 transition-transform cursor-pointer"
        >
          <ChevronRight className="h-6 w-6 text-[#B40101] rotate-90" />
        </motion.button>
      </section>

      {/* Filters Section */}
      <motion.section 
        id="filters-section"
        className="py-8 border-b border-[#666666]/20"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Mobile Layout */}
          <div className="flex flex-col gap-4 sm:hidden">
            {/* First Row: Search and Year Filter */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              {/* Search Bar */}
              <div className="relative flex-1 w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/10 border-[#666666]/30 text-white placeholder:text-white/60 focus:border-[#B40101] focus:ring-[#B40101] w-full"
                />
              </div>

              {/* Year Filter */}
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <span className="text-white/80 text-sm whitespace-nowrap">Filter by year:</span>
                <Select value={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger className="flex-1 sm:w-32 bg-white/10 border-[#666666]/30 text-white focus:border-[#B40101] focus:ring-[#B40101]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-[#666666]/30">
                    <SelectItem value="all" className="text-white hover:bg-white/10">
                      All Years
                    </SelectItem>
                    {availableYears.map((year) => (
                      <SelectItem key={year} value={year} className="text-white hover:bg-white/10">
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Second Row: Results Count */}
            <div className="text-white/60 text-sm whitespace-nowrap">
              {filteredArticles.length} article{filteredArticles.length !== 1 ? "s" : ""} found
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden sm:flex flex-row items-center gap-4">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-2xl">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/10 border-[#666666]/30 text-white placeholder:text-white/60 focus:border-[#B40101] focus:ring-[#B40101] w-full"
              />
            </div>

            {/* Results Count */}
            <div className="text-white/60 text-sm whitespace-nowrap">
              {filteredArticles.length} article{filteredArticles.length !== 1 ? "s" : ""} found
            </div>

            {/* Year Filter */}
            <div className="flex items-center gap-2 ml-auto">
              <span className="text-white/80 text-sm whitespace-nowrap">Filter by year:</span>
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="w-32 bg-white/10 border-[#666666]/30 text-white focus:border-[#B40101] focus:ring-[#B40101]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-[#666666]/30">
                  <SelectItem value="all" className="text-white hover:bg-white/10">
                    All Years
                  </SelectItem>
                  {availableYears.map((year) => (
                    <SelectItem key={year} value={year} className="text-white hover:bg-white/10">
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Articles Section */}
      <motion.section 
        className="py-8 sm:py-16"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {currentArticles.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                {currentArticles.map((article: Article, index: number) => (
                  <motion.div
                    key={`${article.title}-${index}`}
                    className="group relative overflow-hidden rounded-lg border border-[#666666]/20 transition-all duration-300 hover:scale-105 hover:border-[#B40101]/40 cursor-pointer"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.6, 
                      delay: 1.0 + (index * 0.1), 
                      ease: "easeOut" 
                    }}
                    onClick={() => {
                      if (article.articleContent) {
                        // Use slug if available, otherwise generate from title
                        const slug = article.slug || article.title
                          .toLowerCase()
                          .replace(/[^a-z0-9]+/g, '-')
                          .replace(/(^-|-$)/g, '');
                        window.location.href = `/press/${slug}`;
                      } else {
                        window.open(article.link, '_blank');
                      }
                    }}
                  >
                    <img
                      src={getSafeImageUrl(article.imageUrl, "/placeholder.svg")}
                      alt={article.title}
                      className="w-full h-48 sm:h-56 md:h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                      <div className="flex items-center justify-between mb-2">
                        <div className="bg-[#B40101] text-white text-xs sm:text-sm px-2 py-1 rounded-full">
                          {new Date(article.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </div>
                        <div className="bg-white/70 text-black text-xs sm:text-sm px-2 py-1 rounded-full backdrop-blur-sm">
                          {article.source}
                        </div>
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold mb-2 text-white line-clamp-2">{article.title}</h3>
                      {article.articleContent && (
                        <div className="text-white/80 text-xs mt-2">
                          Click to read full article
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center mt-8 sm:mt-12 gap-1 sm:gap-2 flex-wrap">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="border-[#666666]/30 text-white hover:bg-white/10 disabled:opacity-50 px-2 sm:px-3"
                  >
                    <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
                  </Button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => handlePageChange(page)}
                      className={
                        currentPage === page
                          ? "bg-[#B40101] hover:bg-[#B40101]/90 text-white px-2 sm:px-3"
                          : "border-[#666666]/30 text-white hover:bg-white/10 px-2 sm:px-3"
                      }
                    >
                      {page}
                    </Button>
                  ))}

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="border-[#666666]/30 text-white hover:bg-white/10 disabled:opacity-50 px-2 sm:px-3"
                  >
                    <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-8 sm:py-16 px-4">
              <div className="text-white/60 text-base sm:text-lg mb-2 sm:mb-4">No articles found</div>
              <p className="text-white/40 text-sm sm:text-base">Try adjusting your search terms or filters</p>
            </div>
          )}
        </div>
      </motion.section>


    </div>
  );
} 