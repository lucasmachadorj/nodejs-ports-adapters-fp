import { pipe } from "fp-ts/function";
import { emailCodec, isEmail } from "./email";
import { mapAllE } from "@/config/tests/fixtures";

it("should validate email correctly", () => {
  pipe(
    "john@doe.com",
    emailCodec.decode,
    mapAllE((result) => expect(result).toEqual("john@doe.com"))
  );
});

it("should return error when email is not valid", () => {
  pipe(
    "invalid-email",
    emailCodec.decode,
    mapAllE((error) =>
      Array.isArray(error)
        ? expect(error[0]?.message).toBe("Invalid email")
        : expect(error).toBeInstanceOf(Error)
    )
  );
});

it("should check if email format is valid", () => {
  pipe("john@doe.com", isEmail, (result) => expect(result).toEqual(true));
});

it("should check if email format is invalid", () => {
  pipe("invalid-format", isEmail, (result) => expect(result).toEqual(false));
});
