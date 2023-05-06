import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { withZod } from "@remix-validated-form/with-zod";
import { ValidatedForm, validationError } from "remix-validated-form";
import { Link, useLoaderData } from "@remix-run/react";
import { route } from "routes-gen";

import { Input } from "~/components/Input";
import { Button } from "~/components/Button";
import type { RegisterAccountAuth } from "~/common/authSchema";
import { authSchema } from "~/common/authSchema";
import { createAccount } from "~/domain/account.server";
import {
  EMAIL_PASSWORD_STRATEGY,
  authenticator,
} from "~/auth/authenticator.server";

const validator = withZod(authSchema);

export const loader: LoaderFunction = () => {
  const defaultValues: RegisterAccountAuth = {
    username: "",
    email: "",
    password: "",
  };
  return json({ defaultValues });
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const fieldValues = await validator.validate(formData);
  if (fieldValues.error) return validationError(fieldValues.error);

  const result = await createAccount(fieldValues.data);

  if (!result || !result.success) return null;

  return await authenticator.authenticate(EMAIL_PASSWORD_STRATEGY, request, {
    successRedirect: route("/protected"),
    context: { formData },
  });
};

export default function SignupPage() {
  const { defaultValues } = useLoaderData<typeof loader>();

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <ValidatedForm
        className="w-96 space-y-4"
        method="POST"
        validator={validator}
        defaultValues={defaultValues}
      >
        <Input
          name="username"
          label="Username"
          placeholder="Your username..."
        />
        <Input name="email" label="Email" placeholder="Your email..." />
        <Input
          name="password"
          label="Password"
          type="password"
          placeholder="Your password..."
        />
        <div className="flex items-center space-x-4">
          <Button type="submit" label="Register" />
          <Link
            to={route("/auth/sign-in")}
            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          >
            Go to Login
          </Link>
        </div>
      </ValidatedForm>
    </div>
  );
}
