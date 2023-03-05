import { pipe } from "fp-ts/function";
import * as TE from "fp-ts/TaskEither";
import { urlCodec, isUrl } from "./url";
import { getErrorMessage, mapAll } from "@/config/tests/fixtures";

it("should validate url correctly", () => {
  pipe(
    "https://url.com",
    urlCodec.decode,
    TE.fromEither,
    mapAll((result) => expect(result).toEqual("https://url.com"))
  );
});

it("should return error when url is not valid", () => {
  pipe(
    "invalid-url",
    urlCodec.decode,
    TE.fromEither,
    mapAll((error) => expect(getErrorMessage(error)).toBe("Invalid URL"))
  );
});

it("should check if url format is valid", () => {
  pipe("https://url.com", isUrl, (result) => expect(result).toEqual(true));
});

it("should check if url format is invalid", () => {
  pipe("invalid-format", isUrl, (result) => expect(result).toEqual(false));
});
