// Core
import React from 'react';
import { readdir } from 'fs';

// SCSS
import {
  taskIncomplete,
  taskComplete,
  taskHidden,
  taskImageStyle,
} from './styles/Task.scss';

export const Task = ({ name, index, handleClick, filter }) => {
  const imageLocation =
    process.env.NODE_ENV === 'production'
      ? `./app/images/${encodeURI(name)}.webp`
      : `./images/${encodeURI(name)}.webp`;

  const backgroundImageStyle = {
    backgroundImage: `url(${imageLocation})`,
  };

  return (
    <div className={getTaskStyle(filter)} onClick={() => handleClick(index)}>
      {/* <div className={taskImageStyle} style={backgroundImageStyle} /> */}
      <img
        className={taskImageStyle}
        style={backgroundImageStyle}
        // src={`file://${imageLocation}images/${encodeURI(name)}.webp`}
      />
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
