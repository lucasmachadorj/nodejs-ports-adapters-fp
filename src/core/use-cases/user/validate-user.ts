import * as E from "fp-ts/lib/Either";
import { CreateUser, createUserCodec } from "@/core/types/user";
import { pipe } from "fp-ts/lib/function";
import { failure } from "io-ts/PathReporter";

type ValidateUser = (data: CreateUser) => E.Either<Error, unknown>;

export const validateUser: ValidateUser = (data) =>
  pipe(
    data,
    createUserCodec.decode,
    E.mapLeft((errors) => new Error(failure(errors).join(":::")))
  );
