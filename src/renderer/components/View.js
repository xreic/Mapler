// Core
import React from 'react';

// Components
import { SubNav } from './navs/SubNav';

// Component
export const View = ({ option, children }) => (
  <>
    <SubNav option={option} />
    <div className="p-4">{children}</div>
  </>
);
