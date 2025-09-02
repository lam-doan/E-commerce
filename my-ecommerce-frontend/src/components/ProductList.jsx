import React, {useEffect, useState} from 'react';
import './ProductList.css';

const ProductList = () => {
    console.log('ProductList component rendered');
    const [products, setProducts] = useState([]);
    const [dataisLoaded, setDataIsLoaded] = useState(false);

    useEffect(() => {
        console.log('useEffect triggered');
        fetch("https://studious-eureka-7v9wrw6v7vv9cwpx9-5000.app.github.dev/products")
            .then((res) => res.json())
            .then((json) => {
                setProducts(json);
                setDataIsLoaded(true);
            }
        );
    }, []);

    if (!dataisLoaded) {
        return (
            <div className='loading'>
                <h2>Please wait some time...</h2>
            </div>
        );
    }
    

    const addToCart = async (productId) => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Please log in first');
            return;
        }

        try {
            const res = await fetch("https://e-commerce-gl2f.onrender.com/cart/add", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({product_id: productId, quantity: 1})
            });

            const data = await res.json();
            console.log('Cart updated:', data);
        } catch (err) {
            console.error('Error adding to cart', err);
        }
    };

    return (
        <div className='product-catalog'>
           <h2 className="catalog-title">Product Catalog</h2>

           {products.length === 0 ? (
                <p className="no-products">No products found.</p>
            ) : (
                <div className='product-grid'>
                    {products.map(product => (
                        <div className="product-card" key={product._id}>
                            <h3 className="product-title">{product.name}</h3>
                            <p className="product-description">{product.description}</p>
                            <ul className="product-features">
                            {product.features.map((feature, i) => (
                                <li key={i}>{feature}</li>
                            ))}
                            </ul>
                            <p className="product-warranty">
                                Warranty: <strong>{product.warranty}</strong>
                            </p>

                            <button className='add-to-cart-btn' onClick={() => addToCart(product._id)}>Add to cart</button>
                        </div>  
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProductList;