// Core
import React from 'react';
import { Link } from '@reach/router';

// Helpers/Declarations/Variables/Etc
import { BOSSES, QUESTS } from '../utils/variables';

// Component
export const MainNav = () => (
  <nav className="flex items-stretch">
    <Link
      // TODO: Implement tooling for CSS-in-JS for TailwindCSS
      to={`/${BOSSES}`}
      className="flex-1 text-center border border-red-500"
    >
      Bosses
    </Link>
    <Link
      // TODO: Implement tooling for CSS-in-JS for TailwindCSS
      to={`/${QUESTS}`}
      className="flex-1 text-center border border-red-500"
    >
      Quests
    </Link>
    <Link
      // TODO: Implement tooling for CSS-in-JS for TailwindCSS
      to={`/`}
      className="flex-1 text-center border border-red-500"
    >
      Characters
    </Link>
    {/*
    Future feature
    Change to image of a totem

    <Link
      // TODO: Implement tooling for CSS-in-JS for TailwindCSS
      to={`/totem`}
      className="inline-block text-center border border-red-500 w-26 min-w-26"
    >
      Totem
    </Link>
    */}
    {/*
    Change to an image of a cog wheel or something
    */}
    <div className="inline-block text-center border border-red-500 w-26 min-w-26">
      S
    </div>
  </nav>
);
