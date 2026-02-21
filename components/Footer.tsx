'use client';

import React from 'react';
import '../styles/footer.css';

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                {/* Footer Top */}
                <div className="footer-top">
                    <div className="footer-column">
                        <div className="footer-logo">
                            <span className="footer-logo-icon">🌿</span>
                            <span className="footer-logo-text">Online Nursery</span>
                        </div>
                        <p className="footer-description">
                            Your trusted source for premium plants, fresh flowers, and garden essentials.
                            Bringing nature to your doorstep.
                        </p>
                        <div className="footer-social">
                            <a href="#facebook" className="social-link" aria-label="Facebook">📘</a>
                            <a href="#instagram" className="social-link" aria-label="Instagram">📷</a>
                            <a href="#twitter" className="social-link" aria-label="Twitter">🐦</a>
                            <a href="#pinterest" className="social-link" aria-label="Pinterest">📌</a>
                        </div>
                    </div>

                    <div className="footer-column">
                        <h3 className="footer-title">Quick Links</h3>
                        <ul className="footer-links">
                            <li><a href="#home">Home</a></li>
                            <li><a href="#categories">Categories</a></li>
                            <li><a href="#products">Products</a></li>
                            <li><a href="#about">About Us</a></li>
                            <li><a href="#contact">Contact</a></li>
                        </ul>
                    </div>

                    <div className="footer-column">
                        <h3 className="footer-title">Categories</h3>
                        <ul className="footer-links">
                            <li><a href="/category/indoor-plants">Indoor Plants</a></li>
                            <li><a href="/category/flowering-plants">Flowering Plants</a></li>
                            <li><a href="/category/succulents">Succulents</a></li>
                            <li><a href="/category/bouquets">Bouquets</a></li>
                            <li><a href="/shop">All Products</a></li>
                        </ul>
                    </div>

                    <div className="footer-column">
                        <h3 className="footer-title">Customer Service</h3>
                        <ul className="footer-links">
                            <li><a href="#shipping">Shipping Info</a></li>
                            <li><a href="#returns">Returns & Refunds</a></li>
                            <li><a href="#faq">FAQ</a></li>
                            <li><a href="#care">Plant Care Guide</a></li>
                            <li><a href="#support">Support</a></li>
                        </ul>
                    </div>

                    <div className="footer-column">
                        <h3 className="footer-title">Contact Us</h3>
                        <ul className="footer-contact">
                            <li>
                                <span className="contact-icon">📍</span>
                                <span>123 Garden Street, Green City</span>
                            </li>
                            <li>
                                <span className="contact-icon">📞</span>
                                <span>+1 (555) 123-4567</span>
                            </li>
                            <li>
                                <span className="contact-icon">✉️</span>
                                <span>info@onlinenursery.com</span>
                            </li>
                            <li>
                                <span className="contact-icon">🕒</span>
                                <span>Mon-Sat: 9AM - 6PM</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="footer-bottom">
                    <p className="footer-copyright">
                        © {new Date().getFullYear()} Online Nursery. All rights reserved.
                    </p>
                    <div className="footer-legal">
                        <a href="#privacy">Privacy Policy</a>
                        <span className="separator">•</span>
                        <a href="#terms">Terms of Service</a>
                        <span className="separator">•</span>
                        <a href="#cookies">Cookie Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
