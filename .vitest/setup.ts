import "@testing-library/jest-dom/vitest";
import "fake-indexeddb/auto";

import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

vi.mock("browser-fs-access");
vi.mock("@mantine/notifications");

vi.mock("nanoid", () => ({ nanoid: vi.fn(() => "id") }));

afterEach(() => {
  cleanup();
});
