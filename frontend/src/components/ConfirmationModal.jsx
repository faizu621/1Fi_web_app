import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, Sparkles, ArrowRight, Gift, CreditCard } from 'lucide-react';
import { formatCurrency, formatTenure } from '../utils/formatters.js';
import OneFiLogo from './OneFiLogo.jsx';

const ConfirmationModal = ({ isOpen, onClose, product, selectedVariant, selectedEmiPlan }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen || !product || !selectedVariant || !selectedEmiPlan) return null;

  const handleConfirm = () => {
    setIsSubmitted(true);
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-100 overflow-hidden transform transition-all">
        
        {/* Modal Header */}
        <div className="bg-fintech-dark text-white px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <OneFiLogo className="w-8 h-8" rounded="rounded-lg" />
            <div>
              <h3 className="font-bold text-base text-white">Review your purchase</h3>
              <p className="text-[11px] text-slate-400">Step 1 of 2 • Pre-approved Financing</p>
            </div>
          </div>
          <button
            onClick={handleResetAndClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {!isSubmitted ? (
            <>
              {/* Product & Variant Card */}
              <div className="flex gap-4 p-4 bg-slate-50 border border-slate-200/80 rounded-2xl">
                <img
                  src={selectedVariant.image || product.images?.[0]}
                  alt={product.name}
                  className="w-16 h-16 object-contain shrink-0 bg-white p-1 rounded-xl border"
                />
                <div className="flex-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    {product.brand}
                  </span>
                  <h4 className="font-bold text-slate-900 text-sm line-clamp-1">{product.name}</h4>
                  <div className="flex items-center gap-2 mt-1 text-xs text-slate-600 font-medium">
                    <span className="bg-white px-2 py-0.5 rounded border border-slate-200 text-[11px]">
                      {selectedVariant.storage}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <span
                        className="w-3 h-3 rounded-full border inline-block"
                        style={{ backgroundColor: selectedVariant.colorCode || '#000' }}
                      />
                      {selectedVariant.color}
                    </span>
                  </div>
                </div>
              </div>

              {/* Financing Breakdown */}
              <div className="space-y-3">
                <h5 className="font-bold text-xs uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <CreditCard className="w-4 h-4 text-brand-600" /> EMI Loan Summary
                </h5>

                <div className="bg-brand-50/60 border border-brand-100 rounded-2xl p-4 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-600">Monthly EMI Payment:</span>
                    <span className="text-lg font-extrabold text-brand-700">
                      {formatCurrency(selectedEmiPlan.monthlyAmount)}
                      <span className="text-xs font-normal text-slate-500"> / month</span>
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1 border-t border-brand-200/50">
                    <span className="text-slate-600">Financing Tenure:</span>
                    <span className="font-bold text-slate-900">{formatTenure(selectedEmiPlan.tenure)}</span>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-600">Interest Rate:</span>
                    <span className="font-bold text-emerald-700">
                      {selectedEmiPlan.interestRate === 0 ? '0% Interest (No Cost EMI)' : `${selectedEmiPlan.interestRate}% APR`}
                    </span>
                  </div>

                  {selectedEmiPlan.cashback > 0 && (
                    <div className="flex items-center justify-between text-xs text-emerald-700 font-semibold bg-emerald-100/60 p-2 rounded-lg">
                      <span className="flex items-center gap-1">
                        <Gift className="w-3.5 h-3.5" /> Direct Instant Cashback
                      </span>
                      <span>+{formatCurrency(selectedEmiPlan.cashback)}</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-xs pt-2 border-t border-brand-200/50">
                    <span className="text-slate-600">Total Net Amount:</span>
                    <span className="font-extrabold text-slate-900">{formatCurrency(selectedEmiPlan.totalAmount)}</span>
                  </div>
                </div>
              </div>

              {/* Trust Footer */}
              <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-100/80 p-3 rounded-xl">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Zero documentation fee. Pre-approved limit applied.</span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={handleResetAndClose}
                  className="flex-1 py-3 px-4 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-colors"
                >
                  Back to Product
                </button>
                <button
                  onClick={handleConfirm}
                  className="flex-1 py-3 px-4 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-md shadow-brand-500/20 flex items-center justify-center gap-1.5 transition-all"
                >
                  <span>Continue Application</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </>
          ) : (
            /* Success State */
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="font-extrabold text-xl text-slate-900">Application Submitted!</h4>
              <p className="text-xs text-slate-600 max-w-xs mx-auto leading-relaxed">
                Your EMI plan for <span className="font-bold text-slate-800">{product.name} ({selectedVariant.name})</span> at <span className="font-bold text-brand-600">{formatCurrency(selectedEmiPlan.monthlyAmount)}/mo</span> has been processed.
              </p>
              <div className="p-4 bg-slate-50 border rounded-2xl text-left text-xs space-y-1 text-slate-600">
                <div className="flex justify-between">
                  <span>Application Reference:</span>
                  <span className="font-mono font-bold text-slate-900">#1FI-FIN-{Math.floor(100000 + Math.random() * 900000)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Status:</span>
                  <span className="font-bold text-emerald-600">Instant Approved</span>
                </div>
              </div>
              <button
                onClick={handleResetAndClose}
                className="w-full py-3 px-4 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors"
              >
                Back to Marketplace
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
