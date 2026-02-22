'use client';

import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import '../styles/growing-tree.css';

const GrowingTree: React.FC = () => {
    const { scrollYProgress } = useScroll();
    const [leaves, setLeaves] = useState<Array<{ id: number; x: number; delay: number }>>([]);

    // Tree growth based on scroll
    const trunkHeight = useTransform(scrollYProgress, [0, 0.3], [0, 100]);
    const branchOpacity = useTransform(scrollYProgress, [0.1, 0.25], [0, 1]);
    const leavesOpacity = useTransform(scrollYProgress, [0.2, 0.35], [0, 1]);
    const flowersOpacity = useTransform(scrollYProgress, [0.3, 0.45], [0, 1]);

    // Generate falling leaves
    useEffect(() => {
        const interval = setInterval(() => {
            setLeaves(prev => [
                ...prev.slice(-10), // Keep only last 10 leaves
                {
                    id: Date.now(),
                    x: Math.random() * 100,
                    delay: Math.random() * 2
                }
            ]);
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="growing-tree-container">
            {/* Tree Structure */}
            <motion.div className="tree-wrapper">
                {/* Trunk */}
                <motion.div
                    className="tree-trunk"
                    style={{
                        height: trunkHeight.get() > 0 ? `${trunkHeight.get()}%` : '0%',
                    }}
                >
                    <motion.div className="trunk-texture" />
                </motion.div>

                {/* Branches */}
                <motion.div
                    className="tree-branches"
                    style={{ opacity: branchOpacity }}
                >
                    {/* Left Branches */}
                    <motion.div
                        className="branch branch-left-1"
                        initial={{ scaleX: 0, opacity: 0 }}
                        animate={{ scaleX: 1, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1 }}
                    />
                    <motion.div
                        className="branch branch-left-2"
                        initial={{ scaleX: 0, opacity: 0 }}
                        animate={{ scaleX: 1, opacity: 1 }}
                        transition={{ delay: 0.7, duration: 1 }}
                    />
                    <motion.div
                        className="branch branch-left-3"
                        initial={{ scaleX: 0, opacity: 0 }}
                        animate={{ scaleX: 1, opacity: 1 }}
                        transition={{ delay: 0.9, duration: 1 }}
                    />

                    {/* Right Branches */}
                    <motion.div
                        className="branch branch-right-1"
                        initial={{ scaleX: 0, opacity: 0 }}
                        animate={{ scaleX: 1, opacity: 1 }}
                        transition={{ delay: 0.6, duration: 1 }}
                    />
                    <motion.div
                        className="branch branch-right-2"
                        initial={{ scaleX: 0, opacity: 0 }}
                        animate={{ scaleX: 1, opacity: 1 }}
                        transition={{ delay: 0.8, duration: 1 }}
                    />
                    <motion.div
                        className="branch branch-right-3"
                        initial={{ scaleX: 0, opacity: 0 }}
                        animate={{ scaleX: 1, opacity: 1 }}
                        transition={{ delay: 1, duration: 1 }}
                    />
                </motion.div>

                {/* Leaves */}
                <motion.div
                    className="tree-leaves"
                    style={{ opacity: leavesOpacity }}
                >
                    {[...Array(20)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="leaf-cluster"
                            style={{
                                left: `${20 + (i % 5) * 15}%`,
                                top: `${10 + Math.floor(i / 5) * 20}%`,
                            }}
                            animate={{
                                scale: [1, 1.1, 1],
                                rotate: [0, 5, -5, 0],
                            }}
                            transition={{
                                duration: 3 + i * 0.2,
                                repeat: Infinity,
                                delay: i * 0.1,
                            }}
                        >
                            🌿
                        </motion.div>
                    ))}
                </motion.div>

                {/* Flowers */}
                <motion.div
                    className="tree-flowers"
                    style={{ opacity: flowersOpacity }}
                >
                    {[...Array(8)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="flower"
                            style={{
                                left: `${25 + (i % 4) * 18}%`,
                                top: `${15 + Math.floor(i / 4) * 30}%`,
                            }}
                            animate={{
                                scale: [1, 1.2, 1],
                                rotate: [0, 10, -10, 0],
                            }}
                            transition={{
                                duration: 2.5 + i * 0.3,
                                repeat: Infinity,
                                delay: i * 0.2,
                            }}
                        >
                            🌸
                        </motion.div>
                    ))}
                </motion.div>

                {/* Roots */}
                <motion.div
                    className="tree-roots"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 0.6, y: 0 }}
                    transition={{ delay: 0.3, duration: 1.5 }}
                >
                    <div className="root root-1" />
                    <div className="root root-2" />
                    <div className="root root-3" />
                </motion.div>
            </motion.div>

            {/* Falling Leaves Animation */}
            {leaves.map(leaf => (
                <motion.div
                    key={leaf.id}
                    className="falling-leaf"
                    style={{ left: `${leaf.x}%` }}
                    initial={{ y: -50, opacity: 1, rotate: 0 }}
                    animate={{
                        y: window.innerHeight + 100,
                        opacity: [1, 1, 0],
                        rotate: 360,
                        x: [0, 50, -30, 20, 0],
                    }}
                    transition={{
                        duration: 8,
                        delay: leaf.delay,
                        ease: 'linear',
                    }}
                    onAnimationComplete={() => {
                        setLeaves(prev => prev.filter(l => l.id !== leaf.id));
                    }}
                >
                    🍃
                </motion.div>
            ))}

            {/* Butterflies */}
            <motion.div className="butterflies">
                {[...Array(3)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="butterfly"
                        animate={{
                            x: [0, 200, 400, 200, 0],
                            y: [0, -100, -50, -150, 0],
                        }}
                        transition={{
                            duration: 15 + i * 5,
                            repeat: Infinity,
                            delay: i * 3,
                            ease: 'easeInOut',
                        }}
                        style={{
                            left: `${20 + i * 30}%`,
                            top: `${30 + i * 15}%`,
                        }}
                    >
                        🦋
                    </motion.div>
                ))}
            </motion.div>

            {/* Birds */}
            <motion.div className="birds">
                {[...Array(2)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="bird"
                        animate={{
                            x: [-100, window.innerWidth + 100],
                            y: [0, -30, -10, -40, 0],
                        }}
                        transition={{
                            duration: 20 + i * 5,
                            repeat: Infinity,
                            delay: i * 8,
                            ease: 'linear',
                        }}
                        style={{
                            top: `${15 + i * 10}%`,
                        }}
                    >
                        🕊️
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};

export default GrowingTree;
