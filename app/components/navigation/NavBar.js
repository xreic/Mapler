// Core
import React from 'react';
import { useLocation } from '@reach/router';

// Components
import { NavLink } from './NavLinks.js';
import { ResetButton } from './ResetButton.js';
import { EditButton } from './EditButton.js';

// Constants
import {
  BOSSES,
  QUESTS,
  DAILY,
  WEEKLY,
  MAPLE,
  ARCANE,
} from '../../constants/variables.js';

// SCSS
import { navContainer } from './styles/NavBar.scss';

export const NavBar = () => {
  const handleDrag = (e) => {
    e.preventDefault();
  };

  return (
    <div className={navContainer} onDragStart={handleDrag}>
      <UpperNav />
      <LowerNav />
    </div>
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
    <nav>
      {mainPaths.map(({ path, label }, index) => (
        <NavLink
          key={label}
          path={path}
          label={label}
          active={index === activeIndex}
        />
      ))}
    </nav>
  );
};

const LowerNav = () => {
  const location = useLocation();
  const [_, main, sub] = location.pathname.split('/');

  const subPaths = getSubPaths(main);

  if (subPaths) {
    const activeIndex = [DAILY, MAPLE].indexOf(sub) !== -1 ? 0 : 1;

    return (
      <nav>
        {process.env.NODE_ENV !== 'production' && <ResetButton />}
        {subPaths.map(({ path, label }, index) => (
          <NavLink
            key={label}
            path={path}
            label={label}
            active={index === activeIndex}
          />
        ))}
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
