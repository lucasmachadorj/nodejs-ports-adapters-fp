import { pipe } from "fp-ts/function";
import * as TE from "fp-ts/TaskEither";
import { emailCodec, isEmail } from "./email";
import { getErrorMessage, mapAll } from "@/config/tests/fixtures";

it("should validate email correctly", async () => {
  pipe(
    "john@doe.com",
    emailCodec.decode,
    TE.fromEither,
    mapAll((result) => expect(result).toEqual("john@doe.com"))
  )();
});

it("should return error when email is not valid", async () => {
  pipe(
    "invalid-email",
    emailCodec.decode,
    TE.fromEither,
    mapAll((error) =>
      expect(getErrorMessage(error)).toBe("Please, insert a valid email")
    )
  )();
});

it("should check if email format is valid", () => {
  pipe("john@doe.com", isEmail, (result) => expect(result).toEqual(true));
});

it("should check if email format is invalid", () => {
  pipe("invalid-format", isEmail, (result) => expect(result).toEqual(false));
});
