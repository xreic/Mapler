// Core
import React, { useContext } from 'react';

// Helpers
import { EditContext } from '../context/EditContext';
import { GrEdit, GrCheckmark } from 'react-icons/gr';

export const EditButton = () => {
  const { isEditing, setIsEditing } = useContext(EditContext);

  const handleClick = () => setIsEditing(!isEditing);

  return (
    <button className={''} onClick={handleClick}>
      {isEditing ? <GrCheckmark className={''} /> : <GrEdit className={''} />}
    </button>
  );
};
