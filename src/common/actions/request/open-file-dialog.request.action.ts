import { Actions } from '../../enums/actions.enum';
import { Action } from '../../interfaces/action.interface';

export class OpenFileDialogAction implements Action {
  readonly type = Actions.openFileDialogRequest;
}
