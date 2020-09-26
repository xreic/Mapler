// Core
import React from 'react';
import { Link } from '@reach/router';

// Component
export const QuestSelector = () => (
  <nav className="grid grid-cols-2 items-stretch">
    <Link
      // TODO: Implement tooling for CSS-in-JS for TailwindCSS
      to="/quests/maple"
      className="inline-block text-center border border-red-500"
    >
      Maple World
    </Link>
    <Link
      // TODO: Implement tooling for CSS-in-JS for TailwindCSS
      to="/quests/arcane"
      className="inline-block text-center border border-red-500"
    >
      Arcane River
    </Link>
  </nav>
);
