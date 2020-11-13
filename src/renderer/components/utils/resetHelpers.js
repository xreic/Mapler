export const splitTime = (date) => ({
  year: date.getUTCFullYear(),
  month: date.getUTCMonth(),
  date: date.getUTCDate(),
  hours: date.getUTCHours(),
  minutes: date.getUTCMinutes(),
});

export const getDailyReset = () => {
  const now = new Date();
  const { year, month, date } = splitTime(now);
  const reset = new Date(Date.UTC(year, month, date + 1, 0));

  return parseInt(reset - now);
};

export const getWeeklyReset = (resetDay) => {
  const now = new Date();
  const { year, month, date } = splitTime(now);
  const reset = new Date(
    Date.UTC(year, month, date + (6 + resetDay - now.getDay()), 0),
  );

  return parseInt(reset - now);
};
