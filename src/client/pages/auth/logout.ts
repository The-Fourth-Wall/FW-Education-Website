import {logout} from "@app/02-authentication/signin";
import type {APIRoute} from "astro";

export const GET: APIRoute = async ({cookies, redirect}) => {
  return logout(cookies, redirect);
};
