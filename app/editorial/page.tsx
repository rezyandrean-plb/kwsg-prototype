import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, Clock, User, Tag, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function EditorialPage() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative h-screen w-full">
        <Image
          src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&q=80"
          alt="Editorial"
          fill
          className="object-cover brightness-50"
          priority
        />
        <div className="absolute inset-0 bg-black/40 flex items-end">
          <div className="container mx-auto px-4 pb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">KW Editorial</h1>
            <p className="text-xl text-gray-100 max-w-2xl mb-8">
              Insights, trends, and expert analysis on the new property launch market
            </p>
            <div className="max-w-xl bg-black/90 backdrop-blur-sm rounded-lg overflow-hidden flex p-1">
              <Input
                type="text"
                placeholder="Search articles, trends, and insights..."
                className="flex-1 border-0 bg-transparent text-white placeholder:text-gray-400 focus-visible:ring-0"
              />
              <Button className="bg-primary-red text-white hover:bg-primary-red/90">
                <Search className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              <div className="inline-block bg-primary-red/10 px-4 py-2 rounded-full text-primary-red font-medium mb-4">
                Featured Article
              </div>
              <h2 className="text-3xl font-bold mb-4 text-white">The Future of New Launch Properties in a Post-Pandemic World</h2>
              <p className="text-lg text-gray-300 mb-6">
                The real estate landscape has undergone significant transformation since the pandemic. This article
                explores how new launch properties are adapting to changing buyer preferences, technological
                advancements, and market dynamics.
              </p>
              <div className="flex items-center text-gray-400 mb-6 text-sm">
                <div className="flex items-center mr-4">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>May 2, 2024</span>
                </div>
                <div className="flex items-center mr-4">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>8 min read</span>
                </div>
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  <span>By Sarah Johnson</span>
                </div>
              </div>
              <Button className="bg-primary-red text-white hover:bg-primary-red/90">
                Read Full Article
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="md:w-1/2">
              <Image
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80"
                alt="Future of New Launch Properties"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Latest Articles */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-2 text-white">Latest Articles</h2>
          <p className="text-lg text-gray-300 mb-12">Stay updated with the newest insights and trends in real estate</p>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Article 1 */}
            <div className="bg-black rounded-lg overflow-hidden shadow-md border border-gray-800">
              <div className="relative h-48">
                <Image src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&q=80" alt="Luxury Condominium Trends" fill className="object-cover" />
                <div className="absolute top-3 left-3 bg-primary-red text-white px-3 py-1 rounded-full text-xs font-medium">
                  Market Trends
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-white">5 Luxury Condominium Trends to Watch in 2024</h3>
                <p className="text-gray-300 mb-4 line-clamp-3">
                  From smart home integration to wellness-focused amenities, discover the top trends shaping luxury
                  condominiums this year.
                </p>
                <div className="flex items-center text-gray-400 mb-4 text-xs">
                  <div className="flex items-center mr-3">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>Apr 28, 2024</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>5 min read</span>
                  </div>
                </div>
                <Link href="#" className="text-primary-red font-medium hover:underline text-sm inline-flex items-center">
                  Read More <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </div>
            </div>

            {/* Article 2 */}
            <div className="bg-black rounded-lg overflow-hidden shadow-md border border-gray-800">
              <div className="relative h-48">
                <Image src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80" alt="Investment Strategies" fill className="object-cover" />
                <div className="absolute top-3 left-3 bg-primary-red text-white px-3 py-1 rounded-full text-xs font-medium">
                  Investment
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-white">Investment Strategies for New Launch Properties</h3>
                <p className="text-gray-300 mb-4 line-clamp-3">
                  Expert advice on how to maximize returns when investing in pre-construction properties, including
                  timing, location selection, and negotiation tactics.
                </p>
                <div className="flex items-center text-gray-400 mb-4 text-xs">
                  <div className="flex items-center mr-3">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>Apr 22, 2024</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>7 min read</span>
                  </div>
                </div>
                <Link href="#" className="text-primary-red font-medium hover:underline text-sm inline-flex items-center">
                  Read More <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </div>
            </div>

            {/* Article 3 */}
            <div className="bg-black rounded-lg overflow-hidden shadow-md border border-gray-800">
              <div className="relative h-48">
                <Image src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80" alt="Sustainable Development" fill className="object-cover" />
                <div className="absolute top-3 left-3 bg-primary-red text-white px-3 py-1 rounded-full text-xs font-medium">
                  Sustainability
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-white">The Rise of Sustainable New Developments</h3>
                <p className="text-gray-300 mb-4 line-clamp-3">
                  How eco-friendly features are becoming standard in new launches and why buyers are willing to pay a
                  premium for sustainable living spaces.
                </p>
                <div className="flex items-center text-gray-400 mb-4 text-xs">
                  <div className="flex items-center mr-3">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>Apr 15, 2024</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>6 min read</span>
                  </div>
                </div>
                <Link href="#" className="text-primary-red font-medium hover:underline text-sm inline-flex items-center">
                  Read More <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" className="border-primary-red text-primary-red hover:bg-primary-red hover:text-white">
              View All Articles
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Market Insights */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-2 text-white">Market Insights</h2>
          <p className="text-lg text-gray-300 mb-12">Data-driven analysis to help you make informed decisions</p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Market Report */}
            <div className="bg-gray-900 rounded-lg overflow-hidden shadow-md border border-gray-800">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold mb-1 text-white">Q1 2024 New Launch Market Report</h3>
                    <p className="text-gray-400 text-sm">
                      Comprehensive analysis of pricing trends, sales volume, and buyer demographics
                    </p>
                  </div>
                  <div className="bg-primary-red/10 p-2 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-primary-red"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="mb-4">
                  <Image
                    src="https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&q=80"
                    alt="Q1 2024 Market Report"
                    width={500}
                    height={300}
                    className="w-full h-auto rounded-lg"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-400 text-xs">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>Published: Apr 10, 2024</span>
                  </div>
                  <Button size="sm" className="bg-primary-red text-white hover:bg-primary-red/90">
                    Download Report
                  </Button>
                </div>
              </div>
            </div>

            {/* Price Index */}
            <div className="bg-gray-900 rounded-lg overflow-hidden shadow-md border border-gray-800">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold mb-1 text-white">New Launch Price Index</h3>
                    <p className="text-gray-400 text-sm">
                      Track price movements and market performance across different districts
                    </p>
                  </div>
                  <div className="bg-primary-red/10 p-2 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-primary-red"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                      />
                    </svg>
                  </div>
                </div>
                <div className="mb-4">
                  <Image
                    src="https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&q=80"
                    alt="Price Index"
                    width={500}
                    height={300}
                    className="w-full h-auto rounded-lg"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-400 text-xs">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>Updated: Apr 5, 2024</span>
                  </div>
                  <Button size="sm" className="bg-primary-red text-white hover:bg-primary-red/90">
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Browse by Category</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Link href="#" className="group">
              <div className="bg-white rounded-lg p-6 text-center shadow-md transition-all group-hover:shadow-lg group-hover:-translate-y-1">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors group-hover:bg-primary/20">
                  <Tag className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-bold mb-2">Market Trends</h3>
                <p className="text-sm text-gray-500">12 Articles</p>
              </div>
            </Link>

            <Link href="#" className="group">
              <div className="bg-white rounded-lg p-6 text-center shadow-md transition-all group-hover:shadow-lg group-hover:-translate-y-1">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors group-hover:bg-primary/20">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="font-bold mb-2">Investment</h3>
                <p className="text-sm text-gray-500">8 Articles</p>
              </div>
            </Link>

            <Link href="#" className="group">
              <div className="bg-white rounded-lg p-6 text-center shadow-md transition-all group-hover:shadow-lg group-hover:-translate-y-1">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors group-hover:bg-primary/20">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="font-bold mb-2">Sustainability</h3>
                <p className="text-sm text-gray-500">6 Articles</p>
              </div>
            </Link>

            <Link href="#" className="group">
              <div className="bg-white rounded-lg p-6 text-center shadow-md transition-all group-hover:shadow-lg group-hover:-translate-y-1">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors group-hover:bg-primary/20">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>
                <h3 className="font-bold mb-2">Architecture</h3>
                <p className="text-sm text-gray-500">9 Articles</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Informed</h2>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Subscribe to our newsletter for the latest insights, market reports, and exclusive content
          </p>
          <div className="max-w-md mx-auto">
            <form className="flex flex-col sm:flex-row gap-3">
              <Input
                type="email"
                placeholder="Your email address"
                className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/60"
              />
              <Button className="bg-white text-primary hover:bg-white/90">Subscribe</Button>
            </form>
            <p className="text-sm mt-4 text-white/70">We respect your privacy. Unsubscribe at any time.</p>
          </div>
        </div>
      </section>

      {/* Expert Contributors */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-2 text-center">Our Expert Contributors</h2>
          <p className="text-lg text-gray-600 mb-12 text-center max-w-3xl mx-auto">
            Industry professionals sharing their knowledge and insights
          </p>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="relative w-32 h-32 mx-auto mb-4">
                <Image
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80"
                  alt="Sarah Johnson"
                  fill
                  className="object-cover rounded-full"
                />
              </div>
              <h3 className="font-bold text-lg">Sarah Johnson</h3>
              <p className="text-gray-500 mb-2">Market Analyst</p>
              <p className="text-sm text-gray-600">
                15+ years experience in real estate market analysis and forecasting
              </p>
            </div>

            <div className="text-center">
              <div className="relative w-32 h-32 mx-auto mb-4">
                <Image
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80"
                  alt="Michael Chen"
                  fill
                  className="object-cover rounded-full"
                />
              </div>
              <h3 className="font-bold text-lg">Michael Chen</h3>
              <p className="text-gray-500 mb-2">Investment Strategist</p>
              <p className="text-sm text-gray-600">Former hedge fund manager specializing in real estate investments</p>
            </div>

            <div className="text-center">
              <div className="relative w-32 h-32 mx-auto mb-4">
                <Image
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80"
                  alt="Priya Patel"
                  fill
                  className="object-cover rounded-full"
                />
              </div>
              <h3 className="font-bold text-lg">Priya Patel</h3>
              <p className="text-gray-500 mb-2">Sustainable Design Expert</p>
              <p className="text-sm text-gray-600">Award-winning architect focused on eco-friendly development</p>
            </div>

            <div className="text-center">
              <div className="relative w-32 h-32 mx-auto mb-4">
                <Image
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80"
                  alt="David Wilson"
                  fill
                  className="object-cover rounded-full"
                />
              </div>
              <h3 className="font-bold text-lg">David Wilson</h3>
              <p className="text-gray-500 mb-2">Property Tech Innovator</p>
              <p className="text-sm text-gray-600">
                Founder of multiple PropTech startups revolutionizing the industry
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
