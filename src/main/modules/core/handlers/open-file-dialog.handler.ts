import { dialog } from 'electron';
import os from 'os';
import { ErrorResponseAction } from '../../../../common/actions/response/error.response.action';
import { LoadingResponseAction } from '../../../../common/actions/response/loading.response.action';
import { VideoResponseAction } from '../../../../common/actions/response/video.response.action';
import { IpcMainEventAdapter } from '../../../../common/adapters/ipc-main-event.adapter';
import { createDispatcher } from '../../../../common/dispatcher';
import { ffmpegLoadVideo } from '../../ffmpeg';
import { getStore } from '../../store/getStore';
import { VIDEO_STORE_KEY } from '../constants';

const RUNNING_ON_LINUX = os.platform() === 'linux';
const RUNNING_ON_WIN32 = os.platform() === 'win32';

const DIALOG_OPTIONS: Electron.OpenDialogOptions = {
  ...(RUNNING_ON_LINUX || RUNNING_ON_WIN32
    ? { properties: ['openFile'] }
    : { properties: ['openFile', 'openDirectory'] }),
};

export const openFileDialogHandler = async (event: Electron.IpcMainEvent) => {
  const { filePaths } = await dialog.showOpenDialog(DIALOG_OPTIONS);
  const { dispatch } = createDispatcher(new IpcMainEventAdapter(event));

  if (filePaths.length) {
    const [filePath] = filePaths;

    try {
      dispatch(
        new LoadingResponseAction({
          loading: true,
        })
      );

      const video = await ffmpegLoadVideo(filePath);

      getStore().set(VIDEO_STORE_KEY, video);

      dispatch(
        new VideoResponseAction({
          filePath,
        })
      );
      dispatch(
        new LoadingResponseAction({
          loading: false,
        })
      );
    } catch (err) {
      dispatch(
        new ErrorResponseAction({
          err,
        })
      );
      dispatch(
        new LoadingResponseAction({
          loading: false,
        })
      );
    }
  }
};
