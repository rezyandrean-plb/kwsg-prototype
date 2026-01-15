"use client"

export default function PropertyAnalysisPage() {
  return (
    <div className="w-full bg-black flex flex-col min-h-screen">
      {/* Embedded iframe section */}
      <section
        className="w-full pt-16 flex-1 flex flex-col" // offset for fixed header height (h-16)
      >
        <iframe
          src="https://compass.kwsingapore.com/property-analysis-lite?sort=newest&area=CCR"
          className="w-full flex-1 border-0"
          style={{ minHeight: 0 }}
          title="Property Analysis"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </section>
    </div>
  )
}
