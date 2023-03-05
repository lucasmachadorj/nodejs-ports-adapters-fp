import { pipe } from "fp-ts/lib/function";
import * as TE from "fp-ts/TaskEither";
import { dateCodec } from "./date";
import { getErrorMessage, mapAll } from "@/config/tests/fixtures";

it("should validate a date properly", () => {
  const date = new Date().toISOString();
  pipe(
    date,
    dateCodec.decode,
    TE.fromEither,
    mapAll((result) => expect(result).toEqual(date))
  );
});

it("should not validate a date properly", () => {
  const date = "invalid date";
  pipe(
    date,
    dateCodec.decode,
    TE.fromEither,
    mapAll((error) => expect(getErrorMessage(error)).toBe("Invalid date"))
  );
});
