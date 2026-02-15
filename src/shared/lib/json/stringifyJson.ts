export const stringifyJson = (data: unknown): string => {
  return JSON.stringify(data, null, 2);
};
