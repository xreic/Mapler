// Core
import React from 'react';
import { Link } from '@reach/router';

export const NavLink = ({ path, label }) => (
  <Link to={path} className="flex-1 text-center bg-gray-400 focus:outline-none">
    {label}
  </Link>
);

export const SelectedNavLink = ({ label }) => (
  <div className="flex-1 text-center bg-orange-200 focus:outline-none">
    {label}
  </div>
);
