// Core
import React from 'react';
import { Link } from '@reach/router';

// Component
export const SubNav = ({ option }) => {
  const ifBosses = option === 'bosses';

  return (
    <nav className="grid grid-cols-2 items-stretch">
      <Link
        // TODO: Implement tooling for CSS-in-JS for TailwindCSS
        to={ifBosses ? 'daily' : 'maple'}
        className="inline-block text-center border border-red-500"
      >
        {ifBosses ? 'Daily' : 'Maple World'}
      </Link>
      <Link
        // TODO: Implement tooling for CSS-in-JS for TailwindCSS
        to={ifBosses ? 'weekly' : 'arcane'}
        className="inline-block text-center border border-red-500"
      >
        {ifBosses ? 'Weekly' : 'Arcane River'}
      </Link>
    </nav>
  );
};
