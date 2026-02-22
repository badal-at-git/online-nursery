'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxScrollProps {
    images: string[];
    className?: string;
}

export const ParallaxScroll = ({ images, className = '' }: ParallaxScrollProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start end', 'end start'],
    });

    const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const y3 = useTransform(scrollYProgress, [0, 1], [0, -300]);

    const getYTransform = (index: number) => {
        const transforms = [y1, y2, y3];
        return transforms[index % 3];
    };

    return (
        <div ref={containerRef} className={`parallax-scroll ${className}`}>
            <div className="parallax-grid">
                {images.map((image, idx) => (
                    <motion.div
                        key={idx}
                        className="parallax-item"
                        style={{ y: getYTransform(idx) }}
                        whileHover={{ scale: 1.05, zIndex: 10 }}
                        transition={{ duration: 0.3 }}
                    >
                        <img src={image} alt={`Parallax ${idx}`} />
                        <div className="parallax-overlay" />
                    </motion.div>
                ))}
            </div>
        </div>
    );
};
