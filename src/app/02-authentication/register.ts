import type {AstroCookies} from "astro";
import {login} from "./login";
import {supabase} from "./supabase";

export async function register(
  {email, password}: {email: string; password: string},
  cookies: AstroCookies,
  redirect: (url: string) => Response,
) {
  const {error} = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    return new Response(error.message, {status: 500});
  } else {
    return login({email, password}, cookies, redirect);
  }
}
