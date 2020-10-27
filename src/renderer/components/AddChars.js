// Core
import React, { useState } from 'react';
import { getCharCode } from './utils/getCharCode';

// Icons
import {
  GrFormPreviousLink,
  GrFormNextLink,
  GrFormRefresh,
  GrFormAdd,
} from 'react-icons/gr';

export const AddChars = ({ hideDelete }) => {
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
      isSuccessful = await getCharCode(charName);
    }

    if (isSuccessful === true) {
      e.target.reset();
    }

    setIsLoading(false);
    // TODO: Set focus back to input (QOL)
  };

  const goBack = () => {
    setIsAdding(false);
    hideDelete(false);
  };

  if (isAdding) {
    return (
      <>
        <button className="border border-red-500" onClick={goBack}>
          <GrFormPreviousLink />
        </button>
        <form onSubmit={handleSubmit} className="flex w-full">
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
            {isLoading ? (
              <GrFormRefresh className="animate-spin" />
            ) : (
              <GrFormNextLink />
            )}
          </button>
        </form>
      </>
    );
  }

  return (
    <button
      className="flex-1 border border-red-500 h-26px"
      onClick={() => {
        setIsAdding(true);
        hideDelete(true);
      }}
    >
      <GrFormAdd className="m-auto" />
    </button>
  );
};
