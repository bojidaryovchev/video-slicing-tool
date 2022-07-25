import { dialog, ipcMain } from 'electron';
import os from 'os';
import { Actions } from '../../../shared/actions';
import { VIDEO_STORE_KEY } from '../../../shared/constants';
import { ffmpegLoadVideo } from '../ffmpeg/ffmpeg';
import { getStore } from '../store';

const RUNNING_ON_LINUX = os.platform() === 'linux';
const RUNNING_ON_WIN32 = os.platform() === 'win32';

const DIALOG_OPTIONS: Electron.OpenDialogOptions = {
  ...(RUNNING_ON_LINUX || RUNNING_ON_WIN32
    ? { properties: ['openFile'] }
    : { properties: ['openFile', 'openDirectory'] }),
};

ipcMain.on(Actions.OPEN_FILE_DIALOG_ACTION, async () => {
  const { filePaths } = await dialog.showOpenDialog(DIALOG_OPTIONS);

  if (filePaths.length) {
    const [filePath] = filePaths;

    try {
      getStore().set(VIDEO_STORE_KEY, await ffmpegLoadVideo(filePath));
    } catch (err) {
      // TODO: error handling
    }
  }
});

ipcMain.on(Actions.GET_STORED_VIDEO, async (event) => {
  event.reply(Actions.GET_STORED_VIDEO, getStore().get(VIDEO_STORE_KEY));
});
