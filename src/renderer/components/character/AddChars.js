// Core
import React, { useContext, useRef, useState } from 'react';

// Components
import { Button } from '../utils/Button';
import { FormButton } from '../utils/FormButton';

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

    console.log('====================================');
    console.log('click');
    console.log('====================================');

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

  const goBack = (e) => {
    e.preventDefault();
    setIsAdding(false);
    setHideDelete(false);
  };

  if (hideAddButton) return null;

  if (isAdding) {
    return (
      <>
        {/* Hacky way to make both far left and right button sizes the same */}
        <form onSubmit={goBack} className="flex">
          <FormButton>
            <GrFormPreviousLink className="m-auto" />
          </FormButton>
        </form>

        {/* The actual form */}
        <form
          onSubmit={handleSubmit}
          className="flex w-full divide-x divide-black"
        >
          <input
            className={'flex-1 text-center bg-gray-400 focus:outline-none'}
            placeholder="Character Name"
            maxLength={12}
            value={charName}
            ref={inputRef}
            onChange={handleChange}
            disabled={isLoading}
            spellCheck={false}
          ></input>
          <FormButton loading={isLoading}>
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
