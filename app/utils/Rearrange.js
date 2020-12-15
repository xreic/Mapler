// Core
import Store from 'electron-store';
import update from 'immutability-helper';

// Constants
import { ACTIVE, CHARACTERS } from '../constants/variables.js';

export const rearrangeChars = (sourceIndex, targetIndex) => {
  const store = new Store();

  // List of characters
  const characters = store.get(CHARACTERS);
  const draggedChar = characters[sourceIndex];

  const rearranged = update(characters, {
    $splice: [
      [sourceIndex, 1],
      [targetIndex, 0, draggedChar],
    ],
  });

  store.set(CHARACTERS, rearranged);

  if (store.get(ACTIVE) !== sourceIndex) {
    const charNames = rearranged.map((char) => char.name);
    const newIndex = charNames.indexOf(characters[store.get(ACTIVE)].name);
    store.set(ACTIVE, newIndex);
  } else {
    store.set(ACTIVE, targetIndex);
  }
};

export const rearrangeTasks = (sourceIndex, targetIndex, location) => {
  // Reach Router
  const [_, main, sub] = location.pathname.split('/');

  // Electron Store
  const store = new Store();

  // List of all bosses and quests
  let taskList = store.get(`${main}-${sub}`);
  const draggedTask = taskList[sourceIndex];

  taskList = update(taskList, {
    $splice: [
      [sourceIndex, 1],
      [targetIndex, 0, draggedTask],
    ],
  });

  // Update all characters
  const charList = [];
  for (let char of store.get(CHARACTERS)) {
    const task = char[main][sub][sourceIndex];
    char[main][sub] = update(char[main][sub], {
      $splice: [
        [sourceIndex, 1],
        [targetIndex, 0, task],
      ],
    });

    charList.push(char);
  }

  // Set the config
  store.set(`${main}-${sub}`, taskList);
  store.set(CHARACTERS, charList);
};
