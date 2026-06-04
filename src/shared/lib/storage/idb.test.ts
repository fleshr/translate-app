import { del, get, set } from "idb-keyval";
import { describe, expect, it, vi } from "vitest";
import { idbStorage } from "./idb";

vi.mock("idb-keyval");

describe("shared/lib/storage/idb", () => {
  it("should get value", async () => {
    vi.mocked(get).mockResolvedValue("value");

    const result = await idbStorage.getItem("test");

    expect(get).toHaveBeenCalledWith("test");
    expect(result).toBe("value");
  });

  it("should return null if value is not found", async () => {
    vi.mocked(get).mockResolvedValue(undefined);

    const result = await idbStorage.getItem("test");

    expect(get).toHaveBeenCalledWith("test");
    expect(result).toBe(null);
  });

  it("should set value", async () => {
    await idbStorage.setItem("test", "value");

    expect(set).toHaveBeenCalledWith("test", "value");
  });

  it("should remove value", async () => {
    await idbStorage.removeItem("test");

    expect(del).toHaveBeenCalledWith("test");
  });
});
