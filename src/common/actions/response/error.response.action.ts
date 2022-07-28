import { Actions } from '../../enums/actions.enum';
import { Action } from '../../interfaces/action.interface';

interface Payload<T> {
  err: T;
}

export class ErrorResponseAction<T> implements Action {
  readonly type = Actions.errorResponse;

  constructor(public payload: Payload<T>) {}
}
