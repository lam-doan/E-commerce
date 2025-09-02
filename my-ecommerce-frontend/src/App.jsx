import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Header from './components/Header.jsx';
import HomePage from './components/Homepage.jsx';
import LoginSignup from './components/LoginSignup.jsx';
import CartPage from './components/CartPage.jsx';
import ProductList from './components/ProductList.jsx';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        {/*Front page*/}
        <Route path="/" element={<HomePage />}/>
        {/*Product page*/}
        <Route path="/products" element={<ProductList />} />
        {/*Auth page*/}
        <Route path="/auth" element={<LoginSignup />}/>
        {/*Cart page*/}
        <Route path="/cart" element={<CartPage />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;