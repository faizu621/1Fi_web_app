import React from 'react';
import { Star, CheckCircle, Image as ImageIcon } from 'lucide-react';

const ReviewsSection = ({ reviews = [], overallRating = 4.2 }) => {
  if (!reviews || reviews.length === 0) return null;

  return (
    <div className="pt-8 border-t border-slate-200/80 my-8 space-y-6">
      <div>
        <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
          Review & Rating
        </h3>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-2xl font-black text-slate-900">{overallRating}</span>
          <div className="flex items-center text-amber-400">
            <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
          </div>
          <span className="text-sm font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded">
            Excellent
          </span>
        </div>
      </div>

      {/* Customer Review Feed */}
      <div className="space-y-6">
        {reviews.map((rev) => (
          <div key={rev.id || rev.author} className="space-y-2 border-b border-slate-100 pb-5">
            {/* Stars */}
            <div className="flex items-center gap-1">
              {[...Array(rev.rating || 5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
              <span className="text-xs font-bold text-slate-700 ml-1">{rev.rating}</span>
            </div>

            {/* Review Variant Tag */}
            <p className="text-xs text-slate-500 font-medium">
              Review for: <span className="text-slate-700 font-semibold">{rev.reviewVariant}</span>
            </p>

            {/* Comment Body */}
            <p className="text-sm font-medium text-slate-800 leading-relaxed">
              {rev.comment}
            </p>

            {/* Optional Attachment */}
            {rev.imageAttachment && (
              <div className="pt-1">
                <div className="w-20 h-20 rounded-xl border border-slate-200 overflow-hidden bg-slate-50 flex flex-col items-center justify-center text-slate-500 hover:opacity-90 cursor-pointer">
                  <img src={rev.imageAttachment} alt="Review attachment" className="w-full h-full object-cover" />
                </div>
                <span className="text-[11px] text-slate-500 font-medium mt-1 inline-block">Review attachment</span>
              </div>
            )}

            {/* Reviewer Metadata */}
            <div className="flex items-center gap-2 text-xs text-slate-600 pt-1">
              <span className="font-bold text-slate-900">{rev.author}, {rev.location}</span>
              <span>•</span>
              <span className="flex items-center gap-1 text-slate-500">
                <CheckCircle className="w-3.5 h-3.5 text-slate-400" />
                Verified buyer
              </span>
              <span>•</span>
              <span className="text-slate-400">{rev.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsSection;
