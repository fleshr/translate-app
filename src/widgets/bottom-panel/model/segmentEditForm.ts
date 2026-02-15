import { TranslationSegmentSchema } from "@/shared/model/translation";
import type { z } from "zod";

export const segmentEditFormSchema = TranslationSegmentSchema.pick({
  originalText: true,
  machineTranslation: true,
  manualTranslation: true,
});

export type SegmentEditFormValues = z.infer<typeof segmentEditFormSchema>;
