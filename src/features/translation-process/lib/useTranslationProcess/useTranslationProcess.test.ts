import {
  setTranslationSegmentField,
  setTranslationSegmentsField,
  useTranslationStore,
} from "@/entities/translation";
import { getTranslationStoreStateMock } from "@/entities/translation/mocks";
import * as translatorModule from "@/entities/translator";
import { useTranslatorStore } from "@/entities/translator";
import {
  getTranslatorMock,
  getTranslatorStoreStateMock,
} from "@/entities/translator/mocks";
import { logger } from "@/shared/lib/logger";
import { renderHook, resetStore } from "@/shared/lib/testing";
import { notifications } from "@mantine/notifications";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  setTranslationProcessStatus,
  setTranslationProcessTranslatingResource,
} from "../../model/processStore/actions";
import { useTranslationProcessStore } from "../../model/processStore/store";
import type {
  TranslationOptions,
  TranslationProcess,
} from "../TranslationProcess/TranslationProcess";
import { useTranslationProcess } from "./useTranslationProcess";

const testTranslator = getTranslatorMock();
const testStore = getTranslationStoreStateMock();
const untranslatedSegment = testStore.segments.byId["segment-3"]!;

let capturedOptions: TranslationOptions;

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
vi.mock("../../model/processStore/actions", { spy: true });
vi.mock("@/entities/translation", { spy: true });
vi.mock("@/entities/translator", { spy: true });

vi.mock(import("../TranslationProcess/TranslationProcess"), () => ({
  translationProcess: mockTranslationProcess,
}));

vi.spyOn(translatorModule, "translators", "get").mockReturnValue({
  openai: testTranslator,
});

describe("features/translation-process/lib/useTranslationProcess", () => {
  beforeEach(() => {
    useTranslationStore.setState(testStore);
    useTranslatorStore.setState(getTranslatorStoreStateMock());
  });

  afterEach(() => {
    resetStore(
      useTranslationProcessStore,
      useTranslationStore,
      useTranslatorStore,
    );
  });

  it("should stop translation process on stop", () => {
    const { result } = renderHook(() => useTranslationProcess());

    result.current.stop();

    expect(mockTranslationProcess.stop).toHaveBeenCalled();
  });

  it("should not start process and show notification if already translating", async () => {
    useTranslationProcessStore.setState({ status: "translating" });
    const { result } = renderHook(() => useTranslationProcess());

    await result.current.start();

    expect(notifications.show).toHaveBeenCalled();
    expect(mockTranslationProcess.start).not.toHaveBeenCalled();
  });

  it("should not start process and show notification if translator not found", async () => {
    useTranslatorStore.setState({ selected: "test" });
    const { result } = renderHook(() => useTranslationProcess());

    await result.current.start();

    expect(notifications.show).toHaveBeenCalled();
    expect(mockTranslationProcess.start).not.toHaveBeenCalled();
  });

  it("should call translation process with correct arguments", async () => {
    const { result } = renderHook(() => useTranslationProcess());

    await result.current.start();

    expect(mockTranslationProcess.start).toHaveBeenCalledWith(
      [untranslatedSegment],
      expect.objectContaining({
        mode: "sequential",
        translator: testTranslator,
        translatorConfig: { model: "gpt-3.5-turbo" },
      }),
    );
  });

  it("should set status to translating, logging message and show notification on start", async () => {
    const { result } = renderHook(() => useTranslationProcess());

    await result.current.start();
    capturedOptions.onStart?.();

    expect(setTranslationProcessStatus).toHaveBeenCalledWith("translating");

    expect(logger.info).toHaveBeenCalled();
    expect(notifications.show).toHaveBeenCalled();
  });

  it("should set translating resource on resource start", async () => {
    const { result } = renderHook(() => useTranslationProcess());

    await result.current.start();
    capturedOptions.onResourceStart?.("file-1");

    expect(setTranslationProcessTranslatingResource).toHaveBeenCalledWith(
      "file-1",
    );
  });

  it("should logging message on batch start", async () => {
    const { result } = renderHook(() => useTranslationProcess());

    await result.current.start();
    capturedOptions.onSegmentBatchStart?.({ Line1: "test" });

    expect(logger.info).toHaveBeenCalled();
  });

  it("should update segement, add progress and logging message on batch complete", async () => {
    const { result } = renderHook(() => useTranslationProcess());

    await result.current.start();
    capturedOptions.onSegmentBatchComplete?.(
      [{ id: "segment-1", translation: "test" }],
      { Line1: "test" },
    );

    expect(setTranslationSegmentsField).toHaveBeenCalledWith([
      { id: "segment-1", translation: "test" },
    ]);

    expect(logger.info).toHaveBeenCalled();
  });

  it("should logging message on sequential start", async () => {
    const { result } = renderHook(() => useTranslationProcess());

    await result.current.start();
    capturedOptions.onSegmentSequentialStart?.(untranslatedSegment);

    expect(logger.info).toHaveBeenCalled();
  });

  it("should update segement, add progress and logging message on sequential complete", async () => {
    const { result } = renderHook(() => useTranslationProcess());

    await result.current.start();
    capturedOptions.onSegmentSequentialComplete?.(untranslatedSegment, "test");

    expect(setTranslationSegmentField).toHaveBeenCalledWith(
      untranslatedSegment.id,
      "test",
    );

    expect(logger.info).toHaveBeenCalled();
  });

  it("should set status to idle, clear translating resource, logging message and show notification on end", async () => {
    const { result } = renderHook(() => useTranslationProcess());

    await result.current.start();
    capturedOptions.onEnd?.();

    expect(setTranslationProcessStatus).toHaveBeenCalledWith("idle");
    expect(setTranslationProcessTranslatingResource).toHaveBeenCalledWith(null);

    expect(logger.info).toHaveBeenCalled();
    expect(notifications.show).toHaveBeenCalled();
  });

  it("should set status to idle, clear translating resource, logging message and show notification on stop", async () => {
    const { result } = renderHook(() => useTranslationProcess());

    await result.current.start();
    capturedOptions.onStop?.();

    expect(setTranslationProcessStatus).toHaveBeenCalledWith("idle");
    expect(setTranslationProcessTranslatingResource).toHaveBeenCalledWith(null);

    expect(logger.info).toHaveBeenCalled();
    expect(notifications.show).toHaveBeenCalled();
  });

  it("should set status to idle, clear translating resource, logging message and show notification on error", async () => {
    const { result } = renderHook(() => useTranslationProcess());

    await result.current.start();
    capturedOptions.onError?.(new Error("error"));

    expect(setTranslationProcessStatus).toHaveBeenCalledWith("idle");
    expect(setTranslationProcessTranslatingResource).toHaveBeenCalledWith(null);

    expect(logger.error).toHaveBeenCalled();
    expect(notifications.show).toHaveBeenCalled();
  });
});
