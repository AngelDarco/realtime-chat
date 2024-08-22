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

export type MessageRetrieve = {
  message: string;
  timestamp: string;
  uid: string;
};

export type MessagesStored = {
  from: string;
  to: string;
  message: string;
};
