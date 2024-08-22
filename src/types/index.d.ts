export type SignOutUserData = {
  uid: string;
  name: string;
  email: string;
  password: string;
};

export type UserData = {
  uid: string;
  username: string;
  email?: string;
  password?: string;
};

export type Messages = {
  from: string;
  to: string;
  message: string;
};
