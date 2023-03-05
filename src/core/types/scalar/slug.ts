import * as t from "io-ts";
import { withMessage } from "io-ts-types";

type SlugBrand = {
  readonly slug: unique symbol;
};

export const slugCodec = withMessage(
  t.brand(
    t.string,
    (value): value is t.Branded<string, SlugBrand> => isSlug(value),
    "slug"
  ),
  () => "Please, insert a valid slug"
);

export type Slug = t.TypeOf<typeof slugCodec>;

export const isSlug = (input: string): boolean =>
  /^[a-z][a-z0-9-]+?[a-z0-9]$/.test(input);
