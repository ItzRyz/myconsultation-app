export interface IUser {
  username: string;
  email: string;
  password: string;
  _id?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IAuthUser extends IUser {
  token: string;
}
