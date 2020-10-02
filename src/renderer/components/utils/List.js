// Core
import React from 'react';
import { Task } from '../Task';

// Components
export const List = ({ list }) => {
  return (
    <div className="grid grid-cols-3 items-center gap-6">
      {list.map((item) => (
        <div key={item} className="border border-red-500 ">
          <Task name={item} />
        </div>
      ))}
    </div>
  );
};
