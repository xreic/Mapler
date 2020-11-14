// Core
import React from 'react';
import { useLocation } from '@reach/router';

// Components
import { NavLink, SelectedNavLink } from './NavLinks';
import { EditButton } from './EditButton';

// Helpers
import {
  BOSSES,
  QUESTS,
  DAILY,
  WEEKLY,
  MAPLE,
  ARCANE,
} from '../utils/variables';

export const NavBar = () => {
  return (
    <>
      <UpperNav />
      <LowerNav />
    </>
  );
};

// Mini-components
const UpperNav = () => {
  const location = useLocation();
  const [_, main] = location.pathname.split('/');

  const activeIndex =
    [BOSSES, QUESTS].indexOf(main) !== -1 ? [BOSSES, QUESTS].indexOf(main) : 2;

  const mainPaths = [
    { path: `/${BOSSES}/${DAILY}`, label: 'Bosses' },
    { path: `/${QUESTS}/${MAPLE}`, label: 'Quests' },
    { path: '/', label: 'Characters' },
  ];

  return (
    <nav className="flex items-stretch border-b border-black divide-x divide-black">
      {mainPaths.map(({ path, label }, index) =>
        index == activeIndex ? (
          <SelectedNavLink key={label} label={label} />
        ) : (
          <NavLink key={label} path={path} label={label} />
        ),
      )}
    </nav>
  );
};

const LowerNav = () => {
  const location = useLocation();
  const [_, main, sub] = location.pathname.split('/');

  const subPaths = getSubPaths(main);

  if (subPaths) {
    const newActive = [DAILY, MAPLE].indexOf(sub) !== -1 ? 0 : 1;

    return (
      <nav className="flex items-stretch border-b border-black divide-x divide-black">
        {subPaths.map(({ path, label }, index) =>
          index == newActive ? (
            <SelectedNavLink key={label} label={label} />
          ) : (
            <NavLink key={label} path={path} label={label} />
          ),
        )}
        <EditButton />
      </nav>
    );
  }

  return null;
};

const getSubPaths = (mainPath) => {
  const subPaths = {
    BOSSES: [
      { path: `/${BOSSES}/${DAILY}`, label: `Daily` },
      { path: `/${BOSSES}/${WEEKLY}`, label: `Weekly` },
    ],
    QUESTS: [
      { path: `/${QUESTS}/${MAPLE}`, label: `Maple World` },
      { path: `/${QUESTS}/${ARCANE}`, label: `Arcane River` },
    ],
  };

  return subPaths[mainPath.toUpperCase()];
};
