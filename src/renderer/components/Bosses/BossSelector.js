// Core
import React from 'react';

export const BossSelector = () => {
  return (
    <div>
      <div className="grid grid-cols-2 items-stretch">
        <p
          // TODO: Implement tooling for CSS-in-JS for TailwindCSS
          className="inline-block text-center border border-red-500"
          onClick={() => {
            console.log('Clicked Daily');
          }}
        >
          Daily
        </p>
        <p
          // TODO: Implement tooling for CSS-in-JS for TailwindCSS
          className="inline-block text-center border border-red-500"
          onClick={() => {
            console.log('Clicked Weekly');
          }}
        >
          Weekly
        </p>
      </div>
    </div>
  );
};
