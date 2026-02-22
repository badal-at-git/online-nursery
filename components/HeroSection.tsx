'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRouter } from 'next/navigation';
import '../styles/hero-enhanced.css';

interface HeroSlide {
    id: number;
    title: string;
    subtitle: string;
    videoUrl: string;
    overlayColor: string;
}

const HeroSection: React.FC = () => {
    const router = useRouter();
    const [currentSlide, setCurrentSlide] = useState(0);
    const heroRef = useRef<HTMLDivElement>(null);
    const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ['start start', 'end start'],
    });

    // Smooth scroll animations
    const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

    const smoothY = useSpring(y, { stiffness: 100, damping: 30 });
    const smoothScale = useSpring(scale, { stiffness: 100, damping: 30 });

    const heroSlides: HeroSlide[] = [
        {
            id: 1,
            title: 'Bloom Your Space',
            subtitle: 'Curated collection of rare & exotic plants',
            videoUrl: 'https://cdn.pixabay.com/video/2023/05/02/160827-822871142_large.mp4',
            overlayColor: 'rgba(45, 95, 63, 0.4)',
        },
        {
            id: 2,
            title: 'Fresh Flowers Daily',
            subtitle: 'Hand-picked arrangements delivered to your door',
            videoUrl: 'https://cdn.pixabay.com/video/2022/11/29/141358-777396258_large.mp4',
            overlayColor: 'rgba(139, 69, 19, 0.4)',
        },
        {
            id: 3,
            title: 'Garden Essentials',
            subtitle: 'Everything you need to nurture your green sanctuary',
            videoUrl: 'https://cdn.pixabay.com/video/2021/08/04/84443-583607166_large.mp4',
            overlayColor: 'rgba(34, 139, 34, 0.4)',
        },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        }, 8000);

        return () => clearInterval(interval);
    }, [heroSlides.length]);

    useEffect(() => {
        // Play current video and pause others
        videoRefs.current.forEach((video, index) => {
            if (video) {
                if (index === currentSlide) {
                    video.play().catch(err => console.log('Video play error:', err));
                } else {
                    video.pause();
                }
            }
        });
    }, [currentSlide]);

    const handleDotClick = (index: number) => {
        setCurrentSlide(index);
    };

    return (
        <div ref={heroRef} className="hero-section-enhanced">
            {/* Video Backgrounds */}
            <motion.div
                className="hero-video-container"
                style={{ y: smoothY, scale: smoothScale }}
            >
                {heroSlides.map((slide, index) => (
                    <div
                        key={slide.id}
                        className={`hero-video-slide ${index === currentSlide ? 'active' : ''}`}
                    >
                        <video
                            ref={(el) => (videoRefs.current[index] = el)}
                            className="hero-video"
                            loop
                            muted
                            playsInline
                            preload="auto"
                        >
                            <source src={slide.videoUrl} type="video/mp4" />
                        </video>
                        <div
                            className="hero-video-overlay"
                            style={{ background: slide.overlayColor }}
                        />
                    </div>
                ))}
            </motion.div>

            {/* Animated Gradient Overlay */}
            <div className="hero-gradient-overlay" />

            {/* Floating Particles */}
            <div className="hero-particles">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="particle"
                        initial={{
                            x: Math.random() * window.innerWidth,
                            y: Math.random() * window.innerHeight,
                            scale: Math.random() * 0.5 + 0.5,
                        }}
                        animate={{
                            y: [null, Math.random() * -200 - 100],
                            x: [null, Math.random() * 100 - 50],
                            opacity: [0, 1, 0],
                        }}
                        transition={{
                            duration: Math.random() * 3 + 4,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                            ease: 'easeInOut',
                        }}
                    />
                ))}
            </div>

            {/* Content */}
            <motion.div
                className="hero-content-enhanced"
                style={{ opacity }}
            >
                <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                >
                    <motion.p
                        className="hero-subtitle-enhanced"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                    >
                        {heroSlides[currentSlide].subtitle}
                    </motion.p>

                    <motion.h1
                        className="hero-title-enhanced"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                    >
                        {heroSlides[currentSlide].title}
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                    >
                        <motion.button
                            className="hero-cta-enhanced"
                            onClick={() => router.push('/shop')}
                            whileHover={{ scale: 1.05, y: -5 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span>Explore Collection</span>
                            <motion.span
                                className="cta-arrow"
                                animate={{ x: [0, 5, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            >
                                →
                            </motion.span>
                        </motion.button>
                    </motion.div>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    className="scroll-indicator"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    style={{ opacity: useTransform(scrollYProgress, [0, 0.2], [1, 0]) }}
                >
                    <motion.div
                        className="scroll-mouse"
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    >
                        <div className="scroll-wheel" />
                    </motion.div>
                    <p>Scroll to explore</p>
                </motion.div>
            </motion.div>

            {/* Navigation Dots */}
            <motion.div
                className="hero-nav-enhanced"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
            >
                {heroSlides.map((slide, index) => (
                    <motion.button
                        key={slide.id}
                        className={`hero-dot-enhanced ${index === currentSlide ? 'active' : ''}`}
                        onClick={() => handleDotClick(index)}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <span className="dot-inner" />
                    </motion.button>
                ))}
            </motion.div>

            {/* Decorative Elements */}
            <div className="hero-decorative">
                <motion.div
                    className="deco-circle deco-1"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                />
                <motion.div
                    className="deco-circle deco-2"
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.2, 0.5, 0.2],
                    }}
                    transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                />
            </div>
        </div>
    );
};

export default HeroSection;
