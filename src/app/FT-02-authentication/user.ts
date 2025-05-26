import {user} from "@models";
import type {AuthResponse} from "@supabase/supabase-js";

export function create_user(data: AuthResponse["data"]) {
  user.set({
    email: data.user?.email,
    theme: "system",
  });
}
