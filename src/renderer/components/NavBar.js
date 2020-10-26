// Core
import React from 'react';
import { Link } from '@reach/router';

const NavLink = ({ path, location }) => (
  <Link to={path} className="flex-1 text-center border border-red-500">
    {location}
  </Link>
);

const UpperNav = () => (
  <nav className="flex items-stretch">
    <NavLink path="/bosses" location="Bosses" />
    <NavLink path="/quests" location="Quests" />
    <NavLink path="/" location="Characters" />
    {/* supposed to be a settings button
    <div className="inline-block text-center border border-red-500 w-26 min-w-26">
      S
    </div>
    */}
  </nav>
);

const LowerNav = ({ location }) => {
  const paths = location.pathname.split('/').slice(1);
  const subPaths = [];

  if (paths[0] === '' || paths[0] === 'main_window') {
    return null;
  } else if (paths[0] === 'bosses') {
    subPaths.push({ path: '/bosses/daily', location: 'Daily' });
    subPaths.push({ path: '/bosses/weekly', location: 'Weekly' });
  } else if (paths[0] === 'quests') {
    subPaths.push({ path: '/quests/maple', location: 'Maple World' });
    subPaths.push({ path: '/quests/arcane', location: 'Arcane River' });
  }

  return (
    <nav className="flex items-stretch">
      {subPaths.map(({ path, location }) => (
        <NavLink key={location} path={path} location={location} />
      ))}
    </nav>
  );
};

// Component
export const NavBar = ({ location }) => {
  return (
    <>
      <UpperNav />
      <LowerNav location={location} />
    </>
  );
};
