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

export type RegisterResponse = {
  status: number;
};

export type LoginResponse = {
  accessToken: string;
  status: number;
  user: any;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type LogInGoogleRequest = {
  credentials: string | undefined;
};

export type RegisterRequest = {
  email: string;
  lastName: string;
  firstName: string | null;
  password: string;
};
