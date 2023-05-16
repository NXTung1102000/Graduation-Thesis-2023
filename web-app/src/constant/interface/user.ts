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
  user_id: number;
  email: string;
  name: string;
  role: number;
}

export interface IAuthState {
  access_token: string | null;
  user: IUser;
}
