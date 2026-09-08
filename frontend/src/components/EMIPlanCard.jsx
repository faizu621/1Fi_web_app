import React from 'react';
import { Check, Star, Gift, ShieldAlert } from 'lucide-react';
import { formatCurrency, formatTenure } from '../utils/formatters.js';

const EMIPlanCard = ({ plan, isSelected, onSelect }) => {
  if (!plan) return null;

  return (
    <div
      onClick={onSelect}
      className={`relative cursor-pointer rounded-2xl border-2 p-5 transition-all duration-200 flex flex-col justify-between ${
        isSelected
          ? 'bg-white border-brand-600 shadow-lg ring-4 ring-brand-500/10 scale-[1.01]'
          : 'bg-white border-slate-200/90 hover:border-slate-300 hover:shadow-md'
      }`}
    >
      {/* Recommended Tag */}
      {plan.isRecommended && (
        <div className="absolute -top-3.5 left-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-[10px] font-extrabold uppercase tracking-wider px-3 py-0.5 rounded-full shadow-sm flex items-center gap-1 z-10">
          <Star className="w-3 h-3 fill-white" /> Recommended Plan
        </div>
      )}

      {/* Selected Indicator Pill */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <div>
          <span className="text-2xl font-extrabold text-slate-900 tracking-tight">
            {formatCurrency(plan.monthlyAmount)}
            <span className="text-xs font-normal text-slate-500"> / month</span>
          </span>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded">
              {formatTenure(plan.tenure)}
            </span>
            <span
              className={`text-xs font-bold px-2 py-0.5 rounded ${
                plan.interestRate === 0
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                  : 'bg-slate-100 text-slate-700'
              }`}
            >
              {plan.interestRate === 0 ? '0% Interest' : `${plan.interestRate}% Interest`}
            </span>
          </div>
        </div>

        {/* Radio Checkbox */}
        <div
          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all shrink-0 mt-1 ${
            isSelected
              ? 'bg-brand-600 border-brand-600 text-white shadow-xs'
              : 'border-slate-300 bg-white'
          }`}
        >
          {isSelected && <Check className="w-4 h-4 stroke-[3]" />}
        </div>
      </div>

      {/* Cashback & Fees Footer */}
      <div className="mt-3 pt-3 border-t border-slate-100 space-y-1.5 text-xs">
        {plan.cashback > 0 && (
          <div className="flex items-center justify-between text-emerald-700 font-semibold bg-emerald-50/80 p-2 rounded-lg border border-emerald-100">
            <span className="flex items-center gap-1.5">
              <Gift className="w-3.5 h-3.5" /> Instant Cashback
            </span>
            <span>+{formatCurrency(plan.cashback)}</span>
          </div>
        )}

        <div className="flex items-center justify-between text-slate-500 pt-1 text-[11px]">
          <span>Processing Fee:</span>
          <span className="font-medium text-slate-700">
            {plan.processingFee > 0 ? formatCurrency(plan.processingFee) : 'Free (₹0)'}
          </span>
        </div>

        <div className="flex items-center justify-between text-slate-500 text-[11px]">
          <span>Total Payable:</span>
          <span className="font-bold text-slate-900">{formatCurrency(plan.totalAmount)}</span>
        </div>
      </div>
    </div>
  );
};

export default EMIPlanCard;
