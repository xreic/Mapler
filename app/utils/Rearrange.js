// Core
import Store from 'electron-store';
import update from 'immutability-helper';

// Constants
import { ACTIVE, CHARACTERS, ORDER } from '../constants/variables.js';

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
  const taskList = store.get(ORDER);
  const draggedTask = taskList[main][sub][sourceIndex];

  taskList[main][sub] = update(taskList[main][sub], {
    $splice: [
      [sourceIndex, 1],
      [targetIndex, 0, draggedTask],
    ],
  });

  store.set(ORDER, taskList);
};
