import { pipe } from "fp-ts/lib/function";
import { mapAll } from "@/config/tests/fixtures";
import { CreateArticle } from "@/core/types/article";
import { OutsideRegister, registerArticle } from "./register-article";

const data: CreateArticle = {
  title: "How to train your dragon",
  description: "Ever wonder how?",
  body: "You have to believe",
};

const registerOk: OutsideRegister<string> = async (data: CreateArticle) =>
  `Article ${data.title} created successfully`;

it("Should create an article", async () => {
  pipe(
    data,
    registerArticle(registerOk),
    mapAll((result) =>
      expect(result).toBe(`Article ${data.title} created successfully`)
    )
  )();
});
