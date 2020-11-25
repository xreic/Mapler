// Core
import React, { useContext } from 'react';
import { createUseStyles } from 'react-jss';

// Helpers
import { EditContext } from '../context/EditContext';
import { GrEdit, GrCheckmark } from 'react-icons/gr';

const useStyles = createUseStyles({
  buttonStyle: {
    width: '26px',
    height: '26px',
    BgOpacity: 1,
    backgroundColor: '#cbd5e0',
    backgroundColor: 'rgba(203, 213, 224, var(--bg-opacity))',
    '&:focus': {
      outline: '2px solid transparent',
      outlineOffset: 2,
    },
  },
  iconStyle: {
    margin: 'auto',
  },
});

export const EditButton = () => {
  const { isEditing, setIsEditing } = useContext(EditContext);

  const { buttonStyle, iconStyle } = useStyles();

  const handleClick = () => setIsEditing(!isEditing);

  return (
    <button className={buttonStyle} onClick={handleClick}>
      {isEditing ? (
        <GrCheckmark className={iconStyle} />
      ) : (
        <GrEdit className={iconStyle} />
      )}
    </button>
  );
};
