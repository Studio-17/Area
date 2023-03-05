import { Action } from "./actionModels";
import { PostParamsDto } from "./paramsModel";

export type Area = {
  action: Action;
  reactions: [Action];
  area: {
    uuid: string;
    name: string;
    color: string;
  };
};

export type createAreaDto = {
  // action: { id: string };
  action: { id: string, params: { name: string, content: string }[] };
  reactions: [{ id: string }];
  name?: string;
  hour?: string;
  minute?: string;
  second?: string;
  color?: string;
  // reactions: [{ id: string, params: { name: string, content: string }[] }];
};

export type updateAreaDto = {
  action: { id: string; params: PostParamsDto[] | null };
  reactions: [{ id: string; params: PostParamsDto[] | null }];
  name?: string;
  hour?: string;
  minute?: string;
  second?: string;
};
