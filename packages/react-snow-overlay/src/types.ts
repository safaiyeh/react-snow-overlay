export type SnowParticle = { x: number; y: number; r: number; d: number };

export interface SnowOptions {
  color: CanvasFillStrokeStyles["fillStyle"];
  maxParticles: number;
  speed:
    | "DEFAULT"
    | "SLOW"
    | "FAST"
    | "ULTRAFAST"
    | {
        speed: "custom";
        msBetweenUpdates: number;
      };
}

export enum SnowWorkerMessageType {
  INIT,
  UPDATE_SIZE,
  STOP,
  UPDATE_OPTIONS,
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

export type SnowWorkerMsgUpdateOptions = {
  type: SnowWorkerMessageType.UPDATE_OPTIONS;
  options: Partial<SnowOptions>;
};

export type SnowWorkerMessage =
  | SnowWorkerMsgInit
  | SnowWorkerMsgUpdateSize
  | SnowWorkerMsgStop
  | SnowWorkerMsgUpdateOptions;

export const isSnowWorkerInitMsg = (
  msg: SnowWorkerMessage
): msg is SnowWorkerMsgInit => msg.type === SnowWorkerMessageType.INIT;

export const isSnowWorkerUpdateSizeMsg = (
  msg: SnowWorkerMessage
): msg is SnowWorkerMsgUpdateSize =>
  msg.type === SnowWorkerMessageType.UPDATE_SIZE;

export const isSnowWorkerStopMsg = (
  msg: SnowWorkerMessage
): msg is SnowWorkerMsgStop => msg.type === SnowWorkerMessageType.STOP;

export const isSnowWorkerUpdateOptionsMsg = (
  msg: SnowWorkerMessage
): msg is SnowWorkerMsgUpdateOptions =>
  msg.type === SnowWorkerMessageType.UPDATE_OPTIONS;
