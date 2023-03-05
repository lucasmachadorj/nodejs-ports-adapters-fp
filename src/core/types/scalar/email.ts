import * as t from "io-ts";
import { withMessage } from "io-ts-types";

type EmailBrand = {
  readonly Email: unique symbol;
};

export const Email = withMessage(
  t.brand(
    t.string,
    (value: string): value is t.Branded<string, EmailBrand> => isEmail(value),
    "Email"
  ),
  () => "Invalid email"
);

export const isEmail = (value: string) => /\w+.+.+@.+\..+/.test(value);
