import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { abortableDelayedResolve } from "./abortableDelayedResolve";

describe("shared/lib/async/abortableDelayedResolve", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should resolve after delay", async () => {
    const abortableDelayedResolveSpy = vi.fn(abortableDelayedResolve);
    const promise = abortableDelayedResolveSpy("test", { delay: 1000 });

    await vi.advanceTimersByTimeAsync(500);
    expect(abortableDelayedResolveSpy).not.toHaveResolved();

    await vi.advanceTimersByTimeAsync(500);
    expect(abortableDelayedResolveSpy).toHaveResolved();
    expect(await promise).toBe("test");
  });

  it("should reject on signal abort and clear timeout", async () => {
    const abortController = new AbortController();
    const promise = abortableDelayedResolve("test", {
      signal: abortController.signal,
    });

    expect(vi.getTimerCount()).toBe(1);

    abortController.abort("test");

    expect(vi.getTimerCount()).toBe(0);
    await expect(promise).rejects.toThrow("test");
  });

  it("should reject if signal is already aborted", async () => {
    const abortController = new AbortController();
    abortController.abort("test");

    const promise = abortableDelayedResolve("test", {
      signal: abortController.signal,
    });

    await expect(promise).rejects.toThrow("test");
  });
});
