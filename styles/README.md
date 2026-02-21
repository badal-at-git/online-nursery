# Styles Directory

This directory contains all CSS files for the plant e-commerce application, organized by component/section.

## File Structure

- `common.css` - Shared styles, fonts, and section headers
- `hero.css` - Hero section with image slider
- `categories.css` - Category cards grid
- `products.css` - Product cards and grid layout
- `features.css` - Features section with icons
- `newsletter.css` - Newsletter subscription section

## Import Order

The CSS files are imported in `components/Home.tsx` in the following order:

1. common.css (base styles)
2. hero.css
3. categories.css
4. products.css
5. features.css
6. newsletter.css

## Key Fixes Applied

1. Removed inline `<style jsx>` tags for better maintainability
2. Fixed z-index and positioning issues that caused section overlapping
3. Removed transform properties that created new stacking contexts
4. Organized CSS into logical, modular files
5. Maintained all animations and interactions using Framer Motion

## Typography

- Headings: 'Playfair Display' (serif)
- Body text: 'Lato' (sans-serif)
- Fonts are loaded via Google Fonts in `common.css` and `hero.css`
