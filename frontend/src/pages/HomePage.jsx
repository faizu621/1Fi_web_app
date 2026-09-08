import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProducts } from '../services/productService.js';
import ProductGrid from '../components/ProductGrid.jsx';
import { ProductGridSkeleton } from '../components/LoadingSkeleton.jsx';
import ErrorState from '../components/ErrorState.jsx';
import EmptyState from '../components/EmptyState.jsx';
import bannerImage from '../assets/image copy.png';
import { Search, Sparkles, MapPin, ChevronRight, Flame } from 'lucide-react';

const HomePage = ({ searchQuery = '', setSearchQuery }) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('top-brands'); // Options: 'top-brands', 'nearby-stores', 'marketplace'
  const [selectedBrand, setSelectedBrand] = useState('All');

  const topBrandsData = [
    {
      id: 'air-india',
      name: 'Air India',
      emiText: 'No-cost EMIs upto 18 months',
      badgeColor: 'bg-red-600 text-white font-black text-xs p-3 rounded-2xl flex items-center justify-center w-14 h-14',
      logoText: 'AIR INDIA',
      category: 'Travel'
    },
    {
      id: 'apple-reseller',
      name: 'Apple Premium Reseller',
      emiText: 'No-cost EMIs upto 24 months',
      badgeColor: 'bg-black text-white font-bold text-xs p-2 rounded-2xl flex flex-col items-center justify-center w-14 h-14',
      logoText: ' Reseller',
      category: 'Electronics'
    },
    {
      id: 'caratlane',
      name: 'CaratLane',
      emiText: 'No-cost EMIs upto 6 months',
      badgeColor: 'bg-purple-900 text-amber-200 font-bold text-[10px] p-2 rounded-2xl flex items-center justify-center w-14 h-14 text-center leading-tight',
      logoText: 'CARATLANE',
      category: 'Jewelry'
    },
    {
      id: 'cgh-earth',
      name: 'CGH Earth',
      emiText: 'No-cost EMIs upto 24 months',
      badgeColor: 'bg-stone-100 text-stone-800 border border-stone-300 font-semibold text-[10px] p-2 rounded-2xl flex items-center justify-center w-14 h-14 text-center leading-tight',
      logoText: 'cgh earth',
      category: 'Hospitality'
    },
    {
      id: 'croma',
      name: 'Croma',
      emiText: 'No-cost EMIs upto 6 months',
      badgeColor: 'bg-teal-700 text-white font-extrabold text-xs p-2 rounded-2xl flex items-center justify-center w-14 h-14',
      logoText: 'cromā',
      category: 'Electronics'
    },
    {
      id: 'easemytrip',
      name: 'EaseMyTrip Holiday',
      emiText: 'No-cost EMIs upto 24 months',
      badgeColor: 'bg-sky-600 text-white font-bold text-[9px] p-2 rounded-2xl flex items-center justify-center w-14 h-14 text-center leading-tight',
      logoText: 'EaseMyTrip',
      category: 'Travel'
    },
    {
      id: 'flipkart',
      name: 'Flipkart',
      emiText: 'No-cost EMIs upto 24 months',
      badgeColor: 'bg-blue-600 text-yellow-300 font-extrabold text-xs p-2 rounded-2xl flex items-center justify-center w-14 h-14',
      logoText: 'FK',
      category: 'Shopping'
    },
    {
      id: 'makemytrip',
      name: 'MakeMyTrip',
      emiText: 'No-cost EMIs upto 18 months',
      badgeColor: 'bg-red-500 text-white font-black text-xs p-2 rounded-2xl flex items-center justify-center w-14 h-14',
      logoText: 'MMT',
      category: 'Travel'
    },
    {
      id: 'samsung',
      name: 'Samsung Flagship Store',
      emiText: 'No-cost EMIs upto 24 months',
      badgeColor: 'bg-blue-900 text-white font-extrabold text-xs p-2 rounded-2xl flex items-center justify-center w-14 h-14',
      logoText: 'SAMSUNG',
      category: 'Electronics'
    }
  ];

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

  const filteredBrands = topBrandsData.filter((b) =>
    b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.emiText.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full space-y-5 pb-28">
      {/* 1. Official Hero Banner Image (NOT rounded, exact image copy.png) */}
      <div className="w-full relative shadow-sm overflow-hidden">
        <img
          src={bannerImage}
          alt="Shop today, Pay later using Mutual funds"
          className="w-full h-auto object-cover block"
        />
      </div>

      {/* 2. Sub-Header Tabs (Half height overlapping the banner bottom) */}
      <div className="relative -mt-8 sm:-mt-10 z-20 max-w-xl mx-auto px-4">
        <div className="bg-[#EAEBF0]/95 backdrop-blur-md p-1.5 rounded-full flex items-center justify-between shadow-xl border border-white/80 text-xs sm:text-sm font-extrabold gap-1">
          <button
            onClick={() => setActiveTab('top-brands')}
            className={`flex-1 py-2.5 rounded-full transition-all text-center flex flex-col items-center justify-center ${
              activeTab === 'top-brands'
                ? 'bg-white text-purple-700 shadow-md font-bold'
                : 'text-slate-600 hover:text-slate-900 font-semibold'
            }`}
          >
            <span>Top Brands</span>
            {activeTab === 'top-brands' && (
              <span className="w-6 h-0.5 bg-purple-600 rounded-full mt-0.5" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('nearby-stores')}
            className={`flex-1 py-2.5 rounded-full transition-all text-center flex flex-col items-center justify-center ${
              activeTab === 'nearby-stores'
                ? 'bg-white text-purple-700 shadow-md font-bold'
                : 'text-slate-600 hover:text-slate-900 font-semibold'
            }`}
          >
            <span>Nearby Stores</span>
            {activeTab === 'nearby-stores' && (
              <span className="w-6 h-0.5 bg-purple-600 rounded-full mt-0.5" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('marketplace')}
            className={`flex-1 py-2.5 rounded-full transition-all text-center flex flex-col items-center justify-center ${
              activeTab === 'marketplace'
                ? 'bg-white text-purple-700 shadow-md font-bold'
                : 'text-slate-600 hover:text-slate-900 font-semibold'
            }`}
          >
            <span className="flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              1Fi Marketplace
            </span>
            {activeTab === 'marketplace' && (
              <span className="w-6 h-0.5 bg-purple-600 rounded-full mt-0.5" />
            )}
          </button>
        </div>
      </div>

      {/* Content wrapper with max-width for Search & Cards */}
      <div className="max-w-2xl mx-auto space-y-5 px-3 sm:px-4">
        {/* 3. Search Input Bar */}
        <div className="relative w-full">
          <input
            type="text"
            placeholder={
              activeTab === 'marketplace'
                ? 'Search iPhone 17 Pro, Galaxy S24, Pixel 9...'
                : activeTab === 'top-brands'
                ? 'Search online stores...'
                : 'Search nearby retailer stores...'
            }
            value={searchQuery}
            onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
            className="w-full bg-white text-slate-800 text-sm pl-12 pr-4 py-3.5 rounded-full border border-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all placeholder:text-slate-400"
          />
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
        </div>

        {/* TAB CONTENT SECTIONS */}

        {/* Tab A: Top Brands */}
        {activeTab === 'top-brands' && (
          <div className="space-y-5">
            <div className="flex items-center justify-between pt-1">
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                Top Brands
              </h2>
              <span className="text-xs text-purple-600 font-semibold">
                {filteredBrands.length} Partners
              </span>
            </div>

            <div className="space-y-3">
              {filteredBrands.map((brand) => (
                <div
                  key={brand.id}
                  onClick={() => setActiveTab('marketplace')}
                  className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex items-center justify-between gap-4 cursor-pointer group"
                >
                  <div className="flex items-center gap-4">
                    <div className={brand.badgeColor}>
                      {brand.logoText}
                    </div>
                    <div>
                      <h3 className="font-extrabold text-slate-900 text-base group-hover:text-purple-600 transition-colors">
                        {brand.name}
                      </h3>
                      <p className="text-xs text-slate-500 font-medium mt-0.5">
                        {brand.emiText}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-xs font-semibold text-purple-600 bg-purple-50 px-3 py-1.5 rounded-full group-hover:bg-purple-600 group-hover:text-white transition-colors">
                    <span>Shop</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab B: Nearby Stores */}
        {activeTab === 'nearby-stores' && (
          <div className="bg-white rounded-3xl p-8 border border-slate-200 text-center space-y-4 shadow-sm">
            <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto">
              <MapPin className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Nearby Retail Partner Stores</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Discover offline retail stores accepting 1Fi Mutual Fund Backed EMIs in your location.
            </p>
            <div className="inline-block bg-purple-50 text-purple-700 px-4 py-2 rounded-full text-xs font-semibold border border-purple-200">
              📍 Location Services Active
            </div>
          </div>
        )}

        {/* Tab C: 1Fi Marketplace (Full Implementation) */}
        {activeTab === 'marketplace' && (
          <div className="space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                  <Flame className="w-6 h-6 text-orange-500" /> 1Fi Smartphone Marketplace
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Buy flagship smartphones on Mutual Fund Backed No-Cost EMIs
                </p>
              </div>

              {/* Brand Filter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
                {['All', 'Apple', 'Samsung', 'Google'].map((b) => (
                  <button
                    key={b}
                    onClick={() => setSelectedBrand(b)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all border shrink-0 ${
                      selectedBrand === b
                        ? 'bg-purple-600 text-white border-purple-600 shadow-sm'
                        : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            {/* Product Grid State (1 Card Per Row) */}
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
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
