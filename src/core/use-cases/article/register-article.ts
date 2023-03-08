import { pipe } from "fp-ts/lib/function";
import * as TE from "fp-ts/lib/TaskEither";
import * as E from "fp-ts/lib/Either";
import { CreateArticle } from "@/core/types/article";
import { validateArticle } from "./validate-article";

export type OutsideRegister<A> = (data: CreateArticle) => Promise<A>;

export type RegisterArticle = <A>(
  outsideRegister: OutsideRegister<A>
) => (data: CreateArticle) => TE.TaskEither<Error, A>;

export const registerArticle: RegisterArticle = (outsideRegister) => (data) =>
  pipe(
    data,
    validateArticle,
    TE.fromEither,
    TE.chain(() => TE.tryCatch(() => outsideRegister(data), E.toError))
  );
