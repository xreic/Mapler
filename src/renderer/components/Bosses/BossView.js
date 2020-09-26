// Core
import React from 'react';

// Components
import { BossSelector } from './BossSelector';

// Component
export const BossView = ({ children }) => (
  <>
    <BossSelector />
    <div className="p-4">{children}</div>
  </>
);
