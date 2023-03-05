import * as t from "io-ts";
import { withMessage } from "io-ts-types";

type PasswordBrand = {
  readonly Password: unique symbol;
};

export const passwordCodec = withMessage(
  t.brand(
    t.string,
    (value: string): value is t.Branded<string, PasswordBrand> =>
      value.length >= 8,
    "Password"
  ),
  () => "Password should have at least 8 characters."
);

export type Password = t.TypeOf<typeof passwordCodec>;
