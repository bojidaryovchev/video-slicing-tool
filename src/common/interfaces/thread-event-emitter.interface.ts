export interface ThreadEventEmitter {
  emit<T>(channel: string, args: T[]): void;
}
