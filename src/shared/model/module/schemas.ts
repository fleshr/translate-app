import { z } from "zod";

export const ModuleUnknownSchema = z.record(
  z.union([z.string(), z.symbol()]),
  z.unknown(),
);

export const ModuleBaseSchema = z.object({
  id: z.string(),
  name: z.string(),
  version: z.string(),
  shortName: z.string(),
});

export const ModuleBuiltinSchema = ModuleBaseSchema.extend({
  type: z.literal("builtin"),
});

export const ModuleExternalSchema = ModuleBaseSchema.extend({
  type: z.literal("external"),
  code: z.string(),
});

export const ModuleSchema = z.discriminatedUnion("type", [
  ModuleBuiltinSchema,
  ModuleExternalSchema,
]);
