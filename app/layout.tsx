import type React from "react"
import "./globals.css"
import LayoutContent from "./components/layout-content"
import Script from "next/script"
import CSSLoader from "./components/css-loader"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>KW Singapore</title>
        <meta name="description" content="The Real Estate Model of the Future. Built Today." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="google-site-verification" content="Ma0XSMZeGat4Ymt0ueGTbr5GYOhTe--SEo1gL46mhks" />
        {/* Cache-control (nonstandard, mostly for headers but included here as requested) */}
        <meta httpEquiv="Cache-Control" content="public, max-age=31536000, immutable" />
        <meta httpEquiv="Surrogate-Control" content="public, max-age=31536000, immutable" />
        <meta name="Surrogate-Key" content="static" />
        {/* Preload critical assets */}
        <link 
          rel="preload" 
          href="/images/kw-icon.webp" 
          as="image" 
          type="image/webp" 
        />
        {/* Preconnect to external domains */}
        <link 
          rel="preconnect" 
          href="https://static.hotjar.com" 
          crossOrigin="anonymous" 
        />
        <link rel="icon" href="/images/kw-icon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/kw-icon.ico" />
        <link rel="apple-touch-icon" href="/images/kw-icon.ico" />
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