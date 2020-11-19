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
