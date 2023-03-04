export type Service = {
  name: string;
  description: string;
  color: string;
};

export type ServiceInfo = {
  name: string;
  type: "external" | "internal";
  isConnected: boolean;
  description: string;
};

export type AddServiceDto = {
  uuid: string;
};

export type DeleteServiceDto = {
  uuid: string;
};
