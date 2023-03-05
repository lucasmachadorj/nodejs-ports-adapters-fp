import * as t from "io-ts";
import * as E from "fp-ts/lib/Either";
import { constFalse, constTrue, pipe } from "fp-ts/lib/function";
import { withMessage } from "io-ts-types";

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
  return pipe(
    E.tryCatch(
      () => new URL(typeof input === "string" ? input : ""),
      E.toError
    ),
    E.fold(constFalse, constTrue)
  );
};

export type URL = t.TypeOf<typeof urlCodec>;
