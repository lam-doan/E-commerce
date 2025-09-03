import React, { useEffect, useState } from 'react';
import './CartPage.css';

const CartPage = () => {
  const [items, setItems] = useState([]);
  const [dataIsLoaded, setDataIsLoaded] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch("https://orange-parakeet-5gq545jgg69xfvj97-5000.app.github.dev/cart", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(json => {
        setItems(json.items || []);
        setDataIsLoaded(true);
      });
  }, []);

  const handleRemove = async (productId) => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`https://orange-parakeet-5gq545jgg69xfvj97-5000.app.github.dev/cart/${productId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        setItems(prev => prev.filter(item => item.product_id._id !== productId));
      }
    } catch (err) {
      console.error('Error removing item:', err);
    }
  };

  const subtotal = items.reduce((sum, item) => sum + item.product_id.price * item.quantity, 0);

  if (!dataIsLoaded) {
    return (
      <div className='loading'>
        <h2>Loading your cart…</h2>
        <p>This may take a few seconds.</p>
      </div>
    );
  }

  return (
    <div className='cart-page'>
      <div className='cart-items'>
        <h2 className='cart-title'>Shopping Cart</h2>
        {items.length === 0 ? (
          <p className="no-items">Your cart is empty</p>
        ) : (
          items.map(item => (
            <div className="cart-item" key={item._id}>
              <img
                src={`https://orange-parakeet-5gq545jgg69xfvj97-5000.app.github.dev${item.product_id.image}`}
                alt={item.product_id.name}
                className="cart-item-image"
              />
              <div className='cart-item-details'>
                <h3>{item.product_id.name}</h3>
                <p className="price">${item.product_id.price.toFixed(2)}</p>
                <p className="quantity">Qty: {item.quantity}</p>
              </div>
              <button
                className="remove-btn"
                onClick={() => handleRemove(item.product_id._id)}
              >
                Remove
              </button>
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