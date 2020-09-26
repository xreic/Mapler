// Core
import React from 'react';

// Component
export const QuestSelector = () => {
  return (
    <div>
      <div className="grid grid-cols-2 items-stretch">
        <p
          // TODO: Implement tooling for CSS-in-JS for TailwindCSS
          className="inline-block text-center border border-red-500"
          onClick={() => {
            console.log('Clicked Maple World');
          }}
        >
          Maple World
        </p>
        <p
          // TODO: Implement tooling for CSS-in-JS for TailwindCSS
          className="inline-block text-center border border-red-500"
          onClick={() => {
            console.log('Clicked Arcane River');
          }}
        >
          Arcane River
        </p>
      </div>
    </div>
  );
};
