import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function MelvinStoryPage() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative h-screen w-full">
        <Image
          src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80"
          alt="Melvin Headhunter Story"
          fill
          className="object-cover brightness-75"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
          <div className="container mx-auto px-4 pb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Melvin's Headhunter Story</h1>
            <p className="text-xl text-white/90 max-w-2xl">
              From struggling agent to top producer - a journey of transformation and success
            </p>
          </div>
        </div>
      </section>

      {/* Story Introduction */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              <Image
                src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&q=80"
                alt="Melvin Success Story"
                width={600}
                height={500}
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-4">Meet Melvin</h2>
              <p className="text-lg text-gray-600 mb-6">
                From struggling agent to top producer specializing in new launches - discover how Melvin transformed his
                career and became the leading specialist in new property launches.
              </p>
              <blockquote className="border-l-4 border-primary pl-4 italic mb-8">
                "Focusing on new launches completely changed my business. The specialized training and technology
                provided gave me the edge I needed to become a market leader."
              </blockquote>
              <div className="flex items-center mb-8">
                <div className="flex -space-x-2">
                  <div className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg">
                    $1M+
                  </div>
                  <div className="bg-primary/80 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg">
                    50+
                  </div>
                  <div className="bg-primary/60 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg">
                    #1
                  </div>
                </div>
                <div className="ml-6">
                  <p className="text-sm text-gray-500">Annual commission | Units sold | In new launches</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Journey */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">The Journey to Success</h2>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-center">The Beginning</h3>
              <p className="text-gray-600">
                Melvin started as a general real estate agent, struggling to stand out in a crowded market. With
                inconsistent income and long hours, he knew he needed to find a specialization.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-center">The Turning Point</h3>
              <p className="text-gray-600">
                After joining KW, Melvin discovered the untapped potential in new property launches. He leveraged KW's
                specialized training and technology to become an expert in this niche.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-center">The Success</h3>
              <p className="text-gray-600">
                Today, Melvin is recognized as the go-to specialist for new launches. He has built a team of agents who
                follow his methodology and consistently achieves record-breaking sales.
              </p>
            </div>
          </div>

          <div className="text-center">
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
              "The key to my success was finding a niche and becoming the absolute best at it. KW gave me the tools,
              training, and support to make that happen."
            </p>
          </div>
        </div>
      </section>

      {/* Key Success Factors */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Key Success Factors</h2>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="bg-primary/10 p-4 rounded-full">
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
                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Leveraging Technology</h3>
                <p className="text-gray-600">
                  Melvin embraced KW's cutting-edge technology platform to streamline his business operations, analyze
                  market trends, and identify potential buyers for new launches. This gave him a significant edge over
                  competitors who relied on traditional methods.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="bg-primary/10 p-4 rounded-full">
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
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Specialized Training</h3>
                <p className="text-gray-600">
                  Through KW's comprehensive training programs, Melvin gained deep expertise in the new launches market.
                  He learned how to effectively communicate the value of pre-construction properties and address common
                  buyer concerns.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="bg-primary/10 p-4 rounded-full">
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
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Building a Network</h3>
                <p className="text-gray-600">
                  Melvin built strong relationships with developers, giving him early access to new projects and
                  exclusive information. He also cultivated a network of investors and buyers specifically interested in
                  new launches.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="bg-primary/10 p-4 rounded-full">
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
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Growth Share Model</h3>
                <p className="text-gray-600">
                  KW's unique growth share model allowed Melvin to reinvest in his business and build a team. This
                  scalability was crucial for handling multiple new launch projects simultaneously and maximizing his
                  reach.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">What Others Say About Melvin</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mr-4">
                  <span className="text-primary font-bold">JL</span>
                </div>
                <div>
                  <h4 className="font-bold">John Lee</h4>
                  <p className="text-sm text-gray-500">Property Developer</p>
                </div>
              </div>
              <p className="italic text-gray-600">
                "Melvin has been our go-to agent for new launches. His understanding of the market and ability to
                connect with buyers is unmatched. He consistently outperforms other agents by a significant margin."
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mr-4">
                  <span className="text-primary font-bold">ST</span>
                </div>
                <div>
                  <h4 className="font-bold">Sarah Tan</h4>
                  <p className="text-sm text-gray-500">First-time Homebuyer</p>
                </div>
              </div>
              <p className="italic text-gray-600">
                "As someone new to property investment, I was hesitant about buying a pre-construction unit. Melvin
                walked me through the entire process, explained the benefits, and helped me find the perfect property. I
                couldn't be happier with my investment."
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mr-4">
                  <span className="text-primary font-bold">RK</span>
                </div>
                <div>
                  <h4 className="font-bold">Robert Kim</h4>
                  <p className="text-sm text-gray-500">Property Investor</p>
                </div>
              </div>
              <p className="italic text-gray-600">
                "I've worked with many agents over the years, but Melvin's expertise in new launches is exceptional. He
                has a knack for identifying properties with the best appreciation potential, which has significantly
                increased my portfolio's value."
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mr-4">
                  <span className="text-primary font-bold">MC</span>
                </div>
                <div>
                  <h4 className="font-bold">Maria Chen</h4>
                  <p className="text-sm text-gray-500">Team Member</p>
                </div>
              </div>
              <p className="italic text-gray-600">
                "Joining Melvin's team was the best career decision I've made. His mentorship and the systems he's put
                in place have helped me grow my business exponentially. The specialized training in new launches gave me
                a clear advantage in the market."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Write Your Own Success Story?</h2>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Join Melvin and the KW team to transform your real estate career and become a specialist in new property
            launches.
          </p>
          <Button className="bg-white text-primary hover:bg-gray-100">
            Join Recruitment Webinar
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>
    </main>
  )
}
