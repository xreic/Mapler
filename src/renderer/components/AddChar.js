// Core
import React, { useState } from 'react';
import Store from 'electron-store';
import { getCharCode, fakeCall } from './utils/getCharCode';
import { ACTIVE, CHAR_CODES, CHARACTERS } from './utils/variables';

// Libraries
const store = new Store();

export const AddChar = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [charName, setCharName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setCharName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    let isSuccessful = false;

    while (!isSuccessful) {
      console.log('Calling');
      isSuccessful = await getCharCode(charName);
    }

    if (isSuccessful === 'Invalid Character Name') {
      console.log('Invalid Character Name');
    } else if (isSuccessful) {
      e.target.reset();
    }

    setIsLoading(false);
  };

  const getTemplate = (charCode) => ({
    name: charName,
    code: charCode,
    bosses: { daily: [], weekly: [], hidden: [] },
    quests: { mapleworld: [], arcaneriver: [], hidden: [] },
  });

  if (isAdding) {
    return (
      <form onSubmit={handleSubmit} className="flex">
        <input
          placeholder="Character Code"
          onChange={handleChange}
          className="flex-1 text-center border border-red-500"
          disabled={isLoading}
        ></input>
        <button
          className="text-center border border-red-500"
          disabled={isLoading}
        >
          {isLoading ? 'Wait' : 'Submit'}
        </button>
      </form>
    );
  }

  return (
    <>
      <button
        className="text-center border border-red-500 w-full"
        onClick={() => {
          setIsAdding(true);
        }}
      >
        Add Character
      </button>
      <button
        className="text-center border border-red-500 w-full"
        onClick={() => {
          store.set(ACTIVE, '');
          store.set(CHAR_CODES, []);
          store.set(CHARACTERS, []);
        }}
      >
        Clear
      </button>
    </>
  );
};
