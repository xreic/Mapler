// Core
import React, { useContext } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useLocation } from '@reach/router';
import path from 'path';

// Context
import { EditContext } from '../context/EditContext.js';

// Helper
import { rearrangeTasks } from '../../utils/Rearrange.js';

// SCSS
import {
  taskIncomplete,
  taskComplete,
  taskHidden,
  taskImageStyle,
} from './styles/Task.scss';

export const Task = ({ name, index, handleClick, filter }) => {
  const location = useLocation();
  const { isEditing } = useContext(EditContext);

  // React DnD
  const [_drag, drag] = useDrag({
    item: { type: 'task', index },
    end: ({ index: sourceIndex }, monitor) => {
      if (!monitor.didDrop()) return;

      const targetIndex = monitor.getDropResult().target;
      rearrangeTasks(sourceIndex, targetIndex, location);
    },
  });

  const [_drop, drop] = useDrop({
    accept: 'task',
    drop: () => ({ target: index }),
  });

  const handleDrag = (e) => {
    !isEditing && e.preventDefault();
  };

  const imageLocation = `./images/${name}.png`;

  return (
    <>
      <span ref={drop}>
        <div
          ref={drag}
          className={getTaskStyle(filter)}
          onClick={() => handleClick(index)}
          onDragStart={handleDrag}
        >
          <img
            ref={drag}
            className={taskImageStyle}
            src={imageLocation}
            onDragStart={handleDrag}
          />
        </div>
      </span>
    </>
  );
};

const getTaskStyle = (filter) => {
  switch (filter) {
    case 0:
      return taskIncomplete;
    case 1:
      return taskComplete;
    case 2:
      return taskHidden;
    default:
      return taskIncomplete;
  }
};
