import {atom} from "nanostores";

export type Theme = "light" | "dark" | "system";

export type User = {
  email?: string;
  theme: Theme;
};

export const user = atom<User>({
  theme: "system",
});
