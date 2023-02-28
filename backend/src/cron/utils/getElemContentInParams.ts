import { Params } from '../cron.type';

export function getElemContentInParams(
  params: Params,
  name: string,
  standartValue: string,
): string {
  let result = standartValue;
  try {
    result = params.find((param) => param.name === name).content;
  } catch (error) {}
  return result;
}
