import React from 'react';

export const Button = ({ action, children }) => (
  <button
    className="flex-1 h-26px bg-blue-500 focus:outline-none"
    onClick={action}
  >
    {children}
  </button>
);
