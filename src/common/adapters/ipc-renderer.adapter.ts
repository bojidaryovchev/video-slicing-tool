import { IpcRenderer } from '../interfaces/ipc-renderer.interface';
import { ThreadEventEmitter } from '../interfaces/thread-event-emitter.interface';

export class IpcRendererAdapter implements ThreadEventEmitter {
  constructor(private readonly ipcRenderer: IpcRenderer) {}

  emit<T>(channel: string, args: T[]): void {
    this.ipcRenderer.sendMessage(channel, args);
  }
}
