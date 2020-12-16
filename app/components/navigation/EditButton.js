// Core
import React, { useContext } from 'react';
import { GrEdit, GrCheckmark } from 'react-icons/gr';

// Helpers
import { EditContext } from '../context/EditContext.js';

// SCSS
import { editButtonStyle } from './styles/EditButton.scss';

export const EditButton = () => {
  const { isEditing, setIsEditing } = useContext(EditContext);

  const handleClick = () => setIsEditing(!isEditing);

  return (
    <button className={editButtonStyle} onClick={handleClick}>
      {isEditing ? <GrCheckmark /> : <GrEdit />}
    </button>
  );
};
