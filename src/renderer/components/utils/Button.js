import React from 'react';

export const Button = ({ action, children }) => (
  <button
    className="flex-1 border-t border-black bg-gray-400 h-26px focus:outline-none"
    onClick={action}
  >
    {children}
  </button>
);
