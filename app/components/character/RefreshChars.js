// Core
import React, { useContext, useState } from 'react';

// Helpers
import { CharContext } from '../context/CharContext';
import { updateAllChars } from '../../utils/getCharCode';
import { GrFormRefresh } from 'react-icons/gr';

export const RefreshChars = () => {
  const { hideAddButton, hideDeleteButton } = useContext(CharContext);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleRefresh = async () => {
    setIsUpdating(true);
    await updateAllChars();
    setIsUpdating(false);
  };

  if (!hideAddButton && !hideDeleteButton) {
    return (
      <button
        className="bg-gray-400 w-26px h-26px focus:outline-none"
        onClick={handleRefresh}
        disabled={isUpdating}
      >
        <GrFormRefresh className={`m-auto ${isUpdating && 'animate-spin'}`} />
      </button>
    );
  }

  return null;
};
