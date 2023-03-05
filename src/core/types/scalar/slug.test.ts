import { pipe } from "fp-ts/lib/function";
import * as TE from "fp-ts/TaskEither";
import { slugCodec } from "./slug";
import { getErrorMessage, mapAll } from "@/config/tests/fixtures";

it("should validate slug properly", async () => {
  pipe(
    "valid-slug",
    slugCodec.decode,
    TE.fromEither,
    mapAll((result) => expect(result).toEqual("valid-slug"))
  )();
});

it("should not accept number at the beginning of the slug", async () => {
  pipe(
    "1invalid-slug",
    slugCodec.decode,
    TE.fromEither,
    mapAll((error) =>
      expect(getErrorMessage(error)).toBe("Please, insert a valid slug")
    )
  )();
});

it("should not accept dashes at the end of the slug", async () => {
  pipe(
    "invalid-slug-",
    slugCodec.decode,
    TE.fromEither,
    mapAll((error) => {
      const errorMessage: string = Array.isArray(error)
        ? error[0]?.message
        : "";
      expect(errorMessage).toBe("Please, insert a valid slug");
    })
  )();
});

it("should not accept less than 3 characters", async () => {
  pipe(
    "in",
    slugCodec.decode,
    TE.fromEither,
    mapAll((error) => {
      const errorMessage: string = Array.isArray(error)
        ? error[0]?.message
        : "";
      expect(errorMessage).toBe("Please, insert a valid slug");
    })
  )();
});

it("should accept three or more characters", async () => {
  pipe(
    "abc",
    slugCodec.decode,
    TE.fromEither,
    mapAll((result) => expect(result).toEqual("abc"))
  )();
});
