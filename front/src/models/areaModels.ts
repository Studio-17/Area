import { Action } from "./actionModels";

export type Area = {
  uuid: string;
  action: Action;
  reactions: [Action];
};

export type createAreaDto = {
  action: string;
  reactions: [string];
};
