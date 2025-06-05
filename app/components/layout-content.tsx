"use client"

import { Suspense, lazy, useCallback, memo } from 'react'
import dynamic from 'next/dynamic'
import { cn } from '@/lib/utils'

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

// Memoized loading fallback component with minimal DOM
const LoadingFallback = memo(() => (
  <div className="flex min-h-screen flex-col" style={{ contentVisibility: 'auto' }}>
    <div className="h-16" /> {/* Header placeholder */}
    <div className="flex-1" /> {/* Content placeholder */}
    <div className="h-64" /> {/* Footer placeholder */}
  </div>
))
LoadingFallback.displayName = 'LoadingFallback'

// Memoized main content wrapper to prevent unnecessary re-renders
const MainContent = memo(({ children, className }: { children: React.ReactNode, className?: string }) => (
  <main 
    className={cn("flex-1", className)}
    style={{ 
      contentVisibility: 'auto',
      containIntrinsicSize: '0 500px'
    }}
  >
    {children}
  </main>
))
MainContent.displayName = 'MainContent'

export default function LayoutContent({
  children,
}: {
  children: React.ReactNode
}) {
  // Memoize the theme provider props to prevent unnecessary re-renders
  const themeProviderProps = useCallback(() => ({
    attribute: "class" as const,
    defaultTheme: "light",
    enableSystem: true,
    disableTransitionOnChange: true
  }), [])

  return (
    <Suspense fallback={<LoadingFallback />}>
      <ThemeProvider {...themeProviderProps()}>
        <div 
          className="flex min-h-screen flex-col"
          style={{ 
            contentVisibility: 'auto',
            containIntrinsicSize: '0 100vh'
          }}
        >
          <Header />
          <MainContent>{children}</MainContent>
          <Footer />
        </div>
      </ThemeProvider>
    </Suspense>
  )
} 