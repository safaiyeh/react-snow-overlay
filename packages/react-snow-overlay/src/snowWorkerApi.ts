import {
  SnowWorkerMessage,
  SnowWorkerMessageType,
  SnowWorkerMsgInit,
  SnowWorkerMsgStop,
  SnowWorkerMsgUpdateOptions,
  SnowWorkerMsgUpdateSize,
} from "./types";

export class SnowWorkerApi {
  #snowWorker: Worker;

  constructor(snowWorker: Worker) {
    this.#snowWorker = snowWorker;
  }

  #postMessage(msg: SnowWorkerMessage, transfer?: Transferable[]) {
    this.#snowWorker.postMessage(msg, {
      transfer,
    });
  }

  init(params: Omit<SnowWorkerMsgInit, "type">) {
    this.#postMessage(
      {
        ...params,
        type: SnowWorkerMessageType.INIT,
      },
      [params.canvas]
    );
  }

  updateSize(params: Omit<SnowWorkerMsgUpdateSize, "type">) {
    this.#postMessage({
      ...params,
      type: SnowWorkerMessageType.UPDATE_SIZE,
    });
  }

  stop(params: Omit<SnowWorkerMsgStop, "type">) {
    this.#postMessage({
      ...params,
      type: SnowWorkerMessageType.STOP,
    });
  }

  updateOptions(params: Omit<SnowWorkerMsgUpdateOptions, "type">) {
    this.#postMessage({
      ...params,
      type: SnowWorkerMessageType.UPDATE_OPTIONS,
    });
  }
}
