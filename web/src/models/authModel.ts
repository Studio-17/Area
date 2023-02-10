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
  token: string | undefined
}

export type RegisterRequest = {
  email: string;
  lastName: string;
  firstName: string | null;
  password: string;
};
