import { Email } from "@/core/types/scalar/email";
import * as t from "io-ts";

export type User = {
  email: t.TypeOf<typeof Email>;
  token: string;
  username: string;
  bio: string;
  image: string;
};

export type CreateUser = {
  email: t.TypeOf<typeof Email>;
  password: string;
  username: string;
};
