import type React from "react"
import "./globals.css"
import LayoutContent from "./components/layout-content"
import Script from "next/script"
import CSSLoader from "./components/css-loader"

export const metadata = {
  title: 'KW Singapore',
  description: 'The Real Estate Model of the Future. Built Today.',
  other: {
    'Cache-Control': 'public, max-age=31536000, immutable',
    'Surrogate-Control': 'public, max-age=31536000, immutable',
    'Surrogate-Key': 'static',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ffffff" />
        {/* Preload critical assets */}
        <link 
          rel="preload" 
          href="/images/kw-icon.webp" 
          as="image" 
          type="image/webp" 
        />
        <link 
          rel="icon" 
          href="/images/kw-icon.webp" 
          type="image/webp" 
        />
        {/* Preconnect to external domains */}
        <link 
          rel="preconnect" 
          href="https://static.hotjar.com" 
          crossOrigin="anonymous" 
        />
        {/* Performance hints */}
        <meta httpEquiv="x-dns-prefetch-control" content="on" />
        <link rel="dns-prefetch" href="https://static.hotjar.com" />
        {/* Inline critical CSS */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              /* Critical CSS for initial render */
              body { margin: 0; }
              .flex { display: flex; }
              .min-h-screen { min-height: 100vh; }
              .flex-col { flex-direction: column; }
            `,
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <CSSLoader />
        <LayoutContent>{children}</LayoutContent>
        {/* Load Hotjar with optimized strategy and cache control */}
        <Script
          id="hotjar"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              (function(h,o,t,j,a,r){
                // Only load Hotjar over HTTPS
                if (window.location.protocol !== 'https:') return;
                
                h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                h._hjSettings={hjid:6420441,hjsv:6};
                a=o.getElementsByTagName('head')[0];
                r=o.createElement('script');
                r.async=1;
                r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                // Add cache control headers
                r.setAttribute('data-cache-control', 'public, max-age=31536000, immutable');
                a.appendChild(r);
              })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
            `,
          }}
        />
      </body>
    </html>
  )
}
