// Core
import React, { useEffect, useRef, useState } from 'react';

// Colors
const colors = ['bg-blue-600', 'bg-green-600', 'bg-red-600'];

export const Task = ({ name, index, handleClick, filter }) => {
  /**
   * importImage stores the dynamically imported image
   * need useState to trigger component update once the import has finished
   */
  const importedImage = useRef();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const {
          default: namedImage,
        } = await require(`../../../static/assets/${name}.webp`);

        importedImage.current = namedImage;
      } catch (err) {
        throw err;
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (!loading && !!importedImage.current) {
    return (
      <div
        className={`border border-red-500 rounded-md
        ${colors[filter] || 'bg-blue-600'}
        `}
        onClick={() => handleClick(index)}
      >
        <img
          src={importedImage.current}
          alt={name}
          className="mx-auto border border-black bg-white rounded-full h-57px w-53px"
        />
        {/* <p className="text-center text-xs">{name}</p> */}
      </div>
    );
  }

  return null;
};
