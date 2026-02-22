'use client';

import React, { useEffect, useState, useCallback, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import '../styles/modern-interactive.css';

// Throttle function for performance
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

const ModernInteractive: React.FC = () => {
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);
    const [isHovering, setIsHovering] = useState(false);
    const [cursorText, setCursorText] = useState('');
    const observerRef = useRef<IntersectionObserver | null>(null);

    const springConfig = { damping: 30, stiffness: 300, mass: 0.5 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    // Throttled mouse move handler
    const moveCursor = useCallback(
        throttle((e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        }, 16), // ~60fps
        [cursorX, cursorY]
    );

    useEffect(() => {
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

        // Use event delegation for better performance
        document.body.addEventListener('mouseenter', handleMouseEnter, true);
        document.body.addEventListener('mouseleave', handleMouseLeave, true);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            document.body.removeEventListener('mouseenter', handleMouseEnter, true);
            document.body.removeEventListener('mouseleave', handleMouseLeave, true);
        };
    }, [moveCursor]);

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
        const updateScrollProgress = throttle(() => {
            const scrollPx = document.documentElement.scrollTop;
            const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (scrollPx / winHeightPx) * 100;
            setScrollProgress(scrolled);
        }, 16);

        window.addEventListener('scroll', updateScrollProgress, { passive: true });
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
                        // Stop observing once revealed for better performance
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1, rootMargin: '50px' }
        );

        // Observe all elements with reveal class
        const elements = document.querySelectorAll('.reveal-on-scroll');
        elements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return null;
};

export default React.memo(ModernInteractive);
