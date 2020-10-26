// Core
import React from 'react';

export const View = ({ children }) => {
  return <div className="overflow-y-scroll px-2 py-2 h-64">{children}</div>;
};
