import React, {useEffect, useState} from 'react';
import './CartPage.css';

const CartPage = () => {
    const [items, setItems] = useState([]);
    const [dataisLoaded, setDataIsLoaded] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        fetch("https://studious-eureka-7v9wrw6v7vv9cwpx9-5000.app.github.dev/cart", {
            headers: { Authorization: `Bearer ${token}`}
        })
            .then(res => res.json())
            .then((json) => {
            setItems(json.items || []); 
            setDataIsLoaded(true);
            })
    }, []);

    const subtotal = items.reduce((sum, item) => sum + item.product_id.price*item.quantity, 0);

    if (!dataisLoaded) {
        return (
            <div className='loading'>
                <h2>Loading your cart…</h2>
                <p>This may take a few seconds.</p>
            </div>
        );
    }

    return (
        <div className='cart-page'>
            <h2 className='cart-title'>Shopping Cart</h2>
            <div className='cart-items'>
                {items.length === 0 ? (
                    <p className="no-items">Your cart is empty</p>
                ) : (
                    items.map(item => (
                        <div className='item-list'>
                            <div className="item-card" key={item._id}>
                                <div className='item-info'>
                                    <h3>{item.product_id.name}</h3>
                                    <p className="price">${item.product_id.price.toFixed(2)}</p>
                                    <p className="quantity">{item.quantity}</p>
                                </div>
                                <button className="remove-btn">Remove</button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <div className='order-summary'>
                <h3>Order Summary</h3>
                <div className='summary-row'>
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className='summary-row total'>
                    <span>Total</span>
                    <span>${subtotal.toFixed(2)}</span>
                </div>
                <button className='checkout-btn'>Proceed to checkout</button>
            </div>
        </div>
    );
};

export default CartPage;