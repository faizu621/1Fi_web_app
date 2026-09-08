import React, { useState } from 'react';
import { Cpu, Box, Truck, ShieldCheck } from 'lucide-react';

const ProductSpecifications = ({ specifications = [], includedItems = [], deliveryInfo }) => {
  const [activeTab, setActiveTab] = useState('specs');

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-subtle my-6">
      {/* Tabs Header */}
      <div className="flex border-b border-slate-200 gap-6 text-sm font-semibold mb-6">
        <button
          onClick={() => setActiveTab('specs')}
          className={`pb-3 transition-all flex items-center gap-2 relative ${
            activeTab === 'specs'
              ? 'text-brand-600 border-b-2 border-brand-600'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Cpu className="w-4 h-4" /> Technical Specifications
        </button>

        <button
          onClick={() => setActiveTab('box')}
          className={`pb-3 transition-all flex items-center gap-2 relative ${
            activeTab === 'box'
              ? 'text-brand-600 border-b-2 border-brand-600'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Box className="w-4 h-4" /> What's Included
        </button>

        <button
          onClick={() => setActiveTab('delivery')}
          className={`pb-3 transition-all flex items-center gap-2 relative ${
            activeTab === 'delivery'
              ? 'text-brand-600 border-b-2 border-brand-600'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Truck className="w-4 h-4" /> Delivery & Warranty
        </button>
      </div>

      {/* Specifications Tab */}
      {activeTab === 'specs' && (
        <div className="divide-y divide-slate-100">
          {specifications.map((spec, idx) => (
            <div key={idx} className="py-3 grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs sm:text-sm">
              <span className="font-semibold text-slate-600">{spec.label}</span>
              <span className="sm:col-span-2 text-slate-800 font-medium">{spec.value}</span>
            </div>
          ))}
        </div>
      )}

      {/* Included Items Tab */}
      {activeTab === 'box' && (
        <div className="space-y-3">
          <p className="text-xs text-slate-500">The retail box includes the following original manufacturer accessories:</p>
          <ul className="space-y-2.5">
            {includedItems.map((item, idx) => (
              <li key={idx} className="flex items-center gap-3 text-xs sm:text-sm font-medium text-slate-800 bg-slate-50 p-3 rounded-xl border border-slate-100">
                <Box className="w-4 h-4 text-brand-500" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Delivery & Warranty Tab */}
      {activeTab === 'delivery' && (
        <div className="space-y-4">
          <div className="p-4 bg-brand-50/50 border border-brand-100 rounded-xl flex items-start gap-3">
            <Truck className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
            <div>
              <h5 className="font-bold text-slate-900 text-sm">Express Shipping</h5>
              <p className="text-xs text-slate-600 mt-0.5">{deliveryInfo || 'Free Express Delivery in 2-4 business days.'}</p>
            </div>
          </div>

          <div className="p-4 bg-emerald-50/50 border border-emerald-100 rounded-xl flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <h5 className="font-bold text-slate-900 text-sm">1 Year Brand Warranty</h5>
              <p className="text-xs text-slate-600 mt-0.5">Includes 1-Year Official Manufacturer Warranty and 7-day replacement policy.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductSpecifications;
