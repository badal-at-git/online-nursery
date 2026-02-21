# Shopping Cart Features

## What's New

### 1. Updated Images
All images have been replaced with working Pexels images:
- Hero slides: High-quality plant and flower images
- Categories: Indoor plants, flowering plants, succulents, and bouquets
- Products: 6 featured products with clear, professional images

### 2. Shopping Cart System
A fully functional shopping cart has been added with the following features:

#### Cart Icon
- Fixed position floating cart button (top-right corner)
- Shows item count badge when cart has items
- Animated hover effects

#### Cart Sidebar
- Slides in from the right when opened
- Displays all cart items with images
- Shows product name, category, and price
- Empty cart state with friendly message

#### Cart Functionality
- **Add to Cart**: Click "Add to Cart" on any product
- **Update Quantity**: Use +/- buttons to adjust quantities
- **Remove Items**: Click trash icon to remove items
- **View Total**: Real-time total calculation
- **Checkout Button**: Ready for checkout integration

#### Cart Features
- Smooth animations using Framer Motion
- Responsive design for mobile and desktop
- Persistent cart state during session
- Automatic cart opening when items are added
- Overlay backdrop with blur effect

## Files Created/Modified

### New Files
- `components/Cart.tsx` - Cart component
- `styles/cart.css` - Cart styling
- `CART_FEATURES.md` - This documentation

### Modified Files
- `components/Home.tsx` - Added cart state and functionality
- `styles/common.css` - Added cart icon styles

## How to Use

1. Browse the products in the "Featured Plants" section
2. Click "Add to Cart" on any product
3. Cart sidebar opens automatically
4. Adjust quantities or remove items as needed
5. View total and proceed to checkout

## Technical Details

### State Management
- Cart items stored in React state
- Quantity updates handled immutably
- Cart open/close state controlled by parent component

### Type Safety
- Full TypeScript support
- Interfaces for Product, Category, and CartItem
- Type-safe props for Cart component

### Animations
- Framer Motion for smooth transitions
- AnimatePresence for enter/exit animations
- Layout animations for item updates
