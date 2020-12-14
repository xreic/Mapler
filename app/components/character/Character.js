// Core
import React from 'react';
import { DragPreviewImage, useDrag, useDrop } from 'react-dnd';
import update from 'immutability-helper';
import Store from 'electron-store';

// Constants
import { ACTIVE, CHARACTERS } from '../../constants/variables.js';

export const Character = ({ style, code, index, handler }) => {
  // React DnD
  const [_drag, drag, preview] = useDrag({
    item: { type: 'character', index },
    end: ({ index: sourceIndex }, monitor) => {
      if (!monitor.didDrop()) return;

      const targetIndex = monitor.getDropResult().target;
      rearrangeChars(sourceIndex, targetIndex);
    },
  });

  const [_drop, drop] = useDrop({
    accept: 'character',
    drop: () => ({ target: index }),
  });

  return (
    <>
      <DragPreviewImage
        connect={preview}
        src={`http://msavatar1.nexon.net/Character/${code}.png`}
      />
      <span ref={drop}>
        <img
          ref={drag}
          className={style}
          src={`http://msavatar1.nexon.net/Character/${code}.png`}
          onClick={() => handler(index)}
        />
      </span>
    </>
  );
};

const rearrangeChars = (sourceIndex, targetIndex) => {
  // Electron Store
  const store = new Store();
  const characters = store.get(CHARACTERS);

  const movingChar = characters[sourceIndex];
  const rearranged = update(characters, {
    $splice: [
      [sourceIndex, 1],
      [targetIndex, 0, movingChar],
    ],
  });

  store.set(CHARACTERS, rearranged);

  if (store.get(ACTIVE) !== sourceIndex) {
    const charNames = rearranged.map((char) => char.name);
    const newIndex = charNames.indexOf(characters[store.get(ACTIVE)].name);
    store.set(ACTIVE, newIndex);
  } else {
    store.set(ACTIVE, targetIndex);
  }
};
