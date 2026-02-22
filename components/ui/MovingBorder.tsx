'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface MovingBorderProps {
    children: React.ReactNode;
    duration?: number;
    className?: string;
    borderClassName?: string;
}

export const MovingBorder = ({
    children,
    duration = 3,
    className = '',
    borderClassName = '',
}: MovingBorderProps) => {
    return (
        <div className={`moving-border-container ${className}`}>
            <motion.div
                className={`moving-border-gradient ${borderClassName}`}
                animate={{
                    rotate: 360,
                }}
                transition={{
                    duration: duration,
                    repeat: Infinity,
                    ease: 'linear',
                }}
            />
            <div className="moving-border-content">{children}</div>
        </div>
    );
};
