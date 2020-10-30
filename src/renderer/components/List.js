// Core
import React, { useContext, useEffect, useRef, useState } from 'react';
import Store from 'electron-store';

// Helpers, Components
import { ACTIVE, CHARACTERS } from './utils/variables';
import { Task } from './Task';
import { EditContext } from './context/EditContext';
import { getDailyReset, getWeeklyReset } from './utils/resetTimer';
import { useLocation } from '@reach/router';

// Electron store
const store = new Store({ watch: true });

export const List = ({ list }) => {
  const location = useLocation();
  const [_, main, sub] = location.pathname.split('/');

  // Hooks P1
  const { isEditing } = useContext(EditContext);
  const { current: active } = useRef(store.get(ACTIVE));
  const [filter, setFilter] = useState(
    store.get(CHARACTERS)[store.get(ACTIVE)]?.main?.sub || [],
  );

  // Hooks P2 - Reset Timers
  const dailyReset = useRef(null);
  const weeklyResetSun = useRef(null);
  const weeklyResetWed = useRef(null);

  // Hooks P3
  // Store subscription
  useEffect(() => {
    const unsubFilter = store.onDidChange(CHARACTERS, (charList, _) => {
      setFilter(charList[active][main][sub]);
    });

    return () => {
      unsubFilter();
    };
  });

  // Daily reset
  useEffect(() => {
    dailyReset.current = setTimeout(() => {
      resetDailies();
    }, getDailyReset());

    return () => {
      clearTimeout(dailyReset.current);
    };
  });

  // Sunday to Monday reset (UTC)
  useEffect(() => {
    weeklyResetSun.current = setTimeout(() => {}, getWeeklyReset(1));

    return () => {
      clearTimeout(weeklyResetSun.current);
    };
  });

  // Wednesday to Thursday reset (UTC)
  useEffect(() => {
    weeklyResetWed.current = setTimeout(() => {}, getWeeklyReset(4));

    return () => {
      clearTimeout(weeklyResetWed.current);
    };
  });

  // Handlers
  const handleClick = (index) => {
    const tempChar = store.get(CHARACTERS)[store.get(ACTIVE)];
    tempChar[main][sub][index] = isEditing
      ? tempChar[main][sub][index] === 2
        ? 0
        : 2
      : tempChar[main][sub][index]
      ? 0
      : 1;

    const allChars = store.get(CHARACTERS);
    allChars[active] = tempChar;

    store.set(CHARACTERS, allChars);
  };

  return (
    <div className="justify-items-stretch grid grid-cols-3 gap-2">
      {list.map(
        (item, index) =>
          (filter[index] !== 2 || isEditing) && (
            <Task
              key={item}
              name={item}
              index={index}
              handleClick={handleClick}
              filter={filter[index]}
            />
          ),
      )}
    </div>
  );
};

// For some reason the view doesn't refresh when the function is imported
const resetDailies = () => {
  const characters = store.get('characters');
  const tempCharStore = [];

  const dayOfWeek = new Date().getUTCDay();

  for (let char of characters) {
    // Reset daily bosses
    char.bosses.daily = char.bosses.daily.map((value) =>
      value === 1 ? 0 : value,
    );

    // Reset arcane river dailies
    char.quests.arcane = char.quests.arcane.map((value) =>
      value === 1 ? 0 : value,
    );

    // Reset ALL maple world quests
    if (dayOfWeek === 1) {
      char.quests.maple = char.quests.maple.map((value) =>
        value === 1 ? 0 : value,
      );
    } else {
      // Reset daily maple world quests
      char.quests.maple = char.quests.maple.map((value, index) =>
        value === 1 && index < 9 ? 0 : value,
      );
    }

    // Reset weekly bosses
    if (dayOfWeek === 4) {
      char.bosses.weekly = char.bosses.weekly.map((value) =>
        value === 1 ? 0 : value,
      );
    }

    tempCharStore.push(char);
  }

  store.set('characters', tempCharStore);
};
