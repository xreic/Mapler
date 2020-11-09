import React from 'react';

export const FormButton = ({ action, children }) => (
  <button
    className="text-center bg-blue-500 w-18px w-100% focus:outline-none"
    onClick={action && action}
  >
    {children}
  </button>
);
