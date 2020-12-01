// Core
import React, { useContext } from 'react';

// Helpers
import { EditContext } from '../../context/EditContext.js';
import { GrEdit, GrCheckmark } from 'react-icons/gr';

// SCSS
import { editButtonStyle } from './EditButton.scss';

export const EditButton = () => {
  const { isEditing, setIsEditing } = useContext(EditContext);

  const handleClick = () => setIsEditing(!isEditing);

  return (
    <button className={editButtonStyle} onClick={handleClick}>
      {isEditing ? <GrCheckmark /> : <GrEdit />}
    </button>
  );
};
