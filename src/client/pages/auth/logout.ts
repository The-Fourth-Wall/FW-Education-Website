import {logout} from "@app/02-authentication/signin";
import {user} from "@models";
import type {APIRoute} from "astro";

export const GET: APIRoute = async ({cookies, redirect}) => {
  cookies.delete("sb-access-token", {path: "/"});
  cookies.delete("sb-refresh-token", {path: "/"});
  user.set({theme: "system"});
  return logout(redirect);
};
