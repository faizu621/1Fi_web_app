import React from 'react';
import { HelpCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-16 text-center max-w-md mx-auto my-12 shadow-subtle space-y-4">
      <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto">
        <HelpCircle className="w-8 h-8" />
      </div>

      <h2 className="text-2xl font-extrabold text-slate-900">404 - Page Not Found</h2>
      <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
        The page you are looking for does not exist or has been moved.
      </p>

      <div className="pt-2">
        <Link
          to="/"
          className="inline-flex items-center gap-2 py-3 px-5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold transition-all shadow-md"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
