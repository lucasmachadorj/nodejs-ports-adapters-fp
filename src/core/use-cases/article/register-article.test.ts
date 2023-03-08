import { pipe } from "fp-ts/lib/function";
import { mapAll, unsafeSlug, unsafeString } from "@/config/tests/fixtures";
import { CreateArticle } from "@/core/types/article";
import { OutsideRegister, registerArticle } from "./register-article";

const data: CreateArticle = {
  title: "How to train your dragon",
  description: "Ever wonder how?",
  body: "You have to believe",
};

const dataWithTagList: CreateArticle = {
  title: "How to train your dragon 2",
  description: "Ever wonder how?",
  body: "You have to believe",
  tagList: ["reactjs", "angularjs", "dragons"].map(unsafeSlug),
};

const dataWithInvalidTagList: CreateArticle = {
  title: "How to train your dragon 2",
  description: "Ever wonder how?",
  body: "You have to believe",
  tagList: ["reactjs", "angularjs", "2dragons", "invalid tag"].map(unsafeSlug),
};

const dataWithInvalidTitle: CreateArticle = {
  title: unsafeString(1),
  description: "Ever wonder how?",
  body: "You have to believe",
};

const registerOk: OutsideRegister<string> = async (data: CreateArticle) =>
  `Article ${data.title} created successfully`;

const registerFail: OutsideRegister<never> = async () => {
  throw new Error("External error!");
};

it("Should create an article properly", async () => {
  pipe(
    data,
    registerArticle(registerOk),
    mapAll((result) =>
      expect(result).toBe(`Article ${data.title} created successfully`)
    )
  )();
});

it("Should create an article properly with tagList", async () => {
  pipe(
    dataWithTagList,
    registerArticle(registerOk),
    mapAll((result) =>
      expect(result).toBe(
        `Article ${dataWithTagList.title} created successfully`
      )
    )
  )();
});

it("Should fail to create an article if outsiteRegister throws an error", async () => {
  return pipe(
    data,
    registerArticle(registerFail),
    mapAll((result) => expect(result).toEqual(new Error("External error!")))
  )();
});

it("Should fail to create an article if tagList is invalid", async () => {
  return pipe(
    dataWithInvalidTagList,
    registerArticle(registerOk),
    mapAll((result) =>
      expect(result).toEqual(
        new Error("Please, insert a valid slug:::Please, insert a valid slug")
      )
    )
  )();
});

it("Should fail to create an article if title is invalid", async () => {
  return pipe(
    dataWithInvalidTitle,
    registerArticle(registerOk),
    mapAll((result) => expect(result).toEqual(new Error("Invalid title")))
  )();
});
