import { type V2_MetaFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";

export const meta: V2_MetaFunction = () => {
  return [{ title: "Auth Pages" }];
};

export default function AuthLayout() {
  return <Outlet />;
}
