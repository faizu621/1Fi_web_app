import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout.jsx';
import HomePage from './pages/HomePage.jsx';
import ProductsPage from './pages/ProductsPage.jsx';
import ProductDetailPage from './pages/ProductDetailPage.jsx';
import ComingSoonPage from './pages/ComingSoonPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Router>
      <MainLayout searchQuery={searchQuery} setSearchQuery={setSearchQuery}>
        <Routes>
          <Route
            path="/"
            element={<HomePage searchQuery={searchQuery} setSearchQuery={setSearchQuery} />}
          />
          <Route
            path="/products"
            element={<ProductsPage searchQuery={searchQuery} setSearchQuery={setSearchQuery} />}
          />
          <Route
            path="/products/:slug"
            element={<ProductDetailPage />}
          />
          <Route
            path="/top-brands"
            element={<ComingSoonPage title="Top Brands Outlet Stores" />}
          />
          <Route
            path="/nearby-stores"
            element={<ComingSoonPage title="Nearby Partner Retailers" />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
