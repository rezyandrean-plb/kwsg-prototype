"use client"

export default function PropertyAnalysisPage() {
  return (
    <div className="w-full bg-black">
      {/* Embedded iframe section */}
      <section
        className="w-full pt-16" // offset for fixed header height (h-16)
        style={{ minHeight: '100vh' }}
      >
        <iframe
          src="https://compass.kwsingapore.com/property-analysis-lite?sort=newest&area=CCR"
          className="w-full h-[calc(100vh-4rem)] border-0"
          title="Property Analysis"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </section>
    </div>
  )
}
