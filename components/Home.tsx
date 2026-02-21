'use client';

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Header from './Header';
import Cart from './Cart';
import '../styles/common.css';
import '../styles/hero.css';
import '../styles/categories.css';
import '../styles/products.css';
import '../styles/features.css';
import '../styles/newsletter.css';

// Types
interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
}

interface Category {
  id: number;
  name: string;
  image: string;
  description: string;
}

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
}

const Home: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  // removed applying `scale` to the whole hero section because transforms
  // create a new stacking context and caused later sections to overlap.
  // If you want a subtle scale effect, apply it to inner elements instead.

  // Sample data - will be replaced with database later
  const heroSlides = [
    {
      id: 1,
      title: 'Bloom Your Space',
      subtitle: 'Curated collection of rare & exotic plants',
      image: 'https://images.pexels.com/photos/1002703/pexels-photo-1002703.jpeg?auto=compress&cs=tinysrgb&w=1920',
    },
    {
      id: 2,
      title: 'Fresh Flowers Daily',
      subtitle: 'Hand-picked arrangements delivered to your door',
      image: 'https://images.pexels.com/photos/1458603/pexels-photo-1458603.jpeg?auto=compress&cs=tinysrgb&w=1920',
    },
    {
      id: 3,
      title: 'Garden Essentials',
      subtitle: 'Everything you need to nurture your green sanctuary',
      image: 'https://images.pexels.com/photos/1084199/pexels-photo-1084199.jpeg?auto=compress&cs=tinysrgb&w=1920',
    },
  ];

  const categories: Category[] = [
    {
      id: 1,
      name: 'Indoor Plants',
      image: 'https://images.pexels.com/photos/6208086/pexels-photo-6208086.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Perfect for your living space',
    },
    {
      id: 2,
      name: 'Flowering Plants',
      image: 'https://images.pexels.com/photos/1407305/pexels-photo-1407305.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Add color to your garden',
    },
    {
      id: 3,
      name: 'Succulents',
      image: 'https://images.pexels.com/photos/2132240/pexels-photo-2132240.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Low maintenance beauties',
    },
    {
      id: 4,
      name: 'Bouquets',
      image: 'https://images.pexels.com/photos/1458603/pexels-photo-1458603.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Fresh flower arrangements',
    },
  ];

  const featuredProducts: Product[] = [
    {
      id: 1,
      name: 'Monstera Deliciosa',
      price: 45.99,
      category: 'Indoor Plants',
      image: 'https://images.pexels.com/photos/3125195/pexels-photo-3125195.jpeg?auto=compress&cs=tinysrgb&w=500',
      description: 'Large, tropical indoor plant',
    },
    {
      id: 2,
      name: 'Peace Lily',
      price: 32.99,
      category: 'Flowering Plants',
      image: 'https://images.pexels.com/photos/7084309/pexels-photo-7084309.jpeg?auto=compress&cs=tinysrgb&w=500',
      description: 'Elegant white blooms',
    },
    {
      id: 3,
      name: 'Succulent Collection',
      price: 24.99,
      category: 'Succulents',
      image: 'https://images.pexels.com/photos/2132240/pexels-photo-2132240.jpeg?auto=compress&cs=tinysrgb&w=500',
      description: 'Set of 5 mini succulents',
    },
    {
      id: 4,
      name: 'Spring Bouquet',
      price: 59.99,
      category: 'Bouquets',
      image: 'https://images.pexels.com/photos/1458603/pexels-photo-1458603.jpeg?auto=compress&cs=tinysrgb&w=500',
      description: 'Seasonal mixed flowers',
    },
    {
      id: 5,
      name: 'Fiddle Leaf Fig',
      price: 68.99,
      category: 'Indoor Plants',
      image: 'https://images.pexels.com/photos/6208087/pexels-photo-6208087.jpeg?auto=compress&cs=tinysrgb&w=500',
      description: 'Statement indoor tree',
    },
    {
      id: 6,
      name: 'Snake Plant',
      price: 28.99,
      category: 'Indoor Plants',
      image: 'https://images.pexels.com/photos/2123482/pexels-photo-2123482.jpeg?auto=compress&cs=tinysrgb&w=500',
      description: 'Hardy air purifier',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const addToCart = (product: Product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: number, quantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const removeItem = (id: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <div className="home-container">
      {/* Header */}
      <Header onCartClick={() => setIsCartOpen(true)} cartItemCount={cartItemCount} />

      {/* Cart Sidebar */}
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
      />

      {/* Hero Section */}
      <section className="hero-section" id="home">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="hero-overlay" />
            <div className="hero-content">
              <motion.h1
                className="hero-title"
                initial={{ opacity: 0, y: 50 }}
                animate={index === currentSlide ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              >
                {slide.title}
              </motion.h1>
              <motion.p
                className="hero-subtitle"
                initial={{ opacity: 0, y: 50 }}
                animate={index === currentSlide ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
              >
                {slide.subtitle}
              </motion.p>
              <motion.button
                className="hero-cta"
                initial={{ opacity: 0, y: 50 }}
                animate={index === currentSlide ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
              >
                Explore Collection
              </motion.button>
            </div>
          </div>
        ))}

        <div className="hero-dots">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section" id="categories">
        <motion.div
          className="section-header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={itemVariants}
        >
          <h2 className="section-title">Shop by Category</h2>
          <p className="section-subtitle">Discover your perfect green companion</p>
        </motion.div>

        <motion.div
          className="categories-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
        >
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              className="category-card"
              variants={itemVariants}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <div className="category-image-wrapper">
                <img src={category.image} alt={category.name} className="category-image" />
                <div className="category-overlay" />
              </div>
              <div className="category-info">
                <h3 className="category-name">{category.name}</h3>
                <p className="category-description">{category.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Featured Products */}
      <section className="products-section" id="products">
        <motion.div
          className="section-header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={itemVariants}
        >
          <h2 className="section-title">Featured Plants</h2>
          <p className="section-subtitle">Handpicked favorites from our greenhouse</p>
        </motion.div>

        <motion.div
          className="products-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
        >
          {featuredProducts.map((product) => (
            <motion.div
              key={product.id}
              className="product-card"
              variants={itemVariants}
              whileHover={{ y: -8 }}
            >
              <div className="product-image-wrapper">
                <img src={product.image} alt={product.name} className="product-image" />
                <motion.button
                  className="quick-view"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Quick View
                </motion.button>
              </div>
              <div className="product-info">
                <span className="product-category">{product.category}</span>
                <h3 className="product-name">{product.name}</h3>
                <p className="product-description">{product.description}</p>
                <div className="product-footer">
                  <span className="product-price">${product.price}</span>
                  <motion.button
                    className="add-to-cart"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => addToCart(product)}
                  >
                    Add to Cart
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <motion.div
          className="features-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.div className="feature-item" variants={itemVariants}>
            <div className="feature-icon">🚚</div>
            <h3 className="feature-title">Free Delivery</h3>
            <p className="feature-text">On orders over $50</p>
          </motion.div>
          <motion.div className="feature-item" variants={itemVariants}>
            <div className="feature-icon">🌱</div>
            <h3 className="feature-title">Care Guides</h3>
            <p className="feature-text">Expert tips included</p>
          </motion.div>
          <motion.div className="feature-item" variants={itemVariants}>
            <div className="feature-icon">💚</div>
            <h3 className="feature-title">Healthy Guarantee</h3>
            <p className="feature-text">30-day plant protection</p>
          </motion.div>
          <motion.div className="feature-item" variants={itemVariants}>
            <div className="feature-icon">♻️</div>
            <h3 className="feature-title">Eco-Friendly</h3>
            <p className="feature-text">Sustainable packaging</p>
          </motion.div>
        </motion.div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <motion.div
          className="newsletter-content"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={itemVariants}
        >
          <h2 className="newsletter-title">Join Our Garden Community</h2>
          <p className="newsletter-text">
            Get plant care tips, exclusive offers, and new arrival updates
          </p>
          <form className="newsletter-form">
            <input
              type="email"
              placeholder="Enter your email"
              className="newsletter-input"
              required
            />
            <motion.button
              type="submit"
              className="newsletter-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Subscribe
            </motion.button>
          </form>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
