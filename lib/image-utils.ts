// Image utility functions for handling external images

export interface ImageConfig {
  src: string;
  alt: string;
  fallback?: string;
  width?: number;
  height?: number;
}

/**
 * Get a safe image URL that works with Next.js Image component
 * @param url - The original image URL
 * @param fallback - Optional fallback image URL
 * @returns A safe image URL or fallback
 */
export function getSafeImageUrl(url: string, fallback?: string): string {
  // List of allowed domains from next.config.mjs
  const allowedDomains = [
    'images.unsplash.com',
    'source.unsplash.com',
    'techcoffeehouse.com',
    'img.tepcdn.com',
    'edgeprop.sg',
    'itbrief.asia',
    'sg.news.yahoo.com',
    'www.mingtiandi.com',
    'mingtiandi.com',
    'kwsingapore.s3.ap-southeast-1.amazonaws.com'
  ];

  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname;
    
    // Check if the domain is allowed
    if (allowedDomains.includes(hostname)) {
      return url;
    }
    
    // If domain is not allowed, return fallback or a default image
    return fallback || '/placeholder.jpg';
  } catch (error) {
    // If URL is invalid, return fallback
    return fallback || '/placeholder.jpg';
  }
}

/**
 * Get image configuration with proper error handling
 * @param config - Image configuration object
 * @returns Safe image configuration
 */
export function getImageConfig(config: ImageConfig): ImageConfig {
  return {
    ...config,
    src: getSafeImageUrl(config.src, config.fallback),
  };
}

/**
 * Check if an image URL is from an allowed domain
 * @param url - The image URL to check
 * @returns boolean indicating if the URL is allowed
 */
export function isAllowedImageUrl(url: string): boolean {
  const allowedDomains = [
    'images.unsplash.com',
    'source.unsplash.com',
    'techcoffeehouse.com',
    'img.tepcdn.com',
    'edgeprop.sg',
    'itbrief.asia',
    'sg.news.yahoo.com',
    'www.mingtiandi.com',
    'mingtiandi.com',
    'kwsingapore.s3.ap-southeast-1.amazonaws.com'
  ];

  try {
    const urlObj = new URL(url);
    return allowedDomains.includes(urlObj.hostname);
  } catch (error) {
    return false;
  }
}

/**
 * Get a list of all image URLs used in the application
 * This can be used to update next.config.mjs when new domains are added
 */
export function getAllImageDomains(): string[] {
  return [
    'images.unsplash.com',
    'source.unsplash.com',
    'techcoffeehouse.com',
    'img.tepcdn.com',
    'edgeprop.sg',
    'itbrief.asia',
    'sg.news.yahoo.com',
    'www.mingtiandi.com',
    'mingtiandi.com',
    'kwsingapore.s3.ap-southeast-1.amazonaws.com'
  ];
} 