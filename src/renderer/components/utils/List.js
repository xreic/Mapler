// Core
import React from 'react';

// Component
import { Task } from '../Task';

export const List = ({ list }) => (
  <div className="justify-items-stretch grid grid-cols-3 gap-1">
    {list.map((item) => (
      <Task key={item} name={item} />
    ))}
  </div>
);
