declare module "routes-gen" {
  export type RouteParams = {
    "/protected": Record<string, never>;
    "/": Record<string, never>;
    "/auth": Record<string, never>;
    "/auth/sign-in": Record<string, never>;
    "/auth/sign-up": Record<string, never>;
  };

  export function route<
    T extends
      | ["/protected"]
      | ["/"]
      | ["/auth"]
      | ["/auth/sign-in"]
      | ["/auth/sign-up"]
  >(...args: T): typeof args[0];
}
