import { SnowOptions } from './types';

export const DEFAULT_SNOW_OPTIONS = Object.freeze({
  color: 'rgba(255, 255, 255, 0.8)',
  maxParticles: 50,
  speed: 'DEFAULT',
} as const satisfies SnowOptions);

export const SNOW_OPTIONS_SPEED_MAP: Record<
  Extract<SnowOptions['speed'], string>,
  number
> = {
  DEFAULT: 33,
  FAST: 20,
  FASTER: 10,
};

export const DEFAULT_Z_INDEX = 2 ** 31 - 1; // Max z-index (largest signed 32-bit int)

export const RESIZE_DEBOUNCE_DELAY_MS = 50;
