import React, { useState, useEffect } from 'react';
import { getProducts } from '../services/productService.js';
import ProductGrid from '../components/ProductGrid.jsx';
import { ProductGridSkeleton } from '../components/LoadingSkeleton.jsx';
import ErrorState from '../components/ErrorState.jsx';
import EmptyState from '../components/EmptyState.jsx';
import { Sparkles, ShieldCheck, Zap, Percent, Flame } from 'lucide-react';

const HomePage = ({ searchQuery = '', setSearchQuery }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState('All');

  const fetchProductList = async () => {
    try {
      setLoading(true);
      setError(null);
      const params = {};
      if (searchQuery.trim()) params.search = searchQuery.trim();
      if (selectedBrand !== 'All') params.brand = selectedBrand;

      const res = await getProducts(params);
      setProducts(res.data || []);
    } catch (err) {
      console.error('Error loading products:', err);
      setError(err.message || 'Unable to fetch products from backend API.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductList();
  }, [searchQuery, selectedBrand]);

  const brands = ['All', 'Apple', 'Samsung', 'Google'];

  return (
    <div className="space-y-10 sm:space-y-12">
      {/* Hero Banner Section - Styled to match 1Fi Purple Brand Scheme */}
      <section className="relative rounded-3xl bg-gradient-to-r from-[#6D28D9] via-[#7C3AED] to-indigo-700 text-white p-6 sm:p-12 overflow-hidden shadow-xl border border-purple-500/20">
        {/* Abstract Glowing Accent Circles */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-orange-400/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-semibold text-purple-100 border border-white/20">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>1Fi Financing Marketplace</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight text-white">
            Shop smarter with <span className="text-amber-300">flexible EMIs</span>
          </h1>

          <p className="text-sm sm:text-base text-purple-100 leading-relaxed font-normal">
            Upgrade to the latest flagship smartphones with zero down payment, instant pre-approved credit limits, and zero-cost EMI plans.
          </p>

          {/* Quick Value Badges */}
          <div className="pt-2 flex flex-wrap gap-3 text-xs font-semibold text-white">
            <span className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md border border-white/20 px-3.5 py-2 rounded-xl">
              <Zap className="w-4 h-4 text-amber-300" /> 0% Interest Plans
            </span>
            <span className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md border border-white/20 px-3.5 py-2 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-emerald-300" /> Pre-approved Credit
            </span>
            <span className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md border border-white/20 px-3.5 py-2 rounded-xl">
              <Percent className="w-4 h-4 text-sky-300" /> Up to ₹7,500 Cashback
            </span>
          </div>
        </div>
      </section>

      {/* Product Catalog Section */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-4">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <Flame className="w-6 h-6 text-orange-500" /> Explore Products
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Select your favorite smartphone to view available color & storage variants and monthly EMI options.
            </p>
          </div>

          {/* Brand Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {brands.map((brand) => (
              <button
                key={brand}
                onClick={() => setSelectedBrand(brand)}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all border shrink-0 ${
                  selectedBrand === brand
                    ? 'bg-purple-600 text-white border-purple-600 shadow-sm'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                {brand}
              </button>
            ))}
          </div>
        </div>

        {/* Content States */}
        {loading ? (
          <ProductGridSkeleton />
        ) : error ? (
          <ErrorState message={error} onRetry={fetchProductList} />
        ) : products.length === 0 ? (
          <EmptyState
            searchQuery={searchQuery}
            onReset={() => {
              if (setSearchQuery) setSearchQuery('');
              setSelectedBrand('All');
            }}
          />
        ) : (
          <ProductGrid products={products} />
        )}
      </section>
    </div>
  );
};

export default HomePage;
