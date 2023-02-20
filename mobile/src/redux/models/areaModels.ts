import { Action } from "./actionModels";

export type Area = {
  action: Action;
  reactions: [Action];
  area: {
    uuid: string;
    name: string;
  };
};

export type createAreaDto = {
  action: string;
  reactions: [string];
};
