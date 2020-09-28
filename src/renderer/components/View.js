// Core
import React from 'react';

// Components
import { SubNav } from './navs/SubNav';

// Component
export const View = ({ option, children }) => (
  <div className="overflow-y-hidden">
    <SubNav option={option} />
    <div className="overflow-y-scroll p-4">{children}</div>
  </div>
);
