'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import '../styles/particle-system.css';

interface Particle {
    id: number;
    x: number;
    y: number;
    size: number;
    duration: number;
    delay: number;
}

const ParticleSystem: React.FC = () => {
    const [particles, setParticles] = useState<Particle[]>([]);
    const [cursorTrail, setCursorTrail] = useState<Array<{ id: number; x: number; y: number }>>([]);

    // Generate floating particles
    useEffect(() => {
        const newParticles: Particle[] = Array.from({ length: 30 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 8 + 4,
            duration: Math.random() * 10 + 15,
            delay: Math.random() * 5,
        }));
        setParticles(newParticles);
    }, []);

    // Cursor trail effect
    useEffect(() => {
        let trailId = 0;
        const handleMouseMove = (e: MouseEvent) => {
            const newTrail = {
                id: trailId++,
                x: e.clientX,
                y: e.clientY,
            };

            setCursorTrail(prev => [...prev.slice(-15), newTrail]);

            // Remove old trails
            setTimeout(() => {
                setCursorTrail(prev => prev.filter(t => t.id !== newTrail.id));
            }, 1000);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <>
            {/* Floating Particles */}
            <div className="particle-system">
                {particles.map(particle => (
                    <motion.div
                        key={particle.id}
                        className="floating-particle"
                        style={{
                            left: `${particle.x}%`,
                            top: `${particle.y}%`,
                            width: particle.size,
                            height: particle.size,
                        }}
                        animate={{
                            y: [-50, 50, -50],
                            x: [-30, 30, -30],
                            opacity: [0.3, 0.8, 0.3],
                            scale: [1, 1.5, 1],
                        }}
                        transition={{
                            duration: particle.duration,
                            repeat: Infinity,
                            delay: particle.delay,
                            ease: 'easeInOut',
                        }}
                    />
                ))}
            </div>

            {/* Cursor Trail */}
            <div className="cursor-trail-container">
                {cursorTrail.map((trail, index) => (
                    <motion.div
                        key={trail.id}
                        className="cursor-trail"
                        style={{
                            left: trail.x,
                            top: trail.y,
                        }}
                        initial={{ scale: 1, opacity: 0.6 }}
                        animate={{ scale: 0, opacity: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <div className="trail-leaf">🌱</div>
                    </motion.div>
                ))}
            </div>

            {/* Sparkles on Scroll */}
            <SparkleEffect />
        </>
    );
};

const SparkleEffect: React.FC = () => {
    const [sparkles, setSparkles] = useState<Array<{ id: number; x: number; y: number }>>([]);

    useEffect(() => {
        let sparkleId = 0;
        const handleScroll = () => {
            // Create sparkles randomly while scrolling
            if (Math.random() > 0.7) {
                const newSparkle = {
                    id: sparkleId++,
                    x: Math.random() * window.innerWidth,
                    y: window.scrollY + Math.random() * window.innerHeight,
                };

                setSparkles(prev => [...prev.slice(-20), newSparkle]);

                setTimeout(() => {
                    setSparkles(prev => prev.filter(s => s.id !== newSparkle.id));
                }, 2000);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="sparkle-container">
            {sparkles.map(sparkle => (
                <motion.div
                    key={sparkle.id}
                    className="sparkle"
                    style={{
                        left: sparkle.x,
                        top: sparkle.y,
                    }}
                    initial={{ scale: 0, rotate: 0, opacity: 1 }}
                    animate={{ scale: [0, 1.5, 0], rotate: 360, opacity: [1, 1, 0] }}
                    transition={{ duration: 2 }}
                >
                    ✨
                </motion.div>
            ))}
        </div>
    );
};

export default ParticleSystem;
