'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
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

    const slides = useMemo(() => [
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
    ], []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 6000);
        return () => clearInterval(interval);
    }, [slides.length]);

    const handleShopClick = useCallback(() => {
        router.push('/shop');
    }, [router]);

    const handleLearnClick = useCallback(() => {
        document.querySelector('.floating-products-section')?.scrollIntoView({
            behavior: 'smooth'
        });
    }, []);

    return (
        <motion.section
            className="hero-enhanced"
            style={{ opacity }}
        >
            {/* Video Backgrounds - Only load current slide */}
            <div className="hero-videos-container">
                <motion.div
                    className="hero-video-slide active"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5 }}
                >
                    <motion.div
                        className="hero-video-bg"
                        style={{ y }}
                    >
                        <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="hero-video"
                            key={slides[currentSlide].video}
                        >
                            <source src={slides[currentSlide].video} type="video/mp4" />
                        </video>
                        <div className="hero-video-overlay" />
                    </motion.div>
                </motion.div>
            </div>

            {/* Reduced Grid - 10 instead of 20 */}
            <div className="hero-grid-overlay">
                {[...Array(10)].map((_, i) => (
                    <div
                        key={i}
                        className="grid-line"
                        style={{
                            transform: `translateX(${mousePosition.x * (i % 2 === 0 ? 10 : -10)}px)`,
                            transition: 'transform 0.3s ease-out'
                        }}
                    />
                ))}
            </div>

            {/* Reduced Blobs - 4 instead of 8 */}
            <div className="morphing-blobs">
                {[...Array(4)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="blob"
                        style={{
                            left: `${15 + i * 25}%`,
                            top: `${30 + (i % 2) * 30}%`,
                            x: mousePosition.x * (60 + i * 15),
                            y: mousePosition.y * (60 + i * 15),
                        }}
                        animate={{
                            scale: [1, 1.3, 1],
                            rotate: [0, 180, 360],
                        }}
                        transition={{
                            duration: 20 + i * 3,
                            repeat: Infinity,
                            ease: 'linear',
                        }}
                    />
                ))}
            </div>

            {/* Reduced Shapes - 8 instead of 15 */}
            <div className="geometric-shapes">
                {[...Array(8)].map((_, i) => (
                    <motion.div
                        key={i}
                        className={`shape shape-${i % 4}`}
                        style={{
                            left: `${10 + i * 11}%`,
                            top: `${15 + (i % 3) * 30}%`,
                            x: mousePosition.x * (40 + i * 10),
                            y: mousePosition.y * (40 + i * 10),
                        }}
                        animate={{
                            rotate: [0, 360],
                        }}
                        transition={{
                            duration: 25 - i * 2,
                            repeat: Infinity,
                            ease: 'linear',
                        }}
                    />
                ))}
            </div>

            {/* Reduced Dots - 20 instead of 40 */}
            <div className="glowing-dots">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="dot"
                        style={{
                            left: `${(i * 10) % 100}%`,
                            top: `${Math.floor(i / 10) * 40 + 20}%`,
                        }}
                        animate={{
                            opacity: [0.3, 0.8, 0.3],
                            scale: [1, 1.2, 1],
                        }}
                        transition={{
                            duration: 4 + (i % 5),
                            repeat: Infinity,
                            ease: 'easeInOut',
                            delay: i * 0.2,
                        }}
                    />
                ))}
            </div>

            {/* Hero Content */}
            <div className="hero-content-enhanced">
                <div className="slide-content">
                    <div className="hero-badge">
                        <span className="badge-icon">🌿</span>
                        <span>Premium Quality</span>
                    </div>

                    <h1 className="hero-title-new">
                        <span className="title-main">{slides[currentSlide].title}</span>
                        <span
                            className="title-accent"
                            style={{ color: slides[currentSlide].color }}
                        >
                            {slides[currentSlide].subtitle}
                        </span>
                    </h1>

                    <p className="hero-description-new">
                        {slides[currentSlide].description}
                    </p>

                    <div className="hero-actions">
                        <button
                            className="hero-cta-primary magnetic-btn ripple-effect"
                            data-cursor="Shop"
                            onClick={handleShopClick}
                        >
                            <span>Shop Now</span>
                            <span className="cta-arrow">→</span>
                        </button>

                        <button
                            className="hero-cta-secondary magnetic-btn"
                            data-cursor="Learn"
                            onClick={handleLearnClick}
                        >
                            <span>Learn More</span>
                        </button>
                    </div>
                </div>

                {/* Stats */}
                <div className="hero-stats">
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
                </div>
            </div>

            {/* Navigation Dots */}
            <div className="hero-navigation">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        className={`nav-dot ${index === currentSlide ? 'active' : ''}`}
                        onClick={() => setCurrentSlide(index)}
                    >
                        <span className="dot-inner" />
                    </button>
                ))}
            </div>
        </motion.section>
    );
};

export default React.memo(EnhancedHero);
