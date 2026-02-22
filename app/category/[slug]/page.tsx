'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useRouter, useParams } from 'next/navigation';
import '../../../styles/category-page.css';

interface Product {
    id: number;
    name: string;
    price: number;
    category: string;
    image: string;
    images?: string[];
    description: string;
}

export default function CategoryPage() {
    const router = useRouter();
    const params = useParams();
    const slug = params.slug as string;
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const scrollPosition = useRef(0);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (selectedProduct) {
            // Store current scroll position
            scrollPosition.current = window.scrollY;
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollPosition.current}px`;
            document.body.style.width = '100%';
            document.body.classList.add('modal-open');
            setSelectedImageIndex(0);
        } else {
            // Restore scroll position
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            document.body.classList.remove('modal-open');
            window.scrollTo(0, scrollPosition.current);
        }
    }, [selectedProduct]);

    // Category data
    const categoryData: { [key: string]: { name: string; description: string } } = {
        'indoor-plants': {
            name: 'Indoor Plants',
            description: 'Perfect for your living space',
        },
        'flowering-plants': {
            name: 'Flowering Plants',
            description: 'Add color to your garden',
        },
        'succulents': {
            name: 'Succulents',
            description: 'Low maintenance beauties',
        },
        'bouquets': {
            name: 'Bouquets',
            description: 'Fresh flower arrangements',
        },
    };

    // All products by category
    const allProducts: { [key: string]: Product[] } = {
        'indoor-plants': [
            {
                id: 1,
                name: 'Monstera Deliciosa',
                price: 45.99,
                category: 'Indoor Plants',
                image: 'https://images.pexels.com/photos/3125195/pexels-photo-3125195.jpeg?auto=compress&cs=tinysrgb&w=500',
                images: [
                    'https://images.pexels.com/photos/3125195/pexels-photo-3125195.jpeg?auto=compress&cs=tinysrgb&w=500',
                    'https://images.pexels.com/photos/6208086/pexels-photo-6208086.jpeg?auto=compress&cs=tinysrgb&w=500',
                    'https://images.pexels.com/photos/4751978/pexels-photo-4751978.jpeg?auto=compress&cs=tinysrgb&w=500',
                ],
                description: 'Large, tropical indoor plant',
            },
            {
                id: 5,
                name: 'Fiddle Leaf Fig',
                price: 68.99,
                category: 'Indoor Plants',
                image: 'https://images.pexels.com/photos/6208087/pexels-photo-6208087.jpeg?auto=compress&cs=tinysrgb&w=500',
                images: [
                    'https://images.pexels.com/photos/6208087/pexels-photo-6208087.jpeg?auto=compress&cs=tinysrgb&w=500',
                    'https://images.pexels.com/photos/6208086/pexels-photo-6208086.jpeg?auto=compress&cs=tinysrgb&w=500',
                    'https://images.pexels.com/photos/4751978/pexels-photo-4751978.jpeg?auto=compress&cs=tinysrgb&w=500',
                ],
                description: 'Statement indoor tree',
            },
            {
                id: 6,
                name: 'Snake Plant',
                price: 28.99,
                category: 'Indoor Plants',
                image: 'https://images.pexels.com/photos/2123482/pexels-photo-2123482.jpeg?auto=compress&cs=tinysrgb&w=500',
                images: [
                    'https://images.pexels.com/photos/2123482/pexels-photo-2123482.jpeg?auto=compress&cs=tinysrgb&w=500',
                    'https://images.pexels.com/photos/6208086/pexels-photo-6208086.jpeg?auto=compress&cs=tinysrgb&w=500',
                    'https://images.pexels.com/photos/4505171/pexels-photo-4505171.jpeg?auto=compress&cs=tinysrgb&w=500',
                ],
                description: 'Hardy air purifier',
            },
            {
                id: 7,
                name: 'Pothos',
                price: 22.99,
                category: 'Indoor Plants',
                image: 'https://images.pexels.com/photos/4505171/pexels-photo-4505171.jpeg?auto=compress&cs=tinysrgb&w=500',
                images: [
                    'https://images.pexels.com/photos/4505171/pexels-photo-4505171.jpeg?auto=compress&cs=tinysrgb&w=500',
                    'https://images.pexels.com/photos/3125195/pexels-photo-3125195.jpeg?auto=compress&cs=tinysrgb&w=500',
                    'https://images.pexels.com/photos/6208086/pexels-photo-6208086.jpeg?auto=compress&cs=tinysrgb&w=500',
                ],
                description: 'Easy-care trailing plant',
            },
            {
                id: 8,
                name: 'ZZ Plant',
                price: 35.99,
                category: 'Indoor Plants',
                image: 'https://images.pexels.com/photos/4751978/pexels-photo-4751978.jpeg?auto=compress&cs=tinysrgb&w=500',
                images: [
                    'https://images.pexels.com/photos/4751978/pexels-photo-4751978.jpeg?auto=compress&cs=tinysrgb&w=500',
                    'https://images.pexels.com/photos/6208086/pexels-photo-6208086.jpeg?auto=compress&cs=tinysrgb&w=500',
                    'https://images.pexels.com/photos/3125195/pexels-photo-3125195.jpeg?auto=compress&cs=tinysrgb&w=500',
                ],
                description: 'Drought-tolerant beauty',
            },
            {
                id: 9,
                name: 'Rubber Plant',
                price: 42.99,
                category: 'Indoor Plants',
                image: 'https://images.pexels.com/photos/7084309/pexels-photo-7084309.jpeg?auto=compress&cs=tinysrgb&w=500',
                images: [
                    'https://images.pexels.com/photos/7084309/pexels-photo-7084309.jpeg?auto=compress&cs=tinysrgb&w=500',
                    'https://images.pexels.com/photos/6208086/pexels-photo-6208086.jpeg?auto=compress&cs=tinysrgb&w=500',
                    'https://images.pexels.com/photos/4751978/pexels-photo-4751978.jpeg?auto=compress&cs=tinysrgb&w=500',
                ],
                description: 'Bold glossy leaves',
            },
            {
                id: 10,
                name: 'Peace Lily',
                price: 32.99,
                category: 'Indoor Plants',
                image: 'https://images.pexels.com/photos/7084309/pexels-photo-7084309.jpeg?auto=compress&cs=tinysrgb&w=500',
                images: [
                    'https://images.pexels.com/photos/7084309/pexels-photo-7084309.jpeg?auto=compress&cs=tinysrgb&w=500',
                    'https://images.pexels.com/photos/1407305/pexels-photo-1407305.jpeg?auto=compress&cs=tinysrgb&w=500',
                    'https://images.pexels.com/photos/6208086/pexels-photo-6208086.jpeg?auto=compress&cs=tinysrgb&w=500',
                ],
                description: 'Elegant white blooms',
            },
            {
                id: 11,
                name: 'Spider Plant',
                price: 18.99,
                category: 'Indoor Plants',
                image: 'https://images.pexels.com/photos/6208086/pexels-photo-6208086.jpeg?auto=compress&cs=tinysrgb&w=500',
                images: [
                    'https://images.pexels.com/photos/6208086/pexels-photo-6208086.jpeg?auto=compress&cs=tinysrgb&w=500',
                    'https://images.pexels.com/photos/4505171/pexels-photo-4505171.jpeg?auto=compress&cs=tinysrgb&w=500',
                    'https://images.pexels.com/photos/3125195/pexels-photo-3125195.jpeg?auto=compress&cs=tinysrgb&w=500',
                ],
                description: 'Easy propagation',
            },
        ],
        'flowering-plants': [
            {
                id: 2,
                name: 'Peace Lily',
                price: 32.99,
                category: 'Flowering Plants',
                image: 'https://images.pexels.com/photos/7084309/pexels-photo-7084309.jpeg?auto=compress&cs=tinysrgb&w=500',
                images: [
                    'https://images.pexels.com/photos/7084309/pexels-photo-7084309.jpeg?auto=compress&cs=tinysrgb&w=500',
                    'https://images.pexels.com/photos/1407305/pexels-photo-1407305.jpeg?auto=compress&cs=tinysrgb&w=500',
                    'https://images.pexels.com/photos/6208086/pexels-photo-6208086.jpeg?auto=compress&cs=tinysrgb&w=500',
                ],
                description: 'Elegant white blooms',
            },
            {
                id: 12,
                name: 'Orchid',
                price: 55.99,
                category: 'Flowering Plants',
                image: 'https://images.pexels.com/photos/1407305/pexels-photo-1407305.jpeg?auto=compress&cs=tinysrgb&w=500',
                images: [
                    'https://images.pexels.com/photos/1407305/pexels-photo-1407305.jpeg?auto=compress&cs=tinysrgb&w=500',
                    'https://images.pexels.com/photos/7084309/pexels-photo-7084309.jpeg?auto=compress&cs=tinysrgb&w=500',
                    'https://images.pexels.com/photos/6208086/pexels-photo-6208086.jpeg?auto=compress&cs=tinysrgb&w=500',
                ],
                description: 'Exotic flowering beauty',
            },
            {
                id: 13,
                name: 'African Violet',
                price: 24.99,
                category: 'Flowering Plants',
                image: 'https://images.pexels.com/photos/1407305/pexels-photo-1407305.jpeg?auto=compress&cs=tinysrgb&w=500',
                images: [
                    'https://images.pexels.com/photos/1407305/pexels-photo-1407305.jpeg?auto=compress&cs=tinysrgb&w=500',
                    'https://images.pexels.com/photos/7084309/pexels-photo-7084309.jpeg?auto=compress&cs=tinysrgb&w=500',
                    'https://images.pexels.com/photos/6208086/pexels-photo-6208086.jpeg?auto=compress&cs=tinysrgb&w=500',
                ],
                description: 'Compact flowering plant',
            },
            {
                id: 14,
                name: 'Anthurium',
                price: 38.99,
                category: 'Flowering Plants',
                image: 'https://images.pexels.com/photos/1407305/pexels-photo-1407305.jpeg?auto=compress&cs=tinysrgb&w=500',
                images: [
                    'https://images.pexels.com/photos/1407305/pexels-photo-1407305.jpeg?auto=compress&cs=tinysrgb&w=500',
                    'https://images.pexels.com/photos/7084309/pexels-photo-7084309.jpeg?auto=compress&cs=tinysrgb&w=500',
                    'https://images.pexels.com/photos/6208086/pexels-photo-6208086.jpeg?auto=compress&cs=tinysrgb&w=500',
                ],
                description: 'Heart-shaped flowers',
            },
            {
                id: 15,
                name: 'Begonia',
                price: 26.99,
                category: 'Flowering Plants',
                image: 'https://images.pexels.com/photos/1407305/pexels-photo-1407305.jpeg?auto=compress&cs=tinysrgb&w=500',
                images: [
                    'https://images.pexels.com/photos/1407305/pexels-photo-1407305.jpeg?auto=compress&cs=tinysrgb&w=500',
                    'https://images.pexels.com/photos/7084309/pexels-photo-7084309.jpeg?auto=compress&cs=tinysrgb&w=500',
                    'https://images.pexels.com/photos/6208086/pexels-photo-6208086.jpeg?auto=compress&cs=tinysrgb&w=500',
                ],
                description: 'Colorful blooms',
            },
            {
                id: 16,
                name: 'Hibiscus',
                price: 44.99,
                category: 'Flowering Plants',
                image: 'https://images.pexels.com/photos/1407305/pexels-photo-1407305.jpeg?auto=compress&cs=tinysrgb&w=500',
                images: [
                    'https://images.pexels.com/photos/1407305/pexels-photo-1407305.jpeg?auto=compress&cs=tinysrgb&w=500',
                    'https://images.pexels.com/photos/7084309/pexels-photo-7084309.jpeg?auto=compress&cs=tinysrgb&w=500',
                    'https://images.pexels.com/photos/6208086/pexels-photo-6208086.jpeg?auto=compress&cs=tinysrgb&w=500',
                ],
                description: 'Tropical flowering shrub',
            },
        ],
        'succulents': [
            {
                id: 3,
                name: 'Succulent Collection',
                price: 24.99,
                category: 'Succulents',
                image: 'https://images.pexels.com/photos/2132240/pexels-photo-2132240.jpeg?auto=compress&cs=tinysrgb&w=500',
                images: [
                    'https://images.pexels.com/photos/2132240/pexels-photo-2132240.jpeg?auto=compress&cs=tinysrgb&w=500',
                    'https://images.pexels.com/photos/4751978/pexels-photo-4751978.jpeg?auto=compress&cs=tinysrgb&w=500',
                    'https://images.pexels.com/photos/6208086/pexels-photo-6208086.jpeg?auto=compress&cs=tinysrgb&w=500',
                ],
                description: 'Set of 5 mini succulents',
            },
            {
                id: 17,
                name: 'Aloe Vera',
                price: 19.99,
                category: 'Succulents',
                image: 'https://images.pexels.com/photos/2132240/pexels-photo-2132240.jpeg?auto=compress&cs=tinysrgb&w=500',
                images: [
                    'https://images.pexels.com/photos/2132240/pexels-photo-2132240.jpeg?auto=compress&cs=tinysrgb&w=500',
                    'https://images.pexels.com/photos/4751978/pexels-photo-4751978.jpeg?auto=compress&cs=tinysrgb&w=500',
                    'https://images.pexels.com/photos/6208086/pexels-photo-6208086.jpeg?auto=compress&cs=tinysrgb&w=500',
                ],
                description: 'Medicinal succulent',
            },
            {
                id: 18,
                name: 'Jade Plant',
                price: 29.99,
                category: 'Succulents',
                image: 'https://images.pexels.com/photos/2132240/pexels-photo-2132240.jpeg?auto=compress&cs=tinysrgb&w=500',
                images: [
                    'https://images.pexels.com/photos/2132240/pexels-photo-2132240.jpeg?auto=compress&cs=tinysrgb&w=500',
                    'https://images.pexels.com/photos/4751978/pexels-photo-4751978.jpeg?auto=compress&cs=tinysrgb&w=500',
                    'https://images.pexels.com/photos/6208086/pexels-photo-6208086.jpeg?auto=compress&cs=tinysrgb&w=500',
                ],
                description: 'Lucky money tree',
            },
            {
                id: 19,
                name: 'Echeveria',
                price: 16.99,
                category: 'Succulents',
                image: 'https://images.pexels.com/photos/2132240/pexels-photo-2132240.jpeg?auto=compress&cs=tinysrgb&w=500',
                images: [
                    'https://images.pexels.com/photos/2132240/pexels-photo-2132240.jpeg?auto=compress&cs=tinysrgb&w=500',
                    'https://images.pexels.com/photos/4751978/pexels-photo-4751978.jpeg?auto=compress&cs=tinysrgb&w=500',
                    'https://images.pexels.com/photos/6208086/pexels-photo-6208086.jpeg?auto=compress&cs=tinysrgb&w=500',
                ],
                description: 'Rosette-shaped succulent',
            },
            {
                id: 20,
                name: 'String of Pearls',
                price: 27.99,
                category: 'Succulents',
                image: 'https://images.pexels.com/photos/2132240/pexels-photo-2132240.jpeg?auto=compress&cs=tinysrgb&w=500',
                images: [
                    'https://images.pexels.com/photos/2132240/pexels-photo-2132240.jpeg?auto=compress&cs=tinysrgb&w=500',
                    'https://images.pexels.com/photos/4751978/pexels-photo-4751978.jpeg?auto=compress&cs=tinysrgb&w=500',
                    'https://images.pexels.com/photos/6208086/pexels-photo-6208086.jpeg?auto=compress&cs=tinysrgb&w=500',
                ],
                description: 'Trailing succulent',
            },
            {
                id: 21,
                name: 'Haworthia',
                price: 21.99,
                category: 'Succulents',
                image: 'https://images.pexels.com/photos/2132240/pexels-photo-2132240.jpeg?auto=compress&cs=tinysrgb&w=500',
                images: [
                    'https://images.pexels.com/photos/2132240/pexels-photo-2132240.jpeg?auto=compress&cs=tinysrgb&w=500',
                    'https://images.pexels.com/photos/4751978/pexels-photo-4751978.jpeg?auto=compress&cs=tinysrgb&w=500',
                    'https://images.pexels.com/photos/6208086/pexels-photo-6208086.jpeg?auto=compress&cs=tinysrgb&w=500',
                ],
                description: 'Zebra-striped succulent',
            },
        ],
        'bouquets': [
            {
                id: 4,
                name: 'Spring Bouquet',
                price: 59.99,
                category: 'Bouquets',
                image: 'https://images.pexels.com/photos/1458603/pexels-photo-1458603.jpeg?auto=compress&cs=tinysrgb&w=500',
                images: [
                    'https://images.pexels.com/photos/1458603/pexels-photo-1458603.jpeg?auto=compress&cs=tinysrgb&w=500',
                    'https://images.pexels.com/photos/1407305/pexels-photo-1407305.jpeg?auto=compress&cs=tinysrgb&w=500',
                    'https://images.pexels.com/photos/7084309/pexels-photo-7084309.jpeg?auto=compress&cs=tinysrgb&w=500',
                ],
                description: 'Seasonal mixed flowers',
            },
            {
                id: 22,
                name: 'Rose Bouquet',
                price: 69.99,
                category: 'Bouquets',
                image: 'https://images.pexels.com/photos/1458603/pexels-photo-1458603.jpeg?auto=compress&cs=tinysrgb&w=500',
                images: [
                    'https://images.pexels.com/photos/1458603/pexels-photo-1458603.jpeg?auto=compress&cs=tinysrgb&w=500',
                    'https://images.pexels.com/photos/1407305/pexels-photo-1407305.jpeg?auto=compress&cs=tinysrgb&w=500',
                    'https://images.pexels.com/photos/7084309/pexels-photo-7084309.jpeg?auto=compress&cs=tinysrgb&w=500',
                ],
                description: 'Classic red roses',
            },
            {
                id: 23,
                name: 'Tulip Arrangement',
                price: 54.99,
                category: 'Bouquets',
                image: 'https://images.pexels.com/photos/1458603/pexels-photo-1458603.jpeg?auto=compress&cs=tinysrgb&w=500',
                images: [
                    'https://images.pexels.com/photos/1458603/pexels-photo-1458603.jpeg?auto=compress&cs=tinysrgb&w=500',
                    'https://images.pexels.com/photos/1407305/pexels-photo-1407305.jpeg?auto=compress&cs=tinysrgb&w=500',
                    'https://images.pexels.com/photos/7084309/pexels-photo-7084309.jpeg?auto=compress&cs=tinysrgb&w=500',
                ],
                description: 'Colorful tulips',
            },
            {
                id: 24,
                name: 'Sunflower Bunch',
                price: 49.99,
                category: 'Bouquets',
                image: 'https://images.pexels.com/photos/1458603/pexels-photo-1458603.jpeg?auto=compress&cs=tinysrgb&w=500',
                images: [
                    'https://images.pexels.com/photos/1458603/pexels-photo-1458603.jpeg?auto=compress&cs=tinysrgb&w=500',
                    'https://images.pexels.com/photos/1407305/pexels-photo-1407305.jpeg?auto=compress&cs=tinysrgb&w=500',
                    'https://images.pexels.com/photos/7084309/pexels-photo-7084309.jpeg?auto=compress&cs=tinysrgb&w=500',
                ],
                description: 'Bright sunflowers',
            },
            {
                id: 25,
                name: 'Lily Bouquet',
                price: 64.99,
                category: 'Bouquets',
                image: 'https://images.pexels.com/photos/1458603/pexels-photo-1458603.jpeg?auto=compress&cs=tinysrgb&w=500',
                images: [
                    'https://images.pexels.com/photos/1458603/pexels-photo-1458603.jpeg?auto=compress&cs=tinysrgb&w=500',
                    'https://images.pexels.com/photos/1407305/pexels-photo-1407305.jpeg?auto=compress&cs=tinysrgb&w=500',
                    'https://images.pexels.com/photos/7084309/pexels-photo-7084309.jpeg?auto=compress&cs=tinysrgb&w=500',
                ],
                description: 'Elegant lilies',
            },
            {
                id: 26,
                name: 'Wildflower Mix',
                price: 44.99,
                category: 'Bouquets',
                image: 'https://images.pexels.com/photos/1458603/pexels-photo-1458603.jpeg?auto=compress&cs=tinysrgb&w=500',
                images: [
                    'https://images.pexels.com/photos/1458603/pexels-photo-1458603.jpeg?auto=compress&cs=tinysrgb&w=500',
                    'https://images.pexels.com/photos/1407305/pexels-photo-1407305.jpeg?auto=compress&cs=tinysrgb&w=500',
                    'https://images.pexels.com/photos/7084309/pexels-photo-7084309.jpeg?auto=compress&cs=tinysrgb&w=500',
                ],
                description: 'Natural wildflowers',
            },
        ],
    };

    const category = categoryData[slug];
    const products = allProducts[slug] || [];

    const addToCart = (product: Product, e?: React.MouseEvent) => {
        if (e) {
            e.stopPropagation();
        }
        const savedCart = localStorage.getItem('cartItems');
        const cartItems = savedCart ? JSON.parse(savedCart) : [];

        const existingItem = cartItems.find((item: any) => item.id === product.id);
        let updatedItems;

        if (existingItem) {
            updatedItems = cartItems.map((item: any) =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            );
        } else {
            updatedItems = [...cartItems, { ...product, quantity: 1 }];
        }

        localStorage.setItem('cartItems', JSON.stringify(updatedItems));
        setToastMessage(`${product.name} added to cart!`);
        setShowToast(true);
    };

    if (!category) {
        return (
            <div className="category-page">
                <div className="category-not-found">
                    <h1>Category not found</h1>
                    <button onClick={() => router.push('/')}>Back to Home</button>
                </div>
            </div>
        );
    }

    return (
        <div className="category-page">
            {/* Toast Notification */}
            {showToast && (
                <motion.div
                    className="toast"
                    initial={{ opacity: 0, y: -100, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -100, scale: 0.8 }}
                    transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                >
                    <div className="toast-icon">✓</div>
                    <div className="toast-content">
                        <p className="toast-message">{toastMessage}</p>
                    </div>
                    <button className="toast-close" onClick={() => setShowToast(false)}>
                        ✕
                    </button>
                </motion.div>
            )}

            {/* Product Detail Modal */}
            {selectedProduct && (
                <motion.div
                    className="modal-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setSelectedProduct(null)}
                >
                    <motion.div
                        className="product-modal"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button className="modal-close magnetic-btn" onClick={() => setSelectedProduct(null)} data-cursor="Close">
                            ✕
                        </button>
                        <div className="modal-content">
                            <div className="modal-image-section">
                                <div className="modal-image">
                                    <img
                                        src={(selectedProduct.images && selectedProduct.images[selectedImageIndex]) || selectedProduct.image}
                                        alt={selectedProduct.name}
                                    />
                                </div>
                                {selectedProduct.images && selectedProduct.images.length > 1 && (
                                    <div className="modal-thumbnails">
                                        {selectedProduct.images.map((img, index) => (
                                            <motion.div
                                                key={index}
                                                className={`thumbnail ${index === selectedImageIndex ? 'active' : ''}`}
                                                onClick={() => setSelectedImageIndex(index)}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                <img src={img} alt={`${selectedProduct.name} ${index + 1}`} />
                                            </motion.div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className="modal-details">
                                <span className="modal-category">{selectedProduct.category}</span>
                                <h2 className="modal-title gradient-text-animated">{selectedProduct.name}</h2>
                                <p className="modal-description">{selectedProduct.description}</p>
                                <div className="modal-price">${selectedProduct.price}</div>
                                <div className="modal-info">
                                    <div className="info-item">
                                        <span className="info-icon">💧</span>
                                        <div>
                                            <strong>Watering</strong>
                                            <p>Water when top soil is dry</p>
                                        </div>
                                    </div>
                                    <div className="info-item">
                                        <span className="info-icon">☀️</span>
                                        <div>
                                            <strong>Light</strong>
                                            <p>Bright indirect sunlight</p>
                                        </div>
                                    </div>
                                    <div className="info-item">
                                        <span className="info-icon">🌡️</span>
                                        <div>
                                            <strong>Temperature</strong>
                                            <p>18-24°C (65-75°F)</p>
                                        </div>
                                    </div>
                                </div>
                                <motion.button
                                    className="modal-add-to-cart magnetic-btn ripple-effect"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={(e) => {
                                        addToCart(selectedProduct, e);
                                        setSelectedProduct(null);
                                    }}
                                    data-cursor="Add"
                                >
                                    Add to Cart - ${selectedProduct.price}
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}

            <div className="category-header">
                <button className="back-btn magnetic-btn" onClick={() => router.push('/')} data-cursor="Back">
                    ← Back to Home
                </button>
                <div className="category-header-content">
                    <h1 className="category-title gradient-text-animated">{category.name}</h1>
                    <p className="category-description">{category.description}</p>
                </div>
            </div>

            <div className="category-products">
                {products.map((product, index) => (
                    <motion.div
                        key={product.id}
                        className="product-card hover-lift"
                        data-cursor="View"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05, duration: 0.4 }}
                        whileHover={{ y: -8, transition: { duration: 0.2 } }}
                        onClick={() => setSelectedProduct(product)}
                    >
                        <div className="product-image-wrapper">
                            <img src={product.image} alt={product.name} className="product-image" />
                        </div>
                        <div className="product-info">
                            <span className="product-category">{product.category}</span>
                            <h3 className="product-name">{product.name}</h3>
                            <p className="product-description">{product.description}</p>
                            <div className="product-footer">
                                <span className="product-price">${product.price}</span>
                                <motion.button
                                    className="add-to-cart magnetic-btn ripple-effect"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={(e) => addToCart(product, e)}
                                    data-cursor="Add"
                                >
                                    Add to Cart
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
