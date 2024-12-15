import { SNOW_OPTIONS_SPEED_MAP } from '../constants';
import { SnowOptions } from '../types';

export const getSpeedFromOptions = (speed: SnowOptions['speed']): number => {
  if (typeof speed === 'object') return speed.msBetweenUpdates;

  return SNOW_OPTIONS_SPEED_MAP[speed];
};
