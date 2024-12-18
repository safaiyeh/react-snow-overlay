import {
  SnowWorkerMessage,
  SnowWorkerMessageType,
  SnowWorkerMsgInit,
  SnowWorkerMsgUpdateOptions,
  SnowWorkerMsgUpdateSize,
} from './types';

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

  init(params: Omit<SnowWorkerMsgInit, 'type'>) {
    this.#postMessage(
      {
        ...params,
        type: SnowWorkerMessageType.INIT,
      },
      [params.canvas],
    );
  }

  updateSize(params: Omit<SnowWorkerMsgUpdateSize, 'type'>) {
    this.#postMessage({
      ...params,
      type: SnowWorkerMessageType.UPDATE_SIZE,
    });
  }

  stop() {
    this.#postMessage({
      type: SnowWorkerMessageType.STOP,
    });
  }

  resume() {
    this.#postMessage({
      type: SnowWorkerMessageType.RESUME,
    });
  }

  updateOptions(params: Omit<SnowWorkerMsgUpdateOptions, 'type'>) {
    this.#postMessage({
      ...params,
      type: SnowWorkerMessageType.UPDATE_OPTIONS,
    });
  }

  terminate() {
    this.#snowWorker.terminate();
  }
}
