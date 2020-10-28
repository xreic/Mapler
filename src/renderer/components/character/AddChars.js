// Core
import React, { useContext, useState } from 'react';
import { getCharCode } from '../utils/getCharCode';

// Helpers
import { CharContext } from '../context/CharContext';
import {
  GrFormPreviousLink,
  GrFormNextLink,
  GrFormRefresh,
  GrFormAdd,
} from 'react-icons/gr';

export const AddChars = () => {
  const { hideAddButton, setHideDelete } = useContext(CharContext);
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
    setHideDelete(false);
  };

  if (hideAddButton) return null;

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
        setHideDelete(true);
      }}
    >
      <GrFormAdd className="m-auto" />
    </button>
  );
};
