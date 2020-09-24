import React from 'react';

export const Home = () => {
  return (
    <div>
      <div className="grid grid-cols-2 items-stretch">
        <p
          // TODO: Implement tooling for CSS-in-JS for TailwindCSS
          className="inline-block text-center border border-red-500"
          onClick={() => {
            console.log('Clicked Bosses');
          }}
        >
          Bosses
        </p>
        <p
          // TODO: Implement tooling for CSS-in-JS for TailwindCSS
          className="inline-block text-center border border-red-500"
          onClick={() => {
            console.log('Clicked Quests');
          }}
        >
          Quests
        </p>
      </div>
    </div>
  );
};
