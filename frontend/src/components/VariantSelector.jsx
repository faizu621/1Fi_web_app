import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, HardDrive, Palette } from 'lucide-react';

const VariantSelector = ({ variants = [], selectedVariant, onSelectVariant }) => {
  const [colorDropdownOpen, setColorDropdownOpen] = useState(false);
  const [storageDropdownOpen, setStorageDropdownOpen] = useState(false);

  const colorRef = useRef(null);
  const storageRef = useRef(null);

  if (!variants || variants.length === 0) return null;

  const colorOptions = Array.from(new Set(variants.map((v) => v.color)));
  const storageOptions = Array.from(new Set(variants.map((v) => v.storage)));

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (colorRef.current && !colorRef.current.contains(event.target)) {
        setColorDropdownOpen(false);
      }
      if (storageRef.current && !storageRef.current.contains(event.target)) {
        setStorageDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectColor = (chosenColor) => {
    const match =
      variants.find((v) => v.color === chosenColor && v.storage === selectedVariant.storage) ||
      variants.find((v) => v.color === chosenColor);
    if (match) onSelectVariant(match);
    setColorDropdownOpen(false);
  };

  const handleSelectStorage = (chosenStorage) => {
    const match =
      variants.find((v) => v.storage === chosenStorage && v.color === selectedVariant.color) ||
      variants.find((v) => v.storage === chosenStorage);
    if (match) onSelectVariant(match);
    setStorageDropdownOpen(false);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100 mt-4 relative z-30">
      
      {/* 1. Custom Color Dropdown */}
      <div className="relative" ref={colorRef}>
        <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
          <Palette className="w-3.5 h-3.5 text-orange-500" /> Color
        </label>
        
        {/* Toggle Button */}
        <button
          type="button"
          onClick={() => {
            setColorDropdownOpen(!colorDropdownOpen);
            setStorageDropdownOpen(false);
          }}
          className={`w-full bg-white border-2 rounded-xl py-2.5 px-3.5 text-left text-xs font-bold text-slate-800 flex items-center justify-between transition-all shadow-2xs ${
            colorDropdownOpen
              ? 'border-orange-500 ring-2 ring-orange-500/20 shadow-md'
              : 'border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center gap-2">
            <span
              className="w-4 h-4 rounded-full border border-black/15 shadow-2xs shrink-0"
              style={{ backgroundColor: selectedVariant.colorCode || '#E3E4E5' }}
            />
            <span>{selectedVariant.color}</span>
          </div>
          <ChevronDown
            className={`w-4 h-4 text-slate-400 transform transition-transform duration-200 ${
              colorDropdownOpen ? 'rotate-180 text-orange-500' : ''
            }`}
          />
        </button>

        {/* Dropdown Menu Popover */}
        {colorDropdownOpen && (
          <div className="absolute left-0 right-0 mt-1.5 bg-white/95 backdrop-blur-md border border-slate-200 rounded-2xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
            {colorOptions.map((c) => {
              const matchingVar = variants.find((v) => v.color === c);
              const isSelected = selectedVariant.color === c;
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => handleSelectColor(c)}
                  className={`w-full px-3.5 py-2.5 text-xs font-semibold flex items-center justify-between transition-colors ${
                    isSelected
                      ? 'bg-orange-50/80 text-orange-600 font-bold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className="w-4 h-4 rounded-full border border-black/15 shadow-2xs shrink-0"
                      style={{ backgroundColor: matchingVar?.colorCode || '#000' }}
                    />
                    <span>{c}</span>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-orange-500 stroke-[3]" />}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* 2. Custom Variant / Storage Dropdown */}
      <div className="relative" ref={storageRef}>
        <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
          <HardDrive className="w-3.5 h-3.5 text-orange-500" /> Variant
        </label>
        
        {/* Toggle Button */}
        <button
          type="button"
          onClick={() => {
            setStorageDropdownOpen(!storageDropdownOpen);
            setColorDropdownOpen(false);
          }}
          className={`w-full bg-white border-2 rounded-xl py-2.5 px-3.5 text-left text-xs font-bold text-slate-800 flex items-center justify-between transition-all shadow-2xs ${
            storageDropdownOpen
              ? 'border-orange-500 ring-2 ring-orange-500/20 shadow-md'
              : 'border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="bg-slate-100 text-slate-700 font-bold text-[10px] px-1.5 py-0.5 rounded border">
              Storage
            </span>
            <span>Storage: {selectedVariant.storage}, RAM: null</span>
          </div>
          <ChevronDown
            className={`w-4 h-4 text-slate-400 transform transition-transform duration-200 ${
              storageDropdownOpen ? 'rotate-180 text-orange-500' : ''
            }`}
          />
        </button>

        {/* Dropdown Menu Popover */}
        {storageDropdownOpen && (
          <div className="absolute left-0 right-0 mt-1.5 bg-white/95 backdrop-blur-md border border-slate-200 rounded-2xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
            {storageOptions.map((s) => {
              const isSelected = selectedVariant.storage === s;
              return (
                <button
                  key={s}
                  type="button"
                  onClick={() => handleSelectStorage(s)}
                  className={`w-full px-3.5 py-2.5 text-xs font-semibold flex items-center justify-between transition-colors ${
                    isSelected
                      ? 'bg-orange-50/80 text-orange-600 font-bold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <HardDrive className={`w-3.5 h-3.5 ${isSelected ? 'text-orange-500' : 'text-slate-400'}`} />
                    <span>Storage: {s}, RAM: null</span>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-orange-500 stroke-[3]" />}
                </button>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
};

export default VariantSelector;
