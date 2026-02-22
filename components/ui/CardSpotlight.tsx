'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface CardSpotlightProps {
    children: React.ReactNode;
    className?: string;
}

export const CardSpotlight = ({ children, className = '' }: CardSpotlightProps) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        setMousePosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    return (
        <motion.div
            ref={cardRef}
            className={`card-spotlight ${className}`}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
        >
            {isHovered && (
                <motion.div
                    className="spotlight-effect"
                    style={{
                        left: mousePosition.x,
                        top: mousePosition.y,
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                />
            )}
            <div className="card-spotlight-content">{children}</div>
        </motion.div>
    );
};
