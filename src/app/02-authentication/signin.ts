import {supabase} from "./supabase";

export async function signin(
  {email, url}: {email: string; url: URL},
  redirect: (url: string) => Response,
) {
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

export async function logout(redirect: (url: string) => Response) {
  const {error} = await supabase.auth.signOut();
  if (error) {
    return new Response(error.message, {status: 500});
  } else {
    return redirect("/");
  }
}
