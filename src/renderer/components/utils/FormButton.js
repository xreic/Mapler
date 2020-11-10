import React from 'react';

export const FormButton = ({ action, children }) => (
  <button
    className="text-center border-t border-black bg-gray-400 w-53px w-100% h-26px focus:outline-none"
    onClick={action && action}
  >
    {children}
  </button>
);
