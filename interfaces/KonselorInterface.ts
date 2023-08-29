export interface IKonselor {
  username: string;
  email: string;
  password: string;
  _id?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IAuthKonselor extends IKonselor {
  token: string;
}
