// Core
import React from 'react';
import { DragPreviewImage, useDrag, useDrop } from 'react-dnd';
import Store from 'electron-store';
import update from 'immutability-helper';

// Constants
import { ACTIVE, CHARACTERS } from '../../constants/variables';

export const Character = ({ style, code, index, handler }) => {
  const [{ isDragging }, drag, preview] = useDrag({
    item: { type: 'character', id: index },
    end: (item, monitor) => {
      if (!monitor.didDrop()) return;

      const sourceIndex = item.id;
      const targetIndex = monitor.getDropResult().target;

      rearrangeChars(sourceIndex, targetIndex);
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
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

  const chars = store.get(CHARACTERS);
  const movingChar = chars[sourceIndex];

  store.set(
    CHARACTERS,
    update(chars, {
      $splice: [
        [sourceIndex, 1],
        [targetIndex, 0, movingChar],
      ],
    })
  );
  store.set(ACTIVE, targetIndex);
};
