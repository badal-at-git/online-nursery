'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import '../styles/modern-interactive.css';

const ModernInteractive: React.FC = () => {
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);
    const [isHovering, setIsHovering] = useState(false);
    const [cursorText, setCursorText] = useState('');

    const springConfig = { damping: 25, stiffness: 200 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        const handleMouseEnter = (e: Event) => {
            const target = e.target as HTMLElement;
            if (target.classList.contains('magnetic-btn') ||
                target.classList.contains('product-card-3d') ||
                target.classList.contains('category-card-3d')) {
                setIsHovering(true);
                setCursorText(target.getAttribute('data-cursor') || '');
            }
        };

        const handleMouseLeave = () => {
            setIsHovering(false);
            setCursorText('');
        };

        window.addEventListener('mousemove', moveCursor);

        // Add listeners to interactive elements
        document.querySelectorAll('.magnetic-btn, .product-card-3d, .category-card-3d').forEach(el => {
            el.addEventListener('mouseenter', handleMouseEnter);
            el.addEventListener('mouseleave', handleMouseLeave);
        });

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            document.querySelectorAll('.magnetic-btn, .product-card-3d, .category-card-3d').forEach(el => {
                el.removeEventListener('mouseenter', handleMouseEnter);
                el.removeEventListener('mouseleave', handleMouseLeave);
            });
        };
    }, [cursorX, cursorY]);

    return (
        <>
            {/* Custom Cursor */}
            <motion.div
                className="custom-cursor"
                style={{
                    translateX: cursorXSpring,
                    translateY: cursorYSpring,
                }}
            >
                <motion.div
                    className="cursor-dot"
                    animate={{
                        scale: isHovering ? 3 : 1,
                        opacity: isHovering ? 0.3 : 1,
                    }}
                    transition={{ duration: 0.2 }}
                />
                {cursorText && (
                    <motion.div
                        className="cursor-text"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                    >
                        {cursorText}
                    </motion.div>
                )}
            </motion.div>

            {/* Smooth Scroll Progress Bar */}
            <ScrollProgress />

            {/* Reveal Animations on Scroll */}
            <RevealOnScroll />
        </>
    );
};

const ScrollProgress: React.FC = () => {
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const updateScrollProgress = () => {
            const scrollPx = document.documentElement.scrollTop;
            const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (scrollPx / winHeightPx) * 100;
            setScrollProgress(scrolled);
        };

        window.addEventListener('scroll', updateScrollProgress);
        return () => window.removeEventListener('scroll', updateScrollProgress);
    }, []);

    return (
        <motion.div
            className="scroll-progress-bar"
            style={{ width: `${scrollProgress}%` }}
        />
    );
};

const RevealOnScroll: React.FC = () => {
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('revealed');
                    }
                });
            },
            { threshold: 0.1 }
        );

        // Observe all elements with reveal class
        document.querySelectorAll('.reveal-on-scroll').forEach((el) => {
            observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    return null;
};

export default ModernInteractive;
