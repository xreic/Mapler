// Core
import React, { useContext } from 'react';

// Helpers
import { EditContext } from '../context/EditContext';
import { GrEdit, GrCheckmark } from 'react-icons/gr';

export const EditButton = () => {
  const { isEditing, setIsEditing } = useContext(EditContext);

  const handleClick = () => setIsEditing(!isEditing);

  return (
    <button
      className="w-26px h-26px bg-gray-400 focus:outline-none"
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
