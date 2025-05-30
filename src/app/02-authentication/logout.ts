import type {AstroCookies} from "astro";
import {supabase} from "./supabase";
import {user} from "@models";

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
