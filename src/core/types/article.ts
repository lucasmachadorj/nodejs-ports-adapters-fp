import * as t from "io-ts";
import { tagCodec } from "./tag";
import { profileCodec } from "./profile";
import { slugCodec, dateCodec } from "./scalar";

export const articleCodec = t.type({
  slug: slugCodec,
  title: t.string,
  description: t.string,
  body: t.string,
  tagList: t.array(tagCodec),
  createdAt: dateCodec,
  updatedAt: dateCodec,
  favorited: t.boolean,
  favoritesCount: t.number,
  author: profileCodec,
});

export type Article = t.TypeOf<typeof articleCodec>;

export const articlesCodec = t.type({
  articles: t.array(articleCodec),
  articlesCount: t.number,
});

export type Articles = t.TypeOf<typeof articlesCodec>;
