import { pipe } from "fp-ts/function";
import * as TE from "fp-ts/TaskEither";
import { emailCodec, isEmail } from "./email";
import { mapAll } from "@/config/tests/fixtures";

it("should validate email correctly", () => {
  pipe(
    "john@doe.com",
    emailCodec.decode,
    TE.fromEither,
    mapAll((result) => expect(result).toEqual("john@doe.com"))
  );
});

it("should return error when email is not valid", () => {
  pipe(
    "invalid-email",
    emailCodec.decode,
    TE.fromEither,
    mapAll((error) => {
      const errorMessage: string = Array.isArray(error)
        ? error[0]?.message
        : "";
      expect(errorMessage).toBe("Invalid email");
    })
  );
});

it("should check if email format is valid", () => {
  pipe("john@doe.com", isEmail, (result) => expect(result).toEqual(true));
});

it("should check if email format is invalid", () => {
  pipe("invalid-format", isEmail, (result) => expect(result).toEqual(false));
});
