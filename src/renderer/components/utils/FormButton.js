import React from 'react';

export const FormButton = ({ action, loading, children }) => (
  <button
    className="text-center bg-gray-400 w-53px w-100% h-26px focus:outline-none"
    onClick={action && action}
    disabled={!!loading}
  >
    {children}
  </button>
);
