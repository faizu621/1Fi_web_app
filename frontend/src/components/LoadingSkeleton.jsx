import React from 'react';

export const ProductCardSkeleton = () => (
  <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-subtle animate-pulse flex flex-col justify-between h-[420px]">
    <div>
      <div className="h-4 bg-slate-200 rounded w-1/4 mb-4"></div>
      <div className="h-44 bg-slate-100 rounded-xl mb-4"></div>
      <div className="h-5 bg-slate-200 rounded w-3/4 mb-2"></div>
      <div className="h-3 bg-slate-100 rounded w-full mb-1"></div>
      <div className="h-3 bg-slate-100 rounded w-2/3 mb-4"></div>
    </div>
    <div>
      <div className="h-6 bg-slate-200 rounded w-1/2 mb-3"></div>
      <div className="h-10 bg-slate-200 rounded-xl w-full"></div>
    </div>
  </div>
);

export const ProductGridSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
    {[1, 2, 3].map((n) => (
      <ProductCardSkeleton key={n} />
    ))}
  </div>
);

export const ProductDetailSkeleton = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-pulse space-y-8">
    <div className="h-4 bg-slate-200 rounded w-1/3"></div>

    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
      {/* Left Gallery Skeleton */}
      <div className="lg:col-span-6 flex gap-4">
        <div className="hidden sm:flex flex-col gap-3">
          {[1, 2, 3].map((n) => (
            <div key={n} className="w-16 h-16 bg-slate-200 rounded-xl"></div>
          ))}
        </div>
        <div className="flex-1 h-[420px] bg-slate-200 rounded-3xl"></div>
      </div>

      {/* Right Form Skeleton */}
      <div className="lg:col-span-6 space-y-6">
        <div className="h-4 bg-slate-200 rounded w-1/4"></div>
        <div className="h-8 bg-slate-200 rounded w-3/4"></div>
        <div className="h-20 bg-slate-100 rounded-2xl"></div>
        <div className="h-16 bg-slate-200 rounded-xl"></div>
        <div className="h-32 bg-slate-100 rounded-2xl"></div>
        <div className="h-12 bg-slate-300 rounded-2xl"></div>
      </div>
    </div>
  </div>
);

export default {
  ProductCardSkeleton,
  ProductGridSkeleton,
  ProductDetailSkeleton,
};
