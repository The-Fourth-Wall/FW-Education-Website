import {handle_session} from "@app/02-authentication/session";
import {defineMiddleware} from "astro:middleware";
import micromatch from "micromatch";

const redirect_routes = ["/login(|/)", "/register(|/)"];
const protected_routes = ["/settings(|/)"];
const hybrid_routes = ["/"];

export const onRequest = defineMiddleware(
  async ({url, cookies, redirect}, next) => {
    const access_token = cookies.get("sb-access-token")?.value;
    const refresh_token = cookies.get("sb-refresh-token")?.value;

    if (micromatch.isMatch(url.pathname, redirect_routes)) {
      if (access_token && refresh_token) {
        return redirect("/");
      }
    } else if (micromatch.isMatch(url.pathname, protected_routes)) {
      if (!access_token || !refresh_token) {
        return redirect("/login");
      } else {
        const {error} = await handle_session(cookies, {
          access_token,
          refresh_token,
        });
        if (error) {
          return redirect("/login");
        }
      }
    } else if (micromatch.isMatch(url.pathname, hybrid_routes)) {
      await handle_session(cookies, {
        access_token,
        refresh_token,
      });
    }

    return next();
  },
);
