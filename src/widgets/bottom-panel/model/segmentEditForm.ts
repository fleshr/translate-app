import { TranslationSegmentSchema } from "@/entities/translation";
import type { z } from "zod";

export const segmentEditFormSchema = TranslationSegmentSchema.pick({
  originalText: true,
  machineTranslation: true,
  manualTranslation: true,
});

export type SegmentEditFormValues = z.infer<typeof segmentEditFormSchema>;
