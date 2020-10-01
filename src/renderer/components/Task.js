// Core
import React, { useEffect, useRef, useState } from 'react';

// Component
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
        // throw err;
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (!loading && !!importedImage.current) {
    return <img src={importedImage.current} />;
  }

  return <p className="text-center h-57 w-86">{name}</p>;
};
