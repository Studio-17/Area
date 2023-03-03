import { ReturnValues } from '../type/returnValue.type';

export interface ActionResult {
  isTriggered: boolean;
  returnValues?: ReturnValues;
}
