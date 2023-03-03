import { Params } from '../type/param.type';

export interface ActionParam {
  accessToken: string;
  myActionId: string;
  params?: Params;
}
