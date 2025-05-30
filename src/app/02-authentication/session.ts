import type {AstroCookies} from "astro";
import {supabase} from "./supabase";
import {create_user} from "./user";

export async function handle_session(
  cookies: AstroCookies,
  tokens: {access_token?: string; refresh_token?: string},
) {
  const {data, error} = await supabase.auth.setSession({
    refresh_token: tokens.refresh_token || "",
    access_token: tokens.access_token || "",
  });

  if (error) {
    cookies.delete("sb-access-token", {path: "/"});
    cookies.delete("sb-refresh-token", {path: "/"});
    return {error};
  } else if (data.session?.access_token && data.session?.refresh_token) {
    create_user(data);
    cookies.set("sb-access-token", data.session.access_token, {
      sameSite: "strict",
      path: "/",
      secure: true,
    });
    cookies.set("sb-refresh-token", data.session.refresh_token, {
      sameSite: "strict",
      path: "/",
      secure: true,
    });
    return {data};
  } else {
    return {error};
  }
}
