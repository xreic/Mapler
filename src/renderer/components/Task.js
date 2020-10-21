// Core
import React, { useEffect, useRef, useState } from 'react';

export const Task = ({ name }) => {
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
        // console.error('==== Task.js Error ====');
        // console.error(err);
        // console.error('==== Task.js Error ====');
        throw err;
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (!loading && !!importedImage.current) {
    return (
      <div className="border border-red-500 bg-green-600 rounded-md">
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
