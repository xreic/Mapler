// Core
import React from 'react';
import { Link } from '@reach/router';

// Helpers/Declarations/Variables/Etc
import {
  BOSSES,
  QUESTS,
  DAILY,
  WEEKLY,
  MAPLE,
  ARCANE,
} from './utils/variables';

const NavLink = ({ path, location }) => (
  <Link to={path} className="flex-1 text-center border border-red-500">
    {location}
  </Link>
);

const UpperNav = ({ location }) => {
  // TODO: Change "Characters" tab label to the active character's name when not active
  const mainPaths = [
    {
      path: `/${BOSSES}`,
      location: 'Bosses',
    },
    {
      path: `/${QUESTS}`,
      location: 'Quests',
    },
    {
      path: '/',
      location: 'Characters',
    },
  ];

  return (
    <nav className="flex items-stretch">
      {mainPaths.map(({ path, location }) => (
        <NavLink key={location} path={path} location={location} />
      ))}
    </nav>
  );
};

const LowerNav = ({ location }) => {
  const subPaths = [
    [
      { path: `/${BOSSES}/${DAILY}`, location: `Daily` },
      { path: `/${BOSSES}/${WEEKLY}`, location: `Weekly` },
    ],
    [
      { path: `/${QUESTS}/${MAPLE}`, location: `Maple World` },
      { path: `/${QUESTS}/${ARCANE}`, location: `Arcane River` },
    ],
  ];
  const paths = location.pathname.split('/');

  if (paths[1] === `${BOSSES}`) {
    return (
      <nav className="flex items-stretch">
        {subPaths[0].map(({ path, location }) => (
          <NavLink key={location} path={path} location={location} />
        ))}
      </nav>
    );
  }

  if (paths[1] === `${QUESTS}`) {
    return (
      <nav className="flex items-stretch">
        {subPaths[1].map(({ path, location }) => (
          <NavLink key={location} path={path} location={location} />
        ))}
      </nav>
    );
  }

  return <nav className="flex items-stretch"></nav>;
};

// Component
export const NavBar = ({ location }) => {
  return (
    <>
      <UpperNav location={location} />
      <LowerNav location={location} />
    </>
  );
};
