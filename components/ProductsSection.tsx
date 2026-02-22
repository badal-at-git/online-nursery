'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TextGenerateEffect } from './ui/TextGenerateEffect';
import { BackgroundBeams } from './ui/BackgroundBeams';
import '../styles/products-enhanced.css';

interface Product {
    id: number;
    name: string;
    price: number;
    category: string;
    image: string;
    images?: string[];
    description: string;
}

interface ProductsSectionProps {
    products: Product[];
    onProductClick: (product: Product) => void;
    onAddToCart: (product: Product) => void;
}

export const ProductsSection: React.FC<ProductsSectionProps> = ({
    products,
    onProductClick,
    onAddToCart,
}) => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <section className="products-section-enhanced">
            <BackgroundBeams />

            <div className="products-container">
                <motion.div
                    className="section-header-enhanced"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <TextGenerateEffect
                        words="Featured Plants Collection"
                        className="section-title-enhanced"
                    />
                    <motion.p
                        className="section-subtitle-enhanced"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                    >
                        Handpicked selection of premium plants for your space
                    </motion.p>
                </motion.div>

                <div className="products-grid-enhanced">
                    {products.map((product, idx) => (
                        <motion.div
                            key={product.id}
                            className="product-card-enhanced"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1, duration: 0.6 }}
                            onMouseEnter={() => setHoveredIndex(idx)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            <div
                                className="product-card-inner"
                                onClick={() => onProductClick(product)}
                            >
                                {/* 3D Image Container */}
                                <motion.div
                                    className="product-image-3d"
                                    animate={{
                                        rotateY: hoveredIndex === idx ? 5 : 0,
                                        rotateX: hoveredIndex === idx ? 5 : 0,
                                    }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="image-wrapper">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="product-image"
                                        />
                                        <motion.div
                                            className="image-overlay"
                                            initial={{ opacity: 0 }}
                                            animate={{
                                                opacity: hoveredIndex === idx ? 1 : 0,
                                            }}
                                        />
                                    </div>

                                    {/* Floating Badge */}
                                    <motion.div
                                        className="product-badge"
                                        animate={{
                                            y: hoveredIndex === idx ? -5 : 0,
                                        }}
                                    >
                                        <span className="badge-icon">🌟</span>
                                        <span>Premium</span>
                                    </motion.div>
                                </motion.div>

                                {/* Product Info */}
                                <div className="product-info-enhanced">
                                    <span className="product-category-enhanced">
                                        {product.category}
                                    </span>
                                    <h3 className="product-name-enhanced">
                                        {product.name}
                                    </h3>
                                    <p className="product-description-enhanced">
                                        {product.description}
                                    </p>

                                    {/* Price and Action */}
                                    <div className="product-footer-enhanced">
                                        <motion.div
                                            className="product-price-enhanced"
                                            animate={{
                                                scale: hoveredIndex === idx ? 1.1 : 1,
                                            }}
                                        >
                                            ${product.price.toFixed(2)}
                                        </motion.div>

                                        <motion.button
                                            className="add-to-cart-enhanced"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onAddToCart(product);
                                            }}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <span className="cart-icon">🛒</span>
                                            <span>Add to Cart</span>
                                        </motion.button>
                                    </div>
                                </div>
                            </div>

                            {/* Decorative Elements */}
                            <motion.div
                                className="card-glow-effect"
                                animate={{
                                    opacity: hoveredIndex === idx ? 1 : 0,
                                    scale: hoveredIndex === idx ? 1 : 0.8,
                                }}
                            />
                        </motion.div>
                    ))}
                </div>

                {/* View All Button */}
                <motion.div
                    className="view-all-container"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                >
                    <motion.button
                        className="view-all-btn"
                        onClick={() => {
                            if (typeof window !== 'undefined') {
                                window.location.href = '/shop';
                            }
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <span>View All Products</span>
                        <motion.span
                            className="arrow-icon"
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        >
                            →
                        </motion.span>
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
};
