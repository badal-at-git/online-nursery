'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface BentoGridProps {
    children: React.ReactNode;
    className?: string;
}

interface BentoGridItemProps {
    title: string;
    description: string;
    header?: React.ReactNode;
    icon?: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

export const BentoGrid = ({ children, className = '' }: BentoGridProps) => {
    return (
        <div className={`bento-grid ${className}`}>
            {children}
        </div>
    );
};

export const BentoGridItem = ({
    title,
    description,
    header,
    icon,
    className = '',
    onClick,
}: BentoGridItemProps) => {
    return (
        <motion.div
            className={`bento-grid-item ${className}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -8, scale: 1.02 }}
            onClick={onClick}
        >
            {header && <div className="bento-header">{header}</div>}
            <div className="bento-content">
                {icon && <div className="bento-icon">{icon}</div>}
                <h3 className="bento-title">{title}</h3>
                <p className="bento-description">{description}</p>
            </div>
            <div className="bento-glow" />
        </motion.div>
    );
};
