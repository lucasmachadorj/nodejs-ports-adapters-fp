import { pipe } from "fp-ts/function";
import { CreateUser } from "@/core/types/user";
import { OutsideRegister, register } from "./register";
import {
  unsafeEmail,
  mapAll,
  unsafeSlug,
  unsafePassword,
} from "@/config/tests/fixtures";

const registerOk: OutsideRegister<string> = async (data) =>
  `User ${data.username} registered successfully`;

const registerFail: OutsideRegister<never> = async (data) => {
  throw new Error(`User ${data.username} already exists`);
};

const user: CreateUser = {
  email: unsafeEmail("johndoe@example.com"),
  password: unsafePassword("mysecretpassword"),
  username: unsafeSlug("johndoe91"),
};

it("should register a user successfully", async () =>
  pipe(
    user,
    register(registerOk),
    mapAll((result) =>
      expect(result).toBe(`User ${user.username} registered successfully`)
    )
  )());

it("should fail to register a user", async () =>
  pipe(
    user,
    register(registerFail),
    mapAll((result) => expect(result).toBeInstanceOf(Error))
  )());
