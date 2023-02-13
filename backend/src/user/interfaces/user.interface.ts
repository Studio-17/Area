export interface UserInterface {
  readonly uuid: number;
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly password: string;
  readonly jwt: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
