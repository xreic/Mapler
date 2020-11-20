export const splitTime = (date) => ({
  year: date.getUTCFullYear(),
  month: date.getUTCMonth(),
  date: date.getUTCDate(),
  hours: date.getUTCHours(),
  minutes: date.getUTCMinutes(),
});

export const getNextReset = () => {
  const now = new Date();
  const { year, month, date } = splitTime(now);
  const reset = new Date(Date.UTC(year, month, date + 1, 0));

  return parseInt(reset - now);
};

export const triggerReset = (preResetChars) => {
  const resetChars = [];
  const dayOfWeek = new Date().getUTCDay();

  for (let char of preResetChars) {
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
        value === 1 && (index < 9 || index > 13) ? 0 : value,
      );
    }

    // Reset weekly bosses
    if (dayOfWeek === 4) {
      char.bosses.weekly = char.bosses.weekly.map((value) =>
        value === 1 ? 0 : value,
      );
    }

    resetChars.push(char);
  }

  return resetChars;
};
