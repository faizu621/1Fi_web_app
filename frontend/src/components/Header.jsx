import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, ShieldCheck, Menu, X, ChevronRight, Store, Award, Sparkles } from 'lucide-react';
import OneFiLogo from './OneFiLogo.jsx';

const Header = ({ searchQuery = '', setSearchQuery }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (location.pathname !== '/' && location.pathname !== '/products') {
      navigate('/products');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm transition-all">
      {/* Top Banner */}
      <div className="bg-fintech-dark text-slate-300 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 font-medium text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" /> 100% Pre-approved Financing
            </span>
            <span className="hidden sm:inline-block text-slate-400">|</span>
            <span className="hidden sm:inline-block">Instant approval with zero paper documentation</span>
          </div>
          <div className="flex items-center gap-4 text-xs font-medium">
            <span className="text-amber-400 flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> 0% Interest EMI Available
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
            <OneFiLogo className="w-10 h-10 group-hover:scale-105 transition-transform" />
            <div className="flex flex-col">
              <span className="font-extrabold text-lg leading-tight text-slate-900 tracking-tight flex items-center gap-1">
                1Fi <span className="text-purple-600 font-bold text-sm">Marketplace</span>
              </span>
              <span className="text-[10px] text-slate-500 font-semibold tracking-wide uppercase">Smart EMI Financing</span>
            </div>
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-md mx-4 relative">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search iPhone 17 Pro, Galaxy S24, Pixel 9..."
                value={searchQuery}
                onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
                className="w-full bg-slate-100/90 text-slate-800 text-sm pl-10 pr-4 py-2.5 rounded-full border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all placeholder:text-slate-400"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            </div>
          </form>

          {/* Nav Tabs */}
          <nav className="hidden lg:flex items-center gap-1">
            <Link
              to="/products"
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors ${
                location.pathname === '/products' || location.pathname === '/'
                  ? 'bg-brand-50 text-brand-600'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              1Fi Marketplace
            </Link>
            <Link
              to="/top-brands"
              className="px-3.5 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors flex items-center gap-1.5"
            >
              <Award className="w-4 h-4 text-slate-400" />
              Top Brands
            </Link>
            <Link
              to="/nearby-stores"
              className="px-3.5 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors flex items-center gap-1.5"
            >
              <Store className="w-4 h-4 text-slate-400" />
              Nearby Stores
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-3">
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <input
              type="text"
              placeholder="Search products, brands..."
              value={searchQuery}
              onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
              className="w-full bg-slate-100 text-slate-800 text-sm pl-10 pr-4 py-2 rounded-full border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
          </form>
        </div>

        {/* Category / Sub Nav Bar */}
        <div className="border-t border-slate-100 py-2.5 flex items-center justify-between overflow-x-auto no-scrollbar text-xs font-medium text-slate-600 gap-6">
          <div className="flex items-center gap-6 whitespace-nowrap">
            <span className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">Popular Categories:</span>
            <Link to="/products?category=smartphones" className="hover:text-brand-600 transition-colors">Smartphones</Link>
            <Link to="/products?brand=Apple" className="hover:text-brand-600 transition-colors">Apple iPhones</Link>
            <Link to="/products?brand=Samsung" className="hover:text-brand-600 transition-colors">Samsung Galaxy</Link>
            <Link to="/products?brand=Google" className="hover:text-brand-600 transition-colors">Google Pixel</Link>
          </div>
          <div className="hidden md:flex items-center gap-2 text-brand-600 font-semibold shrink-0">
            <span>Low Interest EMI starts from ₹3,208/mo</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3">
          <Link
            to="/products"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md font-semibold text-slate-800 hover:bg-slate-100"
          >
            1Fi Marketplace
          </Link>
          <Link
            to="/top-brands"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-slate-600 hover:bg-slate-100"
          >
            Top Brands
          </Link>
          <Link
            to="/nearby-stores"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-slate-600 hover:bg-slate-100"
          >
            Nearby Stores
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
