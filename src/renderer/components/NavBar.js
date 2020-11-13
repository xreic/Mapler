// Core
import React, { useContext } from 'react';
import { Link, useLocation } from '@reach/router';

// Helpers
import { EditContext } from './context/EditContext';
import { GrEdit, GrCheckmark } from 'react-icons/gr';
import {
  BOSSES,
  QUESTS,
  DAILY,
  WEEKLY,
  MAPLE,
  ARCANE,
} from './utils/variables';

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

  return <nav className="flex items-stretch"></nav>;
};

const NavLink = ({ path, label }) => (
  <Link to={path} className="flex-1 text-center bg-gray-400 focus:outline-none">
    {label}
  </Link>
);

const SelectedNavLink = ({ label }) => (
  <div className="flex-1 text-center bg-orange-200 focus:outline-none">
    {label}
  </div>
);

const EditButton = () => {
  const { isEditing, setIsEditing } = useContext(EditContext);

  const handleClick = () => setIsEditing(!isEditing);

  return (
    <button
      className="w-26px h-26px bg-gray-400 focus:outline-none"
      onClick={handleClick}
    >
      {isEditing ? (
        <GrCheckmark className="m-auto" />
      ) : (
        <GrEdit className="m-auto" />
      )}
    </button>
  );
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
