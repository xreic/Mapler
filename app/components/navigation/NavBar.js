// Core
import React from 'react';
import { useLocation } from '@reach/router';
import { createUseStyles } from 'react-jss';

// Components
import { NavLink } from './NavLinks';
import { EditButton } from './EditButton';

// Helpers
import {
  BOSSES,
  QUESTS,
  DAILY,
  WEEKLY,
  MAPLE,
  ARCANE,
} from '../../constants/variables';

const useStyles = createUseStyles({
  navStyle: {
    display: 'flex',
    alignItems: 'stretch',
    // Bottom Border
    BorderOpacity: 1,
    borderBottomWidth: 1,
    borderColor: '#000',
    borderColor: 'rgba(0, 0, 0, var(--border-opacity))',
    // Horizontal Elements Divide
    TwDivideXReverse: 0,
    borderRightWidth: 'calc(1px * var(--tw-divide-x-reverse))',
    borderLeftWidth: 'calc(1px * calc(1 - var(--tw-divide-x-reverse)))',
  },
});

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

  const { navStyle } = useStyles();

  const activeIndex =
    [BOSSES, QUESTS].indexOf(main) !== -1 ? [BOSSES, QUESTS].indexOf(main) : 2;

  const mainPaths = [
    { path: `/${BOSSES}/${DAILY}`, label: 'Bosses' },
    { path: `/${QUESTS}/${MAPLE}`, label: 'Quests' },
    { path: '/', label: 'Characters' },
  ];

  return (
    <nav className={navStyle}>
      {mainPaths.map(({ path, label }, index) => (
        <NavLink key={label} path={path} label={label} />
      ))}
    </nav>
  );
};

const LowerNav = () => {
  const location = useLocation();
  const [_, main, sub] = location.pathname.split('/');

  const { navStyle } = useStyles();

  const subPaths = getSubPaths(main);

  if (subPaths) {
    const newActive = [DAILY, MAPLE].indexOf(sub) !== -1 ? 0 : 1;

    return (
      <nav className={navStyle}>
        {subPaths.map(({ path, label }, index) =>
          index == newActive ? (
            <SelectedNavLink key={label} label={label} />
          ) : (
            <NavLink key={label} path={path} label={label} />
          )
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
