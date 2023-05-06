import type { LoaderArgs, V2_MetaFunction } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { route } from "routes-gen";

import { authenticator } from "~/auth/authenticator.server";

export const meta: V2_MetaFunction = () => {
  return [{ title: "Protected Pages" }];
};

export const loader = async ({ request }: LoaderArgs) => {
  return await authenticator.isAuthenticated(request, {
    failureRedirect: route("/auth/sign-in"),
  });
};

export default function ProtectedLayout() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="m-12">
      <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
        <span className="font-medium text-gray-600 dark:text-gray-300">
          {data.username[0].toUpperCase()}
        </span>
      </div>

      <Outlet />
    </div>
  );
}
