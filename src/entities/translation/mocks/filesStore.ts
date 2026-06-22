import { createMockFactory } from "@/shared/lib/testing";
import type { State } from "../model/filesStore/store";

const mockFilesStoreState: State = {
  files: {
    "files/file-1": new TextEncoder().encode("content-1").buffer,
    "files/file-2": new TextEncoder().encode("content-2").buffer,
  },
};

export const getFilesStoreStateMock = createMockFactory(mockFilesStoreState);
