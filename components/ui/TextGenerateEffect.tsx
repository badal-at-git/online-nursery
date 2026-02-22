'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface TextGenerateEffectProps {
    words: string;
    className?: string;
}

export const TextGenerateEffect = ({ words, className = '' }: TextGenerateEffectProps) => {
    const [displayedText, setDisplayedText] = useState('');
    const wordsArray = words.split(' ');

    useEffect(() => {
        let currentIndex = 0;
        const interval = setInterval(() => {
            if (currentIndex < wordsArray.length) {
                setDisplayedText((prev) => prev + (prev ? ' ' : '') + wordsArray[currentIndex]);
                currentIndex++;
            } else {
                clearInterval(interval);
            }
        }, 100);

        return () => clearInterval(interval);
    }, [words]);

    return (
        <div className={`text-generate ${className}`}>
            {displayedText.split(' ').map((word, idx) => (
                <motion.span
                    key={idx}
                    initial={{ opacity: 0, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, filter: 'blur(0px)' }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="text-generate-word"
                >
                    {word}{' '}
                </motion.span>
            ))}
        </div>
    );
};
