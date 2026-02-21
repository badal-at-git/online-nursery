'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/header.css';

interface HeaderProps {
    onCartClick: () => void;
    cartItemCount: number;
}

const Header: React.FC<HeaderProps> = ({ onCartClick, cartItemCount }) => {
    const [isSignInOpen, setIsSignInOpen] = useState(false);
    const [isSignUpOpen, setIsSignUpOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleSignIn = (e: React.FormEvent) => {
        e.preventDefault();
        // Add your sign-in logic here
        console.log('Sign in submitted');
        setIsSignInOpen(false);
    };

    const handleSignUp = (e: React.FormEvent) => {
        e.preventDefault();
        // Add your sign-up logic here
        console.log('Sign up submitted');
        setIsSignUpOpen(false);
    };

    return (
        <>
            <header className="header">
                <div className="header-container">
                    {/* Logo */}
                    <div className="logo">
                        <span className="logo-icon">🌿</span>
                        <span className="logo-text">Bloom & Grow</span>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="nav-desktop">
                        <a href="#home" className="nav-link">Home</a>
                        <a href="#categories" className="nav-link">Categories</a>
                        <a href="#products" className="nav-link">Products</a>
                        <a href="#about" className="nav-link">About</a>
                        <a href="#contact" className="nav-link">Contact</a>
                    </nav>

                    {/* Actions */}
                    <div className="header-actions">
                        <button className="search-btn" aria-label="Search">
                            🔍
                        </button>
                        <button
                            className="auth-btn"
                            onClick={() => setIsSignInOpen(true)}
                        >
                            Sign In
                        </button>
                        <button
                            className="auth-btn signup"
                            onClick={() => setIsSignUpOpen(true)}
                        >
                            Sign Up
                        </button>
                        <button
                            className="cart-btn"
                            onClick={onCartClick}
                            aria-label="Shopping cart"
                        >
                            🛒
                            {cartItemCount > 0 && (
                                <span className="cart-count">{cartItemCount}</span>
                            )}
                        </button>
                        <button
                            className="menu-toggle"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? '✕' : '☰'}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.nav
                            className="nav-mobile"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <a href="#home" className="nav-link-mobile" onClick={() => setIsMenuOpen(false)}>
                                Home
                            </a>
                            <a href="#categories" className="nav-link-mobile" onClick={() => setIsMenuOpen(false)}>
                                Categories
                            </a>
                            <a href="#products" className="nav-link-mobile" onClick={() => setIsMenuOpen(false)}>
                                Products
                            </a>
                            <a href="#about" className="nav-link-mobile" onClick={() => setIsMenuOpen(false)}>
                                About
                            </a>
                            <a href="#contact" className="nav-link-mobile" onClick={() => setIsMenuOpen(false)}>
                                Contact
                            </a>
                        </motion.nav>
                    )}
                </AnimatePresence>
            </header>

            {/* Sign In Modal */}
            <AnimatePresence>
                {isSignInOpen && (
                    <motion.div
                        className="modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsSignInOpen(false)}
                    >
                        <motion.div
                            className="modal"
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                className="modal-close"
                                onClick={() => setIsSignInOpen(false)}
                                aria-label="Close"
                            >
                                ✕
                            </button>
                            <h2 className="modal-title">Welcome Back</h2>
                            <p className="modal-subtitle">Sign in to your account</p>
                            <form onSubmit={handleSignIn} className="auth-form">
                                <div className="form-group">
                                    <label htmlFor="signin-email" className="form-label">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="signin-email"
                                        className="form-input"
                                        placeholder="your@email.com"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="signin-password" className="form-label">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        id="signin-password"
                                        className="form-input"
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>
                                <div className="form-footer">
                                    <label className="checkbox-label">
                                        <input type="checkbox" className="checkbox" />
                                        <span>Remember me</span>
                                    </label>
                                    <a href="#forgot" className="forgot-link">
                                        Forgot password?
                                    </a>
                                </div>
                                <motion.button
                                    type="submit"
                                    className="submit-btn"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    Sign In
                                </motion.button>
                                <p className="switch-auth">
                                    Don't have an account?{' '}
                                    <button
                                        type="button"
                                        className="switch-link"
                                        onClick={() => {
                                            setIsSignInOpen(false);
                                            setIsSignUpOpen(true);
                                        }}
                                    >
                                        Sign Up
                                    </button>
                                </p>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Sign Up Modal */}
            <AnimatePresence>
                {isSignUpOpen && (
                    <motion.div
                        className="modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsSignUpOpen(false)}
                    >
                        <motion.div
                            className="modal"
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                className="modal-close"
                                onClick={() => setIsSignUpOpen(false)}
                                aria-label="Close"
                            >
                                ✕
                            </button>
                            <h2 className="modal-title">Join Us</h2>
                            <p className="modal-subtitle">Create your account</p>
                            <form onSubmit={handleSignUp} className="auth-form">
                                <div className="form-group">
                                    <label htmlFor="signup-name" className="form-label">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        id="signup-name"
                                        className="form-input"
                                        placeholder="John Doe"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="signup-email" className="form-label">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="signup-email"
                                        className="form-input"
                                        placeholder="your@email.com"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="signup-password" className="form-label">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        id="signup-password"
                                        className="form-input"
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="signup-confirm" className="form-label">
                                        Confirm Password
                                    </label>
                                    <input
                                        type="password"
                                        id="signup-confirm"
                                        className="form-input"
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>
                                <label className="checkbox-label">
                                    <input type="checkbox" className="checkbox" required />
                                    <span>I agree to the Terms & Conditions</span>
                                </label>
                                <motion.button
                                    type="submit"
                                    className="submit-btn"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    Sign Up
                                </motion.button>
                                <p className="switch-auth">
                                    Already have an account?{' '}
                                    <button
                                        type="button"
                                        className="switch-link"
                                        onClick={() => {
                                            setIsSignUpOpen(false);
                                            setIsSignInOpen(true);
                                        }}
                                    >
                                        Sign In
                                    </button>
                                </p>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Header;
