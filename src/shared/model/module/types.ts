import type { z } from "zod";
import type {
  AnyModuleSchema,
  BaseModuleSchema,
  ModuleSchema,
} from "./schemas";

export type AnyModule = z.infer<typeof AnyModuleSchema>;
export type BaseModule = z.infer<typeof BaseModuleSchema>;
export type Module = z.infer<typeof ModuleSchema>;
