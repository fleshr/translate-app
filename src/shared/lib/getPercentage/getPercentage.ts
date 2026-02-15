export const getPercentage = (
  current: number,
  total: number,
  precision = 0,
): string => {
  if (total === 0) {
    return "0%";
  }

  return `${Math.floor((Math.abs(current) / Math.abs(total)) * 100 * 10 ** precision) / 10 ** precision}%`;
};
