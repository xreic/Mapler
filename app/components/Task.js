// Core
import React, { useEffect, useRef, useState } from 'react';
import path from 'path';

// SCSS
import {
  taskIncomplete,
  taskComplete,
  taskHidden,
  taskImageStyle,
} from './styles/Task.scss';

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
        const imageLocation =
          process.env.NODE_ENV === 'production'
            ? `./${name}.webp`
            : `../images/${name}.webp`;

        const { default: namedImage } = await require(imageLocation);

        importedImage.current = namedImage;
      } catch (err) {
        throw err;
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // const backgroundImageStyle = {
  //   backgroundImage: `url(file://${path.join(
  //     __dirname,
  //     importedImage.current
  //   )})`,
  // };

  if (loading || !importedImage.current) return null;

  return (
    <div className={getTaskStyle(filter)} onClick={() => handleClick(index)}>
      {/* <div className={taskImageStyle} style={backgroundImageStyle} /> */}
      <img className={taskImageStyle} src={importedImage.current} />
    </div>
  );
};

const getTaskStyle = (filter) => {
  switch (filter) {
    case 0:
      return taskIncomplete;
    case 1:
      return taskComplete;
    case 2:
      return taskHidden;
    default:
      return taskIncomplete;
  }
};
