import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { formatCurrency } from '../utils/formatters.js';

const ProductCard = ({ product }) => {
  if (!product) return null;

  const defaultVariant = product.variants?.[0] || {};
  const startingEmi = product.emiPlans?.[0] || {};

  const sellingPrice = defaultVariant.price || 0;
  const mrp = defaultVariant.mrp || 0;
  const discount = mrp > sellingPrice ? Math.round(((mrp - sellingPrice) / mrp) * 100) : 0;
  const emiAmount = startingEmi.monthlyAmount || 0;
  const emiTenure = startingEmi.tenure || 24;

  return (
    <div className="group bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden relative">
      
      {/* Brand & Discount Badges */}
      <div className="p-4 pb-0 flex items-center justify-between z-10">
        <span className="inline-flex items-center gap-1 text-[11px] font-extrabold uppercase tracking-wider text-purple-700 bg-purple-50 border border-purple-100 px-2.5 py-1 rounded-md">
          {product.brand}
        </span>
        {discount > 0 && (
          <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2.5 py-0.5 rounded-full">
            {discount}% OFF
          </span>
        )}
      </div>

      {/* Product Image */}
      <Link to={`/products/${product.slug}`} className="block relative p-6 flex justify-center items-center overflow-hidden">
        <div className="w-full h-52 flex items-center justify-center">
          <img
            src={defaultVariant.image || product.images?.[0]}
            alt={product.name}
            className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500 drop-shadow-md"
            loading="lazy"
          />
        </div>
      </Link>

      {/* Content Section */}
      <div className="p-5 pt-0 flex-1 flex flex-col justify-between">
        <div>
          <Link to={`/products/${product.slug}`}>
            <h3 className="font-extrabold text-base text-slate-900 group-hover:text-orange-500 transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>
          <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed font-medium">
            {product.description}
          </p>
        </div>

        {/* Variant summary pill */}
        <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
          <span className="font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[11px]">
            {product.variants?.length || 1} Variants
          </span>
          <span className="text-slate-300">•</span>
          <span className="text-[11px] font-semibold text-slate-600">{defaultVariant.storage}</span>
        </div>

        {/* Pricing Box */}
        <div className="mt-4 pt-3 border-t border-slate-100">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-black text-slate-900 tracking-tight">
              {formatCurrency(sellingPrice)}
            </span>
            {mrp > sellingPrice && (
              <span className="text-xs font-medium text-slate-400 line-through">
                {formatCurrency(mrp)}
              </span>
            )}
          </div>

          {/* Starting EMI highlight box */}
          {emiAmount > 0 && (
            <div className="mt-2 bg-orange-50/70 border border-orange-100 rounded-xl p-2.5 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-orange-600 block">Starting EMI</span>
                <span className="text-sm font-extrabold text-slate-900">
                  {formatCurrency(emiAmount)} <span className="text-xs font-normal text-slate-600">/ mo</span>
                </span>
              </div>
              <span className="text-[11px] font-bold text-orange-600 bg-white px-2 py-1 rounded-md border border-orange-200/80 shadow-2xs">
                {emiTenure}m @ {startingEmi.interestRate}%
              </span>
            </div>
          )}
        </div>

        {/* Vibrant Orange Primary Action Button */}
        <Link
          to={`/products/${product.slug}`}
          className="mt-4 w-full bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-extrabold text-xs py-3 px-4 rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-sm group-hover:shadow-md"
        >
          <span>View details & EMIs</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
