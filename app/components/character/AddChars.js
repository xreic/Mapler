// Core
import React, { useContext, useRef, useState } from 'react';
import { createUseStyles } from 'react-jss';

// Components
import { Button } from '../Button';
import { FormButton } from '../FormButton';

// Helpers
import { CharContext } from '../context/CharContext';
import { getCharCode, isDupe, setStore } from '../../utils/getCharCode';
import { INVALID_CHAR } from '../../constants/variables';
import {
  GrFormPreviousLink,
  GrFormNextLink,
  GrFormRefresh,
  GrFormAdd,
  GrErase,
} from 'react-icons/gr';

const useStyle = createUseStyles({
  miniFormContainer: {
    display: 'flex',
  },
  formContainer: {
    display: 'flex',
    width: '100%',
    // Horizontal Elements Divide
    TwDivideYReverse: 0,
    borderTopWidth: 'calc(1px * calc(1 - var(--tw-divide-y-reverse)))',
    borderBottomWidth: 'calc(1px * var(--tw-divide-y-reverse))',
    // Horizontal Elements Divide Color
    TwDivideOpacity: 1,
    borderColor: 'rgba(0, 0, 0, var(--tw-divide-opacity))',
  },
  inputStyle: {
    flex: '1 1 0%',
    textAlign: 'center',
    BgOpacity: 1,
    backgroundColor: '#cbd5e0',
    backgroundColor: 'rgba(203, 213, 224, var(--bg-opacity))',
    '&:focus': {
      outline: '2px solid transparent',
      outlineOffset: 2,
    },
  },
  iconStyle: {
    margin: 'auto',
  },
  spinningIconStyle: {
    margin: 'auto',
    animation: 'spin 1s linear infinite',
  },
});

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

    /**
     * Sanity Checks
     *  1. Immediately exit, if
     *    1. an ongoing request is going
     *    2. character is already bring tracked
     *
     *  2. Clears the input field, if invalid
     */
    if (isLoading || isDupe(charName)) return;
    if (charName == INVALID_CHAR) {
      setCharName('');
      return;
    }

    // Disable changing the input field and request button
    setIsLoading(true);

    // Get and parse data
    let charCode;
    while (!charCode) charCode = await getCharCode(charName);
    if (charCode == INVALID_CHAR) {
      setCharName(INVALID_CHAR);
    } else if (charCode) {
      setStore(charName, charCode);
      setCharName('');
    }

    /**
     * Enable changing the input field and request button
     * Place focus onto the input field
     */
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

  const {
    miniFormContainer,
    formContainer,
    inputStyle,
    iconStyle,
    spinningIconStyle,
  } = useStyle();

  if (isAdding) {
    return (
      <>
        {/* Hacky way to make both far left and right button sizes the same */}
        <form onSubmit={goBack} className={miniFormContainer}>
          <FormButton>
            <GrFormPreviousLink className={iconStyle} />
          </FormButton>
        </form>

        {/* The actual form */}
        <form onSubmit={handleSubmit} className={formContainer}>
          <input
            className={inputStyle}
            placeholder="Character Name"
            maxLength={12}
            value={charName}
            ref={inputRef}
            onChange={handleChange}
            disabled={isLoading || charName === INVALID_CHAR}
            spellCheck={false}
          ></input>
          <FormButton loading={isLoading}>
            {isLoading ? (
              <GrFormRefresh className={spinningIconStyle} />
            ) : charName == INVALID_CHAR ? (
              <GrErase className={iconStyle} />
            ) : (
              <GrFormNextLink className={iconStyle} />
            )}
          </FormButton>
        </form>
      </>
    );
  }

  return (
    <Button action={startAdding}>
      <GrFormAdd className={iconStyle} />
    </Button>
  );
};
