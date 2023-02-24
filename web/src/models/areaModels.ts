import { Action } from "./actionModels";
import { PostParamsDto } from "./paramsModel";

export type Area = {
  action: Action;
  reactions: [Action];
  area: {
    uuid: string;
    name: string
  };
};

export type createAreaDto = {
  action: { id: string; params: PostParamsDto[] | null };
  reactions: [{ id: string; params: PostParamsDto[] | null }];
  name?: string;
  hours?: string;
  minutes?: string;
  seconds?: string;
};
