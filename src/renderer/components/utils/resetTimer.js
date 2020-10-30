const splitTime = (date) => [
  date.getFullYear(),
  date.getMonth(),
  date.getDate(),
  date.getHours(),
  date.getMinutes(),
  date.getSeconds(),
];

export const getDailyReset = () => {
  const now = new Date();
  const [year, month, date, ...rest] = splitTime(now);
  const reset = new Date(year, month, date + 1);

  return parseInt(reset - now);
};

export const getWeeklyReset = (resetDay) => {
  const now = new Date();
  const day = now.getDay();
  const [year, month, date] = splitTime(now);

  const reset = new Date(year, month, date + (7 + resetDay - day));

  return parseInt(reset - now);
};
