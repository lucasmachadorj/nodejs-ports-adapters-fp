import { pipe } from "fp-ts/lib/function";
import * as TE from "fp-ts/TaskEither";
import { positiveCodec } from "./positive";
import { getErrorMessage, mapAll } from "@/config/tests/fixtures";

it("should validate a positive number", async () => {
  pipe(
    1,
    positiveCodec.decode,
    TE.fromEither,
    mapAll((result) => expect(result).toEqual(1))
  )();
});

it("should accept zero", async () => {
  pipe(
    0,
    positiveCodec.decode,
    TE.fromEither,
    mapAll((result) => expect(result).toEqual(0))
  )();
});

it("should not accept a number less than zero", async () => {
  pipe(
    -1,
    positiveCodec.decode,
    TE.fromEither,
    mapAll((error) =>
      expect(getErrorMessage(error)).toBe(
        "This number should not be less than zero."
      )
    )
  )();
});
