// Core
import React from 'react';
import { Link } from '@reach/router';

export const NavLink = ({ path, label, active }) =>
  active ? <div>{label}</div> : <Link to={path}>{label}</Link>;
