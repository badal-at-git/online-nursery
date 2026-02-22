'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { BentoGrid, BentoGridItem } from './ui/BentoGrid';
import { TextGenerateEffect } from './ui/TextGenerateEffect';
import { BackgroundBeams } from './ui/BackgroundBeams';
import '../styles/categories-enhanced.css';

interface Category {
    id: number;
    name: string;
    image: string;
    description: string;
    slug: string;
}

interface CategoriesSectionProps {
    categories: Category[];
}

export const CategoriesSection: React.FC<CategoriesSectionProps> = ({ categories }) => {
    const router = useRouter();

    const categoryIcons: { [key: string]: string } = {
        'Indoor Plants': '🪴',
        'Flowering Plants': '🌸',
        'Succulents': '🌵',
        'Bouquets': '💐',
    };

    return (
        <section className="categories-section-enhanced">
            <BackgroundBeams />

            <div className="categories-container">
                <motion.div
                    className="section-header-enhanced"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <TextGenerateEffect
                        words="Explore Our Collections"
                        className="section-title-enhanced"
                    />
                    <motion.p
                        className="section-subtitle-enhanced"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                    >
                        Discover the perfect plants for every space and style
                    </motion.p>
                </motion.div>

                <BentoGrid className="categories-bento">
                    {categories.map((category, idx) => (
                        <BentoGridItem
                            key={category.id}
                            title={category.name}
                            description={category.description}
                            icon={categoryIcons[category.name] || '🌿'}
                            header={
                                <motion.div
                                    className="category-image-container"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <img
                                        src={category.image}
                                        alt={category.name}
                                        className="category-image-enhanced"
                                    />
                                    <div className="category-overlay-enhanced" />
                                    <motion.div
                                        className="category-hover-text"
                                        initial={{ opacity: 0, y: 20 }}
                                        whileHover={{ opacity: 1, y: 0 }}
                                    >
                                        <span>Explore Collection</span>
                                        <span className="arrow">→</span>
                                    </motion.div>
                                </motion.div>
                            }
                            className={`category-item-${idx % 4}`}
                            onClick={() => router.push(`/category/${category.slug}`)}
                        />
                    ))}
                </BentoGrid>

                {/* Stats Section */}
                <motion.div
                    className="stats-grid"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                >
                    {[
                        { number: '500+', label: 'Plant Varieties', icon: '🌱' },
                        { number: '10K+', label: 'Happy Customers', icon: '😊' },
                        { number: '98%', label: 'Satisfaction Rate', icon: '⭐' },
                        { number: '24/7', label: 'Customer Support', icon: '💬' },
                    ].map((stat, idx) => (
                        <motion.div
                            key={idx}
                            className="stat-card"
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1, duration: 0.5 }}
                            whileHover={{ y: -10, scale: 1.05 }}
                        >
                            <div className="stat-icon">{stat.icon}</div>
                            <div className="stat-number">{stat.number}</div>
                            <div className="stat-label">{stat.label}</div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};
