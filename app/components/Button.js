// Core
import React from 'react';

export const Button = ({ action, loading, children }) => {
  return (
    <button className={''} onClick={action} disabled={!!loading}>
      {children}
    </button>
  );
};
