// Core
import React, { useContext, useEffect, useState } from 'react';
import Store from 'electron-store';
import { createUseStyles } from 'react-jss';

// Helpers
import { CharContext } from '../context/CharContext';
import { ACTIVE, DELETING } from '../../constants/variables';

// Electron Store
const store = new Store({ watch: true });

const useStyles = createUseStyles({
  characterWrapper: {
    overflowY: 'hidden',
    padding: '0.5rem',
    height: '287px',
    BgOpacity: 1,
    backgroundColor: '#a0aec0',
    backgroundColor: 'rgba(160, 174, 192, var(--bg-opacity))',
  },
  characterGrid: {
    justifyItems: 'center',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
    gridGap: '0.5rem',
    gap: '0.5rem',
  },
});

const useStylesImage = createUseStyles({
  characterImage: (props) => ({
    borderRadius: 9999,
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',

    BgOpacity: 1,
    backgroundColor: props.isDeleting
      ? '#48bb78'
      : props.isActive
      ? '#4299e1'
      : '',
    backgroundColor: props.isDeleting
      ? 'rgba(72, 187, 120, var(--bg-opacity))'
      : props.isActive
      ? 'rgba(66, 153, 225, var(--bg-opacity))4299e1'
      : '',
  }),
});

export const CharacterList = () => {
  const { characterWrapper, characterGrid } = useStyles();

  /**
   * Hooks P1: Initial state
   * View switching and data hooks
   */
  const { hideAddButton, characters } = useContext(CharContext);
  const [active, setActive] = useState(store.get(ACTIVE));
  const [deleting, setDeleting] = useState(store.get(DELETING));

  /**
   * Hooks P2: Store subscriptions
   * All encompassing subscription
   */
  useEffect(() => {
    const unsub = store.onDidAnyChange(({ active, deleting }, _) => {
      setActive(active);
      setDeleting(deleting);
    });

    return () => {
      unsub();
    };
  }, [active, deleting]);

  const handleClick = (index) => {
    store.set(ACTIVE, index);
  };

  const multiSelect = (index) => {
    const deleting = store.get(DELETING);
    deleting[index] = deleting[index] === 0 ? 1 : 0;
    store.set(DELETING, deleting);
  };

  return (
    <div className={characterWrapper}>
      <div className={characterGrid}>
        {characters.map((code, index) => {
          if (code) {
            const { characterImage } = useStylesImage({
              isDeleting: hideAddButton && deleting[index],
              isActive: active === index,
            });

            return (
              <img
                key={code}
                src={`http://msavatar1.nexon.net/Character/${code}.png`}
                className={characterImage}
                onClick={() => {
                  hideAddButton ? multiSelect(index) : handleClick(index);
                }}
              />
            );
          }
        })}
      </div>
    </div>
  );
};
