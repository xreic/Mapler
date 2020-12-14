// Core
import React, { useContext } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useLocation } from '@reach/router';
import update from 'immutability-helper';
import Store from 'electron-store';
import path from 'path';

// Context
import { EditContext } from './context/EditContext.js';

// Helper
import { ORDER } from '../constants/variables';

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

  // Context
  const { isEditing } = useContext(EditContext);

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

const rearrangeTasks = (sourceIndex, targetIndex, location) => {
  // Reach Router
  const [_, main, sub] = location.pathname.split('/');

  // Electron Store
  const store = new Store();
  const taskList = store.get(ORDER);
  const movingTask = taskList[main][sub][sourceIndex];

  taskList[main][sub] = update(taskList[main][sub], {
    $splice: [
      [sourceIndex, 1],
      [targetIndex, 0, movingTask],
    ],
  });

  store.set(ORDER, taskList);
};
