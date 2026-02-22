'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useInView } from 'react-intersection-observer';
import Header from './Header';
import Toast from './Toast';
import Footer from './Footer';
import EnhancedHero from './EnhancedHero';
import '../styles/immersive.css';

interface Product {
    id: number;
    name: string;
    price: number;
    category: string;
    image: string;
    images?: string[];
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

const throttle = (func: Function, delay: number) => {
    let lastCall = 0;
    return (...args: any[]) => {
        const now = Date.now();
        if (now - lastCall >= delay) {
            lastCall = now;
            func(...args);
        }
    };
};

const ImmersiveHome: React.FC = () => {
    const router = useRouter();
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll();

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    useEffect(() => {
        const handleMouseMove = throttle((e: MouseEvent) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth - 0.5) * 2,
                y: (e.clientY / window.innerHeight - 0.5) * 2,
            });
        }, 50);

        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    useEffect(() => {
        const saved = localStorage.getItem('cartItems');
        if (saved) {
            try {
                setCartItems(JSON.parse(saved));
            } catch (e) {
                console.error('Failed to load cart');
            }
        }
    }, []);

    const products: Product[] = useMemo(() => [
        {
            id: 1,
            name: 'Monstera Deliciosa',
            price: 45.99,
            category: 'Indoor Plants',
            image: 'https://images.pexels.com/photos/3125195/pexels-photo-3125195.jpeg?auto=compress&cs=tinysrgb&w=800',
            description: 'Large, tropical indoor plant with stunning split leaves',
            images: [
                'https://images.pexels.com/photos/3125195/pexels-photo-3125195.jpeg?auto=compress&cs=tinysrgb&w=800',
                'https://images.pexels.com/photos/6208086/pexels-photo-6208086.jpeg?auto=compress&cs=tinysrgb&w=800',
            ],
        },
        {
            id: 2,
            name: 'Peace Lily',
            price: 32.99,
            category: 'Flowering Plants',
            image: 'https://images.pexels.com/photos/7084309/pexels-photo-7084309.jpeg?auto=compress&cs=tinysrgb&w=800',
            description: 'Elegant white blooms that purify your air',
            images: [
                'https://images.pexels.com/photos/7084309/pexels-photo-7084309.jpeg?auto=compress&cs=tinysrgb&w=800',
                'https://images.pexels.com/photos/1407305/pexels-photo-1407305.jpeg?auto=compress&cs=tinysrgb&w=800',
            ],
        },
        {
            id: 3,
            name: 'Snake Plant',
            price: 28.99,
            category: 'Succulents',
            image: 'https://images.pexels.com/photos/2123482/pexels-photo-2123482.jpeg?auto=compress&cs=tinysrgb&w=800',
            description: 'Low-maintenance beauty with striking patterns',
            images: [
                'https://images.pexels.com/photos/2123482/pexels-photo-2123482.jpeg?auto=compress&cs=tinysrgb&w=800',
                'https://images.pexels.com/photos/2132240/pexels-photo-2132240.jpeg?auto=compress&cs=tinysrgb&w=800',
            ],
        },
    ], []);

    const addToCart = useCallback((product: Product) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === product.id);
            let newItems;

            if (existingItem) {
                newItems = prevItems.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                newItems = [...prevItems, {
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    quantity: 1,
                    image: product.image,
                    category: product.category,
                }];
            }

            localStorage.setItem('cartItems', JSON.stringify(newItems));
            return newItems;
        });

        setToastMessage(`${product.name} added to cart!`);
        setShowToast(true);
    }, []);

    const cartItemCount = useMemo(() =>
        cartItems.reduce((sum, item) => sum + item.quantity, 0),
        [cartItems]
    );

    return (
        <div ref={containerRef} className="immersive-container">
            <Header onCartClick={() => router.push('/cart')} cartItemCount={cartItemCount} />
            <Toast message={toastMessage} isVisible={showToast} onClose={() => setShowToast(false)} />

            {selectedProduct && (
                <ProductModal
                    product={selectedProduct}
                    selectedImageIndex={selectedImageIndex}
                    onClose={() => {
                        setSelectedProduct(null);
                        setSelectedImageIndex(0);
                    }}
                    onImageSelect={setSelectedImageIndex}
                    onAddToCart={addToCart}
                />
            )}

            <EnhancedHero mousePosition={mousePosition} scrollProgress={smoothProgress} />
            <FloatingProductsSection
                products={products}
                onAddToCart={addToCart}
                onProductClick={setSelectedProduct}
            />
            <CategoriesGrid3D />
            <ParallaxFeatures />
            <ImmersiveCTA />
            <Footer />
        </div>
    );
};

