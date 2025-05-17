import type {Difficulty} from "@models/course.model";

export function get_difficulty_accent(difficulty: Difficulty) {
  return {
    fundamental: "color-mix(in srgb, var(--green) 90%, var(--white))",
    beginner: "color-mix(in srgb, var(--blue) 80%, var(--white))",
    intermediate: "var(--orange)",
    advanced: "color-mix(in srgb, var(--crimson) 85%, var(--white))",
    expert: "color-mix(in srgb, var(--indigo) 75%, var(--white))",
    master: "color-mix(in srgb, var(--onyx) 60%, var(--white))",
  }[difficulty];
}

export function get_difficulty_background(difficulty: Difficulty) {
  return {
    fundamental: "color-mix(in srgb, var(--green) 80%, var(--black))",
    beginner: "color-mix(in srgb, var(--blue) 85%, var(--black))",
    intermediate: "color-mix(in srgb, var(--orange) 78%, var(--black))",
    advanced: "color-mix(in srgb, var(--crimson) 85%, var(--black))",
    expert: "var(--indigo)",
    master: `linear-gradient(
      0deg,
      color-mix(in srgb, var(--onyx) 80%, var(--white)) 0%,
      var(--onyx) 90%
    )`,
  }[difficulty];
}
