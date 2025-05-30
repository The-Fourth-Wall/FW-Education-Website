import {register} from "@app/02-authentication/register";
import type {APIRoute} from "astro";

export const POST: APIRoute = async ({request, cookies, redirect}) => {
  const formData = await request.formData();
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  if (!email || !password) {
    return new Response("Email and password are required", {status: 400});
  } else {
    return register({email, password}, cookies, redirect);
  }
};