const ProductModal: React.FC<any> = React.memo(({ product, selectedImageIndex, onClose, onImageSelect, onAddToCart }) => {
    return (
        <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={onClose}>
            <motion.div className="product-modal" initial={{ scale: 0.9 }} animate={{ scale: 1 }} onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>✕</button>
                <div className="modal-content">
                    <div className="modal-image-section">
                        <div className="modal-image">
                            <img src={(product.images && product.images[selectedImageIndex]) || product.image} alt={product.name} loading="lazy" />
                        </div>
                        {product.images && product.images.length > 1 && (
                            <div className="modal-thumbnails">
                                {product.images.map((img: string, index: number) => (
                                    <div key={index} className={`thumbnail ${index === selectedImageIndex ? 'active' : ''}`} onClick={() => onImageSelect(index)}>
                                        <img src={img} alt={`${product.name} ${index + 1}`} loading="lazy" />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="modal-details">
                        <span className="modal-category">{product.category}</span>
                        <h2 className="modal-title">{product.name}</h2>
                        <p className="modal-description">{product.description}</p>
                        <div className="modal-price">${product.price}</div>
                        <button className="modal-add-to-cart" onClick={() => { onAddToCart(product); onClose(); }}>
                            Add to Cart - ${product.price}
                        </button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
});

const FloatingProductsSection: React.FC<any> = React.memo(({ products, onAddToCart, onProductClick }) => {
    const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });
    return (
        <section ref={ref} className="floating-products-section">
            <motion.div className="section-header-3d" initial={{ opacity: 0, y: 50 }} animate={inView ? { opacity: 1, y: 0 } : {}}>
                <h2 className="section-title-3d">Featured Collection</h2>
            </motion.div>
            <div className="products-grid-3d">
                {products.map((product: any, idx: number) => (
                    <ProductCard3D key={product.id} product={product} index={idx} onAddToCart={onAddToCart} onClick={onProductClick} inView={inView} />
                ))}
            </div>
        </section>
    );
});

const ProductCard3D: React.FC<any> = React.memo(({ product, index, onAddToCart, onClick, inView }) => {
    return (
        <motion.div className="product-card-3d" initial={{ opacity: 0, y: 50 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: index * 0.1 }} onClick={() => onClick(product)}>
            <div className="product-image-3d">
                <img src={product.image} alt={product.name} loading="lazy" />
            </div>
            <div className="product-info-3d">
                <span className="product-category-3d">{product.category}</span>
                <h3 className="product-name-3d">{product.name}</h3>
                <p className="product-description-3d">{product.description}</p>
                <div className="product-footer-3d">
                    <span className="product-price-3d">${product.price}</span>
                    <button className="add-to-cart-3d" onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}>Add to Cart</button>
                </div>
            </div>
        </motion.div>
    );
});

const CategoriesGrid3D: React.FC = React.memo(() => {
    const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });
    const router = useRouter();
    const categories = [
        { name: 'Indoor Plants', icon: '🪴', slug: 'indoor-plants' },
        { name: 'Flowering', icon: '🌸', slug: 'flowering-plants' },
        { name: 'Succulents', icon: '🌵', slug: 'succulents' },
        { name: 'Bouquets', icon: '💐', slug: 'bouquets' },
    ];
    return (
        <section ref={ref} className="categories-3d-section">
            <h2 className="section-title-3d">Explore Categories</h2>
            <div className="categories-grid-3d">
                {categories.map((cat, idx) => (
                    <motion.div key={cat.name} className="category-card-3d" initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: idx * 0.1 }} onClick={() => router.push(`/category/${cat.slug}`)}>
                        <div className="category-icon-3d">{cat.icon}</div>
                        <h3 className="category-name-3d">{cat.name}</h3>
                    </motion.div>
                ))}
            </div>
        </section>
    );
});

const ParallaxFeatures: React.FC = React.memo(() => {
    const features = [
        { icon: '🚚', title: 'Free Delivery', description: 'On orders over $50' },
        { icon: '🌱', title: 'Care Guides', description: 'Expert tips included' },
        { icon: '💚', title: 'Healthy Guarantee', description: '30-day protection' },
        { icon: '♻️', title: 'Eco-Friendly', description: 'Sustainable packaging' },
    ];
    return (
        <section className="parallax-features">
            <div className="feature-layer">
                {features.map((f) => (
                    <div key={f.title} className="feature-card-3d">
                        <div className="feature-icon-3d">{f.icon}</div>
                        <h3>{f.title}</h3>
                        <p>{f.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
});

const ImmersiveCTA: React.FC = React.memo(() => {
    const router = useRouter();
    const [ref, inView] = useInView({ threshold: 0.5, triggerOnce: true });
    return (
        <section ref={ref} className="immersive-cta">
            <video autoPlay loop muted playsInline className="cta-video-bg">
                <source src="https://cdn.pixabay.com/video/2021/08/04/84443-583607166_large.mp4" type="video/mp4" />
            </video>
            <div className="cta-overlay" />
            <div className="cta-content">
                <h2>Ready to Transform Your Space?</h2>
                <p>Join thousands of happy plant parents</p>
                <button className="cta-button-3d" onClick={() => router.push('/shop')}>Shop Now</button>
            </div>
        </section>
    );
});

export default React.memo(ImmersiveHome);
