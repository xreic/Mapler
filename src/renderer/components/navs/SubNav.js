// Core
import React from 'react';
import { Link } from '@reach/router';

// Helpers/Declarations/Variables/Etc
import { BOSSES, DAILY, WEEKLY, MAPLE, ARCANE } from '../utils/variables';

// Component
export const SubNav = ({ option }) => {
  const ifBosses = option === BOSSES;

  return (
    <nav className="flex items-stretch">
      <Link
        // TODO: Implement tooling for CSS-in-JS for TailwindCSS
        to={ifBosses ? DAILY : MAPLE}
        className="flex-1 text-center border border-red-500"
      >
        {ifBosses ? 'Daily' : 'Maple World'}
      </Link>
      <Link
        // TODO: Implement tooling for CSS-in-JS for TailwindCSS
        to={ifBosses ? WEEKLY : ARCANE}
        className="flex-1 text-center border border-red-500"
      >
        {ifBosses ? 'Weekly' : 'Arcane River'}
      </Link>
      <div className="inline-block text-center border border-red-500 w-26 min-w-26">
        T
      </div>
    </nav>
  );
};
