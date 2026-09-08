import React from 'react';
import { CheckCircle2, Sparkles } from 'lucide-react';

const ProductHighlights = ({ highlights = [] }) => {
  if (!highlights || highlights.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-subtle my-6">
      <h3 className="font-bold text-base text-slate-900 mb-4 flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-brand-600" />
        Product Highlights
      </h3>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {highlights.map((item, idx) => (
          <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductHighlights;
