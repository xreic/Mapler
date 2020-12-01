// Core
import React from 'react';

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
      ? `/${encodeURI(name)}.webp`
      : `/images/${encodeURI(name)}.webp`;

  const backgroundImageStyle = {
    backgroundImage: `url(${imageLocation})`,
  };

  return (
    <div className={getTaskStyle(filter)} onClick={() => handleClick(index)}>
      {/* <div className={taskImageStyle} style={backgroundImageStyle} /> */}
      <img
        className={taskImageStyle}
        src={`file://${__dirname}${imageLocation}`}
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
