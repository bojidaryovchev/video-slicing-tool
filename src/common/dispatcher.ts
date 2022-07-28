import { MAIN_CHANNEL } from './constants';
import { Action } from './interfaces/action.interface';
import { ThreadEventEmitter } from './interfaces/thread-event-emitter.interface';

export const createDispatcher = (threadEventEmitter: ThreadEventEmitter) => {
  return {
    dispatch: (action: Action) => {
      threadEventEmitter.emit(MAIN_CHANNEL, [action]);
    },
  };
};
