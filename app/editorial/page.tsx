"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Filter, Search, Calendar, ArrowUpDown } from "lucide-react"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"
import { Checkbox } from "@/components/ui/checkbox"
import { useState, useMemo } from "react"
import EditorialCard from "@/components/editorial-card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { CalendarIcon } from "lucide-react"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

// Define the article type
type Article = {
  title: string
  excerpt: string
  image: string
  date: string
  readTime: string
  category: string
  slug: string
}

// Sample articles data
const articlesData: Article[] = [
  {
    title: "The Future of Luxury Living in Singapore",
    excerpt: "Explore how luxury residential developments are evolving to meet the demands of modern homeowners, with a focus on sustainability, smart technology, and community living.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80",
    date: "March 15, 2024",
    readTime: "5 min read",
    category: "Luxury Living",
    slug: "future-of-luxury-living"
  },
  {
    title: "Investment Opportunities in District 9",
    excerpt: "A comprehensive analysis of the real estate market in District 9, highlighting emerging investment opportunities and market trends in this prime location.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80",
    date: "March 12, 2024",
    readTime: "4 min read",
    category: "Market Insights",
    slug: "district-9-investment"
  },
  {
    title: "Sustainable Living: Green Features in New Developments",
    excerpt: "Discover how new residential projects are incorporating sustainable features and green technologies to create eco-friendly living spaces.",
    image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&q=80",
    date: "March 10, 2024",
    readTime: "6 min read",
    category: "Sustainability",
    slug: "sustainable-living-features"
  },
  {
    title: "The Rise of Mixed-Use Developments",
    excerpt: "Understanding the growing popularity of mixed-use developments and how they're reshaping urban living in Singapore.",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80",
    date: "March 8, 2024",
    readTime: "5 min read",
    category: "Urban Living",
    slug: "rise-of-mixed-use"
  },
  {
    title: "Family-Friendly Condominiums: What to Look For",
    excerpt: "A guide to choosing the perfect family-friendly condominium, from amenities to location considerations and community features.",
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80",
    date: "March 5, 2024",
    readTime: "7 min read",
    category: "Family Living",
    slug: "family-friendly-condos"
  },
  {
    title: "Smart Home Technology in Modern Condos",
    excerpt: "How smart home technology is transforming the way we live, with a look at the latest innovations in residential developments.",
    image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&q=80",
    date: "March 3, 2024",
    readTime: "4 min read",
    category: "Technology",
    slug: "smart-home-technology"
  }
]

// Define sort options
type SortOption = "latest" | "oldest" | "a-z" | "popular"

// Define filter state type
type FilterState = {
  dateRange: {
    from: Date | undefined
    to: Date | undefined
  }
  categories: string[]
  sortBy: SortOption
  searchQuery: string
}

// Get unique categories from articles
const categories = Array.from(new Set(articlesData.map(article => article.category)))

// Generate months array
const months = [
  { value: "01", label: "January" },
  { value: "02", label: "February" },
  { value: "03", label: "March" },
  { value: "04", label: "April" },
  { value: "05", label: "May" },
  { value: "06", label: "June" },
  { value: "07", label: "July" },
  { value: "08", label: "August" },
  { value: "09", label: "September" },
  { value: "10", label: "October" },
  { value: "11", label: "November" },
  { value: "12", label: "December" }
]

// Generate days array (1-31)
const days = Array.from({ length: 31 }, (_, i) => ({
  value: (i + 1).toString().padStart(2, '0'),
  label: (i + 1).toString()
}))

