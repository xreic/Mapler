// Core
import React from 'react';
import { Link } from '@reach/router';

// Component
export const BossSelector = () => (
  <nav className="grid grid-cols-2 items-stretch">
    <Link
      // TODO: Implement tooling for CSS-in-JS for TailwindCSS
      to="/daily"
      className="inline-block text-center border border-red-500"
    >
      Daily
    </Link>
    <Link
      // TODO: Implement tooling for CSS-in-JS for TailwindCSS
      to="/weekly"
      className="inline-block text-center border border-red-500"
    >
      Weekly
    </Link>
  </nav>
);
