export type SnowParticle = {
  x: number;
  y: number;
  r: number;
  d: number;
  // Pre-calculated trigonometric values for performance optimization
  sinD: number;
  cosD: number;
};

export interface SnowOptions {
  color: CanvasFillStrokeStyles['fillStyle'];
  maxParticles: number;
  speed:
    | 'DEFAULT'
    | 'FAST'
    | 'FASTER'
    | {
        speed: 'custom';
        msBetweenUpdates: number;
      };
}

export enum SnowWorkerMessageType {
  INIT,
  UPDATE_SIZE,
  STOP,
  UPDATE_OPTIONS,
  RESUME,
}

export type SnowWorkerMsgInit = {
  type: SnowWorkerMessageType.INIT;
  canvas: OffscreenCanvas;
  width: number;
  height: number;
  options: Partial<SnowOptions>;
};

export type SnowWorkerMsgUpdateSize = {
  type: SnowWorkerMessageType.UPDATE_SIZE;
  width: number;
  height: number;
};

export type SnowWorkerMsgStop = {
  type: SnowWorkerMessageType.STOP;
};

export type SnowWorkerMsgResume = {
  type: SnowWorkerMessageType.RESUME;
};

export type SnowWorkerMsgUpdateOptions = {
  type: SnowWorkerMessageType.UPDATE_OPTIONS;
  options: Partial<SnowOptions>;
};

export type SnowWorkerMessage =
  | SnowWorkerMsgInit
  | SnowWorkerMsgUpdateSize
  | SnowWorkerMsgStop
  | SnowWorkerMsgUpdateOptions
  | SnowWorkerMsgResume;

export const isSnowWorkerInitMsg = (
  msg: SnowWorkerMessage,
): msg is SnowWorkerMsgInit => msg.type === SnowWorkerMessageType.INIT;

export const isSnowWorkerUpdateSizeMsg = (
  msg: SnowWorkerMessage,
): msg is SnowWorkerMsgUpdateSize =>
  msg.type === SnowWorkerMessageType.UPDATE_SIZE;

export const isSnowWorkerStopMsg = (
  msg: SnowWorkerMessage,
): msg is SnowWorkerMsgStop => msg.type === SnowWorkerMessageType.STOP;

export const isSnowWorkerUpdateOptionsMsg = (
  msg: SnowWorkerMessage,
): msg is SnowWorkerMsgUpdateOptions =>
  msg.type === SnowWorkerMessageType.UPDATE_OPTIONS;

export const isSnowWorkerResumeMsg = (
  msg: SnowWorkerMessage,
): msg is SnowWorkerMsgResume => msg.type === SnowWorkerMessageType.RESUME;
