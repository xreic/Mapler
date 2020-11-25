// Core
import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  buttonStyle: {
    width: '53px',
    height: '26px',
    textAlign: 'center',
    BgOpacity: 1,
    backgroundColor: '#cbd5e0',
    backgroundColor: 'rgba(203, 213, 224, var(--bg-opacity))',
    '&:focus': {
      outline: '2px solid transparent',
      outlineOffset: 2,
    },
  },
});

export const FormButton = ({ action, loading, children }) => {
  const { buttonStyle } = useStyles();

  return (
    <button
      className={buttonStyle}
      onClick={action && action}
      disabled={!!loading}
    >
      {children}
    </button>
  );
};
