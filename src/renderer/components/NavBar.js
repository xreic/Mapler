// Core
import React, { useContext } from 'react';
import { Link } from '@reach/router';
import { GrEdit, GrCheckmark } from 'react-icons/gr';

// Helpers
import { EditContext } from './context/EditContext';
import {
  BOSSES,
  QUESTS,
  DAILY,
  WEEKLY,
  MAPLE,
  ARCANE,
} from './utils/variables';

// Mini-components
const NavLink = ({ path, label }) => (
  <Link to={path} className="flex-1 text-center border border-red-500">
    {label}
  </Link>
);

const EditButton = ({}) => {
  const { isEditing, setIsEditing } = useContext(EditContext);

  const handleClick = () => {
    setIsEditing(!isEditing);
  };

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

const UpperNav = () => {
  // TODO: Change "Characters" tab label to the active character's name when not active
  const mainPaths = [
    { path: `/${BOSSES}/${DAILY}`, label: 'Bosses' },
    { path: `/${QUESTS}/${MAPLE}`, label: 'Quests' },
    { path: '/', label: 'Characters' },
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
  const [_, main] = location.pathname.split('/');

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

export const NavBar = () => {
  return (
    <>
      <UpperNav />
      <LowerNav />
    </>
  );
};
