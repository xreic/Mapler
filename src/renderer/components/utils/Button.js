import React from 'react';

export const Button = ({ action, loading, children }) => (
  <button
    className="flex-1 bg-gray-400 h-26px focus:outline-none"
    onClick={action}
    disabled={!!loading}
  >
    {children}
  </button>
);
