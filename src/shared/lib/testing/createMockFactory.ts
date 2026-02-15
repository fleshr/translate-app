export const createMockFactory = <T>(mock: T) => {
  return (override?: Partial<T>): T => {
    return { ...mock, ...override };
  };
};
