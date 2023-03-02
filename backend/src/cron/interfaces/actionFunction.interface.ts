import { ActionParam } from './actionParam.interface';
import { ActionResult } from './actionResult.interface';

export interface ActionFunction {
  (actionParam: ActionParam): Promise<ActionResult>;
}
