export type User = {
  email: string;
  token: string;
  username: string;
  bio: string;
  image: string;
};

export type CreateUser = {
  email: string;
  password: string;
  username: string;
};
