import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
    const cart = useSelector(state => state.cart.items);
    const dispatch = useDispatch();

    // Calculate total amount for all products in the cart
    const calculateTotalAmount = (cart) => {
        let total = 0;
        cart.forEach(item => {
            const quantity = item.quantity;
            const cost = parseFloat(item.cost.substring(1)); // Convert "$10" to 10.00
            if (!isNaN(cost)) total += quantity * cost;
        });
        return total.toFixed(2); // Returning the total amount as a string formatted to two decimal places
    };

    const handleContinueShopping = (e) => {
        if (onContinueShopping) onContinueShopping(e);
    };

    const handleIncrement = (item) => {
        dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
    };

    const handleDecrement = (item) => {
        if (item.quantity > 1) { // Prevent going below 1
            dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
        }
    };

    const handleRemove = (item) => {
        dispatch(removeItem(item.name)); // Use name to identify the item to be removed
    };

    // Calculate total cost based on quantity for an item
    const calculateTotalCost = (item) => {
        const unitPrice = parseFloat(item.cost.substring(1));
        return !isNaN(unitPrice) ? (unitPrice * item.quantity).toFixed(2) : '0.00';
    };

    return (
        <div className="cart-container">
            <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount(cart)}</h2>
            <div>
                {cart.length > 0 ? (
                    cart.map(item => (
                        <div className="cart-item" key={item.name}>
                            <img className="cart-item-image" src={item.image} alt={item.name} />
                            <div className="cart-item-details">
                                <div className="cart-item-name">{item.name}</div>
                                <div className="cart-item-cost">{item.cost}</div>
                                <div className="cart-item-quantity">
                                    <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                                    <span className="cart-item-quantity-value">{item.quantity}</span>
                                    <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
                                </div>
                                <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
                                <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p style={{ color: 'black' }}>Your cart is empty.</p>
                )}
            </div>
            <div className="continue_shopping_btn">
                <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
                <br />
                <button className="get-started-button1">Checkout</button>
            </div>
        </div>
    );
};

export default CartItem;
