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
import { Button } from '../utils/Button';
import { FormButton } from '../utils/FormButton';

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
        <FormButton action={goBack}>
          <GrFormPreviousLink className="m-auto" />
        </FormButton>
        {/* <button
          className="border border-red-500 focus:outline-none"
          onClick={goBack}
        >
          <GrFormPreviousLink className="m-auto" />
        </button> */}
        <form onSubmit={handleSubmit} className="flex w-full">
          <input
            className="flex-1 text-center focus:outline-none"
            placeholder="Character Code"
            maxLength={12}
            value={charName}
            ref={inputRef}
            onChange={handleChange}
            disabled={isLoading}
            spellCheck={false}
          ></input>
          <FormButton className="text-center focus:outline-none">
            {isLoading ? (
              <GrFormRefresh className="m-auto animate-spin" />
            ) : charName == INVALID ? (
              <GrFormClose className="m-auto" />
            ) : (
              <GrFormNextLink className="m-auto" />
            )}
          </FormButton>
        </form>
      </>
    );
  }

  return (
    <Button action={startAdding}>
      <GrFormAdd className="m-auto" />
    </Button>
  );
};
