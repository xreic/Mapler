import React from 'react';

export const Button = ({ action, extraCSS, loading, children }) => (
  <button
    className={`flex-1 bg-gray-400 h-26px focus:outline-none ${
      extraCSS && extraCSS
    }`}
    onClick={action}
    disabled={!!loading}
  >
    {children}
  </button>
);
