import * as t from "io-ts";
import { withMessage } from "io-ts-types";

type EmailBrand = {
  readonly Email: unique symbol;
};

export const emailCodec = withMessage(
  t.brand(
    t.string,
    (value: string): value is t.Branded<string, EmailBrand> => isEmail(value),
    "Email"
  ),
  () => "Please, insert a valid email"
);

export type Email = t.TypeOf<typeof emailCodec>;

export const isEmail = (value: string) => /\w+.+.+@.+\..+/.test(value);
