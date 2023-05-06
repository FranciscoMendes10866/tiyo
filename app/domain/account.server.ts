import { InputError, makeDomainFunction } from "domain-functions";
import type { InferModel } from "drizzle-orm";
import { eq } from "drizzle-orm";
import { hash, verify } from "argon2";

import { authSchema, authSchemaWithoutUsername } from "~/common/authSchema";
import { db } from "~/db/config.server";
import { users } from "~/db/schema.server";

export const createAccount = makeDomainFunction(authSchema)(async (data) => {
  const result = db
    .select()
    .from(users)
    .where(eq(users.email, data.email))
    .get();

  if (result) {
    throw new InputError("Email already taken", "email");
  }

  const { password, ...rest } = data;

  const hashedPassword = await hash(password);

  const newUser: InferModel<typeof users, "insert"> = {
    ...rest,
    password: hashedPassword,
    createdAt: new Date(),
  };

  const record = db.insert(users).values(newUser).returning().get();

  if (!record || !record.id) {
    throw new Error("Unable to register a new user");
  }

  return record;
});

export const getAccountByEmail = makeDomainFunction(authSchemaWithoutUsername)(
  async (data) => {
    const result = db
      .select()
      .from(users)
      .where(eq(users.email, data.email))
      .get();

    if (!result || !result.email) {
      throw new InputError("Email does not exist", "email");
    }

    const isValidPassword = await verify(result.password, data.password);

    if (!isValidPassword) {
      throw new InputError("Password is not valid", "password");
    }

    return result;
  }
);
