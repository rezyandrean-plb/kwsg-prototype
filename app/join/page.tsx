"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import type { MouseEvent, MutableRefObject, RefObject } from "react"
import { Calendar, Handshake, Users, ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"

const heroCards = [
  {
    title: "The 3-Income Model",
    target: "income-model-section",
    span: "lg:col-span-3",
    compactOnDesktop: true,
  },
  {
    title: "PropTech Ecosystem",
    target: "proptech-section",
    span: "lg:col-span-3",
    compactOnDesktop: true,
  },
  {
    title: "The KW Model for Predictable Success",
    target: "blueprint-section",
    span: "lg:col-span-2",
  },
  {
    title: "World-Class Training",
    target: "training-section",
    span: "lg:col-span-2",
  },
  {
    title: "Culture & Leadership of Winning Together",
    target: "culture-section",
    span: "md:col-span-2 lg:col-span-2",
  },
]

const youtubeVideos = ["yJ4RNPtESM4", "wbOn8um6oB4", "RxJe0-Omg70", "lgekMAy7DxU"]
const youtubeShorts = [
  { id: "yJ4RNPtESM4", label: "Tech Tools" },
  { id: "wbOn8um6oB4", label: "Compass Tools" },
  { id: "RxJe0-Omg70", label: "Compass10" },
  { id: "lgekMAy7DxU", label: "Contacts Tools" },
  { id: "70KX3UiIOeg", label: "Compass testimony" },
]
const imageCarouselImages = [
  "/images/why-kw-singapore/NewLaunch_Collection.png",
  "/images/why-kw-singapore/NewLaunch_ExportReport.png",
  "/images/why-kw-singapore/NewLaunch_PropertyAnalysis.png",
]

function useIsLargeScreen() {
  const [isLarge, setIsLarge] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return
    const handleResize = () => setIsLarge(window.innerWidth >= 1024)
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return isLarge
}

const blueprintHighlights = [
  {
    title: "The MREA Model (Millionaire Real Estate Agent)",
    copy:
      "A step-by-step roadmap detailing the Economic, Lead Generation, Budget, and Organizational Models used by top producers globally.",
  },
  {
    title: "The Rainmaker System",
    copy:
      "A framework that focuses your time and resources on the highest-impact activities (Lead Generation and Listings) by leveraging people and technology.",
  },
]

const trainingHighlights = [
  {
    title: "KW University & Multiplier Series",
    copy: "World-class, results-focused training from foundational skill-building to high-level mastery.",
  },
  {
    title: "Realtor Branding Workshop",
    copy:
      "Specialized workshop to formulate your unique brand positioning and translate it into a powerful, consistent presence.",
  },
  {
    title: "MREA Masterclass",
    copy:
      "Leverage the Millionaire Real Estate Agent curriculum—the step-by-step roadmap used by top producers globally.",
  },
]

const cultureHighlights = [
  {
    title: "Mentorship & Leadership",
    copy:
      "Gain direct access to top-producing Managers and Leaders who act as business coaches and help you implement the KW Models.",
  },
  {
    title: "Dominant Brand Support",
    copy:
      "Leverage our Media Studios and AI Avatar brand positioning creation to instantly elevate your online presence and stand out as the clear expert.",
  },
  {
    title: "Collaborative Community",
    copy:
      "High-energy events and a supportive environment foster a win-win, abundance-minded culture where market knowledge is freely shared.",
  },
]

const lastSectionActions = [
  
  {
    title: "READY TO ONBOARD?",
    copy:
      "You've seen the model, you understand the vision, and you're ready to make the move. Join the real estate revolution in Singapore and get immediate access to our training, tools, and tech",
    button: "START MY ONBOARDING",
    icon: Handshake,
    href: "https://api.mediax.sg/widget/form/FIYDxKpn7GUUJ2YOvtEU",
  },
  {
    title: "BOOK A 1-1 BUSINESS CONSULT",
    copy:
      "Have questions? Want to discuss how the KW model can be tailored to your specific business goals? Book a confidential, no-obligation 1-on-1 strategy call with us.",
    button: "BOOK MY 1-1 CONSULT",
    icon: Users,
    href: "https://api.mediax.sg/widget/form/7OJwwi1ynbfo578kPUAv",
  },
]

const incomeCards = [
  {
    title: "Growth Share Passive Legacy",
    intro: "True Inheritable Wealth.",
    body: [
      "By introducing productive realtors to KW Singapore, you earn a percentage of the company's profit.",
      "This 7-tier income stream is global and transferable to your next-of-kin.",
      "As long as you remain with KW and your sponsored realtors produce, your Growth Share never stops.",
    ],
    badge: "01",
  },
  {
    title: "Maximum Commission in Producer Income",
    intro: "The Fast Track to 94%.",
    body: [
      "Rookie Realtors start at 80%.",
      "Hit S$80K GCI and jump to a 90% split immediately.",
      "Hit S$150K GCI and jump to a 94% split for the rest of your 12-month cycle.",
      "The path is clear: The more you produce, the more you keep.",
    ],
    badge: "02",
  },
  {
    title: "The Coach's Override",
    intro: "Build Your Team, Build Your Future.",
    body: [
      "You take Manager Overriding commissions (2% & 1%) for coaching your downlines.",
      "This is an immediate, stable income stream for your leadership.",
    ],
    badge: "03",
  },
]

const avatarImages = [
  "/images/why-kw-singapore/business-section/Business-DSC04852.jpg",
  "/images/why-kw-singapore/business-section/Business-DSC04902.jpg",
  "/images/why-kw-singapore/business-section/Business-DSC05010.jpg",
  "/images/why-kw-singapore/business-section/Business-DSC05252.jpg",
  "/images/why-kw-singapore/business-section/Business-DSC05255.jpg",
  "/images/why-kw-singapore/business-section/Business-DSC05261.jpg",
  "/images/why-kw-singapore/business-section/Business-DSC05289.jpg",
  "/images/why-kw-singapore/business-section/Business-POD-04.jpeg",
  "/images/why-kw-singapore/business-section/Business-POD-05.jpeg",
]

const avatarLayout = [
  { start: "hidden lg:block", shift: "space-y-6", items: [0, 1] },
  { start: "hidden md:block pt-12", shift: "space-y-6", items: [2, 3] },
  { start: "pt-6 md:pt-24", shift: "space-y-6", items: [4, 5] },
  { start: "pt-12 md:pt-32", shift: "space-y-6", items: [6, 7] },
  { start: "pt-6 md:pt-24", shift: "space-y-6", items: [8, 9] },
  { start: "hidden md:block pt-12", shift: "space-y-6", items: [10, 11] },
  { start: "hidden lg:block", shift: "space-y-6", items: [12, 13] },
]

export default function JoinPage() {
  const [activeIncome, setActiveIncome] = useState(0)
  const [carouselIndex, setCarouselIndex] = useState(0)
  const [isCarouselPaused, setIsCarouselPaused] = useState(false)
  const [imageCarouselIndex, setImageCarouselIndex] = useState(0)
  const [isImageCarouselPaused, setIsImageCarouselPaused] = useState(false)
  const [currentShortsIndex, setCurrentShortsIndex] = useState(0)

  const [kwEdgeOpacity, setKwEdgeOpacity] = useState(0)
  const [kwEdgeTranslateY, setKwEdgeTranslateY] = useState(20)
  const [cardsOpacity, setCardsOpacity] = useState(0)
  const [cardAnimations, setCardAnimations] = useState(heroCards.map(() => 0))
  const [cardTranslateX, setCardTranslateX] = useState(heroCards.map(() => -100))

  const [predictableWealthOpacity, setPredictableWealthOpacity] = useState(0)
  const [predictableWealthTranslateY, setPredictableWealthTranslateY] = useState(50)
  const [incomeModelOpacity, setIncomeModelOpacity] = useState(0)
  const [incomeModelTranslateY, setIncomeModelTranslateY] = useState(50)
  const [proptechOpacity, setProptechOpacity] = useState(0)
  const [proptechTranslateY, setProptechTranslateY] = useState(50)
  const [blueprintOpacity, setBlueprintOpacity] = useState(0)
  const [blueprintTranslateY, setBlueprintTranslateY] = useState(50)
  const [trainingOpacity, setTrainingOpacity] = useState(0)
  const [trainingTranslateY, setTrainingTranslateY] = useState(50)
  const [cultureOpacity, setCultureOpacity] = useState(0)
  const [cultureTranslateY, setCultureTranslateY] = useState(50)
  const [marketFocusOpacity, setMarketFocusOpacity] = useState(0)
  const [marketFocusTranslateY, setMarketFocusTranslateY] = useState(50)
  const [globalPowerhouseOpacity, setGlobalPowerhouseOpacity] = useState(0)
  const [globalPowerhouseTranslateY, setGlobalPowerhouseTranslateY] = useState(50)
  const [finalCTAOpacity, setFinalCTAOpacity] = useState(0)
  const [finalCTATranslateY, setFinalCTATranslateY] = useState(50)
  const [lastSectionOpacity, setLastSectionOpacity] = useState(0)
  const [lastSectionTranslateY, setLastSectionTranslateY] = useState(50)

  const [kwCompassOpacity, setKwCompassOpacity] = useState(0)
  const [kwCompassTranslateX, setKwCompassTranslateX] = useState(-100)
  const [kwCommandOpacity, setKwCommandOpacity] = useState(0)
  const [kwCommandTranslateX, setKwCommandTranslateX] = useState(-100)
  const [professionalLeverageOpacity, setProfessionalLeverageOpacity] = useState(0)
  const [professionalLeverageTranslateX, setProfessionalLeverageTranslateX] = useState(-100)

  const [blueprintCardsOpacity, setBlueprintCardsOpacity] = useState([0, 0])
  const [blueprintCardsTranslateX, setBlueprintCardsTranslateX] = useState([-100, -100])
  const [trainingCardsOpacity, setTrainingCardsOpacity] = useState([0, 0, 0])
  const [trainingCardsTranslateY, setTrainingCardsTranslateY] = useState([50, 50, 50])
  const [cultureCardsOpacity, setCultureCardsOpacity] = useState([0, 0, 0])
  const [cultureCardsTranslateX, setCultureCardsTranslateX] = useState([-100, -100, -100])
  const [lastSectionCardsOpacity, setLastSectionCardsOpacity] = useState([0, 0, 0])
  const [lastSectionCardsTranslateX, setLastSectionCardsTranslateX] = useState([-100, -100, -100])

  const [count10M, setCount10M] = useState(0)
  const [count60, setCount60] = useState(0)
  const [count200K, setCount200K] = useState(0)
  const [hasCounted10M, setHasCounted10M] = useState(false)
  const [hasCounted60, setHasCounted60] = useState(false)
  const [hasCounted200K, setHasCounted200K] = useState(false)

  const isLargeScreen = useIsLargeScreen()
  const visibleImagesCount = isLargeScreen ? 2 : 1

  const isAnimating10M = useRef(false)
  const isAnimating60 = useRef(false)
  const isAnimating200K = useRef(false)

  const whyKWSectionRef = useRef<HTMLElement | null>(null)
  const cardsContainerRef = useRef<HTMLDivElement | null>(null)
  const mobileCardsContainerRef = useRef<HTMLDivElement | null>(null)
  const predictableWealthSectionRef = useRef<HTMLElement | null>(null)
  const incomeModelSectionRef = useRef<HTMLElement | null>(null)
  const proptechSectionRef = useRef<HTMLElement | null>(null)
  const blueprintSectionRef = useRef<HTMLElement | null>(null)
  const trainingSectionRef = useRef<HTMLElement | null>(null)
  const cultureSectionRef = useRef<HTMLElement | null>(null)
  const marketFocusSectionRef = useRef<HTMLElement | null>(null)
  const globalPowerhouseSectionRef = useRef<HTMLElement | null>(null)
  const finalCTASectionRef = useRef<HTMLElement | null>(null)
  const lastSectionRef = useRef<HTMLElement | null>(null)
  const financiallyViableSectionRef = useRef<HTMLElement | null>(null)
  const blueprintCardsRef = useRef<HTMLDivElement | null>(null)
  const cultureCardsRef = useRef<HTMLDivElement | null>(null)
  const lastSectionCardsRef = useRef<HTMLDivElement | null>(null)
  const kwCompassRef = useRef<HTMLDivElement | null>(null)
  const kwCommandRef = useRef<HTMLDivElement | null>(null)
  const professionalLeverageRef = useRef<HTMLDivElement | null>(null)
  const trainingCardsRef = useRef<HTMLDivElement | null>(null)

  const handleCardClick = (event: MouseEvent<HTMLAnchorElement>, targetId: string) => {
    event.preventDefault()
    const target = document.getElementById(targetId)
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  const nextShorts = () => {
    setCurrentShortsIndex((prev) => (prev + 1) % youtubeShorts.length)
  }

  const prevShorts = () => {
    setCurrentShortsIndex((prev) => (prev - 1 + youtubeShorts.length) % youtubeShorts.length)
  }

  useEffect(() => {
    const headerTimer = setTimeout(() => {
      setKwEdgeOpacity(1)
      setKwEdgeTranslateY(0)
    }, 200)

    const cardsTimer = setTimeout(() => {
      setCardsOpacity(1)
    }, 600)

    const staggerDelay = 120
    const cardTimers = heroCards.map((_, index) =>
      setTimeout(() => {
        setCardAnimations((prev) => {
          const next = [...prev]
          next[index] = 1
          return next
        })
        setCardTranslateX((prev) => {
          const next = [...prev]
          next[index] = 0
          return next
        })
      }, 800 + index * staggerDelay),
    )

    return () => {
      clearTimeout(headerTimer)
      clearTimeout(cardsTimer)
      cardTimers.forEach(clearTimeout)
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const animateSection = (
        sectionRef: RefObject<HTMLElement | null>,
        setOpacity: (value: number) => void,
        setTranslate: (value: number) => void,
        startOffset = 0.8,
      ) => {
        const section = sectionRef.current
        if (!section) return

        const rect = section.getBoundingClientRect()
        const viewportHeight = window.innerHeight
        if (rect.top < viewportHeight * startOffset && rect.bottom > 0) {
          const triggerPoint = viewportHeight * startOffset
          const scrollDistance = triggerPoint - rect.top
          const maxScrollDistance = viewportHeight * 0.4
          const progress = Math.min(1, Math.max(0, scrollDistance / maxScrollDistance))
          setOpacity(progress)
          setTranslate(50 * (1 - progress))
        } else if (rect.top > viewportHeight) {
          setOpacity(0)
          setTranslate(50)
        }
      }

      const animateCards = (
        cardsRef: RefObject<HTMLDivElement | null>,
        setOpacity: (value: number[]) => void,
        setTranslate: (value: number[]) => void,
        cardCount: number,
      ) => {
        const container = cardsRef.current
        if (!container) return

        const rect = container.getBoundingClientRect()
        const viewportHeight = window.innerHeight
        if (rect.top < viewportHeight * 0.8 && rect.bottom > 0) {
          const triggerPoint = viewportHeight * 0.8
          const scrollDistance = triggerPoint - rect.top
          const maxScrollDistance = viewportHeight * 0.4
          const scrollProgress = Math.min(1, Math.max(0, scrollDistance / maxScrollDistance))

          const newOpacity: number[] = []
          const newTranslate: number[] = []
          for (let i = 0; i < cardCount; i++) {
            const delay = i * 0.15
            const cardProgress = Math.min(1, Math.max(0, (scrollProgress - delay) / (1 - delay)))
            newOpacity.push(cardProgress)
            newTranslate.push(-100 * (1 - cardProgress))
          }
          setOpacity(newOpacity)
          setTranslate(newTranslate)
        } else if (rect.top > viewportHeight) {
          setOpacity(new Array(cardCount).fill(0))
          setTranslate(new Array(cardCount).fill(-100))
        }
      }

      const animateSingleCard = (
        cardRef: RefObject<HTMLDivElement | null>,
        setOpacity: (value: number) => void,
        setTranslate: (value: number) => void,
      ) => {
        const card = cardRef.current
        if (!card) return

        const rect = card.getBoundingClientRect()
        const viewportHeight = window.innerHeight
        if (rect.top < viewportHeight * 0.8 && rect.bottom > 0) {
          const triggerPoint = viewportHeight * 0.8
          const scrollDistance = triggerPoint - rect.top
          const maxScrollDistance = viewportHeight * 0.4
          const progress = Math.min(1, Math.max(0, scrollDistance / maxScrollDistance))
          setOpacity(progress)
          setTranslate(-100 * (1 - progress))
        } else if (rect.top > viewportHeight) {
          setOpacity(0)
          setTranslate(-100)
        }
      }

      animateSection(predictableWealthSectionRef, setPredictableWealthOpacity, setPredictableWealthTranslateY)
      animateSection(incomeModelSectionRef, setIncomeModelOpacity, setIncomeModelTranslateY)
      animateSection(proptechSectionRef, setProptechOpacity, setProptechTranslateY)
      animateSection(blueprintSectionRef, setBlueprintOpacity, setBlueprintTranslateY)
      animateSection(trainingSectionRef, setTrainingOpacity, setTrainingTranslateY)
      animateSection(cultureSectionRef, setCultureOpacity, setCultureTranslateY)
      animateSection(marketFocusSectionRef, setMarketFocusOpacity, setMarketFocusTranslateY)
      animateSection(globalPowerhouseSectionRef, setGlobalPowerhouseOpacity, setGlobalPowerhouseTranslateY)
      animateSection(finalCTASectionRef, setFinalCTAOpacity, setFinalCTATranslateY)
      animateSection(lastSectionRef, setLastSectionOpacity, setLastSectionTranslateY)

      animateCards(blueprintCardsRef, setBlueprintCardsOpacity, setBlueprintCardsTranslateX, blueprintHighlights.length)
      animateCards(cultureCardsRef, setCultureCardsOpacity, setCultureCardsTranslateX, cultureHighlights.length)
      animateCards(lastSectionCardsRef, setLastSectionCardsOpacity, setLastSectionCardsTranslateX, lastSectionActions.length)
      animateCards(trainingCardsRef, setTrainingCardsOpacity, setTrainingCardsTranslateY, trainingHighlights.length)

      animateSingleCard(kwCompassRef, setKwCompassOpacity, setKwCompassTranslateX)
      animateSingleCard(kwCommandRef, setKwCommandOpacity, setKwCommandTranslateX)
      animateSingleCard(professionalLeverageRef, setProfessionalLeverageOpacity, setProfessionalLeverageTranslateX)

      const animateCounter = (
        sectionRef: RefObject<HTMLElement | null>,
        target: number,
        setter: (value: number) => void,
        hasAnimated: boolean,
        setHasAnimated: (value: boolean) => void,
        isAnimatingRef: MutableRefObject<boolean>,
      ) => {
        const section = sectionRef.current
        if (!section || hasAnimated || isAnimatingRef.current) return

        const rect = section.getBoundingClientRect()
        if (rect.top < window.innerHeight * 0.8) {
          setHasAnimated(true)
          isAnimatingRef.current = true

          const duration = 2000
          const startTime = performance.now()

          const tick = (now: number) => {
            const progress = Math.min(1, (now - startTime) / duration)
            const eased = 1 - Math.pow(1 - progress, 3)
            setter(Math.floor(target * eased))
            if (progress < 1) {
              requestAnimationFrame(tick)
            } else {
              setter(target)
            }
          }

          requestAnimationFrame(tick)
        }
      }

      animateCounter(financiallyViableSectionRef, 10, setCount10M, hasCounted10M, setHasCounted10M, isAnimating10M)
      animateCounter(financiallyViableSectionRef, 60, setCount60, hasCounted60, setHasCounted60, isAnimating60)
      animateCounter(financiallyViableSectionRef, 200, setCount200K, hasCounted200K, setHasCounted200K, isAnimating200K)

      const incomeSection = incomeModelSectionRef.current
      if (incomeSection) {
        const cards = incomeSection.querySelectorAll("[data-income-card]")
        const sectionTop = incomeSection.offsetTop
        const sectionBottom = sectionTop + incomeSection.offsetHeight
        const scrollPosition = window.scrollY + window.innerHeight / 2

        cards.forEach((card, index) => {
          const cardTop = (card as HTMLElement).offsetTop + sectionTop
          const cardBottom = cardTop + (card as HTMLElement).offsetHeight
          if (scrollPosition >= cardTop && scrollPosition < cardBottom) {
            setActiveIncome(index)
          }
        })

        if (window.scrollY > sectionBottom) {
          setActiveIncome(cards.length - 1)
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [hasCounted10M, hasCounted60, hasCounted200K])

  useEffect(() => {
    if (isCarouselPaused) return
    const visibleVideos = 4
    const maxIndex = Math.max(0, youtubeVideos.length - visibleVideos)
    const interval = setInterval(() => {
      setCarouselIndex((prev) => {
        if (maxIndex === 0) return 0
        return prev >= maxIndex ? 0 : prev + 1
      })
    }, 4000)
    return () => clearInterval(interval)
  }, [isCarouselPaused])

  useEffect(() => {
    if (isImageCarouselPaused) return
    const maxIndex = Math.max(0, imageCarouselImages.length - visibleImagesCount)
    const interval = setInterval(() => {
      setImageCarouselIndex((prev) => {
        if (maxIndex === 0) return 0
        return prev >= maxIndex ? 0 : prev + 1
      })
    }, 4000)
    return () => clearInterval(interval)
  }, [isImageCarouselPaused, visibleImagesCount])

  const youtubeDotCount = useMemo(() => Math.max(1, youtubeVideos.length - 3), [])
  useEffect(() => {
    setImageCarouselIndex((prev) => Math.min(prev, Math.max(0, imageCarouselImages.length - visibleImagesCount)))
  }, [visibleImagesCount])

  const imageDotCount = useMemo(
    () => Math.max(1, imageCarouselImages.length - visibleImagesCount + 1),
    [visibleImagesCount]
  )

  return (
    <main className="bg-black text-white">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes subtleGlow {
          0%, 100% {
            box-shadow: 0 0 5px rgba(180, 1, 1, 0.3), 0 0 10px rgba(180, 1, 1, 0.2);
          }
          50% {
            box-shadow: 0 0 10px rgba(180, 1, 1, 0.5), 0 0 20px rgba(180, 1, 1, 0.3);
          }
        }
        .hero-card-glow {
          animation: subtleGlow 3s ease-in-out infinite;
        }
        .hero-card-glow:hover {
          animation: none;
        }
      `}} />
      {/* Hero Section */}
      <section
        ref={whyKWSectionRef}
        className="relative min-h-[50vh] sm:min-h-[40vh] md:min-h-[60vh] lg:min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-black via-[#B40101]/50 to-black pt-16 sm:pt-20 md:pt-24 lg:pt-16"
      >
        <div className="absolute inset-0 opacity-20">
          <svg viewBox="0 0 1440 800" className="w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="waveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#B40101" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#B40101" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#B40101" stopOpacity="0.4" />
              </linearGradient>
            </defs>
            <g stroke="url(#waveGradient)" strokeWidth="1" fill="none" opacity="0.6">
              {[200, 210, 220].map((y) => (
                <path key={`wave1-${y}`} d={`M0,${y} Q180,${y - 50} 360,${y} T720,${y} T1080,${y} T1440,${y}`} />
              ))}
              {[300, 310, 320].map((y) => (
                <path key={`wave2-${y}`} d={`M0,${y} Q200,${y - 50} 400,${y} T800,${y} T1200,${y} T1440,${y}`} />
              ))}
              {[400, 410, 420].map((y) => (
                <path key={`wave3-${y}`} d={`M0,${y} Q160,${y - 50} 320,${y} T640,${y} T960,${y} T1280,${y} T1440,${y}`} />
              ))}
              {[500, 510, 520].map((y) => (
                <path key={`wave4-${y}`} d={`M0,${y} Q220,${y - 50} 440,${y} T880,${y} T1320,${y} T1440,${y}`} />
              ))}
              {[600, 610, 620].map((y) => (
                <path key={`wave5-${y}`} d={`M0,${y} Q140,${y - 50} 280,${y} T560,${y} T840,${y} T1120,${y} T1440,${y}`} />
              ))}
            </g>
          </svg>
        </div>

        <div className="relative z-10 text-center max-w-6xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12 md:pt-16">
          <div className="mb-8" />
          <div
            className="text-center max-w-4xl mx-auto space-y-6 transition-all duration-700 ease-out mb-12"
            style={{
              opacity: kwEdgeOpacity,
              transform: `translateY(${kwEdgeTranslateY}px)`,
            }}
          >
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-8">
              The KW Singapore Edge: <br />
              <span className="text-[#b40101]">A Proven Real Estate Model</span>
            </h3>
            <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-4xl mx-auto">
              Leverage Singapore's most powerful real estate business model—built for unlimited scale, branding, and freedom.
            </p>
          </div>

          

          {/* Hero Cards */}
          <div
            ref={cardsContainerRef}
            className="w-full max-w-7xl mx-auto transition-opacity duration-700 ease-out"
            style={{
              opacity: cardsOpacity,
            }}
          >
            <div
              ref={mobileCardsContainerRef}
              className="flex flex-row flex-wrap gap-2 sm:space-x-6 sm:flex-wrap sm:overflow-visible sm:justify-center lg:flex-nowrap lg:gap-3 items-center justify-center sm:justify-center lg:justify-center px-4 sm:px-0 py-2 sm:py-0"
            >
              {/* Card 1: 3-Income Model */}
              <a
                href="#income-model-section"
                onClick={(e) => handleCardClick(e, "income-model-section")}
                className="h-auto backdrop-blur-none bg-transparent border border-white/20 rounded-full px-3 py-2.5 sm:px-4 sm:py-2 my-0 sm:my-[5px] shadow-none flex-row items-center justify-center flex-shrink-0 w-[calc(50%-4px)] md:w-[calc(50%-12px)] lg:w-auto lg:backdrop-blur-md lg:bg-white/5 lg:border lg:border-white/10 lg:rounded-lg lg:p-6 lg:flex lg:flex-col lg:items-center lg:justify-center lg:h-[160px] lg:w-[calc((100%-48px)/5)] lg:mx-0 lg:my-0 hover:bg-white/10 hover:border-[#B40101] lg:hover:bg-white/10 lg:hover:border-[#B40101] transition-all duration-500 ease-out relative group lg:shadow-lg custom-cursor-auto lg:hover:custom-cursor-view animate-glow-1 text-white transition-colors duration-300 whitespace-nowrap card-hover-glow hero-card-glow"
                style={{
                  opacity: cardAnimations[0],
                }}
              >
                <div className="text-center lg:text-center lg:h-full lg:flex lg:flex-col lg:justify-center lg:items-center space-y-0 lg:space-y-1">
                  <h4 className="text-sm sm:text-base lg:text-xl lg:leading-tight font-normal lg:font-semibold text-white">
                    The 3-Income Model
                  </h4>
                  <span className="hidden lg:inline-block mt-1 text-[11px] tracking-[0.2em] uppercase text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    View more
                  </span>
                </div>
              </a>

              {/* Card 2: PropTech Ecosystem */}
              <a
                href="#proptech-section"
                onClick={(e) => handleCardClick(e, "proptech-section")}
                className="h-auto backdrop-blur-none bg-transparent border border-white/20 rounded-full px-3 py-2.5 sm:px-4 sm:py-2 my-0 sm:my-[5px] shadow-none flex-row items-center justify-center flex-shrink-0 w-[calc(50%-4px)] md:w-[calc(50%-12px)] lg:w-auto lg:backdrop-blur-md lg:bg-white/5 lg:border lg:border-white/10 lg:rounded-lg lg:p-6 lg:flex lg:flex-col lg:items-center lg:justify-center lg:h-[160px] lg:w-[calc((100%-48px)/5)] lg:mx-0 lg:my-0 hover:bg-white/10 hover:border-[#B40101] lg:hover:bg-white/10 lg:hover:border-[#B40101] transition-all duration-500 ease-out relative group lg:shadow-lg custom-cursor-auto lg:hover:custom-cursor-view animate-glow-2 text-white transition-colors duration-300 whitespace-nowrap card-hover-glow hero-card-glow"
                style={{
                  opacity: cardAnimations[1],
                }}
              >
                <div className="text-center lg:text-center lg:h-full lg:flex lg:flex-col lg:justify-center lg:items-center space-y-0 lg:space-y-1">
                  <h4 className="text-sm sm:text-base lg:text-xl lg:leading-tight font-normal lg:font-semibold text-white">
                    PropTech Ecosystem
                  </h4>
                  <span className="hidden lg:inline-block mt-1 text-[11px] tracking-[0.2em] uppercase text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    View more
                  </span>
                </div>
              </a>

              {/* Card 3: The KW Model */}
              <a
                href="#blueprint-section"
                onClick={(e) => handleCardClick(e, "blueprint-section")}
                className="h-auto backdrop-blur-none bg-transparent border border-white/20 rounded-full px-3 py-2.5 sm:px-4 sm:py-2 sm:mx-2 my-0 sm:my-[5px] shadow-none flex-row items-center justify-center flex-shrink-0 lg:backdrop-blur-md lg:bg-white/5 lg:border lg:border-white/10 lg:rounded-lg lg:p-6 lg:flex lg:flex-col lg:items-center lg:justify-center lg:h-[160px] lg:w-[calc((100%-48px)/5)] lg:mx-0 lg:my-0 hover:bg-white/10 hover:border-[#B40101] lg:hover:bg-white/10 lg:hover:border-[#B40101] transition-all duration-500 ease-out relative group lg:shadow-lg custom-cursor-auto lg:hover:custom-cursor-view animate-glow-3 text-white transition-colors duration-300 whitespace-nowrap lg:whitespace-normal card-hover-glow hero-card-glow"
                style={{
                  opacity: cardAnimations[2],
                }}
              >
                <div className="text-center lg:text-center lg:h-full lg:flex lg:flex-col lg:justify-center lg:items-center space-y-0 lg:space-y-1">
                  <h4 className="text-sm sm:text-base lg:text-xl lg:leading-tight font-normal lg:font-semibold text-white">
                    The KW Model for Predictable Success
                  </h4>
                  <span className="hidden lg:inline-block mt-1 text-[11px] tracking-[0.2em] uppercase text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    View more
                  </span>
                </div>
              </a>

              {/* Card 4: World-Class Training */}
              <a
                href="#training-section"
                onClick={(e) => handleCardClick(e, "training-section")}
                className="h-auto backdrop-blur-none bg-transparent border border-white/20 rounded-full px-3 py-2.5 sm:px-4 sm:py-2 sm:mx-2 my-0 sm:my-[5px] shadow-none flex-row items-center justify-center flex-shrink-0 lg:backdrop-blur-md lg:bg-white/5 lg:border lg:border-white/10 lg:rounded-lg lg:p-6 lg:flex lg:flex-col lg:items-center lg:justify-center lg:h-[160px] lg:w-[calc((100%-48px)/5)] lg:mx-0 lg:my-0 hover:bg-white/10 hover:border-[#B40101] lg:hover:bg-white/10 lg:hover:border-[#B40101] transition-all duration-500 ease-out relative group lg:shadow-lg custom-cursor-auto lg:hover:custom-cursor-view animate-glow-4 text-white transition-colors duration-300 whitespace-nowrap card-hover-glow hero-card-glow"
                style={{
                  opacity: cardAnimations[3],
                }}
              >
                <div className="text-center lg:text-center lg:h-full lg:flex lg:flex-col lg:justify-center lg:items-center space-y-0 lg:space-y-1">
                  <h4 className="text-sm sm:text-base lg:text-xl lg:leading-tight font-normal lg:font-semibold text-white">
                    World-Class Training
                  </h4>
                  <span className="hidden lg:inline-block mt-1 text-[11px] tracking-[0.2em] uppercase text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    View more
                  </span>
                </div>
              </a>

              {/* Card 5: Culture & Leadership */}
              <a
                href="#culture-section"
                onClick={(e) => handleCardClick(e, "culture-section")}
                className="h-auto backdrop-blur-none bg-transparent border border-white/20 rounded-full px-3 py-2.5 sm:px-4 sm:py-2 sm:mx-2 my-0 sm:my-[5px] shadow-none flex-row items-center justify-center flex-shrink-0 lg:backdrop-blur-md lg:bg-white/5 lg:border lg:border-white/10 lg:rounded-lg lg:p-6 lg:flex lg:flex-col lg:items-center lg:justify-center lg:h-[160px] lg:w-[calc((100%-48px)/5)] lg:mx-0 lg:my-0 hover:bg-white/10 hover:border-[#B40101] lg:hover:bg-white/10 lg:hover:border-[#B40101] transition-all duration-500 ease-out relative group lg:shadow-lg custom-cursor-auto lg:hover:custom-cursor-view animate-glow-5 text-white transition-colors duration-300 whitespace-nowrap lg:whitespace-normal card-hover-glow hero-card-glow"
                style={{
                  opacity: cardAnimations[4],
                }}
              >
                <div className="text-center lg:text-center lg:h-full lg:flex lg:flex-col lg:justify-center lg:items-center space-y-0 lg:space-y-1">
                  <h4 className="text-sm sm:text-base lg:text-xl lg:leading-tight font-normal lg:font-semibold text-white">
                    Culture & Leadership of Winning Together
                  </h4>
                  <span className="hidden lg:inline-block mt-1 text-[11px] tracking-[0.2em] uppercase text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    View more
                  </span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Turn Unpredictability into Predictable Wealth Section */}
      <section
        ref={predictableWealthSectionRef}
        className="relative pt-24 pb-16 md:pt-24 md:pb-16 lg:pt-24 lg:pb-24 overflow-hidden"
      >
        <div className="absolute inset-0 bg-black" />
        <div className="absolute inset-0 bg-cover bg-center opacity-40" style={{ backgroundImage: "url('/images/why-kw-singapore/bokeh-lights.png')" }} />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/80" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div
            className="space-y-12 transition-all duration-700 ease-out"
            style={{
              opacity: predictableWealthOpacity,
              transform: `translateY(${predictableWealthTranslateY}px)`,
            }}
          >
            <div className="text-left">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                <span className="text-white">Turn Unpredictability into</span>
                <br />
                <span className="text-[#D9381E]">Predictable Wealth</span>
              </h2>
              <h3 className="text-2xl md:text-3xl font-semibold text-white/90">Stop Trading Time for Money. Start Building Equity.</h3>
            </div>

            <div className="flex justify-end mt-12">
              <div className="w-full sm:w-full md:w-[85%] lg:w-[80%]">
                <p className="text-lg md:text-2xl text-white font-medium leading-snug md:leading-relaxed text-right mx-0 mt-2">
                  You're stuck on the income rollercoaster—unpredictable closings and unstable pay. At KW, we solved this by creating a three-pillar income
                  model designed for growth, stability, and legacy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* KW 3-Income Model Section */}
      <section
        ref={incomeModelSectionRef}
        id="income-model-section"
        className="relative bg-gradient-to-br from-[#B40101]/10 to-transparent pt-6 pb-16 md:pt-8 md:pb-18 lg:pt-10 lg:pb-24"
        style={{
          opacity: incomeModelOpacity,
          transition: "opacity 0.7s ease-out",
        }}
      >
        <div
          className="max-w-7xl mx-auto px-6 transition-[margin-top] duration-700 ease-out"
          style={{ marginTop: incomeModelTranslateY }}
        >
          <div className="grid lg:grid-cols-[3fr_7fr] gap-16 items-start">
            <div className="sticky top-20 self-start">
              <div className="relative">
                <div className="flex items-center gap-4 md:gap-6">
                  <span className="text-[180px] md:text-[240px] font-bold leading-none block text-[#B40101]">3</span>
                  <h2 className="text-5xl md:text-6xl font-bold text-white tracking-tight block lg:hidden">INCOME MODEL</h2>
                </div>
                <div className="absolute right-0 top-0 h-full hidden lg:flex items-center">
                  <h2 className="text-5xl md:text-6xl font-bold text-white tracking-tight" style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}>
                    INCOME MODEL
                  </h2>
                </div>
              </div>
            </div>

            <div className="space-y-0">
              {incomeCards.map((card, index) => (
                <div
                  key={card.title}
                  data-income-card
                  onMouseEnter={() => setActiveIncome(index)}
                  className={`border rounded-2xl p-8 md:p-12 backdrop-blur-sm transition-all duration-500 sticky ${
                    index === 0 ? "top-0" : index === 1 ? "top-32" : "top-40"
                  } ${
                    activeIncome === index
                      ? "bg-[#B40101] border-[#B40101] shadow-2xl shadow-[#B40101]/30 z-30 opacity-100 scale-100"
                      : "bg-gray-900/50 border-gray-800 opacity-70 scale-95 z-10"
                  }`}
                  style={{ marginBottom: index === incomeCards.length - 1 ? 0 : "-150px" }}
                >
                  <div className="flex items-start gap-6 mb-6">
                    <div
                      className={`flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center ${
                        activeIncome === index ? "bg-white/20 border border-white/30" : "bg-[#B40101]/10 border border-[#B40101]/30"
                      }`}
                    >
                      <span className={`text-2xl font-bold ${activeIncome === index ? "text-white" : "text-[#B40101]"}`}>{card.badge}</span>
                    </div>
                    <div>
                      <h3 className="text-3xl md:text-4xl font-bold mb-2 text-white">{card.title}</h3>
                    </div>
                  </div>

                  <div className={`space-y-4 text-lg leading-relaxed ${activeIncome === index ? "text-white/90" : "text-gray-300"}`}>
                    <p className={`font-semibold text-xl mb-4`}>{card.intro}</p>
                    {card.body.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PropTech & AI: Your Integrated Command Center Section */}
      <section
        ref={proptechSectionRef}
        id="proptech-section"
        className="relative pt-16 pb-16 md:pt-16 md:pb-16 lg:pt-24 lg:pb-24 overflow-hidden"
        style={{
          opacity: proptechOpacity,
          transform: `translateY(${proptechTranslateY}px)`,
          transition: "opacity 0.7s ease-out, transform 0.7s ease-out",
        }}
      >
        <div className="absolute inset-0 bg-black" />
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#660000]/80 to-black" />
        <div className="absolute inset-0 bg-cover bg-center opacity-40" style={{ backgroundImage: "url('/images/why-kw-singapore/ai-bg-join-kw.jpg')" }} />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/80" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 transition-all duration-700 ease-out">
          <div className="space-y-12">
            <div className="text-left">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                <span className="text-white">
                  PropTech & AI: <br />
                </span>
                <span className="text-[#D9381E]">Your Integrated Command Center</span>
              </h2>
              <h3 className="text-2xl md:text-3xl font-semibold text-white/90">Smarter Systems. Scalable Leverage.</h3>
            </div>

            <div className="flex justify-end mt-12 pb-12">
              <div className="w-full sm:w-full md:w-[85%] lg:w-[80%]">
                <p className="text-lg md:text-2xl text-white font-medium leading-snug md:leading-relaxed text-right mx-0 mt-2">
                  Powered by an advanced AI backend, we deliver your unfair advantage. This all-in-one ecosystem eliminates administrative burnout and
                  establishes you as the definitive, data-driven market expert.
                </p>
              </div>
            </div>

            
            {/* Shorts / Reels Section */}
            <div className="w-full mt-12 pb-8">
              {/* Mobile Carousel */}
              <div className="md:hidden relative">
                <div className="relative w-full overflow-hidden rounded-lg border border-[#666666]/20 bg-black/40">
                  <div className="aspect-[9/16] bg-gray-800 rounded-lg overflow-hidden">
                    <iframe
                      key={currentShortsIndex}
                      src={`https://www.youtube.com/embed/${youtubeShorts[currentShortsIndex].id}?autoplay=1&mute=1&controls=1&modestbranding=1&rel=0&loop=1&playlist=${youtubeShorts[currentShortsIndex].id}&playsinline=1`}
                      className="w-full h-full"
                      allow="autoplay; encrypted-media; accelerometer; gyroscope; picture-in-picture"
                      allowFullScreen
                      title={youtubeShorts[currentShortsIndex].label}
                    />
                  </div>
                </div>
                {/* Navigation buttons */}
                <button
                  onClick={prevShorts}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300 z-10"
                  aria-label="Previous reel"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={nextShorts}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300 z-10"
                  aria-label="Next reel"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
                
                {/* Indicators */}
                <div className="flex justify-center mt-4 space-x-2">
                  {youtubeShorts.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentShortsIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentShortsIndex ? 'bg-[#B40101]' : 'bg-white/30'
                      }`}
                      aria-label={`Go to reel ${index + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Tablet Carousel (2 reels) */}
              <div className="hidden md:block lg:hidden relative">
                <div className="relative w-full overflow-hidden rounded-lg border border-[#666666]/20 bg-black/40">
                  <div className="grid grid-cols-2 gap-4">
                    {[currentShortsIndex, (currentShortsIndex + 1) % youtubeShorts.length].map((index, col) => (
                      <div key={`tablet-${index}-${col}`} className="aspect-[9/16] bg-gray-800 rounded-lg overflow-hidden">
                        <iframe
                          src={`https://www.youtube.com/embed/${youtubeShorts[index].id}?autoplay=1&mute=1&controls=1&modestbranding=1&rel=0&loop=1&playlist=${youtubeShorts[index].id}&playsinline=1`}
                          className="w-full h-full"
                          allow="autoplay; encrypted-media; accelerometer; gyroscope; picture-in-picture"
                          allowFullScreen
                          title={`${youtubeShorts[index].label} Tablet`}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                {/* Navigation buttons */}
                <button
                  onClick={prevShorts}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300 z-10"
                  aria-label="Previous reel"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={nextShorts}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300 z-10"
                  aria-label="Next reel"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
                {/* Indicators */}
                <div className="flex justify-center mt-4 space-x-2">
                  {youtubeShorts.map((_, index) => (
                    <button
                      key={`tablet-indicator-${index}`}
                      onClick={() => setCurrentShortsIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentShortsIndex ? "bg-[#B40101]" : "bg-white/30"
                      }`}
                      aria-label={`Go to reel ${index + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Desktop Grid */}
              <div className="hidden lg:grid grid-cols-5 gap-6">
                {youtubeShorts.map((short, index) => (
                  <div key={index} className="relative w-full overflow-hidden rounded-lg border border-[#666666]/20 bg-black/40">
                    <div className="aspect-[9/16] bg-gray-800 rounded-lg overflow-hidden">
                      <iframe
                        src={`https://www.youtube.com/embed/${short.id}?autoplay=1&mute=1&controls=1&modestbranding=1&rel=0&loop=1&playlist=${short.id}&playsinline=1`}
                        className="w-full h-full"
                        allow="autoplay; encrypted-media; accelerometer; gyroscope; picture-in-picture"
                        allowFullScreen
                        title={short.label}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full mt-16">
              <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-8">
                <div
                  ref={kwCompassRef}
                  className="relative group cursor-pointer transform transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2"
                  style={{
                    opacity: kwCompassOpacity,
                    transform: `translateX(${kwCompassTranslateX}px)`,
                  }}
                >
                  <div className="absolute inset-0 rounded-2xl overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-black via-[#660000]/50 to-black" />
                    <div className="absolute bottom-0 right-0 w-full h-full opacity-40">
                      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-[#B40101] via-[#D9381E] to-transparent rounded-full blur-3xl transform translate-x-1/4 translate-y-1/4" />
                      <div className="absolute bottom-10 right-20 w-64 h-64 bg-gradient-to-tl from-[#B40101]/60 to-transparent rounded-full blur-2xl" />
                      <div className="absolute top-1/2 right-0 w-48 h-48 bg-gradient-to-bl from-[#D9381E]/40 to-transparent rounded-full blur-xl" />
                    </div>
                  </div>

                  <div className="relative bg-gradient-to-br from-black/60 via-[#660000]/40 to-black/60 rounded-2xl p-8 h-full overflow-hidden backdrop-blur-sm">

                    <h3 className="text-xl md:text-2xl font-semibold text-white mb-3">
                      KW Compass
                    </h3>
                    <p className="text-base text-white/70 leading-relaxed group-hover:text-white/90 transition-colors duration-300">
                      This proprietary Singapore-focused consulting tool is your real-time analysis hub. Featuring Compass 10 for New Launch and Resale Property Scoring, it
                      provides a BUC/EC Calculator, Property Comparison analysis, and New Launch Property Analysis. It enables precise, data-backed client consultation via
                      quick calculation of Sales Proceeds, Decoupling, and Stamp Duties.
                    </p>
                  </div>
                </div>
                <div
                  ref={kwCommandRef}
                  className="relative group cursor-pointer transform transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2"
                  style={{
                    opacity: kwCommandOpacity,
                    transform: `translateX(${kwCommandTranslateX}px)`,
                  }}
                >
                  <div className="absolute inset-0 rounded-2xl overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-black via-[#660000]/50 to-black" />
                    <div className="absolute bottom-0 right-0 w-full h-full opacity-40">
                      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-[#B40101] via-[#D9381E] to-transparent rounded-full blur-3xl transform translate-x-1/4 translate-y-1/4" />
                      <div className="absolute bottom-10 right-20 w-64 h-64 bg-gradient-to-tl from-[#B40101]/60 to-transparent rounded-full blur-2xl" />
                      <div className="absolute top-1/2 right-0 w-48 h-48 bg-gradient-to-bl from-[#D9381E]/40 to-transparent rounded-full blur-xl" />
                    </div>
                  </div>

                  <div className="relative bg-gradient-to-br from-black/60 via-[#660000]/40 to-black/60 rounded-2xl p-8 h-full overflow-hidden backdrop-blur-sm">

                    <h3 className="text-xl md:text-2xl font-semibold text-white mb-3">
                      KW Command
                    </h3>
                    <p className="text-base text-white/70 leading-relaxed group-hover:text-white/90 transition-colors duration-300">
                      This intelligent CRM and business suite automates your lead pipeline and manages all transactions from a central dashboard, providing real-time
                      mobile updates for command and control of your business on the go.
                    </p>
                  </div>
                </div>

                <div
                  ref={professionalLeverageRef}
                  className="relative group cursor-pointer transform transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2"
                  style={{
                    opacity: professionalLeverageOpacity,
                    transform: `translateX(${professionalLeverageTranslateX}px)`,
                  }}
                >
                  <div className="absolute inset-0 rounded-2xl overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-black via-[#660000]/50 to-black" />
                    <div className="absolute bottom-0 right-0 w-full h-full opacity-40">
                      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-[#B40101] via-[#D9381E] to-transparent rounded-full blur-3xl transform translate-x-1/4 translate-y-1/4" />
                      <div className="absolute bottom-10 right-20 w-64 h-64 bg-gradient-to-tl from-[#B40101]/60 to-transparent rounded-full blur-2xl" />
                      <div className="absolute top-1/2 right-0 w-48 h-48 bg-gradient-to-bl from-[#D9381E]/40 to-transparent rounded-full blur-xl" />
                    </div>
                  </div>

                  <div className="relative bg-gradient-to-br from-black/60 via-[#660000]/40 to-black/60 rounded-2xl p-8 h-full overflow-hidden backdrop-blur-sm">

                    <h3 className="text-xl md:text-2xl font-semibold text-white mb-3">
                      Professional Leverage
                    </h3>
                    <p className="text-base text-white/70 leading-relaxed group-hover:text-white/90 transition-colors duration-300">
                      You gain access to a KW x Canva Enterprise account for professional design, Google Gemini Pro for intelligent client engagement, and Unlimited
                      Google Drive storage for seamless cloud management.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full mt-12 py-6">
              <h2 className="text-2xl md:text-3xl my-[15px] text-white text-center leading-snug md:leading-relaxed w-full md:w-4/5 mx-auto">
                Stop juggling disparate tools. Start scaling predictably, gaining the automated leverage and precision required to dominate the property market.
              </h2>
            </div>
          </div>
        </div>
      </section>

      {/* The Blueprint: Scale Beyond Solo Section */}
      <section
        ref={blueprintSectionRef}
        id="blueprint-section"
        className="relative py-16 md:py-16 lg:py-24 overflow-hidden bg-gradient-to-b from-black via-[#B40101]/50 to-black"
        style={{
          opacity: blueprintOpacity,
          transform: `translateY(${blueprintTranslateY}px)`,
          transition: "opacity 0.7s ease-out, transform 0.7s ease-out",
        }}
      >
        <div className="absolute inset-0 opacity-20">
          <svg viewBox="0 0 1440 800" className="w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
            <defs>
              <pattern id="blueprintDots" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
                <circle cx="8" cy="8" r="1" fill="#ffffff" opacity="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#blueprintDots)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 transition-all duration-700 ease-out">
          <div className="space-y-12">
            <div className="text-left">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                <span className="text-white">
                  The Blueprint: <br />
                </span>
                <span className="text-[#D9381E]">Scale Beyond Solo</span>
              </h2>
            </div>

            <div className="flex justify-end mt-12 mb-20">
              <div className="w-full sm:w-full md:w-[85%] lg:w-[80%]">
                <p className="text-lg md:text-2xl text-white font-medium leading-snug md:leading-relaxed text-right mx-0 mt-2">
                  The trial-and-error approach ends here. <br /> Leverage the industry's most successful business philosophies for uncapped growth.
                </p>
              </div>
            </div>

            <div className="relative mt-10 pt-10">
              <div
                className="relative rounded-2xl p-10 md:p-16 backdrop-blur-xl bg-black/40 border border-[#B40101]/30 overflow-hidden"
                style={{
                  boxShadow: "0 0 40px rgba(180, 1, 1, 0.3), inset 0 0 20px rgba(180, 1, 1, 0.1)",
                }}
              >
                <div className="absolute inset-0 rounded-2xl pointer-events-none">
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#B40101]/50 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#B40101]/50 to-transparent" />
                  <div className="absolute top-0 bottom-0 left-0 w-px bg-gradient-to-b from-transparent via-[#B40101]/50 to-transparent" />
                  <div className="absolute top-0 bottom-0 right-0 w-px bg-gradient-to-b from-transparent via-[#B40101]/50 to-transparent" />
                  <div className="absolute top-0 left-0 w-32 h-32 bg-[#B40101]/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#B40101]/20 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#B40101]/20 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
                  <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#B40101]/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
                  <div
                    ref={blueprintCardsRef}
                    className="w-full space-y-0 order-1 lg:order-1"
                  >
                    {blueprintHighlights.map((highlight, index) => (
                      <div
                        key={highlight.title}
                        className="relative pb-6 mb-6 border-b border-white/10 last:border-b-0 last:mb-0 last:pb-0 transition-all duration-700 ease-out"
                        style={{
                          opacity: blueprintCardsOpacity[index] ?? 0,
                          transform: `translateX(${blueprintCardsTranslateX[index] ?? -100}px)`,
                        }}
                      >
                        <div className="flex items-start">
                          <div className="flex-1">
                            <h3 className="text-xl md:text-2xl font-medium text-white mb-2">{highlight.title}</h3>
                            <p className="text-base text-white/80 leading-relaxed">{highlight.copy}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="w-full order-2 lg:order-2">
                    <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-lg overflow-hidden">
                      <div className="aspect-video relative rounded-lg" style={{ backgroundColor: "#CE001F" }}>
                        <img
                          src="https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/events/gary-keller.webp"
                          alt="Gary Keller"
                          className="w-full h-full object-contain rounded-lg"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* World-Class Training: Mastery That Converts Section */}
      <section
        ref={trainingSectionRef}
        id="training-section"
        className="relative py-16 md:py-16 lg:py-24 overflow-hidden"
        style={{
          opacity: trainingOpacity,
          transform: `translateY(${trainingTranslateY}px)`,
          transition: "opacity 0.7s ease-out, transform 0.7s ease-out",
        }}
      >
        <div
          className="absolute inset-0 opacity-90"
          style={{
            background: "linear-gradient(to bottom, #000000 0%, #1a0000 20%, #330000 40%, #660000 50%, #330000 70%, #1a0000 100%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg,transparent,transparent 10px,rgba(255, 255, 255, 0.1) 10px,rgba(255, 255, 255, 0.1) 20px)",
          }}
        />

        <div className="max-w-7xl mx-auto px-6 relative z-10 transition-all duration-700 ease-out">
          <div className="space-y-12">
            <div className="text-left">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                <span className="text-white">
                  World-Class Training: <br />
                </span>
                <span className="text-[#D9381E]">Mastery That Converts</span>
              </h2>
              <h3 className="text-2xl md:text-3xl font-semibold text-white/90">Your ceiling is determined by your learning.</h3>
            </div>

            <div className="flex justify-end mt-12">
              <div className="w-full sm:w-full md:w-[85%] lg:w-[80%]">
                <p className="text-lg md:text-2xl text-white font-medium leading-snug md:leading-relaxed text-right mx-0 mt-2">
                  Access the most comprehensive, model-driven education in the industry, designed to elevate your skills and mindset.
                </p>
              </div>
            </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 mb-6">
                {["Gtm6NGIxWOc", "Pj0onWnrcfM", "NrGzZm3vNSY", "JFUKmxBuy8s"].map((videoId) => (
                  <div key={videoId} className="aspect-[9/16] bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg overflow-hidden border border-white/10">
                    <iframe
                      src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=1&modestbranding=1&rel=0&loop=1&playlist=${videoId}`}
                      title={`Training Highlight ${videoId}`}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </div>
                ))}
              </div>

            <div
              ref={trainingCardsRef}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left mx-auto mt-12"
            >
              {trainingHighlights.map((highlight, index) => (
                <div
                  key={highlight.title}
                className={`relative backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 hover:border-white/20 hover:scale-105 hover:shadow-lg hover:shadow-[#B40101]/20 group ${
                    index === 2 ? "md:col-span-2 lg:col-span-1" : ""
                  }`}
                  style={{
                    opacity: trainingCardsOpacity[index] ?? 0,
                    transform: `translateY(${trainingCardsTranslateY[index] ?? 50}px)`,
                    transition: "opacity 0.7s ease-out, transform 0.7s ease-out, all 0.3s",
                  }}
                >
                  <h3 className="text-xl md:text-2xl font-semibold text-white mb-3 text-center min-h-[4rem] flex items-center justify-center">
                    {highlight.title}
                  </h3>
                  <p className="text-base text-white/70 leading-relaxed group-hover:text-white/90 transition-colors duration-300">{highlight.copy}</p>
                </div>
              ))}
            </div>

            <div className="w-full mt-12 py-6">
              <h2 className="text-2xl md:text-3xl my-[15px] text-white text-center leading-snug md:leading-relaxed w-full md:w-4/5 mx-auto">
                Transform from a sales agent to a business CEO. <br /> Acquire the exact knowledge and skills required to consistently dominate market share and
                accelerate your growth.
              </h2>
            </div>
          </div>
        </div>
      </section>

      {/* Culture Section */}
      <section
        ref={cultureSectionRef}
        id="culture-section"
        className="relative py-16 md:py-16 lg:py-24 overflow-hidden bg-black"
        style={{
          opacity: cultureOpacity,
          transform: `translateY(${cultureTranslateY}px)`,
          transition: "opacity 0.7s ease-out, transform 0.7s ease-out",
        }}
      >
        <div
          className="absolute inset-0 opacity-70"
          style={{
            background: "linear-gradient(to bottom, #1a0000 0%, #000000 33%, #330000 66%, #000000 100%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)",
            backgroundSize: "20px 20px",
            backgroundPosition: "0 0, 10px 10px",
          }}
        />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.2) 1.5px, transparent 0)",
            backgroundSize: "30px 30px",
            backgroundPosition: "15px 15px",
          }}
        />
        <div
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.25) 2px, transparent 0)",
            backgroundSize: "40px 40px",
            backgroundPosition: "20px 20px",
            maskImage: "linear-gradient(to bottom right, transparent 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.8) 100%)",
            WebkitMaskImage: "linear-gradient(to bottom right, transparent 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.8) 100%)",
          }}
        />

        <div className="max-w-7xl mx-auto px-6 relative z-10 transition-all duration-700 ease-out">
          <div className="text-center max-w-4xl mx-auto relative z-10">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight tracking-tight">
              In Business For Yourself
              <br />
              <span className="text-[#B40101]">Never By Yourself</span>
            </h2>
            <p className="text-lg md:text-2xl text-white font-medium leading-relaxed text-center mx-auto mb-12">
              You are never alone on your journey. Our culture is built on the belief that agents should be in business for themselves, but not by themselves.
            </p>
          </div>

          {false && (
          <div className="relative z-0">
            {/* First Row - 5 avatars */}
            <div className="grid grid-cols-3 md:grid-cols-5 gap-3 md:gap-6">
              {[
                { start: "hidden md:block pt-12", shift: "space-y-6", items: [0] },
                { start: "pt-6 md:pt-24", shift: "space-y-6", items: [1] },
                { start: "pt-12 md:pt-32", shift: "space-y-6", items: [2] },
                { start: "pt-6 md:pt-24", shift: "space-y-6", items: [3] },
                { start: "hidden md:block pt-12", shift: "space-y-6", items: [4] },
              ].map((column, columnIndex) => (
                <div key={`column-${columnIndex}`} className={`${column.shift} ${column.start}`}>
                  {column.items.map((avatarIndex) => (
                    <div key={`avatar-${avatarIndex}`} className={`${avatarIndex % 2 === 0 ? "aspect-[3/4]" : "aspect-square"} rounded-2xl overflow-hidden bg-gray-800 mb-6 last:mb-0`}>
                      <img
                        src={avatarImages[avatarIndex]}
                        alt="Professional"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Second Row - 4 avatars centered */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 max-w-5xl mx-auto mt-6">
              {avatarImages.slice(5, 9).map((image, index) => (
                <div key={`avatar-row2-${index}`} className={`${index === 1 || index === 2 ? "aspect-[3/4]" : "aspect-square"} rounded-2xl overflow-hidden bg-gray-800`}>
                  <img
                    src={image}
                    alt="Professional"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
          )}

          <div
            ref={cultureCardsRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left max-w-6xl mx-auto mt-12"
          >
            {cultureHighlights.map((highlight, index) => (
              <div
                key={highlight.title}
                className={`relative backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 hover:border-white/20 hover:scale-105 hover:shadow-lg hover:shadow-[#B40101]/20 group ${
                  index === 2 ? "md:col-span-2 lg:col-span-1" : ""
                }`}
                style={{
                  opacity: cultureCardsOpacity[index] ?? 0,
                  transform: `translateX(${cultureCardsTranslateX[index] ?? -100}px)`,
                }}
              >
                <div className="text-[#B40101] text-5xl font-bold mb-2">{String(index + 1).padStart(2, "0")}</div>
                <h3 className="text-xl md:text-2xl font-semibold text-white mb-3 group-hover:text-white transition-colors duration-300">{highlight.title}</h3>
                <p className="text-base text-white/70 leading-relaxed group-hover:text-white/90 transition-colors duration-300">{highlight.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Market Focus: Built for Singapore's New Launch Economy Section */}
      <section
        ref={marketFocusSectionRef}
        className="relative py-10 md:py-14 lg:py-24 overflow-hidden"
        style={{
          opacity: marketFocusOpacity,
          transform: `translateY(${marketFocusTranslateY}px)`,
          transition: "opacity 0.7s ease-out, transform 0.7s ease-out",
        }}
      >
        <div
          className="absolute inset-0 opacity-90"
          style={{
            background: "linear-gradient(to bottom, #000000 0%, #1a0000 20%, #330000 40%, #660000 50%, #330000 70%,rgb(0, 0, 0) 100%)",
          }}
        />

        <div className="max-w-7xl mx-auto px-6 relative z-10 transition-all duration-700 ease-out">
          <div className="space-y-8 md:space-y-12">
            <div className="text-left">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight">
                <span className="text-white">
                  Market Focus: <br />
                </span>
                <span className="text-[#D9381E]">Built for Singapore's New Launch Economy</span>
              </h2>
            </div>

            <div className="w-full md:w-4/5 mt-6 md:mt-10 lg:mt-12 md:ml-auto md:mr-0 text-right">
              <p className="text-lg md:text-xl lg:text-2xl text-white font-medium leading-relaxed mx-0 mt-2">
                Our entire ecosystem, from the KW Compass technology to our training curriculum, is engineered to capitalize on the New Launch market. We provide the
                analysis, resources, and focus required to dominate this high-growth sector.
              </p>
            </div>

            <div className="w-full mt-6 md:mt-10 lg:mt-12">
                <div
                  className="relative overflow-hidden rounded-lg"
                  onMouseEnter={() => setIsImageCarouselPaused(true)}
                  onMouseLeave={() => setIsImageCarouselPaused(false)}
                >
                  <div
                    className="flex transition-transform duration-700 ease-in-out"
                    style={{
                      transform: `translateX(-${imageCarouselIndex * (isLargeScreen ? 50 : 100)}%)`,
                    }}
                  >
                    {imageCarouselImages.map((imagePath, index) => (
                      <div key={index} className="flex-shrink-0 w-full lg:w-1/2 px-1 md:px-2">
                        <div className="aspect-video bg-gray-800 rounded-lg overflow-hidden border border-white/10 relative group hover:border-white/20 transition-colors">
                          <img src={imagePath} alt={`Market Focus Image ${index + 1}`} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity bg-black/10" />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-center gap-2 mt-4 md:mt-6">
                    {Array.from({ length: imageDotCount }).map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setImageCarouselIndex(index)}
                        className={`h-2 rounded-full transition-all duration-300 ${imageCarouselIndex === index ? "w-8 bg-[#B40101]" : "w-2 bg-white/30 hover:bg-white/50"}`}
                        aria-label={`Go to image set ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Powerhouse Section */}
      <section
        ref={globalPowerhouseSectionRef}
        className="relative py-16 md:py-16 lg:py-24 overflow-hidden"
        style={{
          opacity: globalPowerhouseOpacity,
          transform: `translateY(${globalPowerhouseTranslateY}px)`,
          transition: "opacity 0.7s ease-out, transform 0.7s ease-out",
        }}
      >
        <div className="absolute inset-0 bg-black" />
        <div className="absolute inset-0 bg-cover bg-center opacity-40" style={{ backgroundImage: "url('/images/why-kw-singapore/bokeh-lights.png')" }} />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/80" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center transition-all duration-700 ease-out">
          <div className="mb-8">
            <h1 className="text-[8rem] md:text-[10rem] lg:text-[12rem] font-black text-[#D9381E] leading-none tracking-tighter opacity-90">#1</h1>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Real Estate Franchise
            <br />
            in the U.S.
          </h2>

          <p className="text-white font-medium leading-relaxed mb-12 max-w-4xl mx-auto text-3xl">With over 200,000 salespersons and a proven track record across 60+ countries.</p>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 mt-36">
          <div className="w-full max-w-full space-y-8">
            <div className="text-left w-full">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                <span className="text-[#D9381E]">
                  LOCAL
                  <br /> MOMENTUM
                </span>
              </h2>
            </div>

            <div className="flex w-full justify-end">
              <div className="w-full sm:w-full md:w-4/5 lg:w-4/5 xl:w-4/5" style={{ maxWidth: "80%" }}>
                <p className="text-lg md:text-2xl text-white font-medium leading-snug md:leading-relaxed text-right">
                  Fueled by a <span className="font-bold">$10M Seed Valuation</span> and media recognition, we are bringing this successful model to Singapore—poised to establish KW as a major force in the local market.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute top-0 left-1/4 w-px h-32 bg-gradient-to-b from-[#D9381E]/30 to-transparent transform -rotate-45" />
        <div className="absolute bottom-0 right-1/3 w-px h-40 bg-gradient-to-t from-[#D9381E]/30 to-transparent transform rotate-45" />
      </section>

      {/* A Financially Viable Future Section */}
      <section
        ref={financiallyViableSectionRef}
        className="relative pt-4 md:pt-6 lg:pt-10 pb-10 md:pb-14 lg:pb-24 bg-gradient-to-br from-black to-[#B40101]/20"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start mb-10 md:mb-14 lg:mb-18">
            <div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-sans leading-tight">
                A Financially
                <span className="block text-[#B40101] italic mt-2">Viable Future</span>
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
            <div className="text-left">
              <h3 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-2 md:mb-6">${count10M}M</h3>
              <p className="text-lg md:text-xl font-semibold mb-2">Seed Valuation</p>
              <p className="text-base md:text-lg text-white/70 leading-relaxed">Angel-funded seed round demonstrating investor confidence</p>
            </div>
            <div className="text-left">
              <h3 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-2 md:mb-6">{count60}+</h3>
              <p className="text-lg md:text-xl font-semibold mb-2">Regions</p>
              <p className="text-base md:text-lg text-white/70 leading-relaxed">Global network presence with proven track record</p>
            </div>
            <div className="text-left md:col-span-2 lg:col-span-1">
              <h3 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-2 md:mb-6">{count200K}K+</h3>
              <p className="text-lg md:text-xl font-semibold mb-2">Salespersons</p>
              <p className="text-base md:text-lg text-white/70 leading-relaxed">Salespersons in our global network</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section
        ref={finalCTASectionRef}
        className="relative pt-16 pb-10 md:pt-16 md:pb-10 lg:pt-24 lg:pb-14"
        style={{
          opacity: finalCTAOpacity,
          transform: `translateY(${finalCTATranslateY}px)`,
          transition: "opacity 0.7s ease-out, transform 0.7s ease-out",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#B40101]/20 via-black/80 to-black" />
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center transition-all duration-700 ease-out">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 font-sans">
            The Future of Real Estate.
            <span className="block text-[#B40101] italic">Led by You.</span>
          </h2>
        </div>
      </section>

      {/* Last Section */}
      <section
        ref={lastSectionRef}
        className="relative pt-8 pb-14 md:pt-10 md:pb-20 lg:pt-12 lg:pb-20 overflow-hidden bg-gradient-to-b from-black via-[#B40101]/35 to-black"
        style={{
          opacity: lastSectionOpacity,
          transform: `translateY(${lastSectionTranslateY}px)`,
          transition: "opacity 0.7s ease-out, transform 0.7s ease-out",
        }}
      >
        <div className="absolute inset-0 opacity-20">
          <svg viewBox="0 0 1440 800" className="w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
            <defs>
              <pattern id="worldDotsLast" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
                <circle cx="4" cy="4" r="1" fill="#ffffff" opacity="0.7" />
              </pattern>
            </defs>
            <path
              d="M200,250 Q250,200 350,220 L450,200 Q500,180 550,200 L650,190 Q700,180 750,200 L850,210 Q900,200 950,220 L1050,230 Q1100,220 1150,240 L1200,250 Q1250,240 1300,260 L1300,400 Q1250,420 1200,410 L1100,400 Q1050,390 1000,400 L900,410 Q850,400 800,410 L700,420 Q650,410 600,420 L500,430 Q450,420 400,430 L300,440 Q250,430 200,440 Z M100,350 Q150,330 200,350 L250,360 Q300,350 350,370 L400,380 Q450,370 500,380 L550,390 Q600,380 650,390 L700,400 Q750,390 800,400 L850,410 Q900,400 950,410 L1000,420 Q1050,410 1100,420 L1100,550 Q1050,570 1000,560 L950,550 Q900,540 850,550 L800,560 Q750,550 700,560 L650,570 Q600,560 550,570 L500,580 Q450,570 400,580 L350,590 Q300,580 250,590 L200,600 Q150,590 100,600 Z"
              fill="url(#worldDotsLast)"
            />
          </svg>
        </div>

        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#B40101]/50 to-transparent" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center transition-all duration-700 ease-out">
          <h3 className="text-xl md:text-2xl text-white mb-6 leading-tight font-medium">
            Where Media, Tech, and Talent Collide. <br />
            <span className="text-white/90">One Platform. Unlimited Potential.</span>
          </h3>

          <div className="mt-8">
            <p className="text-[#B40101] font-bold tracking-wide uppercase text-3xl md:text-4xl lg:text-5xl">
              Ready to lead <br />
              the next era of real estate?
            </p>
          </div>
        </div>

        <div
          ref={lastSectionCardsRef}
          className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto px-6"
        >
          {lastSectionActions.map((action, index) => (
            <div
              key={action.title}
              className="relative backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 hover:border-white/20 hover:scale-105 hover:shadow-lg hover:shadow-[#B40101]/20 group flex flex-col h-full"
              style={{
                opacity: lastSectionCardsOpacity[index] ?? 0,
                transform: `translateX(${lastSectionCardsTranslateX[index] ?? -100}px)`,
              }}
            >
              <div className="mb-6 flex justify-center">
                <action.icon className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-4 text-center min-h-[4rem] flex items-center justify-center group-hover:text-white transition-colors duration-300">
                {action.title}
              </h3>
              <p className="text-base text-white leading-relaxed mb-6 text-center group-hover:text-white transition-colors duration-300 flex-grow">{action.copy}</p>
              <a href={action.href} target={action.href.startsWith("http") ? "_blank" : undefined} rel={action.href.startsWith("http") ? "noopener noreferrer" : undefined} className="w-full">
                <Button className="w-full bg-[#B40101] hover:bg-[#B40101]/90 text-white font-semibold rounded-lg border-none transition-all duration-300 mt-auto">
                  {action.button}
                </Button>
              </a>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
