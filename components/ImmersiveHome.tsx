'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useInView } from 'react-intersection-observer';
import Header from './Header';
import Toast from './Toast';
import Footer from './Footer';
import EnhancedHero from './EnhancedHero';
import ModernInteractive from './ModernInteractive';
import '../styles/immersive.css';

interface Product {
    id: number;
    name: string;
    price: number;
    category: string;
    image: string;
    images?: string[];
    description: string;
    video?: string;
}

interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
    category: string;
}

const ImmersiveHome: React.FC = () => {
    const router = useRouter();
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll();

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Mouse parallax effect
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth - 0.5) * 2,
                y: (e.clientY / window.innerHeight - 0.5) * 2,
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const products: Product[] = [
        {
            id: 1,
            name: 'Monstera Deliciosa',
            price: 45.99,
            category: 'Indoor Plants',
            image: 'https://images.pexels.com/photos/3125195/pexels-photo-3125195.jpeg?auto=compress&cs=tinysrgb&w=800',
            video: 'https://cdn.pixabay.com/video/2023/05/02/160827-822871142_large.mp4',
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
            video: 'https://cdn.pixabay.com/video/2022/11/29/141358-777396258_large.mp4',
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
            video: 'https://cdn.pixabay.com/video/2021/08/04/84443-583607166_large.mp4',
            description: 'Low-maintenance beauty with striking patterns',
            images: [
                'https://images.pexels.com/photos/2123482/pexels-photo-2123482.jpeg?auto=compress&cs=tinysrgb&w=800',
                'https://images.pexels.com/photos/2132240/pexels-photo-2132240.jpeg?auto=compress&cs=tinysrgb&w=800',
            ],
        },
    ];

    const addToCart = (product: Product) => {
        const existingItem = cartItems.find(item => item.id === product.id);

        if (existingItem) {
            setCartItems(cartItems.map(item =>
                item.id === product.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            ));
        } else {
            setCartItems([...cartItems, {
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: 1,
                image: product.image,
                category: product.category,
            }]);
        }

        setToastMessage(`${product.name} added to cart!`);
        setShowToast(true);

        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    };

    const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <div ref={containerRef} className="immersive-container">
            <ModernInteractive />
            <Header onCartClick={() => router.push('/cart')} cartItemCount={cartItemCount} />
            <Toast message={toastMessage} isVisible={showToast} onClose={() => setShowToast(false)} />

            {/* Enhanced Hero Section */}
            <EnhancedHero mousePosition={mousePosition} scrollProgress={smoothProgress} />

            {/* Floating Products Section */}
            <FloatingProductsSection
                products={products}
                onAddToCart={addToCart}
                onProductClick={setSelectedProduct}
                mousePosition={mousePosition}
            />

            {/* 3D Categories Grid */}
            <CategoriesGrid3D mousePosition={mousePosition} />

            {/* Parallax Features */}
            <ParallaxFeatures scrollProgress={smoothProgress} />

            {/* Immersive CTA */}
            <ImmersiveCTA />

            <Footer />
        </div>
    );
};

// Floating Products Section
const FloatingProductsSection: React.FC<{
    products: Product[];
    onAddToCart: (product: Product) => void;
    onProductClick: (product: Product) => void;
    mousePosition: { x: number; y: number };
}> = ({ products, onAddToCart, onProductClick, mousePosition }) => {
    const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

    return (
        <section ref={ref} className="floating-products-section reveal-on-scroll">
            <motion.div
                className="section-header-3d"
                initial={{ opacity: 0, y: 100 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1 }}
            >
                <h2 className="section-title-3d gradient-text-animated">Featured Collection</h2>
                <p className="section-subtitle-3d">Handpicked premium plants in stunning 3D</p>
            </motion.div>

            <div className="products-grid-3d">
                {products.map((product, idx) => (
                    <ProductCard3D
                        key={product.id}
                        product={product}
                        index={idx}
                        onAddToCart={onAddToCart}
                        onClick={onProductClick}
                        mousePosition={mousePosition}
                        inView={inView}
                    />
                ))}
            </div>
        </section>
    );
};

// 3D Product Card
const ProductCard3D: React.FC<{
    product: Product;
    index: number;
    onAddToCart: (product: Product) => void;
    onClick: (product: Product) => void;
    mousePosition: { x: number; y: number };
    inView: boolean;
}> = ({ product, index, onAddToCart, onClick, mousePosition, inView }) => {
    const [isHovered, setIsHovered] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    return (
        <motion.div
            ref={cardRef}
            className="product-card-3d"
            data-cursor="View"
            initial={{ opacity: 0, y: 100, rotateX: -20 }}
            animate={inView ? {
                opacity: 1,
                y: 0,
                rotateX: 0,
            } : {}}
            transition={{
                duration: 0.8,
                delay: index * 0.2,
                type: 'spring',
                stiffness: 100,
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                transformStyle: 'preserve-3d',
                perspective: 1000,
            }}
        >
            {/* Video Background on Hover */}
            {product.video && isHovered && (
                <motion.video
                    className="product-video-bg"
                    autoPlay
                    loop
                    muted
                    playsInline
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.3 }}
                >
                    <source src={product.video} type="video/mp4" />
                </motion.video>
            )}

            {/* Product Image */}
            <motion.div
                className="product-image-3d"
                style={{ transform: 'translateZ(50px)' }}
            >
                <img src={product.image} alt={product.name} />
                <motion.div
                    className="image-glow"
                    animate={isHovered ? { opacity: 1, scale: 1.2 } : { opacity: 0, scale: 1 }}
                />
            </motion.div>

            {/* Product Info */}
            <motion.div
                className="product-info-3d"
                style={{ transform: 'translateZ(30px)' }}
            >
                <span className="product-category-3d">{product.category}</span>
                <h3 className="product-name-3d">{product.name}</h3>
                <p className="product-description-3d">{product.description}</p>

                <div className="product-footer-3d">
                    <motion.span
                        className="product-price-3d"
                        animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
                    >
                        ${product.price}
                    </motion.span>

                    <motion.button
                        className="add-to-cart-3d magnetic-btn"
                        data-cursor="Add"
                        onClick={(e) => {
                            e.stopPropagation();
                            onAddToCart(product);
                        }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        style={{ transform: 'translateZ(20px)' }}
                    >
                        <span>Add to Cart</span>
                    </motion.button>
                </div>
            </motion.div>

            {/* Holographic Effect */}
            <motion.div
                className="holographic-overlay"
                animate={isHovered ? { opacity: 0.5 } : { opacity: 0 }}
            />
        </motion.div>
    );
};

