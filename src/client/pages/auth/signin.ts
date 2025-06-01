import {signin} from "@app/02-authentication/signin";
import type {APIRoute} from "astro";

export const POST: APIRoute = async ({request, redirect}) => {
  return signin(request, redirect);
};
