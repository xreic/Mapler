// Core
import React, { useContext, useState } from 'react';

// Components
import { Button } from '../utils/Button';
import { FormButton } from '../utils/FormButton';

// Helpers
import { CharContext } from '../context/CharContext';
import { activateDelete } from '../utils/getCharCode';
import { GrFormSubtract, GrFormPreviousLink } from 'react-icons/gr';

export const DeleteChars = () => {
  const { setHideAdd, hideDeleteButton, setCharacters } = useContext(
    CharContext,
  );
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    const characters = activateDelete();
    setCharacters(characters.map(({ code }) => code));
    goBack();
  };

  const startDeleting = () => {
    setHideAdd(true);
    setIsDeleting(true);
  };

  const goBack = () => {
    setIsDeleting(false);
    setHideAdd(false);
  };

  if (hideDeleteButton) return null;

  return (
    <>
      {isDeleting && (
        <FormButton action={goBack}>
          <GrFormPreviousLink className="m-auto" />
        </FormButton>
      )}
      <Button
        action={() => {
          isDeleting ? handleDelete() : startDeleting();
        }}
      >
        <GrFormSubtract className="m-auto" />
      </Button>
    </>
  );
};
