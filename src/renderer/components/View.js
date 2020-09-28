// Core
import React from 'react';

// Components
import { SubNav } from './navs/SubNav';

// Component
export const View = ({ option, children }) => (
  <>
    <SubNav option={option} />
    <div className="overflow-y-scroll px-2 py-2 h-56">{children}</div>
  </>
);
