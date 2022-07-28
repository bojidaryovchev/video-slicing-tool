import { ipcMain } from 'electron';
import { MAIN_CHANNEL } from '../../../common/constants';
import { Actions } from '../../../common/enums/actions.enum';
import { Action } from '../../../common/interfaces/action.interface';
import { openFileDialogHandler } from './handlers/open-file-dialog.handler';

ipcMain.on(MAIN_CHANNEL, (event: Electron.IpcMainEvent, args: [Action]) => {
  const [action] = args;

  switch (action.type) {
    case Actions.openFileDialogRequest:
      openFileDialogHandler(event);
      break;
    default:
      break;
  }
});
