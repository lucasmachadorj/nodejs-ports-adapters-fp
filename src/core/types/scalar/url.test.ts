import { pipe } from "fp-ts/function";
import { urlCodec, isUrl } from "./url";
import { mapAllE } from "@/config/tests/fixtures";

it("should validate url correctly", () => {
  pipe(
    "https://url.com",
    urlCodec.decode,
    mapAllE((result) => expect(result).toEqual("https://url.com"))
  );
});

it("should return error when url is not valid", () => {
  pipe(
    "invalid-url",
    urlCodec.decode,
    mapAllE((error) =>
      Array.isArray(error)
        ? expect(error[0]?.message).toBe("Invalid URL")
        : expect(error).toBeInstanceOf(Error)
    )
  );
});

it("should check if url format is valid", () => {
  pipe("https://url.com", isUrl, (result) => expect(result).toEqual(true));
});

it("should check if url format is invalid", () => {
  pipe("invalid-format", isUrl, (result) => expect(result).toEqual(false));
});
