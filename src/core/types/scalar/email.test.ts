import { pipe } from "fp-ts/function";
import * as E from "fp-ts/Either";
import { Email, isEmail } from "./email";
import { Errors } from "io-ts";

const checkValidEmail = (result: string) => (email: string) =>
  expect(result).toEqual(email);

const checkInvalidEmail = (result: string) => (errors: Errors) =>
  expect(result).toEqual(errors[0]?.message);

it("should validate email correctly", () => {
  pipe("john@doe.com", Email.decode, E.map(checkValidEmail("john@doe.com")));
});

it("should return error when email is not valid", () => {
  pipe(
    "invalid-email",
    Email.decode,
    E.mapLeft(checkInvalidEmail("Invalid email"))
  );
});

it("should check if email format is valid", () => {
  pipe("john@doe.com", isEmail, (result) => expect(result).toEqual(true));
});

it("should check if email format is invalid", () => {
  pipe("invalid-format", isEmail, (result) => expect(result).toEqual(false));
});
