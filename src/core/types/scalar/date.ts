import * as t from "io-ts";
import { withMessage } from "io-ts-types";

type DateBrand = {
  readonly Date: unique symbol;
};

export const dateCodec = withMessage(
  t.brand(
    t.string,
    (value: string): value is t.Branded<string, DateBrand> => isDate(value),
    "Date"
  ),
  () => "Invalid date. Please use date.ISOString()"
);

export type Date = t.TypeOf<typeof dateCodec>;

const isDate = (value: string) => {
  const date = new Date(value);
  return !isNaN(date.getTime());
};
