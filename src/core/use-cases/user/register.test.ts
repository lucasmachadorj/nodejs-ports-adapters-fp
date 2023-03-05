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

const registerFail: OutsideRegister<never> = async () => {
  throw new Error("External error");
};

const user: CreateUser = {
  email: unsafeEmail("johndoe@example.com"),
  password: unsafePassword("mysecretpassword"),
  username: unsafeSlug("johndoe91"),
};

const dataWithWrongUsername: CreateUser = {
  email: unsafeEmail("john@doe.com"),
  username: unsafeSlug("l"),
  password: unsafePassword("12345678"),
};

const dataWithWrongEmailAndPassword: CreateUser = {
  username: unsafeSlug("john-doe"),
  email: unsafeEmail("john@doe"),
  password: unsafePassword("1234567"),
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

it("Should not accept register from a user with invalid username", async () =>
  pipe(
    dataWithWrongUsername,
    register(registerOk),
    mapAll((error) =>
      expect(error).toEqual(new Error("Please, insert a valid slug"))
    )
  )());

it("Should not accept register from a user with invalid email and password", async () =>
  pipe(
    dataWithWrongEmailAndPassword,
    register(registerOk),
    mapAll((error) =>
      expect(error).toEqual(
        new Error(
          "Please, insert a valid email:::Password should have at least 8 characters."
        )
      )
    )
  )());

it("should return a left if register function throws an error", async () =>
  pipe(
    user,
    register(registerFail),
    mapAll((error) => expect(error).toEqual(new Error("External error")))
  )());
