import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import { GET_VIDEO_ACTION } from './modules/store/actions/get-video.action';
import { OPEN_FILE_DIALOG_ACTION } from './modules/store/actions/open-file-dialog.action';

export type Channels = typeof OPEN_FILE_DIALOG_ACTION | typeof GET_VIDEO_ACTION;

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    sendMessage(channel: Channels, args: unknown[]) {
      ipcRenderer.send(channel, args);
    },
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => ipcRenderer.removeListener(channel, subscription);
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
  },
});
