import { createAsyncFunctionSchema } from "@/shared/lib/schema";
import { TranslationSegmentSchema } from "@/shared/model/translation";
import { z } from "zod";

export const UserFunctionSchema = createAsyncFunctionSchema(
  z.function({ input: [TranslationSegmentSchema] }),
);
