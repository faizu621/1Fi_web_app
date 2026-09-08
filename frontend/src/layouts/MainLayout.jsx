import React from 'react';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import BottomNavigation from '../components/BottomNavigation.jsx';

const MainLayout = ({ children, searchQuery, setSearchQuery }) => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F4F5F9] text-slate-900 font-sans">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {children}
      </main>
      <Footer />
      {/* Floating Bottom Nav Bar replicating 1Fi Shop App */}
      <BottomNavigation />
    </div>
  );
};

export default MainLayout;
