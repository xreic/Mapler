// Core
import React from 'react';

// Component
import { List } from './List.js';

// SCSS
import { taskContainer, viewNormalStyle } from './styles/View.scss';

export const View = () => (
  <div className={viewNormalStyle}>
    <div className={taskContainer}>
      <List />
    </div>
  </div>
);
