// Core
import React, { useContext, useState } from 'react';

// Helpers
import { CharContext } from '../context/CharContext';
import { activateDelete } from '../utils/getCharCode';
import { GrFormSubtract, GrFormPreviousLink } from 'react-icons/gr';

export const DeleteChars = () => {
  const { setHideAdd, hideDeleteButton, setCharacters } = useContext(
    CharContext,
  );
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    const characters = activateDelete();
    setCharacters(characters.map(({ code }) => code));
    goBack();
  };

  const startDeleting = () => {
    setHideAdd(true);
    setIsDeleting(true);
  };

  const goBack = () => {
    setIsDeleting(false);
    setHideAdd(false);
  };

  if (hideDeleteButton) return null;

  return (
    <>
      {isDeleting && (
        <button className="border border-red-500" onClick={goBack}>
          <GrFormPreviousLink className="m-auto" />
        </button>
      )}
      <button
        className="flex-1 border border-red-500 h-26px"
        onClick={() => {
          isDeleting ? handleDelete() : startDeleting();
        }}
      >
        <GrFormSubtract className="m-auto" />
      </button>
    </>
  );
};
