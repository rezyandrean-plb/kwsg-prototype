"use client";

import { useState, useEffect } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";
import { getSafeImageUrl } from "@/lib/image-utils";
import { allArticles, Article } from "../lib/press-articles";

export default function PressPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedYear, setSelectedYear] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 6;

  // Get available years from articles
  const availableYears = [...new Set(allArticles.map((article: Article) => 
    new Date(article.date).getFullYear().toString()
  ))].sort((a, b) => parseInt(b) - parseInt(a));

  // Filter articles based on search term and year, then sort by newest first
  const filteredArticles = allArticles
    .filter((article: Article) => {
      const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           article.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           article.source.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesYear = selectedYear === "all" || 
                         new Date(article.date).getFullYear().toString() === selectedYear;
      return matchesSearch && matchesYear;
    })
    .sort((a: Article, b: Article) => {
      // Sort by date, newest first
      return new Date(b.date).getTime() - new Date(a.date).getTime();
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
      <section className="relative min-h-[50vh] sm:min-h-[40vh] md:min-h-[60vh] lg:min-h-[60vh] flex items-center justify-center overflow-hidden pt-20 sm:pt-20 md:pt-12">
        <div className="absolute inset-0 bg-black" />
        <div className="absolute inset-0 bg-black/60" />
        <motion.div 
          className="relative z-10 text-center max-w-4xl mx-auto px-6 pt-8 sm:pt-12 md:pt-16 lg:pt-32"
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

      </section>

      {/* Filters + Articles Container with one continuous background */}
      <section className="bg-gradient-to-b from-black to-gray-900">
      {/* Filters Section */}
      <motion.section 
        id="filters-section"
        className="py-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Mobile Layout */}
          <div className="block sm:hidden">
            <div className="flex flex-col gap-4">
              {/* First Row: Search and Year Filter */}
              <div className="flex flex-col items-start gap-4">
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
                <div className="flex items-center gap-2 w-full">
                  <span className="text-white font-medium text-sm whitespace-nowrap">Filter by year:</span>
                  <Select value={selectedYear} onValueChange={setSelectedYear}>
                    <SelectTrigger className="flex-1 bg-white/10 border-[#666666]/30 text-white focus:border-[#B40101] focus:ring-[#B40101]">
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
              <span className="text-white font-medium text-sm whitespace-nowrap">Filter by year:</span>
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
      </section>


    </div>
  );
} 