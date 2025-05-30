import type {AstroCookies} from "astro";
import {supabase} from "./supabase";

export async function login(
  {email, password}: {email: string; password: string},
  cookies: AstroCookies,
  redirect: (url: string) => Response,
) {
  const {data, error} = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return new Response(error.message, {status: 500});
  } else {
    const {access_token, refresh_token} = data.session;
    cookies.set("sb-access-token", access_token, {path: "/"});
    cookies.set("sb-refresh-token", refresh_token, {path: "/"});
    await supabase.auth.setSession({access_token, refresh_token});
    return redirect("/");
  }
}
