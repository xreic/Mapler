export const splitTime = (date) => [
  date.getUTCFullYear(),
  date.getUTCMonth(),
  date.getUTCDate(),
  date.getUTCHours(),
];

export const getDailyReset = () => {
  const now = new Date();
  const [year, month, date, ...rest] = splitTime(now);
  const reset = new Date(Date.UTC(year, month, date + 1, 0));

  return parseInt(reset - now);
};

export const getWeeklyReset = (resetDay) => {
  const now = new Date();
  const [year, month, date, ...rest] = splitTime(now);
  const reset = new Date(
    Date.UTC(year, month, date + (6 + resetDay - now.getDay()), 0),
  );

  return parseInt(reset - now);
};
