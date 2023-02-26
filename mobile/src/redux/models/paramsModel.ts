export type GetParamsDto = {
  uuid: string;
  name: string;
  type: "string" | "number";
  description: string;
};

export type PostParamsDto = {
  name: string;
  content: string;
};
