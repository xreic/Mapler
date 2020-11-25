// Core
import React from 'react';
import { Link } from '@reach/router';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  linkStyle: ({ path }) => ({
    flex: '1 1 0%',
    textAlign: 'center',
    BgOpacity: 1,
    backgroundColor: path === undefined ? '#feebc8' : '#cbd5e0',
    backgroundColor:
      path === undefined
        ? 'rgba(254, 235, 200, var(--bg-opacity))'
        : 'rgba(203, 213, 224, var(--bg-opacity))',
    '&:focus': {
      outline: '2px solid transparent',
      outlineOffset: 2,
    },
  }),
});

export const NavLink = ({ path, label }) => {
  const { linkStyle } = useStyles({ path });

  if (active) {
    return <div className={linkStyle}>{label}</div>;
  }

  return (
    <Link to={path} className={linkStyle}>
      {label}
    </Link>
  );
};
