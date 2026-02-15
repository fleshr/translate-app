import { z } from "zod";

export const createFunctionSchema = <T extends z.core.$ZodFunction>(
  schema: T,
) => {
  return z.custom<Parameters<T["implement"]>[0]>((fn) => {
    if (typeof fn !== "function") {
      return false;
    }

    return schema.implement(fn as () => void);
  });
};

export const createAsyncFunctionSchema = <T extends z.core.$ZodFunction>(
  schema: T,
) => {
  return z.custom<Parameters<T["implementAsync"]>[0]>((fn) => {
    if (typeof fn !== "function") {
      return false;
    }

    return schema.implementAsync(fn as () => Promise<void>);
  });
};
