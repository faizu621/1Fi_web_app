import React from 'react';
import ProductCard from './ProductCard.jsx';

const ProductGrid = ({ products = [] }) => {
  if (!products.length) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
      {products.map((product) => (
        <ProductCard key={product._id || product.slug} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
