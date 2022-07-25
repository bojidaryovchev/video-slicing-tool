import { Actions } from 'shared/actions';

window.electron.ipcRenderer.on(Actions.GET_STORED_VIDEO, (...args) => {
  console.log(args);
});
