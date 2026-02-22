'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import '../styles/seasonal-effects.css';

const SeasonalEffects: React.FC = () => {
    const [raindrops, setRaindrops] = useState<Array<{ id: number; x: number; delay: number }>>([]);
    const [showRain, setShowRain] = useState(false);

    // Generate raindrops occasionally
    useEffect(() => {
        const rainInterval = setInterval(() => {
            // Random chance to start/stop rain
            if (Math.random() > 0.7) {
                setShowRain(prev => !prev);
            }
        }, 30000); // Check every 30 seconds

        return () => clearInterval(rainInterval);
    }, []);

    useEffect(() => {
        if (showRain) {
            const drops = Array.from({ length: 50 }, (_, i) => ({
                id: i,
                x: Math.random() * 100,
                delay: Math.random() * 2,
            }));
            setRaindrops(drops);
        } else {
            setRaindrops([]);
        }
    }, [showRain]);

    return (
        <>
            {/* Floating Seeds/Pollen */}
            <div className="pollen-container">
                {[...Array(15)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="pollen"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            x: [0, 100, -50, 100, 0],
                            y: [0, -80, -40, -120, 0],
                            rotate: [0, 360, 180, 360, 0],
                            opacity: [0.4, 0.8, 0.6, 0.9, 0.4],
                        }}
                        transition={{
                            duration: 20 + i * 2,
                            repeat: Infinity,
                            delay: i * 0.5,
                            ease: 'easeInOut',
                        }}
                    >
                        ✿
                    </motion.div>
                ))}
            </div>

            {/* Rain Effect */}
            {showRain && (
                <div className="rain-container">
                    {raindrops.map(drop => (
                        <motion.div
                            key={drop.id}
                            className="raindrop"
                            style={{ left: `${drop.x}%` }}
                            initial={{ y: -50, opacity: 0.7 }}
                            animate={{ y: window.innerHeight + 50, opacity: 0 }}
                            transition={{
                                duration: 1.5,
                                delay: drop.delay,
                                repeat: Infinity,
                                ease: 'linear',
                            }}
                        />
                    ))}
                </div>
            )}

            {/* Fireflies at Night */}
            <div className="fireflies-container">
                {[...Array(8)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="firefly"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            x: [0, 150, -100, 80, 0],
                            y: [0, -120, -60, -150, 0],
                            opacity: [0, 1, 0.5, 1, 0],
                            scale: [0.8, 1.2, 1, 1.3, 0.8],
                        }}
                        transition={{
                            duration: 8 + i * 2,
                            repeat: Infinity,
                            delay: i * 1.5,
                            ease: 'easeInOut',
                        }}
                    />
                ))}
            </div>

            {/* Floating Petals */}
            <div className="petals-container">
                {[...Array(12)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="petal"
                        style={{
                            left: `${Math.random() * 100}%`,
                        }}
                        initial={{ y: -100, rotate: 0, opacity: 1 }}
                        animate={{
                            y: window.innerHeight + 100,
                            rotate: 720,
                            x: [0, 50, -30, 40, 0],
                            opacity: [1, 0.8, 0.6, 0.4, 0],
                        }}
                        transition={{
                            duration: 12 + i * 2,
                            repeat: Infinity,
                            delay: i * 2,
                            ease: 'easeInOut',
                        }}
                    >
                        🌸
                    </motion.div>
                ))}
            </div>

            {/* Dewdrops on Leaves */}
            <div className="dewdrops-container">
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="dewdrop"
                        style={{
                            left: `${15 + i * 15}%`,
                            top: `${20 + (i % 3) * 25}%`,
                        }}
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.6, 1, 0.6],
                        }}
                        transition={{
                            duration: 3 + i * 0.5,
                            repeat: Infinity,
                            delay: i * 0.3,
                        }}
                    >
                        💧
                    </motion.div>
                ))}
            </div>
        </>
    );
};

export default SeasonalEffects;