// 3D Categories Grid
const CategoriesGrid3D: React.FC<{ mousePosition: { x: number; y: number } }> = ({ mousePosition }) => {
    const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });
    const router = useRouter();

    const categories = [
        { name: 'Indoor Plants', icon: '🪴', color: '#2d5f3f', slug: 'indoor-plants' },
        { name: 'Flowering', icon: '🌸', color: '#e91e63', slug: 'flowering-plants' },
        { name: 'Succulents', icon: '🌵', color: '#4caf50', slug: 'succulents' },
        { name: 'Bouquets', icon: '💐', color: '#ff9800', slug: 'bouquets' },
    ];

    return (
        <section ref={ref} className="categories-3d-section reveal-on-scroll">
            <motion.h2
                className="section-title-3d gradient-text-animated"
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
            >
                Explore Categories
            </motion.h2>

            <div className="categories-grid-3d">
                {categories.map((category, idx) => (
                    <motion.div
                        key={category.name}
                        className="category-card-3d"
                        data-cursor="Explore"
                        initial={{ opacity: 0, scale: 0.5, rotateY: -180 }}
                        animate={inView ? {
                            opacity: 1,
                            scale: 1,
                            rotateY: 0,
                        } : {}}
                        transition={{
                            duration: 0.8,
                            delay: idx * 0.15,
                            type: 'spring',
                        }}
                        onClick={() => router.push(`/category/${category.slug}`)}
                        style={{
                            background: `linear-gradient(135deg, ${category.color}20, ${category.color}40)`,
                            transformStyle: 'preserve-3d',
                        }}
                    >
                        <motion.div
                            className="category-icon-3d"
                            animate={{ rotateY: [0, 360] }}
                            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                        >
                            {category.icon}
                        </motion.div>
                        <h3 className="category-name-3d">{category.name}</h3>
                        <motion.div
                            className="category-glow"
                            style={{ background: category.color }}
                        />
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

// Parallax Features
const ParallaxFeatures: React.FC<{ scrollProgress: any }> = ({ scrollProgress }) => {
    const y1 = useTransform(scrollProgress, [0, 1], [0, -200]);
    const y2 = useTransform(scrollProgress, [0, 1], [0, -400]);

    return (
        <section className="parallax-features">
            <motion.div className="feature-layer" style={{ y: y1 }}>
                <FeatureCard icon="🚚" title="Free Delivery" description="On orders over $50" />
                <FeatureCard icon="🌱" title="Care Guides" description="Expert tips included" />
            </motion.div>
            <motion.div className="feature-layer" style={{ y: y2 }}>
                <FeatureCard icon="💚" title="Healthy Guarantee" description="30-day protection" />
                <FeatureCard icon="♻️" title="Eco-Friendly" description="Sustainable packaging" />
            </motion.div>
        </section>
    );
};

const FeatureCard: React.FC<{ icon: string; title: string; description: string }> = ({
    icon,
    title,
    description
}) => (
    <motion.div
        className="feature-card-3d"
        whileHover={{ scale: 1.1, rotateZ: 5 }}
    >
        <div className="feature-icon-3d">{icon}</div>
        <h3>{title}</h3>
        <p>{description}</p>
    </motion.div>
);

// Immersive CTA
const ImmersiveCTA: React.FC = () => {
    const router = useRouter();
    const [ref, inView] = useInView({ threshold: 0.5, triggerOnce: true });

    return (
        <motion.section
            ref={ref}
            className="immersive-cta"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
        >
            <video autoPlay loop muted playsInline className="cta-video-bg">
                <source src="https://cdn.pixabay.com/video/2021/08/04/84443-583607166_large.mp4" type="video/mp4" />
            </video>
            <div className="cta-overlay" />

            <motion.div
                className="cta-content"
                initial={{ scale: 0.8, y: 100 }}
                animate={inView ? { scale: 1, y: 0 } : {}}
                transition={{ duration: 1 }}
            >
                <h2>Ready to Transform Your Space?</h2>
                <p>Join thousands of happy plant parents</p>
                <motion.button
                    className="cta-button-3d"
                    onClick={() => router.push('/shop')}
                    whileHover={{ scale: 1.1, rotateZ: -5 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Shop Now
                </motion.button>
            </motion.div>
        </motion.section>
    );
};

export default ImmersiveHome;
