import { URL as URLChecker } from "url";
import * as t from "io-ts";
import * as E from "fp-ts/lib/Either";
import { pipe } from "fp-ts/lib/function";
import { withMessage } from "io-ts-types";

const toBoolean = (input: unknown): boolean => !!input;
const toUrl = (input: string): URLChecker => new URLChecker(input);

type URLBrand = {
  readonly url: unique symbol;
};

export const urlCodec = withMessage(
  t.brand(
    t.string,
    (value): value is t.Branded<string, URLBrand> => isUrl(value),
    "url"
  ),
  () => "Invalid URL"
);

export const isUrl = (input: string): boolean => {
  const murl = E.tryCatch(
    () => pipe(input, toUrl, toBoolean),
    (reason) => new Error(String(reason))
  );

  return E.isRight(murl) ? murl.right : false;
};

export type URL = t.TypeOf<typeof urlCodec>;
