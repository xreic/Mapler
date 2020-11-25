// Core
import React, { useEffect, useRef, useState } from 'react';
import { createUseStyles } from 'react-jss';

// Helpers
import { colors } from '../constants/colors';

const useStyles = createUseStyles({
  imageContainer: (props) => ({
    borderRadius: '0.375rem',

    BgOpacity: 1,
    backgroundColor:
      ['#3182ce', '#38a169', '#e53e3e'][props.filter] || '#3182ce',
    backgroundColor:
      [
        'rgba(49, 130, 206, var(--bg-opacity))',
        'rgba(56, 161, 105, var(--bg-opacity))',
        'rgba(229, 62, 62, var(--bg-opacity))',
      ][props.filter] || 'rgba(49, 130, 206, var(--bg-opacity))',
  }),
  imageStyle: {
    width: '53px',
    height: '57px',
    borderRadius: 9999,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});

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
    const { imageContainer, imageStyle } = useStyles(filter);
    return (
      <div className={imageContainer} onClick={() => handleClick(index)}>
        <img src={importedImage.current} alt={name} className={imageStyle} />
      </div>
    );
  }

  return null;
};
