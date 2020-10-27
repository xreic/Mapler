// Core
import React from 'react';
import Store from 'electron-store';
import { navigate } from '@reach/router';

// Helpers
import { CHARACTERS, DELETING } from './utils/variables';

// Electron Store
const store = new Store();

// Icons
import { GrFormSubtract, GrFormPreviousLink } from 'react-icons/gr';

export const DeleteChars = ({ hidingAdd, hideAdd }) => {
  const handleDelete = () => {
    const deleteList = store.get(DELETING);

    if (!deleteList.length) return;

    const characters = store
      .get(CHARACTERS)
      .filter((char) => (deleteList.indexOf(char.code) === -1 ? true : false));
    const active = characters.length > 0 ? 0 : null;

    store.set({
      active,
      characters,
      deleting: [],
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
