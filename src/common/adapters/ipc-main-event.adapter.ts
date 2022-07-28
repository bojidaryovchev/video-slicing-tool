import { ThreadEventEmitter } from '../interfaces/thread-event-emitter.interface';

export class IpcMainEventAdapter implements ThreadEventEmitter {
  constructor(private readonly event: Electron.IpcMainEvent) {}

  emit<T>(channel: string, args: T[]): void {
    this.event.reply(channel, args);
  }
}
