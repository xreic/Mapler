// Core
import React, { useContext, useState } from 'react';

// Components
import { Button } from '../Button.js';
import { FormButton } from '../FormButton.js';

// Helpers
import { CharContext } from '../context/CharContext.js';
import { activateDelete } from '../../utils/getCharCode.js';
import { GrFormSubtract, GrFormPreviousLink } from 'react-icons/gr';

// SCSS
import { deleteCharStyle } from './styles/DeleteChars.scss';

export const DeleteChars = () => {
  const { setHideAdd, hideDeleteButton, setCharacters } = useContext(
    CharContext
  );
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    const characters = activateDelete();
    setCharacters(characters.map(({ code }) => code));

    setTimeout(() => {
      goBack();
    }, 1);
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
    <div className={deleteCharStyle}>
      {isDeleting && (
        <FormButton action={goBack}>
          <GrFormPreviousLink />
        </FormButton>
      )}
      <Button
        action={() => {
          isDeleting ? handleDelete() : startDeleting();
        }}
      >
        <GrFormSubtract />
      </Button>
    </div>
  );
};
