// Core
import React, { useContext, useRef, useState } from 'react';

// Helpers
import { getCharCode, isDupe, setStore } from '../utils/getCharCode';
import { CharContext } from '../context/CharContext';
import {
  GrFormPreviousLink,
  GrFormNextLink,
  GrFormRefresh,
  GrFormAdd,
  GrFormClose,
} from 'react-icons/gr';

const INVALID = 'Invalid Character Name';

export const AddChars = () => {
  // View Hooks
  const { hideAddButton, setHideDelete } = useContext(CharContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  // Form Data Hooks
  const [charName, setCharName] = useState('');
  const inputRef = useRef();

  const handleChange = (e) => {
    setCharName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLoading || isDupe(charName)) return;
    if (charName == INVALID) {
      setCharName('');
      return;
    }

    setIsLoading(true);
    let charCode;

    while (!charCode) charCode = await getCharCode(charName);

    if (charCode == INVALID) {
      setCharName(INVALID);
    } else if (charCode) {
      setStore(charName, charCode);
      setCharName('');
    }

    setIsLoading(false);
    inputRef.current.focus();
  };

  const startAdding = () => {
    setIsAdding(true);
    setHideDelete(true);
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
          <GrFormPreviousLink className="m-auto" />
        </button>
        <form onSubmit={handleSubmit} className="flex w-full">
          <input
            className="flex-1 text-center border border-red-500"
            placeholder="Character Code"
            maxLength={12}
            value={charName}
            ref={inputRef}
            onChange={handleChange}
            disabled={isLoading}
            spellCheck={false}
          ></input>
          <button className="text-center border border-red-500">
            {isLoading ? (
              <GrFormRefresh className="m-auto animate-spin" />
            ) : charName == INVALID ? (
              <GrFormClose className="m-auto" />
            ) : (
              <GrFormNextLink className="m-auto" />
            )}
          </button>
        </form>
      </>
    );
  }

  return (
    <button
      className="flex-1 border border-red-500 h-26px"
      onClick={startAdding}
    >
      <GrFormAdd className="m-auto" />
    </button>
  );
};
