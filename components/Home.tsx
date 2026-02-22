'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Header from './Header';
import HeroSection from './HeroSection';
import { ProductsSection } from './ProductsSection';
import { CategoriesSection } from './CategoriesSection';
import Toast from './Toast';
import Footer from './Footer';
import '../styles/common.css';
import '../styles/ui-components.css';
import '../styles/features.css';

// Types
interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  images?: string[]; // Multiple images for gallery
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
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const scrollPosition = useRef(0);
  const { scrollY } = useScroll();

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedProduct) {
      // Store current scroll position
      scrollPosition.current = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollPosition.current}px`;
      document.body.style.width = '100%';
      document.body.classList.add('modal-open');
      setSelectedImageIndex(0); // Reset to first image when opening modal
    } else if (scrollPosition.current !== 0) {
      // Restore scroll position
      const savedPosition = scrollPosition.current;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.classList.remove('modal-open');

      // Use requestAnimationFrame to ensure DOM is ready
      requestAnimationFrame(() => {
        window.scrollTo(0, savedPosition);
      });
    }
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
      images: [
        'https://images.pexels.com/photos/3125195/pexels-photo-3125195.jpeg?auto=compress&cs=tinysrgb&w=500',
        'https://images.pexels.com/photos/6208086/pexels-photo-6208086.jpeg?auto=compress&cs=tinysrgb&w=500',
        'https://images.pexels.com/photos/4751978/pexels-photo-4751978.jpeg?auto=compress&cs=tinysrgb&w=500',
        'https://images.pexels.com/photos/4505171/pexels-photo-4505171.jpeg?auto=compress&cs=tinysrgb&w=500',
      ],
      description: 'Large, tropical indoor plant',
    },
    {
      id: 2,
      name: 'Peace Lily',
      price: 32.99,
      category: 'Flowering Plants',
      image: 'https://images.pexels.com/photos/7084309/pexels-photo-7084309.jpeg?auto=compress&cs=tinysrgb&w=500',
      images: [
        'https://images.pexels.com/photos/7084309/pexels-photo-7084309.jpeg?auto=compress&cs=tinysrgb&w=500',
        'https://images.pexels.com/photos/1407305/pexels-photo-1407305.jpeg?auto=compress&cs=tinysrgb&w=500',
        'https://images.pexels.com/photos/6208086/pexels-photo-6208086.jpeg?auto=compress&cs=tinysrgb&w=500',
      ],
      description: 'Elegant white blooms',
    },
    {
      id: 3,
      name: 'Succulent Collection',
      price: 24.99,
      category: 'Succulents',
      image: 'https://images.pexels.com/photos/2132240/pexels-photo-2132240.jpeg?auto=compress&cs=tinysrgb&w=500',
      images: [
        'https://images.pexels.com/photos/2132240/pexels-photo-2132240.jpeg?auto=compress&cs=tinysrgb&w=500',
        'https://images.pexels.com/photos/4751978/pexels-photo-4751978.jpeg?auto=compress&cs=tinysrgb&w=500',
        'https://images.pexels.com/photos/6208086/pexels-photo-6208086.jpeg?auto=compress&cs=tinysrgb&w=500',
        'https://images.pexels.com/photos/3125195/pexels-photo-3125195.jpeg?auto=compress&cs=tinysrgb&w=500',
      ],
      description: 'Set of 5 mini succulents',
    },
    {
      id: 4,
      name: 'Spring Bouquet',
      price: 59.99,
      category: 'Bouquets',
      image: 'https://images.pexels.com/photos/1458603/pexels-photo-1458603.jpeg?auto=compress&cs=tinysrgb&w=500',
      images: [
        'https://images.pexels.com/photos/1458603/pexels-photo-1458603.jpeg?auto=compress&cs=tinysrgb&w=500',
        'https://images.pexels.com/photos/1407305/pexels-photo-1407305.jpeg?auto=compress&cs=tinysrgb&w=500',
        'https://images.pexels.com/photos/7084309/pexels-photo-7084309.jpeg?auto=compress&cs=tinysrgb&w=500',
      ],
      description: 'Seasonal mixed flowers',
    },
    {
      id: 5,
      name: 'Fiddle Leaf Fig',
      price: 68.99,
      category: 'Indoor Plants',
      image: 'https://images.pexels.com/photos/6208087/pexels-photo-6208087.jpeg?auto=compress&cs=tinysrgb&w=500',
      images: [
        'https://images.pexels.com/photos/6208087/pexels-photo-6208087.jpeg?auto=compress&cs=tinysrgb&w=500',
        'https://images.pexels.com/photos/6208086/pexels-photo-6208086.jpeg?auto=compress&cs=tinysrgb&w=500',
        'https://images.pexels.com/photos/4751978/pexels-photo-4751978.jpeg?auto=compress&cs=tinysrgb&w=500',
      ],
      description: 'Statement indoor tree',
    },
    {
      id: 6,
      name: 'Snake Plant',
      price: 28.99,
      category: 'Indoor Plants',
      image: 'https://images.pexels.com/photos/2123482/pexels-photo-2123482.jpeg?auto=compress&cs=tinysrgb&w=500',
      images: [
        'https://images.pexels.com/photos/2123482/pexels-photo-2123482.jpeg?auto=compress&cs=tinysrgb&w=500',
        'https://images.pexels.com/photos/6208086/pexels-photo-6208086.jpeg?auto=compress&cs=tinysrgb&w=500',
        'https://images.pexels.com/photos/4505171/pexels-photo-4505171.jpeg?auto=compress&cs=tinysrgb&w=500',
        'https://images.pexels.com/photos/3125195/pexels-photo-3125195.jpeg?auto=compress&cs=tinysrgb&w=500',
      ],
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
              <div className="modal-image-section">
                <div className="modal-image">
                  <img
                    src={(selectedProduct.images && selectedProduct.images[selectedImageIndex]) || selectedProduct.image}
                    alt={selectedProduct.name}
                  />
                </div>
                {selectedProduct.images && selectedProduct.images.length > 1 && (
                  <div className="modal-thumbnails">
                    {selectedProduct.images.map((img, index) => (
                      <motion.div
                        key={index}
                        className={`thumbnail ${index === selectedImageIndex ? 'active' : ''}`}
                        onClick={() => setSelectedImageIndex(index)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <img src={img} alt={`${selectedProduct.name} ${index + 1}`} />
                      </motion.div>
                    ))}
                  </div>
                )}
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
      <HeroSection />

      {/* Categories Section */}
      <CategoriesSection categories={categories} />

      {/* Featured Products */}
      <ProductsSection
        products={featuredProducts}
        onProductClick={setSelectedProduct}
        onAddToCart={(product) => addToCart(product)}
      />

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

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
