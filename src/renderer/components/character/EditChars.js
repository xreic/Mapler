// Core
import React, { useContext, useState } from 'react';

// Helpers
import { GrEdit, GrCheckmark, GrFormRefresh } from 'react-icons/gr';
import { CharContext } from '../context/CharContext';
import { Button } from '../utils/Button';
import { updateAllChars } from '../utils/getCharCode';

export const EditChars = () => {
  const { isEditing, setIsEditing } = useContext(CharContext);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleEditSave = () => {
    setIsEditing(!isEditing);
  };

  const handleRefresh = async () => {
    setIsUpdating(true);
    await updateAllChars();
    setIsUpdating(false);
  };

  return (
    <div className="flex divide-x divide-black">
      <Button action={handleEditSave}>
        {isEditing ? (
          <GrCheckmark className="m-auto" />
        ) : (
          <GrEdit className="m-auto" />
        )}
      </Button>
      <Button action={handleRefresh} loading={isUpdating}>
        <GrFormRefresh className={`m-auto ${isUpdating && 'animate-spin'}`} />
      </Button>
    </div>
  );
};
