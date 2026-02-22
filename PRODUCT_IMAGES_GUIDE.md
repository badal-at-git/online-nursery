# Product Images Gallery Guide

## Current Status
The image gallery feature is fully implemented and working on:
- Home page (Featured Products - ✅ Complete with multiple images)
- Shop page (Partial - needs images array added to all products)
- Category pages (Partial - needs images array added to all products)

## How to Add Multiple Images to Products

Each product needs an `images` array added. Here's the pattern:

### Before (Single Image):
```typescript
{
    id: 1,
    name: 'Product Name',
    price: 29.99,
    category: 'Category',
    image: 'https://example.com/image1.jpg',
    description: 'Description',
}
```

### After (Multiple Images):
```typescript
{
    id: 1,
    name: 'Product Name',
    price: 29.99,
    category: 'Category',
    image: 'https://example.com/image1.jpg',
    images: [
        'https://example.com/image1.jpg',  // Main image (same as 'image')
        'https://example.com/image2.jpg',  // Additional view
        'https://example.com/image3.jpg',  // Additional view
    ],
    description: 'Description',
}
```

## Files to Update

1. **app/shop/page.tsx** - Add `images` array to all products in `allProducts` array
2. **app/category/[slug]/page.tsx** - Add `images` array to all products in each category

## Quick Fix for All Products

You can use these placeholder image sets for each category:

### Indoor Plants Images:
```typescript
images: [
    'https://images.pexels.com/photos/3125195/pexels-photo-3125195.jpeg?auto=compress&cs=tinysrgb&w=500',
    'https://images.pexels.com/photos/6208086/pexels-photo-6208086.jpeg?auto=compress&cs=tinysrgb&w=500',
    'https://images.pexels.com/photos/4751978/pexels-photo-4751978.jpeg?auto=compress&cs=tinysrgb&w=500',
]
```

### Flowering Plants Images:
```typescript
images: [
    'https://images.pexels.com/photos/1407305/pexels-photo-1407305.jpeg?auto=compress&cs=tinysrgb&w=500',
    'https://images.pexels.com/photos/7084309/pexels-photo-7084309.jpeg?auto=compress&cs=tinysrgb&w=500',
    'https://images.pexels.com/photos/6208086/pexels-photo-6208086.jpeg?auto=compress&cs=tinysrgb&w=500',
]
```

### Succulents Images:
```typescript
images: [
    'https://images.pexels.com/photos/2132240/pexels-photo-2132240.jpeg?auto=compress&cs=tinysrgb&w=500',
    'https://images.pexels.com/photos/4751978/pexels-photo-4751978.jpeg?auto=compress&cs=tinysrgb&w=500',
    'https://images.pexels.com/photos/6208086/pexels-photo-6208086.jpeg?auto=compress&cs=tinysrgb&w=500',
]
```

### Bouquets Images:
```typescript
images: [
    'https://images.pexels.com/photos/1458603/pexels-photo-1458603.jpeg?auto=compress&cs=tinysrgb&w=500',
    'https://images.pexels.com/photos/1407305/pexels-photo-1407305.jpeg?auto=compress&cs=tinysrgb&w=500',
    'https://images.pexels.com/photos/7084309/pexels-photo-7084309.jpeg?auto=compress&cs=tinysrgb&w=500',
]
```

## What's Already Working

✅ Gallery UI with thumbnails
✅ Click to switch images
✅ Active thumbnail highlighting
✅ Responsive design
✅ Modal scroll lock
✅ Image state management

## What Needs to Be Done

❌ Add `images` array to remaining products in shop page (products id: 2-34)
❌ Add `images` array to remaining products in category pages

Simply copy the `images` array pattern above and add it to each product object after the `image` property.
