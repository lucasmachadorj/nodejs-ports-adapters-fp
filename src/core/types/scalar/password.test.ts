import { pipe } from "fp-ts/lib/function";
import * as TE from "fp-ts/TaskEither";
import { passwordCodec } from "./password";
import { getErrorMessage, mapAll } from "@/config/tests/fixtures";

it("should validate password properly", async () => {
  pipe(
    "12345678",
    passwordCodec.decode,
    TE.fromEither,
    mapAll((result) => expect(result).toEqual("12345678"))
  )();
});

it("should not accept a password less then 8 characters", async () => {
  pipe(
    "1353",
    passwordCodec.decode,
    TE.fromEither,
    mapAll((errors) =>
      expect(getErrorMessage(errors)).toEqual(
        "Password should have at least 8 characters."
      )
    )
  )();
});
