import {defineConfig} from "astro/config";

import svelte from "@astrojs/svelte";
import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  output: "server",
  integrations: [svelte()],
  adapter: vercel({
    analytics: true,
    webAnalytics: {
      enabled: true,
    },
  }),
  srcDir: "./src/client",
});
