// Core
import React from 'react';

export const FormButton = ({ action, loading, children }) => {
  return (
    <button className={''} onClick={action && action} disabled={!!loading}>
      {children}
    </button>
  );
};
