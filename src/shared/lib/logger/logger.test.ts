import { describe, expect, it, vitest } from "vitest";
import { logger } from "./logger";

describe("shared/lib/logger", () => {
  it("should call handler with message", () => {
    const handler = vitest.fn();

    logger.setHandler(handler);

    logger.debug("debug");
    expect(handler).toHaveBeenCalledWith({
      id: "id",
      type: "debug",
      message: "debug",
    });

    logger.info("info");
    expect(handler).toHaveBeenCalledWith({
      id: "id",
      type: "info",
      message: "info",
    });

    logger.error("error");
    expect(handler).toHaveBeenCalledWith({
      id: "id",
      type: "error",
      message: "error",
    });
  });

  it("should clear handler", () => {
    const handler = vitest.fn();

    logger.setHandler(handler);
    logger.clearHandler();

    logger.debug("debug");
    expect(handler).not.toHaveBeenCalled();

    logger.info("info");
    expect(handler).not.toHaveBeenCalled();

    logger.error("error");
    expect(handler).not.toHaveBeenCalled();
  });
});
