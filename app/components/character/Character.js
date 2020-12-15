// Core
import React from 'react';
import { DragPreviewImage, useDrag, useDrop } from 'react-dnd';

// Constants
import { ACTIVE, CHARACTERS } from '../../constants/variables.js';

// Helper
import { rearrangeChars } from '../../utils/Rearrange.js';

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
