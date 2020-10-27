// Core
import React, { useState } from 'react';

// Icons
import { GrFormSubtract } from 'react-icons/gr';

export const DeleteChars = ({ hidingAdd, hideAdd }) => {
  return (
    <button
      className="flex-1 border border-red-500 h-26px"
      onClick={() => {
        hidingAdd ? hideAdd(false) : hideAdd(true);
      }}
    >
      <GrFormSubtract className="m-auto" />
    </button>
  );
};
