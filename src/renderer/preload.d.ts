import { IpcRenderer } from '../common/interfaces/ipc-renderer.interface';

declare global {
  interface Window {
    electron: {
      ipcRenderer: IpcRenderer;
    };
  }
}

export {};
