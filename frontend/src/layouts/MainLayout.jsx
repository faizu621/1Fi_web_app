import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import BottomNavigation from '../components/BottomNavigation.jsx';

const MainLayout = ({ children, searchQuery, setSearchQuery }) => {
  const location = useLocation();
  // Mobile app mode on shop and product detail pages
  const isMobileAppView = location.pathname === '/' || location.pathname.startsWith('/products');

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F5F9] text-slate-900 font-sans">
      {!isMobileAppView && (
        <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      )}
      
      <main className={`flex-1 max-w-7xl w-full mx-auto ${isMobileAppView ? 'py-0 sm:py-2 px-0 sm:px-4' : 'py-6 sm:py-8 px-4 sm:px-6'}`}>
        {children}
      </main>

      {!isMobileAppView && <Footer />}

      {/* Floating Bottom Nav Bar replicating 1Fi Shop App */}
      <BottomNavigation />
    </div>
  );
};

export default MainLayout;
