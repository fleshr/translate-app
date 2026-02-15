import { z } from "zod";

export const AnyModuleSchema = z.record(
  z.union([z.string(), z.symbol()]),
  z.unknown(),
);

export const BaseModuleSchema = z.object({
  id: z.string(),
  name: z.string(),
  version: z.string(),
  shortName: z.string(),
});

export const ModuleSchema = BaseModuleSchema.extend({
  code: z.string(),
});
