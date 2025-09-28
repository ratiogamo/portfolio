"use client";

import React from 'react';

const LargeFavicon: React.FC = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <img
        src="/favicon.png"
        alt="Favicon Background Symbol"
        className="w-[500px] h-[500px] object-contain opacity-5 animate-pulse-slow"
      />
    </div>
  );
};

export default LargeFavicon;