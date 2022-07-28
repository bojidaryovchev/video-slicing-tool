import { Actions } from '../../enums/actions.enum';
import { Action } from '../../interfaces/action.interface';

export class VideoRequestAction implements Action {
  readonly type = Actions.videoRequest;
}
