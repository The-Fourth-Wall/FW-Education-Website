import {user} from "@models";
import type {AstroCookies} from "astro";
import {supabase} from "./supabase";

export async function signin(
  request: Request,
  redirect: (url: string) => Response,
) {
  const form_data = await request.formData();
  const email = form_data.get("email")?.toString();

  if (!email) {
    return new Response("Email is required", {status: 400});
  }

  const url = new URL(request.url);
  const {error} = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${url.protocol}//${url.host}/auth/verify`,
    },
  });

  if (error) {
    return new Response(error.message, {status: 500});
  } else {
    return redirect("/auth/verify");
  }
}

export async function logout(
  cookies: AstroCookies,
  redirect: (url: string) => Response,
) {
  cookies.delete("sb-access-token", {path: "/"});
  cookies.delete("sb-refresh-token", {path: "/"});
  user.set({theme: "system"});

  const {error} = await supabase.auth.signOut();
  if (error) {
    return new Response(error.message, {status: 500});
  } else {
    return redirect("/");
  }
}
