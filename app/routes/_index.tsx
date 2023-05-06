import { type LoaderFunction } from "@remix-run/node";
import { route } from "routes-gen";

import { authenticator } from "~/auth/authenticator.server";

export const loader: LoaderFunction = async ({ request }) => {
  return await authenticator.isAuthenticated(request, {
    successRedirect: route("/protected"),
    failureRedirect: route("/auth/sign-up"),
  });
};
