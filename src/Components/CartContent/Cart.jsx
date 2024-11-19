import React, { createContext, useContext, useState, useEffect } from 'react';
import axiosInstance from './api';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(null);

    const fetchCart = async () => {
        try {
            const response = await axiosInstance.get('/cart/');
            setCart(response.data);
        } catch (error) {
            console.error('Error fetching cart:', error);
        }
    };

    const addToCart = async (artisanId, serviceId) => {
        try {
            await axiosInstance.post('/cart/add/', { artisan: artisanId, service: serviceId });
            fetchCart();
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    };

    const removeFromCart = async (itemId) => {
        try {
            await axiosInstance.delete(`/cart/remove/${itemId}/`);
            fetchCart();
        } catch (error) {
            console.error('Error removing from cart:', error);
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};
