import React from 'react';
import ProductCard from './ProductCard.jsx';

const ProductGrid = ({ products = [] }) => {
  if (!products.length) return null;

  return (
    <div className="grid grid-cols-1 gap-4 w-full">
      {products.map((product) => (
        <ProductCard key={product._id || product.slug} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
