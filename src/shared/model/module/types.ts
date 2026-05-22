import type { z } from "zod";
import type {
  ModuleBaseSchema,
  ModuleBuiltinSchema,
  ModuleExternalSchema,
  ModuleSchema,
  ModuleUnknownSchema,
} from "./schemas";

export type ModuleUnknown = z.infer<typeof ModuleUnknownSchema>;
export type ModuleBase = z.infer<typeof ModuleBaseSchema>;
export type ModuleBuiltin = z.infer<typeof ModuleBuiltinSchema>;
export type ModuleExternal = z.infer<typeof ModuleExternalSchema>;
export type Module = z.infer<typeof ModuleSchema>;
