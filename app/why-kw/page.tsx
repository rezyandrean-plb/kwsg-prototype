import { Input } from "@/components/ui/input"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle } from "lucide-react"

export default function WhyKWPage() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative h-screen w-full">
        <Image
          src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80"
          alt="Why KW"
          fill
          className="object-cover brightness-75"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
          <div className="container mx-auto px-4 pb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Why Choose KW</h1>
            <p className="text-xl text-white/90 max-w-2xl">
              Join the number one realty globally and become a specialist in new property launches
            </p>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              <div className="inline-block bg-primary/10 px-4 py-2 rounded-full text-primary font-medium mb-4">
                Technology
              </div>
              <h2 className="text-3xl font-bold mb-4">Cutting-Edge Technology</h2>
              <p className="text-lg text-gray-600 mb-6">
                Our proprietary technology platform gives you the edge in the competitive new launches market. From lead
                generation to client management, we provide the tools you need to succeed.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-primary mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg">Command Center</h3>
                    <p className="text-gray-600">
                      A comprehensive dashboard that puts all your business metrics at your fingertips
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-primary mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg">KW Mobile App</h3>
                    <p className="text-gray-600">Manage your business on the go with our powerful mobile application</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-primary mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg">AI-Powered Insights</h3>
                    <p className="text-gray-600">
                      Leverage artificial intelligence to identify potential buyers for new launches
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="md:w-1/2">
              <Image
                src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&q=80"
                alt="KW Technology"
                width={600}
                height={500}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Training Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2 order-2 md:order-1">
              <Image
                src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80"
                alt="KW Training"
                width={600}
                height={500}
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="md:w-1/2 order-1 md:order-2">
              <div className="inline-block bg-primary/10 px-4 py-2 rounded-full text-primary font-medium mb-4">
                Training
              </div>
              <h2 className="text-3xl font-bold mb-4">World-Class Training</h2>
              <p className="text-lg text-gray-600 mb-6">
                Our comprehensive training program is designed to transform you into a new launch specialist. From
                market analysis to closing techniques, we cover every aspect of the business.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-primary mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg">KW MAPS Coaching</h3>
                    <p className="text-gray-600">One-on-one coaching with industry experts to accelerate your growth</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-primary mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg">New Launch Masterclass</h3>
                    <p className="text-gray-600">
                      Specialized training focused on the unique aspects of selling new developments
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-primary mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg">Continuous Education</h3>
                    <p className="text-gray-600">
                      Regular workshops and seminars to keep you updated with market trends
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Growth Share Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              <div className="inline-block bg-primary/10 px-4 py-2 rounded-full text-primary font-medium mb-4">
                Growth Share
              </div>
              <h2 className="text-3xl font-bold mb-4">Unique Growth Share Model</h2>
              <p className="text-lg text-gray-600 mb-6">
                Our innovative growth share model ensures that your hard work is rewarded fairly. Unlike traditional
                brokerages, we believe in sharing the success with our agents.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-primary mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg">Competitive Commission Splits</h3>
                    <p className="text-gray-600">Industry-leading commission structure that rewards performance</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-primary mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg">Profit Share</h3>
                    <p className="text-gray-600">
                      Participate in the company's profits through our unique profit sharing program
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-primary mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg">Wealth Building Opportunities</h3>
                    <p className="text-gray-600">
                      Long-term wealth creation through equity and investment opportunities
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="md:w-1/2">
              <Image
                src="/business-growth-chart.png"
                alt="Growth Share Model"
                width={600}
                height={500}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* MVVBP Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-block bg-primary/10 px-4 py-2 rounded-full text-primary font-medium mb-4">MVVBP</div>
            <h2 className="text-3xl font-bold mb-4">Our Mission, Vision, Values, Beliefs & Perspective</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              At KW, we are guided by a clear set of principles that define who we are and how we operate.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-center">Mission</h3>
              <p className="text-gray-600 text-center">
                To build careers worth having, businesses worth owning, lives worth living, experiences worth giving,
                and legacies worth leaving.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
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
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-center">Vision</h3>
              <p className="text-gray-600 text-center">
                To be the real estate company of choice for agents and their customers, specializing in new property
                launches.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
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
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-center">Values</h3>
              <p className="text-gray-600 text-center">
                God, Family, then Business. Win-Win or no deal. Commitment to excellence. Integrity in all things.
                Customer service focus.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mt-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
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
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-center">Beliefs</h3>
              <p className="text-gray-600 text-center">
                We believe that success comes through collaboration, continuous learning, and a commitment to serving
                our clients with the highest level of professionalism and expertise.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
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
              <h3 className="text-xl font-bold mb-2 text-center">Perspective</h3>
              <p className="text-gray-600 text-center">
                We see the real estate industry as a platform for building wealth, serving communities, and creating
                opportunities for personal and professional growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Join the New Launch Specialists?</h2>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Fill out the form below and we'll contact you with more information about our upcoming recruitment events.
          </p>
          <div className="max-w-3xl mx-auto">
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                type="text"
                placeholder="Full Name"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
              />
              <Input
                type="email"
                placeholder="Email Address"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
              />
              <Input
                type="tel"
                placeholder="Phone Number"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
              />
              <Input
                type="text"
                placeholder="Current Agency (if applicable)"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
              />
              <div className="md:col-span-2">
                <Button className="w-full bg-white text-primary hover:bg-white/90">
                  Join In-person Webinar
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  )
}