export default function EditorialPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [isSortOpen, setIsSortOpen] = useState(false)
  const [filters, setFilters] = useState<FilterState>({
    dateRange: {
      from: new Date(2024, 0, 1), // January 1, 2024
      to: new Date(2024, 11, 31)  // December 31, 2024
    },
    categories: [],
    sortBy: "latest",
    searchQuery: ""
  })

  const years = Array.from({ length: 5 }, (_, i) => (2024 - i).toString())

  // Filter and sort articles
  const filteredArticles = useMemo(() => {
    return articlesData
      .filter(article => {
        const articleDate = new Date(article.date)
        const dateInRange = (!filters.dateRange.from || articleDate >= filters.dateRange.from) && 
                           (!filters.dateRange.to || articleDate <= filters.dateRange.to)
        
        const categoryMatch = filters.categories.length === 0 || 
          filters.categories.includes(article.category)
        
        const searchTerms = filters.searchQuery.toLowerCase().split(" ").filter(term => term.length > 0)
        const matchesSearch = searchTerms.length === 0 || searchTerms.every(term =>
          article.title.toLowerCase().includes(term) ||
          article.excerpt.toLowerCase().includes(term) ||
          article.category.toLowerCase().includes(term)
        )

        return dateInRange && categoryMatch && matchesSearch
      })
      .sort((a, b) => {
        switch (filters.sortBy) {
          case "latest":
            return new Date(b.date).getTime() - new Date(a.date).getTime()
          case "oldest":
            return new Date(a.date).getTime() - new Date(b.date).getTime()
          case "a-z":
            return a.title.localeCompare(b.title)
          case "popular":
            // For now, we'll use date as a proxy for popularity
            return new Date(b.date).getTime() - new Date(a.date).getTime()
          default:
            return 0
        }
      })
  }, [filters])

  const toggleCategory = (category: string) => {
    setFilters(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }))
  }

  const clearFilters = () => {
    setFilters({
      dateRange: {
        from: new Date(2024, 0, 1),
        to: new Date(2024, 11, 31)
      },
      categories: [],
      sortBy: "latest",
      searchQuery: ""
    })
  }

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen flex flex-col bg-gray-950"
    >
      {/* Hero Section - Keep original KW Singapore Insights content */}
      <section className="relative h-screen w-full">
        <Image
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80"
          alt="KW Blog"
          fill
          className="object-cover brightness-[0.4]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/20 flex items-center justify-center">
          <motion.div 
            className="container mx-auto px-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white"
              style={{ contentVisibility: 'auto' }}
            >
              KW Singapore Insights
            </h1>
            <p 
              className="text-lg sm:text-xl max-w-3xl mx-auto mb-12 text-gray-200"
              style={{ contentVisibility: 'auto' }}
            >
              Your trusted source for real estate insights, market trends, and expert analysis. 
              From luxury living to investment strategies, discover the stories and expertise 
              that make KW Singapore your premier real estate partner.
            </p>
            <motion.div 
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              className="flex justify-center"
            >
              <Button 
                className="bg-primary-red text-white hover:bg-primary-red/90 px-8 py-6 text-lg"
                onClick={() => {
                  const nextSection = document.querySelector('section:nth-child(2)') as HTMLElement;
                  if (nextSection) {
                    window.scrollTo({ top: nextSection.offsetTop, behavior: 'smooth' });
                  }
                }}
              >
                Explore Articles
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Search and Filters Row */}
      <section className="container mx-auto px-4 mt-[-4rem] mb-12 relative z-10">
        <div className="bg-[#242728] rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-4">
            {/* Search Bar */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="search"
                placeholder="Search articles by title, content, or category..."
                className="w-full pl-8 sm:pl-12 h-[52px] text-base sm:text-lg bg-[#242728] border-gray-600 text-white placeholder:text-[11px] sm:placeholder:text-base placeholder:text-left text-left focus:border-primary-red focus:ring-primary-red/20 backdrop-blur-sm rounded-md"
                value={filters.searchQuery}
                onChange={(e) => setFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
              />
            </div>
            {/* Filter Controls */}
            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                className="h-[52px] w-[52px] p-0 flex items-center justify-center border-gray-600 text-gray-300 hover:bg-gray-800/50 hover:text-white hover:border-gray-500 rounded-md transition-colors"
                onClick={() => setIsFilterOpen(true)}
              >
                <Filter className="h-5 w-5" />
                {(filters.categories.length > 0 || 
                  (filters.dateRange.from && filters.dateRange.from.getTime() !== new Date(2024, 0, 1).getTime()) || 
                  (filters.dateRange.to && filters.dateRange.to.getTime() !== new Date(2024, 11, 31).getTime())) && (
                  <Badge variant="secondary" className="absolute -top-1 -right-1 bg-primary-red/20 text-primary-red rounded-full">
                    {(filters.categories.length > 0 ? 1 : 0) + 
                     ((filters.dateRange.from && filters.dateRange.from.getTime() !== new Date(2024, 0, 1).getTime()) || 
                      (filters.dateRange.to && filters.dateRange.to.getTime() !== new Date(2024, 11, 31).getTime()) ? 1 : 0)}
                  </Badge>
                )}
              </Button>
              <Button 
                variant="outline" 
                className="h-[52px] w-[52px] p-0 flex items-center justify-center border-gray-600 text-gray-300 hover:bg-gray-800/50 hover:text-white hover:border-gray-500 rounded-md transition-colors"
                onClick={() => setIsSortOpen(true)}
              >
                <ArrowUpDown className="h-5 w-5" />
              </Button>
            </div>
          </div>
          {/* Active Filters */}
          {(filters.categories.length > 0 || 
            (filters.dateRange.from && filters.dateRange.from.getTime() !== new Date(2024, 0, 1).getTime()) || 
            (filters.dateRange.to && filters.dateRange.to.getTime() !== new Date(2024, 11, 31).getTime()) || 
            filters.searchQuery) && (
            <div className="flex flex-wrap items-center gap-2 mt-4">
              <span className="text-sm text-gray-400">Active filters:</span>
              {filters.searchQuery && (
                <Badge 
                  variant="secondary" 
                  className="bg-gray-800/50 text-gray-300 hover:bg-gray-800/70 cursor-pointer border border-gray-600 rounded-full px-3 py-1 transition-colors"
                  onClick={() => setFilters(prev => ({ ...prev, searchQuery: "" }))}
                >
                  Search: {filters.searchQuery}
                  <X className="ml-1 h-3 w-3" />
                </Badge>
              )}
              {filters.categories.map(category => (
                <Badge 
                  key={category}
                  variant="secondary" 
                  className="bg-gray-800/50 text-gray-300 hover:bg-gray-800/70 cursor-pointer border border-gray-600 rounded-full px-3 py-1 transition-colors"
                  onClick={() => toggleCategory(category)}
                >
                  {category}
                  <X className="ml-1 h-3 w-3" />
                </Badge>
              ))}
              {((filters.dateRange.from && filters.dateRange.from.getTime() !== new Date(2024, 0, 1).getTime()) || 
                (filters.dateRange.to && filters.dateRange.to.getTime() !== new Date(2024, 11, 31).getTime())) && (
                <Badge 
                  variant="secondary" 
                  className="bg-gray-800/50 text-gray-300 hover:bg-gray-800/70 cursor-pointer border border-gray-600 rounded-full px-3 py-1 transition-colors"
                  onClick={() => setFilters(prev => ({ 
                    ...prev, 
                    dateRange: { 
                      from: new Date(2024, 0, 1),
                      to: new Date(2024, 11, 31)
                    } 
                  }))}
                >
                  {filters.dateRange.from && filters.dateRange.to && 
                   filters.dateRange.from.getTime() === filters.dateRange.to.getTime()
                    ? `Date: ${format(filters.dateRange.from, "PPP")}`
                    : `Date Range: ${filters.dateRange.from ? format(filters.dateRange.from, "PPP") : "Any"} - ${filters.dateRange.to ? format(filters.dateRange.to, "PPP") : "Any"}`}
                  <X className="ml-1 h-3 w-3" />
                </Badge>
              )}
              <Button
                variant="ghost"
                className="text-gray-400 hover:text-white text-sm transition-colors"
                onClick={clearFilters}
              >
                Clear all
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Filter Dialog */}
      <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
        <DialogContent className="bg-[#1a1b1e] border-gray-700 text-white max-w-2xl rounded-lg shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Filter Articles</DialogTitle>
            <DialogDescription className="text-sm text-gray-400">
              Filter articles by date range and category.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            {/* Date Range */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-200">Date Range</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm text-gray-400">From</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <div
                        role="button"
                        tabIndex={0}
                        className={cn(
                          "w-full justify-start text-left font-normal bg-[#242728] border border-gray-600 text-gray-200 hover:bg-gray-800/50 rounded-md px-3 py-2 cursor-pointer",
                          !filters.dateRange.from && "text-gray-400"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4 inline" />
                        {filters.dateRange.from ? (
                          format(filters.dateRange.from, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </div>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-[#242728] border-gray-600" align="start">
                      <CalendarComponent
                        mode="single"
                        selected={filters.dateRange.from}
                        onSelect={(date: Date | undefined) => setFilters(prev => ({
                          ...prev,
                          dateRange: { ...prev.dateRange, from: date }
                        }))}
                        initialFocus
                        className="bg-[#242728] text-gray-200"
                        disabled={(date: Date) => date > new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm text-gray-400">To</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <div
                        role="button"
                        tabIndex={0}
                        className={cn(
                          "w-full justify-start text-left font-normal bg-[#242728] border border-gray-600 text-gray-200 hover:bg-gray-800/50 rounded-md px-3 py-2 cursor-pointer",
                          !filters.dateRange.to && "text-gray-400"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4 inline" />
                        {filters.dateRange.to ? (
                          format(filters.dateRange.to, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </div>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-[#242728] border-gray-600" align="start">
                      <CalendarComponent
                        mode="single"
                        selected={filters.dateRange.to}
                        onSelect={(date: Date | undefined) => setFilters(prev => ({
                          ...prev,
                          dateRange: { ...prev.dateRange, to: date }
                        }))}
                        initialFocus
                        className="bg-[#242728] text-gray-200"
                        disabled={(date: Date) => 
                          (filters.dateRange.from ? date < filters.dateRange.from : false) || 
                          date > new Date()
                        }
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>

            {/* Categories */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-200">Categories</h3>
              <div className="grid grid-cols-2 gap-4">
                {categories.map(category => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={category}
                      checked={filters.categories.includes(category)}
                      onCheckedChange={() => toggleCategory(category)}
                      className="border-gray-600 data-[state=checked]:bg-primary-red data-[state=checked]:border-primary-red"
                    />
                    <Label htmlFor={category} className="text-gray-300">{category}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-6">
            <Button
              variant="outline"
              className="border-gray-700 text-gray-300 hover:bg-gray-800"
              onClick={clearFilters}
            >
              Clear Filters
            </Button>
            <Button
              className="bg-primary-red text-white hover:bg-primary-red/90"
              onClick={() => setIsFilterOpen(false)}
            >
              Apply
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Sort Dialog */}
      <Dialog open={isSortOpen} onOpenChange={setIsSortOpen}>
        <DialogContent className="bg-[#1a1b1e] border-gray-700 text-white max-w-md rounded-lg shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Sort Articles</DialogTitle>
            <DialogDescription className="text-sm text-gray-400">
              Choose how to sort the articles.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <RadioGroup
              value={filters.sortBy}
              onValueChange={(value) => setFilters(prev => ({ ...prev, sortBy: value as SortOption }))}
              className="space-y-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="latest" id="latest" className="border-gray-600 data-[state=checked]:bg-primary-red data-[state=checked]:border-primary-red" />
                <Label htmlFor="latest" className="text-gray-300">Latest Articles</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="oldest" id="oldest" className="border-gray-600 data-[state=checked]:bg-primary-red data-[state=checked]:border-primary-red" />
                <Label htmlFor="oldest" className="text-gray-300">Oldest Articles</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="a-z" id="a-z" className="border-gray-600 data-[state=checked]:bg-primary-red data-[state=checked]:border-primary-red" />
                <Label htmlFor="a-z" className="text-gray-300">A-Z</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="popular" id="popular" className="border-gray-600 data-[state=checked]:bg-primary-red data-[state=checked]:border-primary-red" />
                <Label htmlFor="popular" className="text-gray-300">Most Popular</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="flex justify-end gap-2 mt-6">
            <Button
              className="bg-primary-red text-white hover:bg-primary-red/90"
              onClick={() => setIsSortOpen(false)}
            >
              Apply
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Articles Grid */}
      <section className="container mx-auto px-4 mb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.length > 0 ? (
            filteredArticles.map((article) => (
              <EditorialCard
                key={article.slug}
                title={article.title}
                excerpt={article.excerpt}
                image={article.image}
                date={article.date}
                readTime={article.readTime}
                category={article.category}
                slug={article.slug}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-16 bg-white/5 backdrop-blur-sm rounded-lg border border-gray-600">
              <p className="text-gray-300 text-lg mb-2">No articles found matching your criteria</p>
              <p className="text-gray-400">Try adjusting your filters or search terms</p>
            </div>
          )}
        </div>
        {/* Pagination */}
        {filteredArticles.length > 0 && (
          <div className="flex justify-center mt-12">
            <div className="flex items-center gap-2">
              <Button variant="outline" className="px-4 border-gray-600 text-gray-300 hover:bg-white/10 hover:text-white hover:border-gray-500">
                1
              </Button>
              <Button variant="outline" className="px-4 border-gray-600 text-gray-300 hover:bg-white/10 hover:text-white hover:border-gray-500">
                2
              </Button>
              <Button variant="outline" className="px-4 border-gray-600 text-gray-300 hover:bg-white/10 hover:text-white hover:border-gray-500">
                3
              </Button>
              <Button variant="outline" className="px-4 border-gray-600 text-gray-300 hover:bg-white/10 hover:text-white hover:border-gray-500">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </section>
    </motion.main>
  )
}
