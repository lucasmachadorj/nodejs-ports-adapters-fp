import { User } from "@/core/types/user";
import {
  RegisterUser,
  registerUser,
  OutsideRegister,
} from "@/core/use-cases/user/register-user";

export type OutsideRegisterType = OutsideRegister<{ user: User }>;

export const register: RegisterUser = (outsideRegister) => (data) =>
  registerUser(outsideRegister)(data);
