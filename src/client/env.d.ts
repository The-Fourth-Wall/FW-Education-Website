/// <reference path="../../.astro/types.d.ts" />

type ImportMetaEnv = {
  readonly SUPABASE_URL: string;
  readonly SUPABASE_ANON_KEY: string;
  readonly ENV: "stage" | "beta" | "prod";
};

type ImportMeta = {
  readonly env: ImportMetaEnv;
};
