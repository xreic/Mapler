// Core
import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useLocation } from '@reach/router';
import path from 'path';

// Context
import { EditContext } from '../context/EditContext.js';

// Helper + Constants
import { rearrangeTasks } from '../../utils/Rearrange.js';
import { ORDER } from '../../constants/variables.js';

// SCSS
import {
  taskIncomplete,
  taskComplete,
  taskHidden,
  taskImageStyle,
} from './styles/Task.scss';

export const Task = ({ name, index, handleClick, filter }) => {
  const location = useLocation();

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

  const imageLocation = `./images/${name}.png`;

  return (
    <>
      <span ref={drop}>
        <div
          ref={drag}
          className={getTaskStyle(filter)}
          onClick={() => handleClick(index)}
        >
          <img ref={drag} className={taskImageStyle} src={imageLocation} />
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
