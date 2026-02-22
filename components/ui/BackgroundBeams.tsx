'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const BackgroundBeams = () => {
    return (
        <div className="background-beams">
            <svg
                className="beams-svg"
                width="100%"
                height="100%"
                viewBox="0 0 1000 1000"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <linearGradient id="beam-gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="rgba(45, 95, 63, 0.3)" />
                        <stop offset="100%" stopColor="rgba(107, 199, 133, 0.1)" />
                    </linearGradient>
                    <linearGradient id="beam-gradient-2" x1="100%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="rgba(74, 139, 95, 0.3)" />
                        <stop offset="100%" stopColor="rgba(45, 95, 63, 0.1)" />
                    </linearGradient>
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Animated Beams */}
                <motion.path
                    d="M 0 500 Q 250 300 500 500 T 1000 500"
                    stroke="url(#beam-gradient-1)"
                    strokeWidth="2"
                    fill="none"
                    filter="url(#glow)"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.6 }}
                    transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
                />
                <motion.path
                    d="M 0 300 Q 250 500 500 300 T 1000 300"
                    stroke="url(#beam-gradient-2)"
                    strokeWidth="2"
                    fill="none"
                    filter="url(#glow)"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.6 }}
                    transition={{ duration: 2.5, repeat: Infinity, repeatType: 'reverse', delay: 0.5 }}
                />
                <motion.path
                    d="M 0 700 Q 250 500 500 700 T 1000 700"
                    stroke="url(#beam-gradient-1)"
                    strokeWidth="2"
                    fill="none"
                    filter="url(#glow)"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.6 }}
                    transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse', delay: 1 }}
                />
            </svg>

            {/* Floating Orbs */}
            {[...Array(5)].map((_, i) => (
                <motion.div
                    key={i}
                    className="floating-orb"
                    style={{
                        left: `${20 + i * 20}%`,
                        top: `${30 + (i % 2) * 40}%`,
                    }}
                    animate={{
                        y: [0, -30, 0],
                        x: [0, 15, 0],
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                        duration: 4 + i,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: i * 0.5,
                    }}
                />
            ))}
        </div>
    );
};
