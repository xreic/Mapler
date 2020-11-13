// Core
import React, { useEffect, useRef, useState } from 'react';
import { ursusGoldenTime } from './utils/ursusGoldenTime';

// Helpers
const colors = ['bg-blue-600', 'bg-green-600', 'bg-red-600'];

// Snowflake component for Ursus Golden Time
export const Ursus = ({ name, index, handleClick, filter }) => {
  /**
   * importImage stores the dynamically imported image
   * need useState to trigger component update once the import has finished
   */
  const importedImage = useRef();
  const [loading, setLoading] = useState(false);
  const [isGoldenTime, setIsGoldenTime] = useState(false);

  useEffect(async () => {
    await Promise.all([
      (async () => {
        setIsGoldenTime(await ursusGoldenTime());
      })(),
      (async () => {
        setLoading(true);

        try {
          const {
            default: namedImage,
          } = await require(`../../../static/assets/${name}.webp`);
          setIsGoldenTime(await ursusGoldenTime());

          importedImage.current = namedImage;
        } catch (err) {
          throw err;
        } finally {
          setLoading(false);
        }
      })(),
    ]);
  }, []);

  if (!loading && !!importedImage.current) {
    return (
      <div
        className={`rounded-md ${
          filter
            ? colors[filter]
            : isGoldenTime
            ? 'bg-yellow-400'
            : 'bg-blue-600'
        }`}
        onClick={() => handleClick(index)}
      >
        <img
          src={importedImage.current}
          alt={name}
          className="rounded-full mx-auto h-57px w-53px"
        />
      </div>
    );
  }

  return null;
};
