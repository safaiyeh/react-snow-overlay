import { FC, useLayoutEffect, useRef } from "react";
import { useDebouncedCallback } from "./utils/useDebouncedCallback";

// @ts-ignore
import InlineWorker from "./snowWorker.ts?worker&inline";

interface SnowOverlayProps {}

export const SnowOverlay: FC<SnowOverlayProps> = ({}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const offscreenCanvasRef = useRef<OffscreenCanvas | null>(null);
  const workerRef = useRef<Worker | null>(null);

  const updateWorker = useDebouncedCallback(() => {
    if (
      typeof window === "undefined" ||
      // If browser doesn't support OffscreenCanvas, don't bother
      !canvasRef.current?.transferControlToOffscreen
    ) {
      return;
    }

    offscreenCanvasRef.current ??=
      canvasRef.current.transferControlToOffscreen();

    if (!workerRef.current) {
      workerRef.current = new InlineWorker();

      const canvas = offscreenCanvasRef.current;
      workerRef.current!.postMessage(
        {
          canvas,
          width: window.innerWidth,
          height: window.innerHeight,
        },
        [canvas]
      );
    }

    workerRef.current!.postMessage({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, 50);

  useLayoutEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    updateWorker();
    window.addEventListener("resize", updateWorker);
    return () => window.removeEventListener("resize", updateWorker);
  }, [updateWorker]);

  return (
    <canvas
      aria-hidden="true"
      ref={canvasRef}
      style={{
        zIndex: 2 ** 31 - 1, // Max 32-bit integer
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
};
