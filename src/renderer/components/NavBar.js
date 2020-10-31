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
  const mainPaths = [
    { path: `/${BOSSES}/${DAILY}`, label: 'Bosses' },
    { path: `/${QUESTS}/${MAPLE}`, label: 'Quests' },
    { path: '/', label: 'Character' },
  ];

  return (
    <nav className="flex items-stretch">
      {mainPaths.map(({ path, label }) => (
        <NavLink key={label} path={path} label={label} />
      ))}
    </nav>
  );
};

const LowerNav = () => {
  const location = useLocation();
  const [_, main] = location.pathname.split('/');

  const subPaths = [
    [
      { path: `/${BOSSES}/${DAILY}`, label: `Daily` },
      { path: `/${BOSSES}/${WEEKLY}`, label: `Weekly` },
    ],
    [
      { path: `/${QUESTS}/${MAPLE}`, label: `Maple World` },
      { path: `/${QUESTS}/${ARCANE}`, label: `Arcane River` },
    ],
  ];

  if (main === `${BOSSES}`) {
    return (
      <nav className="flex items-stretch">
        {subPaths[0].map(({ path, label }) => (
          <NavLink key={label} path={path} label={label} />
        ))}
        <EditButton />
      </nav>
    );
  }

  if (main === `${QUESTS}`) {
    return (
      <nav className="flex items-stretch">
        {subPaths[1].map(({ path, label }) => (
          <NavLink key={label} path={path} label={label} />
        ))}
        <EditButton />
      </nav>
    );
  }

  return <nav className="flex items-stretch"></nav>;
};

const NavLink = ({ path, label }) => (
  <Link to={path} className="flex-1 text-center border border-red-500">
    {label}
  </Link>
);

const EditButton = () => {
  const { isEditing, setIsEditing } = useContext(EditContext);

  const handleClick = () => setIsEditing(!isEditing);

  return (
    <button
      className="border border-red-500 w-26px h-26px"
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
