import {signin} from "@app/02-authentication/signin";
import type {APIRoute} from "astro";

export const POST: APIRoute = async ({request, redirect}) => {
  const form_data = await request.formData();
  const email = form_data.get("email")?.toString();
  const url = new URL(request.url);

  if (!email) {
    return new Response("Email is required", {status: 400});
  } else {
    return signin({email, url}, redirect);
  }
};
