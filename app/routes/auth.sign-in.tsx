import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { withZod } from "@remix-validated-form/with-zod";
import { ValidatedForm, validationError } from "remix-validated-form";
import { Link, useLoaderData } from "@remix-run/react";
import { route } from "routes-gen";

import { Input } from "~/components/Input";
import { Button } from "~/components/Button";
import type { GetUserByEmailAuth } from "~/common/authSchema";
import { authSchemaWithoutUsername } from "~/common/authSchema";
import {
  EMAIL_PASSWORD_STRATEGY,
  authenticator,
} from "~/auth/authenticator.server";

const validator = withZod(authSchemaWithoutUsername);

export const loader: LoaderFunction = () => {
  const defaultValues: GetUserByEmailAuth = {
    email: "",
    password: "",
  };
  return json({ defaultValues });
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const fieldValues = await validator.validate(formData);
  if (fieldValues.error) return validationError(fieldValues.error);

  return await authenticator.authenticate(EMAIL_PASSWORD_STRATEGY, request, {
    successRedirect: route("/protected"),
    context: { formData },
  });
};

export default function SigninPage() {
  const { defaultValues } = useLoaderData<typeof loader>();

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <ValidatedForm
        className="w-96 space-y-4"
        method="POST"
        validator={validator}
        defaultValues={defaultValues}
      >
        <Input name="email" label="Email" placeholder="Your email..." />
        <Input
          name="password"
          label="Password"
          type="password"
          placeholder="Your password..."
        />
        <div className="flex items-center space-x-4">
          <Button type="submit" label="Login" />
          <Link
            to={route("/auth/sign-up")}
            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          >
            Go to Register
          </Link>
        </div>
      </ValidatedForm>
    </div>
  );
}
