"use client";

import { useState, useEffect } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";

// Sample news articles data
const allArticles = [
    {
      title: "KW Singapore Revolutionizes Real Estate with AI",
      description:
        "Learn how KW Singapore is leveraging AI to provide unparalleled service and insights to its consultants.",
      imageUrl: "/placeholder.svg?height=300&width=400",
      link: "#",
      date: "2024-12-15",
      year: "2024",
    },
    {
      title: "Melvin Lim Discusses the Future of Real Estate",
      description: "Operating Principal Melvin Lim shares his vision for the future of real estate in Singapore.",
      imageUrl: "/placeholder.svg?height=300&width=400",
      link: "#",
      date: "2024-11-20",
      year: "2024",
    },
    {
      title: "KW Singapore Consultants Achieve Record Sales",
      description: "KW Singapore consultants achieve record sales, driven by innovative marketing and technology.",
      imageUrl: "/placeholder.svg?height=300&width=400",
      link: "#",
      date: "2024-10-05",
      year: "2024",
    },
    {
      title: "KW Singapore Launches New Media Service Division",
      description:
        "Introducing comprehensive media services to help real estate consultants showcase properties effectively.",
      imageUrl: "/placeholder.svg?height=300&width=400",
      link: "#",
      date: "2024-09-12",
      year: "2024",
    },
    {
      title: "MREA Masterclass 2024 Breaks Attendance Records",
      description: "The annual MREA Masterclass sees unprecedented participation from real estate professionals.",
      imageUrl: "/placeholder.svg?height=300&width=400",
      link: "#",
      date: "2024-08-18",
      year: "2024",
    },
    {
      title: "KW Singapore Expands Operations Across Southeast Asia",
      description: "Strategic expansion plans unveiled for Malaysia, Thailand, and Vietnam markets.",
      imageUrl: "/placeholder.svg?height=300&width=400",
      link: "#",
      date: "2024-07-22",
      year: "2024",
    },
    {
      title: "Digital Transformation in Real Estate: KW Singapore Leads",
      description: "How KW Singapore is pioneering digital solutions in the traditional real estate industry.",
      imageUrl: "/placeholder.svg?height=300&width=400",
      link: "#",
      date: "2024-06-10",
      year: "2024",
    },
    {
      title: "KW Singapore Wins Industry Excellence Award",
      description: "Recognition for outstanding contribution to real estate innovation and consultant support.",
      imageUrl: "/placeholder.svg?height=300&width=400",
      link: "#",
      date: "2024-05-15",
      year: "2024",
    },
    {
      title: "Sustainable Real Estate Practices at KW Singapore",
      description: "Leading the way in environmentally conscious real estate practices and green building initiatives.",
      imageUrl: "/placeholder.svg?height=300&width=400",
      link: "#",
      date: "2024-04-08",
      year: "2024",
    },
    {
      title: "KW Singapore Launches Mentorship Program",
      description: "New initiative pairs experienced consultants with newcomers for accelerated learning.",
      imageUrl: "/placeholder.svg?height=300&width=400",
      link: "#",
      date: "2024-03-25",
      year: "2024",
    },
    {
      title: "Real Estate Market Outlook 2023: KW Singapore Analysis",
      description: "Comprehensive market analysis and predictions for Singapore's property landscape.",
      imageUrl: "/placeholder.svg?height=300&width=400",
      link: "#",
      date: "2023-12-20",
      year: "2023",
    },
    {
      title: "KW Singapore Celebrates 5 Years of Excellence",
      description: "Milestone celebration highlighting achievements and future growth plans.",
      imageUrl: "/placeholder.svg?height=300&width=400",
      link: "#",
      date: "2023-11-10",
      year: "2023",
    },
  ]

// Define the article type
interface Article {
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  date: string;
  year: string;
}

export default function NewsPage() {
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
                         article.description.toLowerCase().includes(searchTerm.toLowerCase());
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
      <section className="relative min-h-[70vh] md:min-h-screen flex items-center justify-center overflow-hidden">
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
            KW Singapore in the <span className="text-[#B40101]">News</span>
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
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center justify-between">
            {/* Search and Filter Row - Mobile */}
            <div className="flex gap-2 w-full sm:hidden">
              {/* Search Bar */}
              <div className="relative flex-1">
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
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="w-24 bg-white/10 border-[#666666]/30 text-white focus:border-[#B40101] focus:ring-[#B40101]">
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

            {/* Desktop Layout */}
            <div className="hidden sm:flex items-center gap-6 w-full">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-md">
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
              <div className="text-white/60 text-sm">
                {filteredArticles.length} article{filteredArticles.length !== 1 ? "s" : ""} found
              </div>

              {/* Year Filter */}
              <div className="flex items-center gap-4">
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
                  <motion.a
                    key={`${article.title}-${index}`}
                    href={article.link}
                    className="group relative overflow-hidden rounded-lg border border-[#666666]/20 transition-all duration-300 hover:scale-105 hover:border-[#B40101]/40"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.6, 
                      delay: 1.0 + (index * 0.1), 
                      ease: "easeOut" 
                    }}
                  >
                    <img
                      src={article.imageUrl || "/placeholder.svg"}
                      alt={article.title}
                      className="w-full h-48 sm:h-56 md:h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                      <div className="text-[#B40101] text-xs sm:text-sm mb-2">
                        {new Date(article.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold mb-2 text-white line-clamp-2">{article.title}</h3>
                      <p className="text-white/80 leading-relaxed text-sm sm:text-base line-clamp-3">{article.description}</p>
                    </div>
                  </motion.a>
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