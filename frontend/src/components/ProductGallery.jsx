import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';

const ProductGallery = ({ images = [], currentVariantImage, productName, cashbackBadge = '1% Cashback', rating = 4.2 }) => {
  const [selectedImage, setSelectedImage] = useState(currentVariantImage || images[0]);

  // Update image when selected variant image changes
  useEffect(() => {
    if (currentVariantImage) {
      setSelectedImage(currentVariantImage);
    } else if (images.length > 0) {
      setSelectedImage(images[0]);
    }
  }, [currentVariantImage, images]);

  // Build vertical gallery thumbnail list
  const allImages = React.useMemo(() => {
    const list = [...images];
    if (currentVariantImage && !list.includes(currentVariantImage)) {
      list.unshift(currentVariantImage);
    }
    return list.length ? list : ['https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=1000&q=80'];
  }, [images, currentVariantImage]);

  // Up to 5 visible thumbs + 1 "+2" thumb box if extra
  const visibleThumbs = allImages.slice(0, 5);
  const extraCount = allImages.length > 5 ? allImages.length - 5 : 0;

  return (
    <div className="flex flex-row gap-4 items-start">
      {/* Left Vertical Thumbnail Stack */}
      <div className="flex flex-col gap-2.5 shrink-0">
        {visibleThumbs.map((imgUrl, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedImage(imgUrl)}
            className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl border-2 p-1 transition-all bg-white flex items-center justify-center overflow-hidden shrink-0 ${
              selectedImage === imgUrl
                ? 'border-orange-500 shadow-sm ring-1 ring-orange-500/30 scale-105'
                : 'border-slate-200 hover:border-slate-300 opacity-80 hover:opacity-100'
            }`}
          >
            <img
              src={imgUrl}
              alt={`${productName} thumb ${idx + 1}`}
              className="max-h-full max-w-full object-contain"
            />
          </button>
        ))}

        {extraCount > 0 && (
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl border-2 border-slate-200 bg-slate-50 flex items-center justify-center font-bold text-slate-600 text-sm">
            +{extraCount}
          </div>
        )}
      </div>

      {/* Main Image Showcase */}
      <div className="flex-1 bg-white rounded-2xl border border-slate-200/80 p-6 flex items-center justify-center relative min-h-[380px] sm:min-h-[440px] shadow-2xs group">
        <img
          src={selectedImage}
          alt={productName}
          className="max-h-[340px] sm:max-h-[400px] max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
        />

        {/* Bottom Left Badge: 1% Cashback */}
        <div className="absolute bottom-4 left-4 bg-sky-500 text-white font-bold text-xs px-3 py-1 rounded-md shadow-sm">
          {cashbackBadge}
        </div>

        {/* Bottom Right Rating Pill: 4.2 ★ */}
        <div className="absolute bottom-4 right-4 bg-white/90 border border-slate-200 text-slate-800 font-bold text-xs px-2.5 py-1 rounded-md flex items-center gap-1 shadow-2xs">
          <span>{rating}</span>
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
        </div>
      </div>
    </div>
  );
};

export default ProductGallery;
