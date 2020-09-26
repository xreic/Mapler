// Core
import React from 'react';

// Components
export const List = ({ list }) => (
  <div className="grid grid-cols-3 items-stretch">
    {list.map((item) => (
      <p key={item} className="text-center">
        {item}
      </p>
    ))}
  </div>
);
