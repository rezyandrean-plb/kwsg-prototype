# Image Domain Management

This document outlines how to handle external image sources in the KW Singapore application.

## Current Allowed Domains

The following domains are configured in `next.config.mjs` for external images:

- `images.unsplash.com` - Unsplash images
- `source.unsplash.com` - Unsplash source images
- `techcoffeehouse.com` - Tech Coffee House articles
- `img.tepcdn.com` - EdgeProp images
- `edgeprop.sg` - EdgeProp website images

## Adding New Image Domains

When adding new external image sources:

1. **Update `next.config.mjs`**:
   ```javascript
   images: {
     domains: [
       // ... existing domains
       'new-domain.com'
     ],
     remotePatterns: [
       // ... existing patterns
       {
         protocol: 'https',
         hostname: 'new-domain.com',
         port: '',
         pathname: '/**',
       }
     ],
   }
   ```

2. **Update `lib/image-utils.ts`**:
   ```typescript
   const allowedDomains = [
     // ... existing domains
     'new-domain.com'
   ];
   ```

3. **Restart the development server**:
   ```bash
   npm run dev
   ```

## Using the Image Utility

The `lib/image-utils.ts` file provides utilities for safe image handling:

```typescript
import { getSafeImageUrl, isAllowedImageUrl } from '@/lib/image-utils';

// Safe image URL with fallback
const safeUrl = getSafeImageUrl(imageUrl, '/placeholder.svg');

// Check if URL is allowed
const isAllowed = isAllowedImageUrl(imageUrl);
```

## Best Practices

1. **Always use the utility functions** when handling external images
2. **Provide fallback images** for better user experience
3. **Update this document** when adding new domains
4. **Test image loading** in development and production
5. **Consider image optimization** for performance

## Troubleshooting

### Common Issues

1. **"hostname is not configured" error**:
   - Add the domain to `next.config.mjs`
   - Update `lib/image-utils.ts`
   - Restart the development server

2. **Images not loading**:
   - Check if the URL is valid
   - Verify the domain is in the allowed list
   - Use the `getSafeImageUrl` utility

3. **Performance issues**:
   - Consider using Next.js Image optimization
   - Implement lazy loading for large images
   - Use appropriate image formats (WebP, AVIF)

### Adding Multiple Domains

For applications with many image sources, consider:

1. **Using a CDN** for centralized image hosting
2. **Implementing image optimization** services
3. **Creating a centralized image management system**
4. **Using environment variables** for domain configuration

## Example: Adding a New Article Source

When adding a new press article with images from a new domain:

1. Add the domain to `next.config.mjs`
2. Update `lib/image-utils.ts`
3. Use `getSafeImageUrl()` in the component
4. Test the image loading
5. Update this documentation

```typescript
// In your article data
{
  imageUrl: "https://new-domain.com/image.jpg",
  // ... other properties
}

// In your component
<Image 
  src={getSafeImageUrl(article.imageUrl, "/placeholder.svg")}
  alt={article.title}
  // ... other props
/>
``` 