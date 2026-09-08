import React from 'react';
import { formatCurrency } from '../utils/formatters.js';
import { Check } from 'lucide-react';

const EMIPlanSelector = ({
  emiPlans = [],
  selectedPlan,
  onSelectPlan,
  onProceed,
}) => {
  if (!emiPlans || emiPlans.length === 0) return null;

  const currentPlan = selectedPlan || emiPlans[0];
  const tenureMonths = currentPlan?.tenure || 24;
  const cashbackAmount = currentPlan?.cashback || 7500;

  return (
    <div className="space-y-3.5 my-4">
      {/* List of Mutual Fund Backed EMI Cards */}
      <div className="space-y-3">
        {emiPlans.map((plan) => {
          const isSelected = currentPlan.id === plan.id;
          const cashbackText = plan.cashback > 0 ? `Additional cashback of ${formatCurrency(plan.cashback)}` : 'Additional cashback available';

          return (
            <div
              key={plan.id || plan.tenure}
              onClick={() => onSelectPlan(plan)}
              className={`bg-white rounded-2xl border p-4 sm:p-4.5 cursor-pointer transition-all duration-200 shadow-2xs hover:shadow-md ${
                isSelected
                  ? 'border-orange-500 ring-2 ring-orange-500/20 shadow-md bg-orange-50/10'
                  : 'border-slate-200/90 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                {/* Left: Amount x Tenure */}
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                      isSelected ? 'border-orange-500 bg-orange-500 text-white' : 'border-slate-300'
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                  <span className="font-extrabold text-slate-900 text-base sm:text-lg tracking-tight">
                    {formatCurrency(plan.monthlyAmount)} x {plan.tenure} months
                  </span>
                </div>

                {/* Right: Interest Rate */}
                <span className="font-semibold text-slate-800 text-xs sm:text-sm shrink-0">
                  {plan.interestRate === 0 ? '0% interest' : `${plan.interestRate}% interest`}
                </span>
              </div>

              {/* Subtitle: Additional Cashback */}
              <div className="pl-6.5 pt-1">
                <span className="text-xs sm:text-sm font-semibold text-emerald-600">
                  {cashbackText}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Vibrant Orange Primary Action Button - Matching Screenshot */}
      <button
        onClick={onProceed}
        className="w-full mt-4 py-4 px-6 rounded-2xl bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-extrabold text-base sm:text-lg shadow-md hover:shadow-lg transition-all flex flex-col items-center justify-center"
      >
        <span>Buy on {tenureMonths} months EMI</span>
        {cashbackAmount > 0 && (
          <span className="text-xs sm:text-sm font-medium text-white/95 mt-0.5">
            Earn {formatCurrency(cashbackAmount)} cashback on this order
          </span>
        )}
      </button>
    </div>
  );
};

export default EMIPlanSelector;
