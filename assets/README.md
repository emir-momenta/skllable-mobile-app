# Assets Directory

This directory contains static assets for the Skllable mobile app.

## Structure

- `images/` - Application icons, logos, and other images
- `fonts/` - Custom font files (if needed)
- `sounds/` - Audio files for the app

## Usage

When referencing assets in your components, use the require() function for local assets:

```typescript
// For images
<Image source={require('@/assets/images/logo.png')} />

// For external images (recommended)
<Image source={{ uri: 'https://images.pexels.com/photos/...' }} />
```

## Best Practices

- Use optimized images (WebP when possible)
- Provide multiple resolutions for different screen densities
- Keep file sizes minimal for better performance
- Use meaningful file names