import { ModuleUnknownSchema, type ModuleUnknown } from "@/shared/model/module";

export const createModuleFromCode = async (
  code: string,
): Promise<ModuleUnknown> => {
  const blob = new Blob([code], { type: "text/javascript" });
  const url = URL.createObjectURL(blob);

  try {
    return ModuleUnknownSchema.parse(await import(/* @vite-ignore */ url));
  } finally {
    URL.revokeObjectURL(url);
  }
};
