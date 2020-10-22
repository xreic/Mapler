// Core
import React, { useState } from 'react';
import Store from 'electron-store';
import { getCharCode } from './utils/getCharCode';
import { ACTIVE, CHARACTERS } from './utils/variables';

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

    if (isSuccessful === true) {
      e.target.reset();
    } else if (isSuccessful !== false) {
      console.log(isSuccessful);
    }

    setIsLoading(false);
  };

  if (isAdding) {
    return (
      <form onSubmit={handleSubmit} className="flex">
        <input
          placeholder="Character Code"
          onChange={handleChange}
          className="flex-1 text-center border border-red-500"
          maxLength={12}
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
          store.set(CHARACTERS, []);
        }}
      >
        Clear
      </button>
    </>
  );
};
