// Core
import React, { useContext, useState } from 'react';
import Store from 'electron-store';

// Helpers
import { CharContext } from '../context/CharContext';
import { CHARACTERS, DELETING } from '../utils/variables';
import { GrFormSubtract, GrFormPreviousLink } from 'react-icons/gr';

// Electron Store
const store = new Store();

export const DeleteChars = () => {
  const { setHideAdd, hideDeleteButton } = useContext(CharContext);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    const deleteList = store.get(DELETING);

    if (!deleteList.some((item) => item === 1)) return;

    const characters = store
      .get(CHARACTERS)
      .filter((_, index) => !deleteList[index]);
    const active = characters.length > 0 ? 0 : null;

    store.set({
      active,
      characters,
      deleting: new Array(characters.length).fill(0),
    });

    // navigate('/');
    setHideAdd(false);
  };

  const startDeleting = () => {
    setHideAdd(true);
    setIsDeleting(true);
  };

  const goBack = () => {
    setHideAdd(false);
    setIsDeleting(false);
  };

  if (hideDeleteButton) return null;

  return (
    <>
      {isDeleting && (
        <button className="border border-red-500" onClick={goBack}>
          <GrFormPreviousLink />
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
