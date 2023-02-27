import { Action } from "./actionModels";

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
  reactions: [{ id: string }];
  action: { id: string, params: { name: string, content: string }[] };
  // reactions: [{ id: string, params: { name: string, content: string }[] }];
};
