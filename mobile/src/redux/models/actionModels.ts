import { GetParamsDto } from "./paramsModel";

export type Action = {
  uuid: string;
  name: string;
  description: string;
  type: "action" | "reaction";
  params: GetParamsDto[] | null;
  service: string;
  hour: string;
  minute: string;
  second: string;
};
