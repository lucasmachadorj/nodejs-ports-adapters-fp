import * as TE from "fp-ts/TaskEither";
import { pipe } from "fp-ts/function";
import { CreateUser } from "@/core/types/user";
import { OutsideRegister, register } from "./register";

const mockOutsideRegister: OutsideRegister<string> = async (data) =>
  `User ${data.username} registered successfully`;

const user: CreateUser = {
  email: "johndoe@example.com",
  password: "mysecretpassword",
  username: "johndoe91",
};

it("should register a user successfully", async () =>
  pipe(
    user,
    register(mockOutsideRegister),
    TE.map((result) =>
      expect(result).toBe(`User ${user.username} registered successfully`)
    )
  )());
