'use client';

import React, { useState, useEffect } from 'react';
import { motion, useTransform } from 'framer-motion';
import { useRouter } from 'next/navigation';
import '../styles/hero-enhanced.css';

interface HeroSectionProps {
    mousePosition: { x: number; y: number };
    scrollProgress: any;
}

const EnhancedHero: React.FC<HeroSectionProps> = ({ mousePosition, scrollProgress }) => {
    const router = useRouter();
    const [currentSlide, setCurrentSlide] = useState(0);
    const y = useTransform(scrollProgress, [0, 1], ['0%', '30%']);
    const opacity = useTransform(scrollProgress, [0, 0.3], [1, 0]);
    const scale = useTransform(scrollProgress, [0, 0.5], [1, 1.1]);

    const slides = [
        {
            video: 'https://cdn.pixabay.com/video/2023/05/02/160827-822871142_large.mp4',
            title: 'Transform Your Space',
            subtitle: 'With Nature\'s Finest',
            description: 'Discover premium plants that bring life to every corner',
            color: '#2d5f3f',
        },
        {
            video: 'https://cdn.pixabay.com/video/2022/11/29/141358-777396258_large.mp4',
            title: 'Breathe Fresh Air',
            subtitle: 'Live Better',
            description: 'Air-purifying plants delivered to your doorstep',
            color: '#4a8b5f',
        },
        {
            video: 'https://cdn.pixabay.com/video/2021/08/04/84443-583607166_large.mp4',
            title: 'Grow Your Garden',
            subtitle: 'Nurture Life',
            description: 'Expert care guides with every purchase',
            color: '#6bc785',
        },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 6000);
        return () => clearInterval(interval);
    }, []);

    return (
        <motion.section
            className="hero-enhanced"
            style={{ opacity }}
        >
            {/* Video Backgrounds */}
            <div className="hero-videos-container">
                {slides.map((slide, index) => (
                    <motion.div
                        key={index}
                        className={`hero-video-slide ${index === currentSlide ? 'active' : ''}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: index === currentSlide ? 1 : 0 }}
                        transition={{ duration: 1.5 }}
                    >
                        <motion.div
                            className="hero-video-bg"
                            style={{ y, scale }}
                        >
                            <video
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="hero-video"
                                key={slide.video}
                            >
                                <source src={slide.video} type="video/mp4" />
                            </video>
                            <div className="hero-video-overlay" />
                        </motion.div>
                    </motion.div>
                ))}
            </div>

            {/* Animated Grid */}
            <div className="hero-grid-overlay">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="grid-line"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 2, delay: i * 0.05 }}
                    />
                ))}
            </div>

            {/* Floating Orbs */}
            <div className="floating-orbs">
                {[...Array(8)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="orb"
                        style={{
                            left: `${10 + i * 12}%`,
                            top: `${20 + (i % 3) * 25}%`,
                        }}
                        animate={{
                            y: [0, -50, 0],
                            x: [0, 25, 0],
                            scale: [1, 1.3, 1],
                            opacity: [0.3, 0.7, 0.3],
                        }}
                        transition={{
                            duration: 8 + i * 2,
                            repeat: Infinity,
                            ease: 'easeInOut',
                            delay: i * 0.5,
                        }}
                    />
                ))}
            </div>

            {/* Hero Content */}
            <motion.div
                className="hero-content-enhanced"
            >
                {/* Slide Content */}
                {slides.map((slide, index) => (
                    <motion.div
                        key={index}
                        className="slide-content"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{
                            opacity: index === currentSlide ? 1 : 0,
                            y: index === currentSlide ? 0 : 50,
                            display: index === currentSlide ? 'block' : 'none',
                        }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                    >
                        <motion.div
                            className="hero-badge"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            <span className="badge-icon">🌿</span>
                            <span>Premium Quality</span>
                        </motion.div>

                        <motion.h1
                            className="hero-title-new"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                        >
                            <span className="title-main">{slide.title}</span>
                            <span
                                className="title-accent"
                                style={{ color: slide.color }}
                            >
                                {slide.subtitle}
                            </span>
                        </motion.h1>

                        <motion.p
                            className="hero-description-new"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7, duration: 0.8 }}
                        >
                            {slide.description}
                        </motion.p>

                        <motion.div
                            className="hero-actions"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.9, duration: 0.8 }}
                        >
                            <motion.button
                                className="hero-cta-primary magnetic-btn ripple-effect"
                                data-cursor="Shop"
                                onClick={() => router.push('/shop')}
                                whileHover={{ scale: 1.05, y: -3 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <span>Shop Now</span>
                                <motion.span
                                    className="cta-arrow"
                                    animate={{ x: [0, 5, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                >
                                    →
                                </motion.span>
                            </motion.button>

                            <motion.button
                                className="hero-cta-secondary magnetic-btn"
                                data-cursor="Learn"
                                onClick={() => {
                                    document.querySelector('.floating-products-section')?.scrollIntoView({
                                        behavior: 'smooth'
                                    });
                                }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <span>Learn More</span>
                            </motion.button>
                        </motion.div>
                    </motion.div>
                ))}

                {/* Stats */}
                <motion.div
                    className="hero-stats"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                >
                    <div className="stat-item">
                        <span className="stat-number">500+</span>
                        <span className="stat-label">Plant Varieties</span>
                    </div>
                    <div className="stat-divider" />
                    <div className="stat-item">
                        <span className="stat-number">10K+</span>
                        <span className="stat-label">Happy Customers</span>
                    </div>
                    <div className="stat-divider" />
                    <div className="stat-item">
                        <span className="stat-number">98%</span>
                        <span className="stat-label">Satisfaction</span>
                    </div>
                </motion.div>
            </motion.div>

            {/* Navigation Dots */}
            <motion.div
                className="hero-navigation"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
            >
                {slides.map((_, index) => (
                    <motion.button
                        key={index}
                        className={`nav-dot ${index === currentSlide ? 'active' : ''}`}
                        onClick={() => setCurrentSlide(index)}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <span className="dot-inner" />
                    </motion.button>
                ))}
            </motion.div>
        </motion.section>
    );
};

export default EnhancedHero;
