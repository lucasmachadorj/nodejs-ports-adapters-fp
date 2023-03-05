import * as t from "io-ts";
import {
  emailCodec,
  passwordCodec,
  slugCodec,
  urlCodec,
} from "@/core/types/scalar";

const userCodedRequired = t.type({
  email: emailCodec,
  username: slugCodec,
});

const userCodedPartial = t.partial({
  bio: t.string,
  image: urlCodec,
  token: t.string,
});

export const userCodec = t.intersection([userCodedRequired, userCodedPartial]);

export type User = t.TypeOf<typeof userCodec>;

export const createUserCodec = t.type({
  email: emailCodec,
  password: passwordCodec,
  username: slugCodec,
});

export type CreateUser = t.TypeOf<typeof createUserCodec>;
