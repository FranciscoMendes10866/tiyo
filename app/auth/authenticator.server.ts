import { Authenticator } from "remix-auth";
import { FormStrategy } from "remix-auth-form";

import { sessionStorage } from "~/auth/storage.server";
import { getAccountByEmail } from "~/domain/account.server";

interface User {
  userId: number;
  username: string;
}

export const EMAIL_PASSWORD_STRATEGY = "email-password-strategy";

export const authenticator = new Authenticator<User>(sessionStorage);

authenticator.use(
  new FormStrategy(async ({ context }) => {
    if (!context?.formData) {
      throw new Error("FormData must be provided in the Context");
    }

    const formData = context.formData as FormData;

    const email = formData.get("email");
    const password = formData.get("password");

    const result = await getAccountByEmail({ email, password });

    if (!result.success) {
      throw new Error("Failed to authenticate user");
    }

    const { username, id } = result.data;

    return { username, userId: id };
  }),
  EMAIL_PASSWORD_STRATEGY
);
