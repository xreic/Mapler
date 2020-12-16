// Core
import React from 'react';
import { GrCycle } from 'react-icons/gr';

// Helpers
import { triggerReset } from '../../utils/Reset.js';

// SCSS
import { editButtonStyle } from './styles/EditButton.scss';

export const ResetButton = () => (
  <button className={editButtonStyle} onClick={triggerReset}>
    <GrCycle />
  </button>
);
