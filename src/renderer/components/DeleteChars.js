// Core
import React from 'react';
import Store from 'electron-store';
import { navigate } from '@reach/router';

// Helpers
import { CHARACTERS, DELETING } from './utils/variables';
import { GrFormSubtract, GrFormPreviousLink } from 'react-icons/gr';

// Electron Store
const store = new Store();

export const DeleteChars = ({ hidingAdd, hideAdd }) => {
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

    navigate('/');
    hideAdd(true);
  };

  const goBack = () => {
    hideAdd(false);
  };

  return (
    <>
      {hidingAdd === true && (
        <button className="border border-red-500" onClick={goBack}>
          <GrFormPreviousLink />
        </button>
      )}
      <button
        className="flex-1 border border-red-500 h-26px"
        onClick={() => {
          hidingAdd ? handleDelete() : hideAdd(true);
        }}
      >
        <GrFormSubtract className="m-auto" />
      </button>
    </>
  );
};
