// Core
import React, { useEffect, useRef, useState } from 'react';
import path from 'path';

// SCSS
import {
  taskIncomplete,
  taskComplete,
  taskHidden,
  taskImageStyle,
} from './styles/Task.scss';

export const Task = ({ name, index, handleClick, filter }) => {
  const imageLocation = `./images/${name}.webp`;

  return (
    <div className={getTaskStyle(filter)} onClick={() => handleClick(index)}>
      <img className={taskImageStyle} src={imageLocation} />
    </div>
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
