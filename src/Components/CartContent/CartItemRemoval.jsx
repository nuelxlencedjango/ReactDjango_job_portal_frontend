import React from 'react';
import { useCart } from './CartContext';

const Cart = () => {
    const { cart, removeFromCart } = useCart();

    return (
        <div>
            <h1>Your Cart</h1>
            {cart?.items.length ? (
                cart.items.map((item) => (
                    <div key={item.id}>
                        <p>{item.service_title} by {item.artisan_name}</p>
                        <p>Quantity: {item.quantity}</p>
                        <button onClick={() => removeFromCart(item.id)}>Remove</button>
                    </div>
                ))
            ) : (
                <p>Your cart is empty.</p>
            )}
        </div>
    );
};

export default Cart;
