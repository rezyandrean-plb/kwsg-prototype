"use client"

import { Suspense, lazy, useCallback, memo, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { cn } from '@/lib/utils'
import { Toaster } from '@/components/ui/toaster'
import { usePathname } from 'next/navigation'

// Dynamically import layout components with loading fallbacks
const Header = dynamic(() => import("./layout-client").then(mod => ({ default: mod.Header })), {
  loading: () => <div className="h-16" />,
  // Reduce initial bundle size
  ssr: false
})

const Footer = dynamic(() => import("./layout-client").then(mod => ({ default: mod.Footer })), {
  loading: () => <div className="h-64" />,
  // Reduce initial bundle size
  ssr: false
})

// Lazy load ThemeProvider with loading fallback
const ThemeProvider = lazy(() => 
  import("@/components/theme-provider").then(mod => ({
    default: mod.ThemeProvider
  }))
)

// Memoized loading fallback component
const LoadingFallback = memo(() => (
  <div className="flex min-h-screen flex-col">
    <div className="h-16" /> {/* Header placeholder */}
    <div className="flex-1" /> {/* Content placeholder */}
    <div className="h-64" /> {/* Footer placeholder */}
  </div>
))
LoadingFallback.displayName = 'LoadingFallback'

// Memoized main content wrapper
const MainContent = memo(({ children, className }: { children: React.ReactNode, className?: string }) => (
  <main className={cn("flex-1", className)}>
    {children}
  </main>
))
MainContent.displayName = 'MainContent'

export default function LayoutContent({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  // Memoize the theme provider props to prevent unnecessary re-renders
  const themeProviderProps = useCallback(() => ({
    attribute: "class" as const,
    defaultTheme: "light",
    enableSystem: true,
    disableTransitionOnChange: true
  }), [])

  // Global document title handler: "<Page Title> - KW Singapore"
  useEffect(() => {
    if (typeof document === 'undefined') return

    // Derive a readable title from the current path if page hasn't set one explicitly
    const deriveTitleFromPath = (path: string) => {
      if (!path || path === '/' || path === '') return 'Home'
      const segments = path.split('/').filter(Boolean)

      // Custom mappings by first path segment
      const customTitleBySegment: Record<string, string> = {
        'join': 'Join KW Singapore',
        'model': 'KW Income Model',
        'about-us': 'About Us',
        'compass': 'Tool & Resources',
        'new-launch-collection': 'New Launch Collection',
        'press': 'Press',
        'contact': 'Contact',
      }

      const seg0 = segments[0]
      if (seg0 && customTitleBySegment[seg0]) {
        return customTitleBySegment[seg0]
      }

      const last = segments[segments.length - 1]
      const titleized = last
        .split('-')
        .map(w => w.length ? w[0].toUpperCase() + w.slice(1) : w)
        .join(' ')
      return titleized
    }

    const pageTitle = deriveTitleFromPath(pathname || '/')
    const desired = `${pageTitle} - KW Singapore`

    // If another component already set an identical-scheme title, keep it.
    // Otherwise, set our desired format.
    const current = document.title || ''
    const alreadyInScheme = / - KW Singapore$/.test(current)
    if (!alreadyInScheme || current.toLowerCase() === 'kw singapore') {
      document.title = desired
    }
  }, [pathname])

  return (
    <Suspense fallback={<LoadingFallback />}>
      <ThemeProvider {...themeProviderProps()}>
        <div className="flex min-h-screen flex-col">
          <Header />
          <MainContent>{children}</MainContent>
          <Footer />
        </div>
        <Toaster />
      </ThemeProvider>
    </Suspense>
  )
} 