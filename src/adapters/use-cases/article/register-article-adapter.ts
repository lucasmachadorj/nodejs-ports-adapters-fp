import { Article } from "@/core/types/article";
import {
  OutsideRegister,
  RegisterArticle,
  registerArticle,
} from "@/core/use-cases/article/register-article";

export type OutsideRegisterType = OutsideRegister<{ article: Article }>;

export const register: RegisterArticle = (outsideRegister) => (data) =>
  registerArticle(outsideRegister)(data);
