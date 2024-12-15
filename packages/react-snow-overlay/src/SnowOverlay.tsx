import { FC, memo, useEffect, useReducer, useRef } from "react";
import { DEFAULT_Z_INDEX, RESIZE_DEBOUNCE_DELAY_MS } from "./constants";
import SnowWorker from "./snowWorker.ts?worker&inline";
import { SnowWorkerApi } from "./snowWorkerApi";
import { SnowOptions } from "./types";
import { useDebouncedCallback } from "./utils/useDebouncedCallback";
import { useDeepMemo } from "./utils/useDeepMemo";

export interface SnowOverlayProps extends SnowOptions {
  zIndex?: number;
}

export const SnowOverlay: FC<SnowOverlayProps> = memo(function SnowOverlay({
  zIndex = DEFAULT_Z_INDEX,
  ...snowOptions
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const offscreenCanvasRef = useRef<OffscreenCanvas | null>(null);
  const snowWorkerApiRef = useRef<SnowWorkerApi | null>(null);
  const [workerInitialized, setWorkerInitialized] = useReducer(
    () => true,
    false
  );

  const memoizedSnowOptions = useDeepMemo(() => snowOptions, [snowOptions]);

  const updateDimensions = useDebouncedCallback(() => {
    if (
      typeof window === "undefined" ||
      // If browser doesn't support OffscreenCanvas, don't bother
      !canvasRef.current?.transferControlToOffscreen
    ) {
      return;
    }

    offscreenCanvasRef.current ??=
      canvasRef.current.transferControlToOffscreen();

    if (!snowWorkerApiRef.current) {
      snowWorkerApiRef.current = new SnowWorkerApi(new SnowWorker());
      setWorkerInitialized();

      const canvas = offscreenCanvasRef.current;

      return snowWorkerApiRef.current.init({
        canvas,
        width: window.innerWidth,
        height: window.innerHeight,
        options: memoizedSnowOptions,
      });
    }

    snowWorkerApiRef.current.updateSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, RESIZE_DEBOUNCE_DELAY_MS);

  useEffect(() => {
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, [updateDimensions]);

  useEffect(() => {
    if (!workerInitialized) return;
    snowWorkerApiRef.current?.updateOptions({ options: memoizedSnowOptions });
  }, [memoizedSnowOptions, workerInitialized]);

  return (
    <canvas
      aria-hidden="true"
      ref={canvasRef}
      style={{
        zIndex,
        pointerEvents: "none",
        userSelect: "none",
        position: "fixed",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      }}
    />
  );
});
