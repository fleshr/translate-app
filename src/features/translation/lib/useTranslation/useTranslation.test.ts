import {
  setTranslationSegmentField,
  setTranslationSegmentsField,
  useTranslationStore,
} from "@/entities/translation";
import { getTranslationSegmentMock } from "@/entities/translation/mocks";
import { logger } from "@/shared/lib/logger";
import { renderHook, resetStore } from "@/shared/lib/testing";
import { getTranslatorMock } from "@/shared/mocks/translator";
import {
  addSessionTranslatingResourceProgress,
  setSessionStatus,
  setSessionTranslatingResource,
  useSessionStore,
} from "@/shared/model/sessionStore";
import { useSettingsStore } from "@/shared/model/settingsStore";
import { notifications } from "@mantine/notifications";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type {
  TranslationOptions,
  TranslationProcess,
} from "../TranslationProcess/TranslationProcess";
import { useTranslation } from "./useTranslation";

let capturedOptions: TranslationOptions;

const untranslatedSegment = getTranslationSegmentMock({
  id: "segment-1",
  manualTranslation: "",
  machineTranslation: "",
});

const mockTranslationProcess = vi.hoisted(() => {
  return {
    start: vi.fn().mockImplementation((_, options) => {
      capturedOptions = options;
      return Promise.resolve();
    }),
    stop: vi.fn(),
  } as unknown as TranslationProcess;
});

vi.mock("@/shared/lib/logger");
vi.mock("@/shared/model/sessionStore", { spy: true });
vi.mock("@/entities/translation", { spy: true });

vi.mock(import("../TranslationProcess/TranslationProcess"), () => ({
  translationProcess: mockTranslationProcess,
}));

vi.mock(import("@/shared/constants/translators"), () => ({
  translators: { test1: getTranslatorMock() },
}));

describe("features/translation/lib/useTranslation", () => {
  beforeEach(() => {
    useTranslationStore.setState({
      segments: {
        allIds: ["segment-1", "segment-2"],
        byId: {
          "segment-1": untranslatedSegment,
          "segment-2": getTranslationSegmentMock({ id: "segment-2" }),
        },
      },
    });
    useSettingsStore.setState({
      translator: {
        selected: "test1",
        configs: { test1: { testField1: "test" } },
      },
    });
  });

  afterEach(() => {
    resetStore(useSessionStore, useTranslationStore, useSettingsStore);
  });

  it("should stop translation process on stop", () => {
    const { result } = renderHook(() => useTranslation());

    result.current.stop();

    expect(mockTranslationProcess.stop).toHaveBeenCalled();
  });

  it("should not start process and show notification if already translating", async () => {
    useSessionStore.setState({ status: "translating" });
    const { result } = renderHook(() => useTranslation());

    await result.current.start();

    expect(notifications.show).toHaveBeenCalled();
    expect(mockTranslationProcess.start).not.toHaveBeenCalled();
  });

  it("should not start process and show notification if translator not found", async () => {
    useSettingsStore.setState({
      translator: { selected: "test2", configs: {} },
    });
    const { result } = renderHook(() => useTranslation());

    await result.current.start();

    expect(notifications.show).toHaveBeenCalled();
    expect(mockTranslationProcess.start).not.toHaveBeenCalled();
  });

  it("should call translation process with correct arguments", async () => {
    const { result } = renderHook(() => useTranslation());

    await result.current.start();

    expect(mockTranslationProcess.start).toHaveBeenCalledWith(
      [untranslatedSegment],
      expect.objectContaining({
        batch: true,
        translator: expect.objectContaining({
          name: "Mock Translator",
          version: "0.0.1",
        }),
        translatorConfig: { testField1: "test" },
      }),
    );
  });

  it("should set status to translating, logging message and show notification on start", async () => {
    const { result } = renderHook(() => useTranslation());

    await result.current.start();
    capturedOptions.onStart?.();

    expect(setSessionStatus).toHaveBeenCalledWith("translating");

    expect(logger.info).toHaveBeenCalled();
    expect(notifications.show).toHaveBeenCalled();
  });

  it("should set translating resource on resource start", async () => {
    const { result } = renderHook(() => useTranslation());

    await result.current.start();
    capturedOptions.onResourceStart?.("file-1");

    expect(setSessionTranslatingResource).toHaveBeenCalledWith("file-1");
  });

  it("should logging message on batch start", async () => {
    const { result } = renderHook(() => useTranslation());

    await result.current.start();
    capturedOptions.onSegmentBatchStart?.({ Line1: "test" });

    expect(logger.info).toHaveBeenCalled();
  });

  it("should update segement, add progress and logging message on batch complete", async () => {
    const { result } = renderHook(() => useTranslation());

    await result.current.start();
    capturedOptions.onSegmentBatchComplete?.(
      [{ id: "segment-1", translation: "test" }],
      { Line1: "test" },
    );

    expect(setTranslationSegmentsField).toHaveBeenCalledWith([
      { id: "segment-1", translation: "test" },
    ]);
    expect(addSessionTranslatingResourceProgress).toHaveBeenCalledWith(1);

    expect(logger.info).toHaveBeenCalled();
  });

  it("should logging message on sequential start", async () => {
    const { result } = renderHook(() => useTranslation());

    await result.current.start();
    capturedOptions.onSegmentSequentialStart?.(untranslatedSegment);

    expect(logger.info).toHaveBeenCalled();
  });

  it("should update segement, add progress and logging message on sequential complete", async () => {
    const { result } = renderHook(() => useTranslation());

    await result.current.start();
    capturedOptions.onSegmentSequentialComplete?.(untranslatedSegment, "test");

    expect(setTranslationSegmentField).toHaveBeenCalledWith(
      untranslatedSegment.id,
      "test",
    );
    expect(addSessionTranslatingResourceProgress).toHaveBeenCalledWith(1);

    expect(logger.info).toHaveBeenCalled();
  });

  it("should set status to idle, clear translating resource, logging message and show notification on end", async () => {
    const { result } = renderHook(() => useTranslation());

    await result.current.start();
    capturedOptions.onEnd?.();

    expect(setSessionStatus).toHaveBeenCalledWith("idle");
    expect(setSessionTranslatingResource).toHaveBeenCalledWith(null);

    expect(logger.info).toHaveBeenCalled();
    expect(notifications.show).toHaveBeenCalled();
  });

  it("should set status to stopped, clear translating resource, logging message and show notification on stop", async () => {
    const { result } = renderHook(() => useTranslation());

    await result.current.start();
    capturedOptions.onStop?.();

    expect(setSessionStatus).toHaveBeenCalledWith("stopped");
    expect(setSessionTranslatingResource).toHaveBeenCalledWith(null);

    expect(logger.info).toHaveBeenCalled();
    expect(notifications.show).toHaveBeenCalled();
  });

  it("should set status to stopped, clear translating resource, logging message and show notification on error", async () => {
    const { result } = renderHook(() => useTranslation());

    await result.current.start();
    capturedOptions.onError?.(new Error("error"));

    expect(setSessionStatus).toHaveBeenCalledWith("stopped");
    expect(setSessionTranslatingResource).toHaveBeenCalledWith(null);

    expect(logger.error).toHaveBeenCalled();
    expect(notifications.show).toHaveBeenCalled();
  });
});
