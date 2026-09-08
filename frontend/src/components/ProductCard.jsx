import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, ShieldCheck, Zap } from 'lucide-react';
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
    <div className="group bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden relative p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
      
      {/* Product Image Section */}
      <Link to={`/products/${product.slug}`} className="shrink-0 relative w-full sm:w-44 h-44 bg-slate-50/80 rounded-2xl p-4 flex items-center justify-center overflow-hidden border border-slate-100">
        {discount > 0 && (
          <span className="absolute top-2 left-2 z-10 text-[10px] font-extrabold text-emerald-700 bg-emerald-100 border border-emerald-200 px-2 py-0.5 rounded-md">
            {discount}% OFF
          </span>
        )}
        <img
          src={defaultVariant.image || product.images?.[0]}
          alt={product.name}
          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500 drop-shadow-sm"
          loading="lazy"
        />
      </Link>

      {/* Content Info Section */}
      <div className="flex-1 w-full space-y-2.5">
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider text-purple-700 bg-purple-50 border border-purple-100 px-2.5 py-0.5 rounded-full">
            {product.brand}
          </span>
          <div className="flex items-center gap-1 bg-amber-50 text-amber-700 border border-amber-200/60 px-2 py-0.5 rounded-full text-xs font-bold">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span>4.8</span>
            <span className="text-[10px] text-amber-600 font-normal">(120+)</span>
          </div>
        </div>

        <div>
          <Link to={`/products/${product.slug}`}>
            <h3 className="font-extrabold text-base sm:text-lg text-slate-900 group-hover:text-purple-600 transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>
          <p className="text-xs text-slate-500 line-clamp-1 font-medium mt-0.5">
            {defaultVariant.storage} • {defaultVariant.color} • {product.description}
          </p>
        </div>

        {/* Pricing & EMI Box */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-100">
          <div>
            <span className="text-lg font-black text-slate-900 tracking-tight">
              {formatCurrency(sellingPrice)}
            </span>
            {mrp > sellingPrice && (
              <span className="text-xs font-medium text-slate-400 line-through ml-2">
                {formatCurrency(mrp)}
              </span>
            )}
          </div>

          {emiAmount > 0 && (
            <div className="bg-orange-50/90 border border-orange-200/80 px-3 py-1 rounded-xl text-right">
              <span className="text-[9px] font-extrabold uppercase tracking-wider text-orange-600 block leading-tight">No-Cost EMI</span>
              <span className="text-xs font-black text-slate-900">
                {formatCurrency(emiAmount)} <span className="text-[10px] font-normal text-slate-600">/mo ({emiTenure}m)</span>
              </span>
            </div>
          )}
        </div>

        {/* Vibrant Orange Primary Action Button */}
        <Link
          to={`/products/${product.slug}`}
          className="w-full bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-extrabold text-xs py-2.5 px-4 rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-sm group-hover:shadow-md"
        >
          <span>View Details & EMI Options</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
