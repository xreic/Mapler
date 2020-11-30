// Core
import React, { useEffect, useRef, useState } from 'react';

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
        } = await require(`../../resources/assets/${name}.webp`);

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
      <div className={''} onClick={() => handleClick(index)}>
        <img className={''} src={importedImage.current} alt={name} />
      </div>
    );
  }

  return null;
};
