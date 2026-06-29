import { UserFunctionSchema, type UserFunction } from "../model/userFunction";

export const parseFuntionFromCode = (code: string): UserFunction => {
  // eslint-disable-next-line @typescript-eslint/no-implied-eval, @typescript-eslint/no-unsafe-call
  return UserFunctionSchema.parse(new Function(code)());
};
