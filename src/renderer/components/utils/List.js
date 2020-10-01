// Core
import React from 'react';
import { Task } from '../Task';

// Components
export const List = ({ list }) => {
  return (
    <div className="grid grid-cols-3 items-stretch gap-4">
      {list.map((item) => (
        <div key={item} className="border border-red-500 my-auto">
          <Task name={item} />
        </div>
      ))}
    </div>
  );
};
