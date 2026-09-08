import React from 'react';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';

const MainLayout = ({ children, searchQuery, setSearchQuery }) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
