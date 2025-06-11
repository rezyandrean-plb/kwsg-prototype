"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Filter, Search, Calendar } from "lucide-react"
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
type SortOption = "newest" | "oldest" | "title-asc" | "title-desc" | "category"

// Define filter state type
type FilterState = {
  yearRange: { start: string; end: string }
  categories: string[]
  sortBy: SortOption
  searchQuery: string
}

// Get unique categories from articles
const categories = Array.from(new Set(articlesData.map(article => article.category)))

export default function EditorialPage() {
  const [isYearFilterOpen, setIsYearFilterOpen] = useState(false)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [filters, setFilters] = useState<FilterState>({
    yearRange: { start: "2024", end: "2024" },
    categories: [],
    sortBy: "newest",
    searchQuery: ""
  })

  const years = Array.from({ length: 5 }, (_, i) => (2024 - i).toString())

  // Filter and sort articles
  const filteredArticles = useMemo(() => {
    return articlesData
      .filter(article => {
        const articleYear = new Date(article.date).getFullYear().toString()
        const yearInRange = articleYear >= filters.yearRange.start && articleYear <= filters.yearRange.end
        
        const categoryMatch = filters.categories.length === 0 || 
          filters.categories.includes(article.category)
        
        const searchTerms = filters.searchQuery.toLowerCase().split(" ").filter(term => term.length > 0)
        const matchesSearch = searchTerms.length === 0 || searchTerms.every(term =>
          article.title.toLowerCase().includes(term) ||
          article.excerpt.toLowerCase().includes(term) ||
          article.category.toLowerCase().includes(term)
        )

        return yearInRange && categoryMatch && matchesSearch
      })
      .sort((a, b) => {
        switch (filters.sortBy) {
          case "newest":
            return new Date(b.date).getTime() - new Date(a.date).getTime()
          case "oldest":
            return new Date(a.date).getTime() - new Date(b.date).getTime()
          case "title-asc":
            return a.title.localeCompare(b.title)
          case "title-desc":
            return b.title.localeCompare(a.title)
          case "category":
            return a.category.localeCompare(b.category)
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
      yearRange: { start: "2024", end: "2024" },
      categories: [],
      sortBy: "newest",
      searchQuery: ""
    })
  }

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen flex flex-col"
    >
      {/* Hero Section */}
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

      <section className="py-12 bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold text-white">Latest Articles</h2>
              <p className="text-gray-300">Discover insights and stories from KW Singapore</p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search articles by title, content, or category..."
                  className="pl-10 bg-gray-900 border-gray-700 text-gray-300 placeholder:text-gray-500"
                  value={filters.searchQuery}
                  onChange={(e) => setFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
                />
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  className="flex items-center border-gray-700 text-gray-300 hover:bg-gray-800"
                  onClick={() => setIsYearFilterOpen(true)}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Date Range
                  {(filters.yearRange.start !== "2024" || filters.yearRange.end !== "2024") && (
                    <Badge variant="secondary" className="ml-2 bg-primary-red/20 text-primary-red">
                      {filters.yearRange.start === filters.yearRange.end ? "1" : "2"}
                    </Badge>
                  )}
                </Button>

                <Button 
                  variant="outline" 
                  className="flex items-center border-gray-700 text-gray-300 hover:bg-gray-800"
                  onClick={() => setIsFilterOpen(true)}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filter & Sort
                  {filters.categories.length > 0 && (
                    <Badge variant="secondary" className="ml-2 bg-primary-red/20 text-primary-red">
                      {filters.categories.length}
                    </Badge>
                  )}
                </Button>
              </div>

              {/* Active filters display */}
              {(filters.categories.length > 0 || filters.yearRange.start !== "2024" || filters.yearRange.end !== "2024") && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {filters.categories.map(category => (
                    <Badge 
                      key={category}
                      variant="secondary" 
                      className="bg-gray-800 text-gray-300 hover:bg-gray-700 cursor-pointer"
                      onClick={() => toggleCategory(category)}
                    >
                      {category}
                      <X className="ml-1 h-3 w-3" />
                    </Badge>
                  ))}
                  {(filters.yearRange.start !== "2024" || filters.yearRange.end !== "2024") && (
                    <Badge 
                      variant="secondary" 
                      className="bg-gray-800 text-gray-300 hover:bg-gray-700 cursor-pointer"
                      onClick={() => setFilters(prev => ({ 
                        ...prev, 
                        yearRange: { start: "2024", end: "2024" } 
                      }))}
                    >
                      {filters.yearRange.start === filters.yearRange.end 
                        ? `Year: ${filters.yearRange.start}`
                        : `Years: ${filters.yearRange.start}-${filters.yearRange.end}`}
                      <X className="ml-1 h-3 w-3" />
                    </Badge>
                  )}
                  <Button
                    variant="ghost"
                    className="text-gray-400 hover:text-gray-300 text-sm"
                    onClick={clearFilters}
                  >
                    Clear all
                  </Button>
                </div>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
              <div className="col-span-full text-center py-12">
                <p className="text-gray-400 text-lg">No articles found matching your criteria.</p>
              </div>
            )}
          </div>

          <div className="flex justify-center mt-12">
            <Button variant="outline" className="mx-1 px-4 border-gray-700 text-gray-300 hover:bg-gray-800">
              1
            </Button>
            <Button variant="outline" className="mx-1 px-4 border-gray-700 text-gray-300 hover:bg-gray-800">
              2
            </Button>
            <Button variant="outline" className="mx-1 px-4 border-gray-700 text-gray-300 hover:bg-gray-800">
              3
            </Button>
            <Button variant="outline" className="mx-1 border-gray-700 text-gray-300 hover:bg-gray-800">
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Year Filter Dialog */}
      <Dialog open={isYearFilterOpen} onOpenChange={setIsYearFilterOpen}>
        <DialogContent className="bg-gray-900 border-gray-700 text-white">
          <DialogHeader>
            <DialogTitle>Filter by Date Range</DialogTitle>
            <DialogDescription className="text-sm text-gray-400">
              Select a date range to filter articles
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm text-gray-300">Start Date</label>
                <Select
                  value={filters.yearRange.start}
                  onValueChange={(value) => setFilters(prev => ({
                    ...prev,
                    yearRange: { ...prev.yearRange, start: value }
                  }))}
                >
                  <SelectTrigger className="bg-gray-800 border-gray-700">
                    <SelectValue placeholder="Select date" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    {years.map((year) => (
                      <SelectItem key={year} value={year} className="text-white">
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-300">End Date</label>
                <Select
                  value={filters.yearRange.end}
                  onValueChange={(value) => setFilters(prev => ({
                    ...prev,
                    yearRange: { ...prev.yearRange, end: value }
                  }))}
                >
                  <SelectTrigger className="bg-gray-800 border-gray-700">
                    <SelectValue placeholder="Select date" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    {years
                      .filter(year => parseInt(year) >= parseInt(filters.yearRange.start))
                      .map((year) => (
                        <SelectItem key={year} value={year} className="text-white">
                          {year}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              className="border-gray-700 text-gray-300 hover:bg-gray-800"
              onClick={() => setFilters(prev => ({ 
                ...prev, 
                yearRange: { start: "2024", end: "2024" } 
              }))}
            >
              Clear Date Range
            </Button>
            <Button
              className="bg-primary-red text-white hover:bg-primary-red/90"
              onClick={() => setIsYearFilterOpen(false)}
            >
              Apply
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Categories and Sort Dialog */}
      <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
        <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle>Filter & Sort Articles</DialogTitle>
            <DialogDescription className="text-sm text-gray-400">
              Select categories and sort options for articles
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-1 gap-6 py-4">
            {/* Categories */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Categories</h3>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={category}
                      checked={filters.categories.includes(category)}
                      onCheckedChange={() => toggleCategory(category)}
                      className="border-gray-600 data-[state=checked]:bg-primary-red data-[state=checked]:border-primary-red"
                    />
                    <Label
                      htmlFor={category}
                      className="text-sm text-gray-300 cursor-pointer"
                    >
                      {category}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Sort Options */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Sort By</h3>
              <RadioGroup
                value={filters.sortBy}
                onValueChange={(value: SortOption) => setFilters(prev => ({ ...prev, sortBy: value }))}
                className="grid grid-cols-2 md:grid-cols-5 gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="newest" id="newest" className="border-gray-600" />
                  <Label htmlFor="newest" className="text-sm text-gray-300 cursor-pointer">
                    Newest First
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="oldest" id="oldest" className="border-gray-600" />
                  <Label htmlFor="oldest" className="text-sm text-gray-300 cursor-pointer">
                    Oldest First
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="title-asc" id="title-asc" className="border-gray-600" />
                  <Label htmlFor="title-asc" className="text-sm text-gray-300 cursor-pointer">
                    Title A-Z
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="title-desc" id="title-desc" className="border-gray-600" />
                  <Label htmlFor="title-desc" className="text-sm text-gray-300 cursor-pointer">
                    Title Z-A
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="category" id="category" className="border-gray-600" />
                  <Label htmlFor="category" className="text-sm text-gray-300 cursor-pointer">
                    By Category
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              className="border-gray-700 text-gray-300 hover:bg-gray-800"
              onClick={() => setFilters(prev => ({ 
                ...prev, 
                categories: [],
                sortBy: "newest"
              }))}
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
    </motion.main>
  )
}
