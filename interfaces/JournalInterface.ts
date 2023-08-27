export interface IToDoList {
  title: string;
  note: string;
}

export interface IProblemList {
  title: string;
  note: string;
}

export interface IJournal {
  user_id: string;
  konselor_id: string;
  mood?: string;
  to_do_list?: IToDoList;
  journal_field?: string;
  problem_list?: IProblemList;
  _id?: string;
  createdAt?: string;
  updatedAt?: string;
}
