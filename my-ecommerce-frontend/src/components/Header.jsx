import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <header className="site-header">
      <div className="header-left">
        <Link to="/" className="logo">MyStore</Link>
      </div>

      <nav className="header-nav">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/cart">Cart 🛒</Link>
      </nav>

      <div className="header-right">
        {token ? (
          <button className="auth-btn" onClick={handleLogout}>Logout</button>
        ) : (
          <button className="auth-btn" onClick={() => navigate('/auth')}>
            Login / Signup
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;