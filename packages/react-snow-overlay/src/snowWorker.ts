import { DEFAULT_SNOW_OPTIONS } from "./constants";
import {
  isSnowWorkerInitMsg,
  isSnowWorkerResumeMsg,
  isSnowWorkerStopMsg,
  isSnowWorkerUpdateOptionsMsg,
  isSnowWorkerUpdateSizeMsg,
  SnowOptions,
  SnowParticle,
  SnowWorkerMessage,
} from "./types";
import { getSpeedFromOptions } from "./utils/getSpeedFromOptions";

// Snow display options
let options: SnowOptions = {
  ...DEFAULT_SNOW_OPTIONS,
};

// Math
let particles: Array<SnowParticle>;
let angle = 0;
let lastUpdateTime = -Infinity;

// Animation control
let animationRequestId: number | null = null;
let canvas: OffscreenCanvas;
let ctx: OffscreenCanvasRenderingContext2D;
let disabled = false;

self.onmessage = (event: MessageEvent<SnowWorkerMessage>) => {
  const { data } = event;

  if (isSnowWorkerInitMsg(data)) {
    canvas = data.canvas;
    ctx = canvas.getContext("2d")!;

    canvas.width = data.width;
    canvas.height = data.height;

    options = {
      ...DEFAULT_SNOW_OPTIONS,
      ...data.options,
    };

    particles = Array.from(
      { length: options.maxParticles },
      generateRandomParticle
    );
  } else if (isSnowWorkerUpdateSizeMsg(data)) {
    canvas.width = data.width;
    canvas.height = data.height;
  } else if (isSnowWorkerUpdateOptionsMsg(data)) {
    const { type: _, ...newSnowOptions } = data;

    options = {
      ...options,
      ...newSnowOptions.options,
    } satisfies SnowOptions;

    updateParticleCount(options.maxParticles);
  } else if (isSnowWorkerStopMsg(data)) {
    disabled = true;
    const { width, height } = ctx.canvas;
    ctx.clearRect(0, 0, width, height);
    if (animationRequestId) cancelAnimationFrame(animationRequestId);
    return;
  } else if (isSnowWorkerResumeMsg(data)) {
    disabled = false;
  }

  const updateSnow = () => {
    const msBetweenUpdates = getSpeedFromOptions(options.speed);

    if (performance.now() - lastUpdateTime < msBetweenUpdates) {
      animationRequestId = requestAnimationFrame(updateSnow);
      return;
    }

    const { width, height } = ctx.canvas;

    ctx.clearRect(0, 0, width, height);

    ctx.fillStyle = options.color;
    ctx.beginPath();
    for (let i = 0; i < options.maxParticles; i++) {
      const p = particles[i];
      ctx.moveTo(p.x, p.y);
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, true);
    }
    ctx.fill();

    angle = (angle + 0.01) % 360;
    for (let i = 0; i < options.maxParticles; i++) {
      const p = particles[i];
      p.y += Math.cos(angle + p.d) + 1 + p.r / 2;
      p.x += Math.sin(angle) * 2;

      if (p.x > width + 5 || p.x < -5 || p.y > height) {
        if (i % 3 > 0) {
          particles[i] = {
            x: Math.random() * width,
            y: -10,
            r: p.r,
            d: p.d,
          };
        } else {
          if (Math.sin(angle) > 0) {
            particles[i] = {
              x: -5,
              y: Math.random() * height,
              r: p.r,
              d: p.d,
            };
          } else {
            particles[i] = {
              x: width + 5,
              y: Math.random() * height,
              r: p.r,
              d: p.d,
            };
          }
        }
      }
    }
    lastUpdateTime = performance.now();

    if (!disabled) {
      animationRequestId = requestAnimationFrame(updateSnow);
    }
  };

  if (animationRequestId) cancelAnimationFrame(animationRequestId);

  if (!disabled) requestAnimationFrame(updateSnow);
};

const updateParticleCount = (newCount: number) => {
  const oldCount = particles.length;

  if (newCount === oldCount) return;

  if (newCount < oldCount)
    return particles.splice(newCount, oldCount - newCount);

  particles.push(
    ...Array.from({ length: newCount - oldCount }, generateRandomParticle)
  );
};

const generateRandomParticle = () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * -canvas.height,
  r: Math.random() * 4 + 1,
  d: Math.random() * options.maxParticles,
});
