export interface IAdmin {
  username: string;
  email: string;
  password: string;
  _id?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IAuthAdmin extends IAdmin {
  token: string;
}
