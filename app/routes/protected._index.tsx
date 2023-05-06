import type { ActionFunction } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { route } from "routes-gen";

import { authenticator } from "~/auth/authenticator.server";
import { Button } from "~/components/Button";

export const action: ActionFunction = async ({ request }) => {
  await authenticator.logout(request, { redirectTo: route("/auth/sign-in") });
};

export default function ProtectedMain() {
  return (
    <div className="space-y-4 mt-4">
      <h1>Protected Main Page</h1>
      <small>This (nested) route is protected by the parent.</small>

      <Form method="POST">
        <Button type="submit" label="Logout" />
      </Form>
    </div>
  );
}
