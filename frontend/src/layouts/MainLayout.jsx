import React from 'react';
import BottomNavigation from '../components/BottomNavigation.jsx';

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F4F5F9] text-slate-900 font-sans">
      <main className="flex-1 w-full mx-auto py-0 sm:py-2">
        {children}
      </main>

      {/* Floating Bottom Nav Bar replicating 1Fi Shop App */}
      <BottomNavigation />
    </div>
  );
};

export default MainLayout;
