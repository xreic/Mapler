// Core
import React from 'react';

// Components
import { Subnav } from './Subnav';

// Component
export const View = ({ option, children }) => (
  <>
    <Subnav option={option} />
    <div className="p-4">{children}</div>
  </>
);
