// Core
import React from 'react';

// SCSS
import { buttonStyle } from './Button.scss';

export const Button = ({ action, loading, children }) => {
  return (
    <button className={buttonStyle} onClick={action} disabled={!!loading}>
      {children}
    </button>
  );
};
