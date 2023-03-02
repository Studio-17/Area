import { Param, Params } from '../type/param.type';
import { ReturnValues } from '../type/returnValue.type';

export function getElemContentInParams(
  params: Params,
  name: string,
  standartValue: string,
  returnValues: ReturnValues = [],
): string {
  let result = standartValue;
  try {
    const param: Param = params.find((param) => param.name === name);
    if (param.isActionResult && returnValues.length) {
      result = returnValues.find((returnValue) => returnValue.name === param.content).content;
    } else {
      result = param.content;
    }
  } catch (error) {}
  return result;
}
