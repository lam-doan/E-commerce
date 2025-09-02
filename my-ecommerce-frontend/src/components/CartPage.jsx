import React, {useEffect, useState} from 'react';

const CartPage = () => {
    const [items, setItems] = useState([]);
    const [dataisLoaded, setDataIsLoaded] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        fetch("https://e-commerce-gl2f.onrender.com/cart", {
            headers: { Authorization: `Bearer ${token}`}
        })
            .then(res => res.json())
            .then((json) => {
            setItems(json.items || []); 
            setDataIsLoaded(true);
            })
    }, []);

    if (!dataisLoaded) {
        return (
            <div className='loading'>
                <h2>Loading your cart…</h2>
                <p>This may take a few seconds.</p>
            </div>
        );
    }

    return (
        <div className='cart-container'>
            <h2 className='cart-title'>ALL ITEMS</h2>
            {items.length === 0 ? (
                <p className="no-items">No items in the cart.</p>
            ) : (
                <div className='item-list'>
                    {items.map(item => (
                        <div className="item-card" key={item._id}>
                            <div className='item-info'>
                                <p className="item-title">{item.product_id.name}</p>
                                <p className="item-price">{item.product_id.price}</p>
                                <p className="item-price">{item.quantity}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CartPage;