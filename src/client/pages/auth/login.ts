import {login} from "@app/FT-02-authentication/login";
import type {APIRoute} from "astro";

export const POST: APIRoute = async ({request, cookies, redirect}) => {
  const formData = await request.formData();
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  if (!email || !password) {
    return new Response("Email and password are required", {status: 400});
  } else {
    return login({email, password}, cookies, redirect);
  }
};
