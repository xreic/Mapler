// Core
import React from 'react';
import { Link } from '@reach/router';

// Component
export const MainSelector = () => {
  return (
    <div>
      <div className="grid grid-cols-2 items-stretch">
        <Link
          // TODO: Implement tooling for CSS-in-JS for TailwindCSS
          to="bosses"
          className="inline-block text-center border border-red-500"
        >
          Bosses
        </Link>
        <Link
          // TODO: Implement tooling for CSS-in-JS for TailwindCSS
          to="quests"
          className="inline-block text-center border border-red-500"
        >
          Quests
        </Link>
      </div>
    </div>
  );
};
