import React from 'react';
import { AlertTriangle, RefreshCw, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const ErrorState = ({ message = 'Unable to load product information.', onRetry }) => {
  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-12 text-center max-w-lg mx-auto my-12 shadow-subtle space-y-4">
      <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto">
        <AlertTriangle className="w-8 h-8" />
      </div>

      <h3 className="font-extrabold text-xl text-slate-900">Connection Error</h3>
      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{message}</p>

      <div className="flex items-center justify-center gap-3 pt-4">
        {onRetry && (
          <button
            onClick={onRetry}
            className="py-2.5 px-5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md shadow-brand-500/20 flex items-center gap-2 transition-all"
          >
            <RefreshCw className="w-4 h-4" /> Try Again
          </button>
        )}
        <Link
          to="/products"
          className="py-2.5 px-5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center gap-2 transition-all"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Marketplace
        </Link>
      </div>
    </div>
  );
};

export default ErrorState;
