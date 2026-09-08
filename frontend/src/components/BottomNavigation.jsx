import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Store, IndianRupee, TrendingUp, User, Sparkles } from 'lucide-react';

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [toastMessage, setToastMessage] = useState(null);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home, active: false },
    { id: 'shop', label: 'Shop', icon: Store, active: true },
    { id: 'emi', label: 'EMI Dues', icon: IndianRupee, active: false },
    { id: 'limit', label: 'Limit', icon: TrendingUp, active: false },
    { id: 'profile', label: 'Profile', icon: User, active: false },
  ];

  const handleTabClick = (item) => {
    if (item.id === 'shop') {
      navigate('/');
    } else {
      setToastMessage(`"${item.label}" tab is currently inactive. Currently, only the "Shop" tab is active.`);
      setTimeout(() => {
        setToastMessage(null);
      }, 3500);
    }
  };

  return (
    <>
      {/* Active Tab Notification Toast */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-slate-900/90 text-white px-5 py-2.5 rounded-full text-xs font-semibold shadow-xl border border-slate-700 backdrop-blur-md flex items-center gap-2 animate-bounce">
          <Sparkles className="w-4 h-4 text-purple-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Floating Bottom Nav Bar (Exact 1Fi App Replica) */}
      <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pb-2 px-4 pointer-events-none">
        <div className="pointer-events-auto bg-white/95 backdrop-blur-lg border border-slate-200/90 shadow-[0_-4px_25px_rgba(0,0,0,0.08)] rounded-3xl sm:rounded-full px-4 sm:px-8 py-2 w-full max-w-lg flex items-center justify-between transition-all">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isShopActive = item.id === 'shop';

            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item)}
                className={`relative flex flex-col items-center justify-center flex-1 py-1 transition-all ${
                  isShopActive
                    ? 'text-purple-700 font-bold scale-105'
                    : 'text-slate-400 hover:text-slate-600 font-medium'
                }`}
              >
                {/* Active Purple Top Line Indicator */}
                {isShopActive && (
                  <span className="absolute -top-2 w-6 h-1 bg-purple-600 rounded-full animate-pulse" />
                )}

                <div className="p-1">
                  <Icon className={`w-5 h-5 transition-transform ${isShopActive ? 'text-purple-600 stroke-[2.5]' : 'stroke-[1.8]'}`} />
                </div>
                <span className="text-[11px] leading-tight mt-0.5 tracking-tight">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default BottomNavigation;
