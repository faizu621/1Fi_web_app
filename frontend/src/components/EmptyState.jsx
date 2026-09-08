import React from 'react';
import { SearchX, RotateCcw } from 'lucide-react';

const EmptyState = ({ searchQuery, onReset }) => {
  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-12 text-center max-w-md mx-auto my-12 shadow-subtle space-y-4">
      <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto">
        <SearchX className="w-8 h-8" />
      </div>

      <h3 className="font-bold text-lg text-slate-900">No products found</h3>
      <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
        {searchQuery
          ? `We couldn't find any match for "${searchQuery}". Try searching for another product or brand.`
          : 'No products available matching the selected criteria.'}
      </p>

      {onReset && (
        <button
          onClick={onReset}
          className="py-2.5 px-5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 mx-auto transition-all"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Clear Filters
        </button>
      )}
    </div>
  );
};

export default EmptyState;
