import { Actions } from '../../enums/actions.enum';
import { Action } from '../../interfaces/action.interface';

interface Payload {
  loading: boolean;
}

export class LoadingResponseAction implements Action {
  readonly type = Actions.loadingResponse;

  constructor(public payload: Payload) {}
}
