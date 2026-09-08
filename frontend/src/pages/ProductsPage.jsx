import React, { useState, useEffect } from 'react';
import { getProducts } from '../services/productService.js';
import ProductGrid from '../components/ProductGrid.jsx';
import { ProductGridSkeleton } from '../components/LoadingSkeleton.jsx';
import ErrorState from '../components/ErrorState.jsx';
import EmptyState from '../components/EmptyState.jsx';
import { Filter, SlidersHorizontal, ArrowLeft } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';

const ProductsPage = ({ searchQuery = '', setSearchQuery }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const brandQuery = searchParams.get('brand') || 'All';
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(brandQuery);

  useEffect(() => {
    setSelectedBrand(searchParams.get('brand') || 'All');
  }, [searchParams]);

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
      console.error('Error fetching products:', err);
      setError(err.message || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductList();
  }, [searchQuery, selectedBrand]);

  const handleBrandChange = (brand) => {
    setSelectedBrand(brand);
    if (brand === 'All') {
      searchParams.delete('brand');
    } else {
      searchParams.set('brand', brand);
    }
    setSearchParams(searchParams);
  };

  const brands = ['All', 'Apple', 'Samsung', 'Google'];

  return (
    <div className="space-y-8">
      {/* Header Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
            <Link to="/" className="hover:text-brand-600">Home</Link>
            <span>/</span>
            <span className="font-semibold text-slate-900">Products</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            All Smartphones on EMI
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Compare flagship mobile devices and zero cost EMI monthly payment plans.
          </p>
        </div>

        {/* Brand Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          <SlidersHorizontal className="w-4 h-4 text-slate-400 shrink-0 mr-1" />
          {brands.map((brand) => (
            <button
              key={brand}
              onClick={() => handleBrandChange(brand)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border shrink-0 ${
                selectedBrand === brand
                  ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
              }`}
            >
              {brand}
            </button>
          ))}
        </div>
      </div>

      {/* Grid or States */}
      {loading ? (
        <ProductGridSkeleton />
      ) : error ? (
        <ErrorState message={error} onRetry={fetchProductList} />
      ) : products.length === 0 ? (
        <EmptyState
          searchQuery={searchQuery}
          onReset={() => {
            if (setSearchQuery) setSearchQuery('');
            handleBrandChange('All');
          }}
        />
      ) : (
        <ProductGrid products={products} />
      )}
    </div>
  );
};

export default ProductsPage;
