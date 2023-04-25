export interface IInputUser {
  email: string;
  password: string;
}

export interface IUpdateUser {
  name: string;
}

export interface ICreateUser {
  name: string;
  password: string;
  email: string;
}

export interface IUser {
  id: number;
  email: string;
  name: string;
}

export interface IAuthState {
  token: string | null;
  user: IUser;
}