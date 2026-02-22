'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import '../../styles/cart-page.css';

interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
    category: string;
}

export default function CartPage() {
    const router = useRouter();
    const [cartItems, setCartItems] = React.useState<CartItem[]>([]);

    React.useEffect(() => {
        // Get cart items from localStorage
        const savedCart = localStorage.getItem('cartItems');
        if (savedCart) {
            setCartItems(JSON.parse(savedCart));
        }
    }, []);

    const updateQuantity = (id: number, quantity: number) => {
        const updatedItems = cartItems.map((item) =>
            item.id === id ? { ...item, quantity } : item
        );
        setCartItems(updatedItems);
        localStorage.setItem('cartItems', JSON.stringify(updatedItems));
    };

    const removeItem = (id: number) => {
        const updatedItems = cartItems.filter((item) => item.id !== id);
        setCartItems(updatedItems);
        localStorage.setItem('cartItems', JSON.stringify(updatedItems));
    };

    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="cart-page">
            <div className="cart-page-header">
                <button className="back-btn" onClick={() => router.push('/')}>
                    ← Back to Shop
                </button>
                <h1 className="cart-page-title">Shopping Cart</h1>
            </div>

            <div className="cart-page-container">
                {cartItems.length === 0 ? (
                    <motion.div
                        className="empty-cart"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="empty-icon">🛒</div>
                        <h2 className="empty-title">Your cart is empty</h2>
                        <p className="empty-text">Add some plants to get started!</p>
                        <motion.button
                            className="continue-shopping-btn"
                            onClick={() => router.push('/')}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Continue Shopping
                        </motion.button>
                    </motion.div>
                ) : (
                    <>
                        <div className="cart-items-section">
                            {cartItems.map((item, index) => (
                                <motion.div
                                    key={item.id}
                                    className="cart-page-item"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <img src={item.image} alt={item.name} className="cart-page-item-image" />
                                    <div className="cart-page-item-details">
                                        <h3 className="cart-page-item-name">{item.name}</h3>
                                        <p className="cart-page-item-category">{item.category}</p>
                                        <p className="cart-page-item-price">${item.price.toFixed(2)}</p>
                                    </div>
                                    <div className="cart-page-item-actions">
                                        <div className="quantity-controls">
                                            <button
                                                className="quantity-btn"
                                                onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                            >
                                                −
                                            </button>
                                            <span className="quantity-value">{item.quantity}</span>
                                            <button
                                                className="quantity-btn"
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            >
                                                +
                                            </button>
                                        </div>
                                        <p className="item-subtotal">${(item.price * item.quantity).toFixed(2)}</p>
                                        <button
                                            className="remove-btn"
                                            onClick={() => removeItem(item.id)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <motion.div
                            className="cart-summary"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <h2 className="summary-title">Order Summary</h2>
                            <div className="summary-row">
                                <span>Subtotal</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                            <div className="summary-row">
                                <span>Shipping</span>
                                <span>Free</span>
                            </div>
                            <div className="summary-row total">
                                <span>Total</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                            <motion.button
                                className="checkout-btn"
                                onClick={() => router.push('/checkout')}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                Proceed to Checkout
                            </motion.button>
                            <button
                                className="continue-shopping-link"
                                onClick={() => router.push('/')}
                            >
                                Continue Shopping
                            </button>
                        </motion.div>
                    </>
                )}
            </div>
        </div>
    );
}
