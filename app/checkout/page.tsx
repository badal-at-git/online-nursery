'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import '../../styles/checkout.css';

interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
    category: string;
}

export default function CheckoutPage() {
    const router = useRouter();
    const [cartItems, setCartItems] = React.useState<CartItem[]>([]);
    const [paymentMethod, setPaymentMethod] = React.useState<'card' | 'paypal' | 'cod'>('card');
    const [formData, setFormData] = React.useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        cardNumber: '',
        cardName: '',
        expiryDate: '',
        cvv: '',
        paypalEmail: '',
    });

    React.useEffect(() => {
        const savedCart = localStorage.getItem('cartItems');
        if (savedCart) {
            const items = JSON.parse(savedCart);
            if (items.length === 0) {
                router.push('/cart');
            }
            setCartItems(items);
        } else {
            router.push('/cart');
        }
    }, [router]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        let message = 'Order placed successfully! ';

        if (paymentMethod === 'card') {
            message += 'Your payment has been processed.';
        } else if (paymentMethod === 'paypal') {
            message += 'You will receive a PayPal payment link via email.';
        } else if (paymentMethod === 'cod') {
            message += 'Please keep cash ready for delivery.';
        }

        message += ' Thank you for your purchase!';

        // Clear cart
        localStorage.removeItem('cartItems');
        // Show success and redirect
        alert(message);
        router.push('/');
    };

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = subtotal * 0.1;
    const total = subtotal + tax;

    return (
        <div className="checkout-page">
            <div className="checkout-header">
                <button className="back-btn" onClick={() => router.push('/cart')}>
                    ← Back to Cart
                </button>
                <h1 className="checkout-title">Checkout</h1>
            </div>

            <div className="checkout-container">
                <form className="checkout-form" onSubmit={handleSubmit}>
                    <motion.div
                        className="form-section"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h2 className="section-title">Contact Information</h2>
                        <div className="form-row">
                            <div className="form-group">
                                <label>First Name</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Last Name</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Phone</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        className="form-section"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <h2 className="section-title">Shipping Address</h2>
                        <div className="form-group">
                            <label>Street Address</label>
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label>City</label>
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>State</label>
                                <input
                                    type="text"
                                    name="state"
                                    value={formData.state}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>ZIP Code</label>
                                <input
                                    type="text"
                                    name="zipCode"
                                    value={formData.zipCode}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        className="form-section"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <h2 className="section-title">Payment Method</h2>

                        <div className="payment-methods">
                            <div
                                className={`payment-option ${paymentMethod === 'card' ? 'active' : ''}`}
                                onClick={() => setPaymentMethod('card')}
                            >
                                <div className="payment-radio">
                                    {paymentMethod === 'card' && <div className="radio-dot" />}
                                </div>
                                <div className="payment-info">
                                    <div className="payment-icon">💳</div>
                                    <div>
                                        <p className="payment-name">Credit/Debit Card</p>
                                        <p className="payment-desc">Pay securely with your card</p>
                                    </div>
                                </div>
                            </div>

                            <div
                                className={`payment-option ${paymentMethod === 'paypal' ? 'active' : ''}`}
                                onClick={() => setPaymentMethod('paypal')}
                            >
                                <div className="payment-radio">
                                    {paymentMethod === 'paypal' && <div className="radio-dot" />}
                                </div>
                                <div className="payment-info">
                                    <div className="payment-icon">🅿️</div>
                                    <div>
                                        <p className="payment-name">PayPal</p>
                                        <p className="payment-desc">Pay with your PayPal account</p>
                                    </div>
                                </div>
                            </div>

                            <div
                                className={`payment-option ${paymentMethod === 'cod' ? 'active' : ''}`}
                                onClick={() => setPaymentMethod('cod')}
                            >
                                <div className="payment-radio">
                                    {paymentMethod === 'cod' && <div className="radio-dot" />}
                                </div>
                                <div className="payment-info">
                                    <div className="payment-icon">💵</div>
                                    <div>
                                        <p className="payment-name">Cash on Delivery</p>
                                        <p className="payment-desc">Pay when you receive</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {paymentMethod === 'card' && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="payment-details"
                            >
                                <div className="form-group">
                                    <label>Card Number</label>
                                    <input
                                        type="text"
                                        name="cardNumber"
                                        value={formData.cardNumber}
                                        onChange={handleInputChange}
                                        placeholder="1234 5678 9012 3456"
                                        maxLength={19}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Cardholder Name</label>
                                    <input
                                        type="text"
                                        name="cardName"
                                        value={formData.cardName}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Expiry Date</label>
                                        <input
                                            type="text"
                                            name="expiryDate"
                                            value={formData.expiryDate}
                                            onChange={handleInputChange}
                                            placeholder="MM/YY"
                                            maxLength={5}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>CVV</label>
                                        <input
                                            type="text"
                                            name="cvv"
                                            value={formData.cvv}
                                            onChange={handleInputChange}
                                            placeholder="123"
                                            maxLength={3}
                                            required
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {paymentMethod === 'paypal' && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="payment-details"
                            >
                                <div className="form-group">
                                    <label>PayPal Email</label>
                                    <input
                                        type="email"
                                        name="paypalEmail"
                                        value={formData.paypalEmail}
                                        onChange={handleInputChange}
                                        placeholder="your@email.com"
                                        required
                                    />
                                </div>
                                <div className="paypal-info">
                                    <p>You will be redirected to PayPal to complete your payment securely.</p>
                                </div>
                            </motion.div>
                        )}

                        {paymentMethod === 'cod' && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="payment-details"
                            >
                                <div className="cod-info">
                                    <p>💡 Pay with cash when your order is delivered to your doorstep.</p>
                                    <p>Please keep exact change ready for a smooth delivery experience.</p>
                                </div>
                            </motion.div>
                        )}
                    </motion.div>

                    <motion.button
                        type="submit"
                        className="place-order-btn"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        Place Order
                    </motion.button>
                </form>

                <motion.div
                    className="order-summary"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <h2 className="summary-title">Order Summary</h2>
                    <div className="summary-items">
                        {cartItems.map((item) => (
                            <div key={item.id} className="summary-item">
                                <img src={item.image} alt={item.name} />
                                <div className="summary-item-details">
                                    <p className="summary-item-name">{item.name}</p>
                                    <p className="summary-item-qty">Qty: {item.quantity}</p>
                                </div>
                                <p className="summary-item-price">
                                    ${(item.price * item.quantity).toFixed(2)}
                                </p>
                            </div>
                        ))}
                    </div>
                    <div className="summary-totals">
                        <div className="summary-row">
                            <span>Subtotal</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="summary-row">
                            <span>Shipping</span>
                            <span>Free</span>
                        </div>
                        <div className="summary-row">
                            <span>Tax (10%)</span>
                            <span>${tax.toFixed(2)}</span>
                        </div>
                        <div className="summary-row total">
                            <span>Total</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
