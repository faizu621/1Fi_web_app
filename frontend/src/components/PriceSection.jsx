import React from 'react';
import { formatCurrency } from '../utils/formatters.js';

const PriceSection = ({ price = 127400, mrp = 134900 }) => {
  return (
    <div className="space-y-1 my-3">
      {/* Selling Price */}
      <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
        {formatCurrency(price)}
      </div>

      {/* MRP Strikethrough directly below */}
      {mrp > price && (
        <div className="text-sm font-semibold text-slate-500 line-through">
          {formatCurrency(mrp)}
        </div>
      )}

      {/* Section Title */}
      <div className="pt-2 text-sm sm:text-base font-extrabold text-slate-800">
        EMI plans backed by mutual funds
      </div>
    </div>
  );
};

export default PriceSection;
