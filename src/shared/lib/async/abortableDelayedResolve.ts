interface Options {
  delay?: number;
  signal?: AbortSignal;
}

export const abortableDelayedResolve = <T>(input: T, options: Options = {}) => {
  const { delay = 3000, signal } = options;

  return new Promise<T>((resolve, reject) => {
    signal?.throwIfAborted();

    const timeoutId = setTimeout(() => {
      resolve(input);
    }, delay);

    signal?.addEventListener(
      "abort",
      () => {
        clearTimeout(timeoutId);
        // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
        reject(signal.reason);
      },
      { once: true },
    );
  });
};
