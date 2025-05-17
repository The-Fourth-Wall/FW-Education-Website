import type {Difficulty} from "@models/course.model";

export function get_difficulty_accent(difficulty: Difficulty) {
  return {
    fundamental: "color-mix(in srgb, var(--green) 90%, var(--white))",
    beginner: "color-mix(in srgb, var(--blue) 80%, var(--white))",
    intermediate: "color-mix(in srgb, var(--orange) 90%, var(--black))",
    advanced: "color-mix(in srgb, var(--crimson) 85%, var(--white))",
    expert: "color-mix(in srgb, var(--indigo) 70%, var(--white))",
    master: "color-mix(in srgb, var(--onyx) 65%, var(--white))",
  }[difficulty];
}

export function get_difficulty_background(difficulty: Difficulty) {
  return {
    fundamental: "color-mix(in srgb, var(--green) 55%, var(--black))",
    beginner: "color-mix(in srgb, var(--blue) 85%, var(--black))",
    intermediate: "color-mix(in srgb, var(--orange) 70%, var(--black))",
    advanced: "color-mix(in srgb, var(--crimson) 70%, var(--black))",
    expert: "color-mix(in srgb, var(--indigo) 95%, var(--white))",
    master: `linear-gradient(
      0deg,
      color-mix(in srgb, var(--onyx) 80%, var(--white)) 0%,
      var(--onyx) 90%
    )`,
  }[difficulty];
}
