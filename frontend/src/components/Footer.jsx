import React from 'react';
import { ShieldCheck, Zap, RefreshCw, Lock } from 'lucide-react';
import OneFiLogo from './OneFiLogo.jsx';

const Footer = () => {
  return (
    <footer className="bg-fintech-dark text-slate-400 text-sm mt-16 border-t border-slate-800">
      {/* Value Proposition Strip */}
      <div className="border-b border-slate-800/80 bg-slate-900/60 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-brand-500/10 text-brand-400 flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-slate-200 text-sm">Instant EMI Approval</h4>
              <p className="text-xs text-slate-400 mt-0.5">0 paper docs, 100% digital check</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-slate-200 text-sm">No Cost EMI Plans</h4>
              <p className="text-xs text-slate-400 mt-0.5">Zero interest on select tenures</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-slate-200 text-sm">Assured Cashback</h4>
              <p className="text-xs text-slate-400 mt-0.5">Up to ₹6,000 instant discount</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-slate-200 text-sm">100% Secure Checkout</h4>
              <p className="text-xs text-slate-400 mt-0.5">Bank grade 256-bit encryption</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <OneFiLogo className="w-9 h-9" />
              <span className="font-bold text-xl text-white">1Fi Marketplace</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              1Fi Marketplace is a next-generation smart fintech shopping portal empowering users to purchase premium smartphones with flexible zero-down-payment and zero-cost EMI plans.
            </p>
            <div className="text-xs text-slate-500 pt-2">
              © {new Date().getFullYear()} 1Fi Financial Technologies Pvt Ltd. All rights reserved.
            </div>
          </div>

          <div>
            <h5 className="font-semibold text-slate-200 text-xs uppercase tracking-wider mb-4">Shop Products</h5>
            <ul className="space-y-2.5 text-xs">
              <li><a href="/products?brand=Apple" className="hover:text-white transition-colors">iPhone 17 Pro</a></li>
              <li><a href="/products?brand=Samsung" className="hover:text-white transition-colors">Samsung S24 Ultra</a></li>
              <li><a href="/products?brand=Google" className="hover:text-white transition-colors">Google Pixel 9 Pro</a></li>
              <li><a href="/products" className="hover:text-white transition-colors">All Smartphones</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold text-slate-200 text-xs uppercase tracking-wider mb-4">Financing & EMIs</h5>
            <ul className="space-y-2.5 text-xs">
              <li><span className="text-slate-400">0% Interest EMI</span></li>
              <li><span className="text-slate-400">Flexible 24/36 Months</span></li>
              <li><span className="text-slate-400">Instant Credit Check</span></li>
              <li><span className="text-slate-400">Cashback Offers</span></li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold text-slate-200 text-xs uppercase tracking-wider mb-4">Support & Trust</h5>
            <ul className="space-y-2.5 text-xs">
              <li><span className="text-slate-400">Customer Help Center</span></li>
              <li><span className="text-slate-400">EMI Terms & Conditions</span></li>
              <li><span className="text-slate-400">Privacy Policy</span></li>
              <li><span className="text-slate-400">Partner Banking Institutions</span></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
