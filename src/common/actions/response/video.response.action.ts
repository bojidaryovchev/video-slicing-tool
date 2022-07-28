import { Actions } from '../../enums/actions.enum';
import { Action } from '../../interfaces/action.interface';

interface Payload {
  filePath: string;
}

export class VideoResponseAction implements Action {
  readonly type = Actions.videoResponse;

  constructor(public payload: Payload) {}
}
