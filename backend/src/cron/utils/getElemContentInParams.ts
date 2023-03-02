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
      console.log('isActionResult');
      result = returnValues.find((returnValue) => returnValue.name === name).content;
    } else {
      result = param.content;
    }
    // result = params.find((param) => param.name === name).content;
  } catch (error) {}
  return result;
}
