import React from 'react';
import logoImg from '../assets/image.png';

/**
 * 1Fi Official Brand Logo Component
 * Renders the user-provided image logo directly from src/assets/image.png
 */
const OneFiLogo = ({ className = 'w-10 h-10', rounded = 'rounded-xl' }) => {
  return (
    <img
      src={logoImg}
      alt="1Fi Logo"
      className={`object-cover border border-purple-500/20 shadow-sm shrink-0 ${rounded} ${className}`}
    />
  );
};

export default OneFiLogo;
