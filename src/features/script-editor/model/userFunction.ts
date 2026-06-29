import { TranslationSegmentSchema } from "@/entities/translation";
import { createAsyncFunctionSchema } from "@/shared/lib/schema";
import { z } from "zod";

export const UserFunctionSchema = createAsyncFunctionSchema(
  z.function({ input: [TranslationSegmentSchema] }),
);
