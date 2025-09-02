import React from 'react';
import ProductList from './ProductList';
import './Homepage.css';

const Homepage = () => {
  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Discover Your Next Favorite Product</h1>
          <p>Shop the latest trends and timeless classics — all in one place.</p>
        </div>
      </section>

      {/* Product Section */}
      <section className="products-section">
        <ProductList />
      </section>
    </div>
  );
};

export default Homepage;