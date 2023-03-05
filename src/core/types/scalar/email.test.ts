import { pipe } from "fp-ts/function";
import * as E from "fp-ts/Either";
import { emailCodec, isEmail } from "./email";

it("should validate email correctly", () => {
  pipe(
    "john@doe.com",
    emailCodec.decode,
    E.map((result) => expect(result).toEqual("john@doe.com"))
  );
});

it("should return error when email is not valid", () => {
  pipe(
    "invalid-email",
    emailCodec.decode,
    E.mapLeft((error) => expect(error[0]?.message).toBe("Invalid email"))
  );
});

it("should check if email format is valid", () => {
  pipe("john@doe.com", isEmail, (result) => expect(result).toEqual(true));
});

it("should check if email format is invalid", () => {
  pipe("invalid-format", isEmail, (result) => expect(result).toEqual(false));
});
