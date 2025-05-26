import {logout} from "@app/FT-02-authentication/logout";
import type {APIRoute} from "astro";

export const GET: APIRoute = async ({cookies, redirect}) => {
  return logout(cookies, redirect);
};
