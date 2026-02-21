'use client';

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Header from './Header';
import Toast from './Toast';
import '../styles/common.css';
import '../styles/hero.css';
import '../styles/categories.css';
import '../styles/products.css';
import '../styles/features.css';

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
  slug: string;
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
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { scrollY } = useScroll();

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedProduct) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.classList.add('modal-open');
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.classList.remove('modal-open');
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.classList.remove('modal-open');
    };
  }, [selectedProduct]);

  // Sample data - will be replaced with database later
  const heroSlides = [
    {
      id: 1,
      title: 'Bloom Your Space',
      subtitle: 'Curated collection of rare & exotic plants',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      accent: '#667eea',
    },
    {
      id: 2,
      title: 'Fresh Flowers Daily',
      subtitle: 'Hand-picked arrangements delivered to your door',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      accent: '#f093fb',
    },
    {
      id: 3,
      title: 'Garden Essentials',
      subtitle: 'Everything you need to nurture your green sanctuary',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      accent: '#4facfe',
    },
  ];

  const categories: Category[] = [
    {
      id: 1,
      name: 'Indoor Plants',
      image: 'https://images.pexels.com/photos/6208086/pexels-photo-6208086.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Perfect for your living space',
      slug: 'indoor-plants',
    },
    {
      id: 2,
      name: 'Flowering Plants',
      image: 'https://images.pexels.com/photos/1407305/pexels-photo-1407305.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Add color to your garden',
      slug: 'flowering-plants',
    },
    {
      id: 3,
      name: 'Succulents',
      image: 'https://images.pexels.com/photos/2132240/pexels-photo-2132240.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Low maintenance beauties',
      slug: 'succulents',
    },
    {
      id: 4,
      name: 'Bouquets',
      image: 'https://images.pexels.com/photos/1458603/pexels-photo-1458603.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Fresh flower arrangements',
      slug: 'bouquets',
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

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  const addToCart = (product: Product, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    const existingItem = cartItems.find((item) => item.id === product.id);
    let updatedItems;

    if (existingItem) {
      updatedItems = cartItems.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      updatedItems = [...cartItems, { ...product, quantity: 1 }];
    }

    setCartItems(updatedItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));

    // Show toast notification
    setToastMessage(`${product.name} added to cart!`);
    setShowToast(true);
  };

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: 'easeOut',
      },
    },
  };

  return (
    <div className="home-container">
      {/* Header */}
      <Header
        onCartClick={() => router.push('/cart')}
        cartItemCount={cartItemCount}
      />

      {/* Toast Notification */}
      <Toast
        message={toastMessage}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />

      {/* Product Detail Modal */}
      {selectedProduct && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedProduct(null)}
        >
          <motion.div
            className="product-modal"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close" onClick={() => setSelectedProduct(null)}>
              ✕
            </button>
            <div className="modal-content">
              <div className="modal-image">
                <img src={selectedProduct.image} alt={selectedProduct.name} />
              </div>
              <div className="modal-details">
                <span className="modal-category">{selectedProduct.category}</span>
                <h2 className="modal-title">{selectedProduct.name}</h2>
                <p className="modal-description">{selectedProduct.description}</p>
                <div className="modal-price">${selectedProduct.price}</div>
                <div className="modal-info">
                  <div className="info-item">
                    <span className="info-icon">💧</span>
                    <div>
                      <strong>Watering</strong>
                      <p>Water when top soil is dry</p>
                    </div>
                  </div>
                  <div className="info-item">
                    <span className="info-icon">☀️</span>
                    <div>
                      <strong>Light</strong>
                      <p>Bright indirect sunlight</p>
                    </div>
                  </div>
                  <div className="info-item">
                    <span className="info-icon">🌡️</span>
                    <div>
                      <strong>Temperature</strong>
                      <p>18-24°C (65-75°F)</p>
                    </div>
                  </div>
                </div>
                <motion.button
                  className="modal-add-to-cart"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={(e) => {
                    addToCart(selectedProduct, e);
                    setSelectedProduct(null);
                  }}
                >
                  Add to Cart - ${selectedProduct.price}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Hero Section */}
      <section className="hero-section" id="home">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
            style={{
              background: slide.gradient,
              pointerEvents: index === currentSlide ? 'auto' : 'none'
            }}
          >
            <div className="hero-overlay" />

            {/* Animated Background Elements */}
            <div className="hero-bg-elements">
              <motion.div
                className="floating-element leaf-1"
                animate={{
                  y: [0, -30, 0],
                  rotate: [0, 10, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                🌿
              </motion.div>
              <motion.div
                className="floating-element leaf-2"
                animate={{
                  y: [0, -40, 0],
                  rotate: [0, -15, 0],
                }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.5,
                }}
              >
                🍃
              </motion.div>
              <motion.div
                className="floating-element flower-1"
                animate={{
                  y: [0, -25, 0],
                  x: [0, 10, 0],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 1,
                }}
              >
                🌸
              </motion.div>
              <motion.div
                className="floating-element flower-2"
                animate={{
                  y: [0, -35, 0],
                  x: [0, -15, 0],
                }}
                transition={{
                  duration: 9,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 1.5,
                }}
              >
                🌺
              </motion.div>
              <motion.div
                className="floating-element plant-1"
                animate={{
                  y: [0, -20, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 2,
                }}
              >
                🪴
              </motion.div>
              <motion.div
                className="floating-element sparkle-1"
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                ✨
              </motion.div>
              <motion.div
                className="floating-element sparkle-2"
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 1.5,
                }}
              >
                ✨
              </motion.div>
            </div>

            <div
              className="hero-content"
            >
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
                onClick={() => router.push('/shop')}
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
          viewport={{ once: true, margin: '-50px' }}
          variants={itemVariants}
        >
          <h2 className="section-title">Shop by Category</h2>
          <p className="section-subtitle">Discover your perfect green companion</p>
        </motion.div>

        <motion.div
          className="categories-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={containerVariants}
        >
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              className="category-card"
              variants={itemVariants}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
              onClick={() => router.push(`/category/${category.slug}`)}
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
          viewport={{ once: true, margin: '-50px' }}
          variants={itemVariants}
        >
          <h2 className="section-title">Featured Plants</h2>
          <p className="section-subtitle">Handpicked favorites from our greenhouse</p>
        </motion.div>

        <motion.div
          className="products-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={containerVariants}
        >
          {featuredProducts.map((product) => (
            <motion.div
              key={product.id}
              className="product-card"
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              onClick={() => setSelectedProduct(product)}
            >
              <div className="product-image-wrapper">
                <img src={product.image} alt={product.name} className="product-image" />
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
                    onClick={(e) => addToCart(product, e)}
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
    </div>
  );
};

export default Home;
