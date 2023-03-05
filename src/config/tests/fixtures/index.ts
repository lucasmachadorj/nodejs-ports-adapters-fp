import * as TE from "fp-ts/TaskEither";
import { pipe } from "fp-ts/function";
import { Email } from "@/core/types/scalar/email";

export function unsafeEmail(email: string): Email {
  return email as Email;
}

type Callback = (a: unknown) => unknown;
type MapAll = (
  fn: Callback
) => (data: TE.TaskEither<unknown, unknown>) => TE.TaskEither<unknown, unknown>;

export const mapAll: MapAll = (fn) => (data) =>
  pipe(data, TE.map(fn), TE.mapLeft(fn));

export const getErrorMessage = (errors: unknown): string =>
  Array.isArray(errors) ? errors[0].message : "";
