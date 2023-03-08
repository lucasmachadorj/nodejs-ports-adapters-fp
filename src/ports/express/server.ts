import express, { Request, Response } from "express";
import { pipe } from "fp-ts/lib/function";
import * as TE from "fp-ts/lib/TaskEither";
import { register } from "@/adapters/use-cases/user/register-adapter";
import { register as registerArticle } from "@/adapters/use-cases/article/register-article-adapter";
import {
  userRegister,
  articleRegister as createArticleDB,
} from "@/adapters/ports/db";

const app = express();

const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/api/users", (req: Request, res: Response) =>
  pipe(
    req.body.user,
    register(userRegister),
    TE.map((result) => res.json(result)),
    TE.mapLeft((error) => res.status(422).json(getErrors(error.message)))
  )()
);

app.post("/api/articles", (req: Request, res: Response) =>
  pipe(
    req.body.article,
    registerArticle(createArticleDB),
    TE.map((result) => res.json(result)),
    TE.mapLeft((error) => res.status(422).json(getErrors(error.message)))
  )()
);

const getErrors = (errors: string) => ({
  errors: {
    body: errors.split(":::"),
  },
});

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}!`));
