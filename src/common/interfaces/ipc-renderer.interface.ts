export interface IpcRenderer {
  sendMessage<T>(channel: string, args: T[]): void;
  on<T>(
    channel: string,
    func: (...args: T[]) => void
  ): (() => void) | undefined;
  once<T>(channel: string, func: (...args: T[]) => void): void;
}
