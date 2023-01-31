export type Service = {
  uuid: string;
  name: string;
  description: string;
};

export type AddServiceDto = {
  uuid: string;
};

export type DeleteServiceDto = {
  uuid: string;
};
