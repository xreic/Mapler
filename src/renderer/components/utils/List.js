// Core
import React from 'react';

// Components
export const List = ({ list }) => (
  <div className="grid grid-cols-3 items-stretch">
    {list.map((item) => (
      <div key={item} className="border border-red-500  ">
        <p className="text-center h-57 w-86">{item}</p>
      </div>
    ))}
  </div>
);
