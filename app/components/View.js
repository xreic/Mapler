// Core
import React from 'react';

// Component
import { List } from './List.js';

// SCSS
import {
  taskContainer,
  viewNormalStyle,
  viewShrunkStyle,
} from './styles/View.scss';

export const View = ({ list }) => (
  <div className={viewNormalStyle}>
    <div className={taskContainer}>
      <List list={list} />
    </div>
  </div>
);
