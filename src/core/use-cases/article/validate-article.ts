import * as E from "fp-ts/lib/Either";
import { CreateArticle, createArticleCodec } from "@/core/types/article";
import { pipe } from "fp-ts/lib/function";
import { failure } from "io-ts/PathReporter";

type ValidateArticle = (data: CreateArticle) => E.Either<Error, CreateArticle>;

export const validateArticle: ValidateArticle = (data) =>
  pipe(
    data,
    createArticleCodec.decode,
    E.mapLeft((errors) => new Error(failure(errors).join(":::")))
  );
