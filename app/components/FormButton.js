// Core
import React from 'react';

// SCSS
import { formButton, formButtonSpin } from './FormButton.scss';

export const FormButton = ({ action, loading, children }) => {
  return (
    <button
      className={loading ? formButtonSpin : formButton}
      onClick={action && action}
      disabled={!!loading}
    >
      {children}
    </button>
  );
};
