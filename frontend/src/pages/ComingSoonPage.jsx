import React from 'react';
import { Clock, ArrowLeft, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const ComingSoonPage = ({ title = 'Top Brands & Nearby Stores' }) => {
  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-16 text-center max-w-lg mx-auto my-12 shadow-subtle space-y-6">
      <div className="w-16 h-16 bg-brand-50 text-brand-600 rounded-full flex items-center justify-center mx-auto border border-brand-100">
        <Clock className="w-8 h-8" />
      </div>

      <div className="space-y-2">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
          <Sparkles className="w-3.5 h-3.5" /> Feature Preview
        </span>
        <h2 className="text-2xl font-extrabold text-slate-900">{title}</h2>
        <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">
          We are partnering with top brand outlets and local offline stores near you. Store discovery and direct pickup will be available soon!
        </p>
      </div>

      <div className="pt-2">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 py-3 px-6 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-md"
        >
          <ArrowLeft className="w-4 h-4" /> Explore 1Fi Marketplace
        </Link>
      </div>
    </div>
  );
};

export default ComingSoonPage;
