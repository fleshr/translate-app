import { AnyModuleSchema, type AnyModule } from "@/shared/model/module";

export const createModuleFromCode = async (
  code: string,
): Promise<AnyModule> => {
  const blob = new Blob([code], { type: "text/javascript" });
  const url = URL.createObjectURL(blob);

  try {
    return AnyModuleSchema.parse(await import(/* @vite-ignore */ url));
  } finally {
    URL.revokeObjectURL(url);
  }
};
