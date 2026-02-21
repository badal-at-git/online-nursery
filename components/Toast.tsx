'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/toast.css';

interface ToastProps {
    message: string;
    isVisible: boolean;
    onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, isVisible, onClose }) => {
    React.useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                onClose();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [isVisible, onClose]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="toast"
                    initial={{ opacity: 0, y: -100, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -100, scale: 0.8 }}
                    transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                >
                    <div className="toast-icon">✓</div>
                    <div className="toast-content">
                        <p className="toast-message">{message}</p>
                    </div>
                    <button className="toast-close" onClick={onClose}>
                        ✕
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Toast;
