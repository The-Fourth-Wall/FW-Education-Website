import {defineCollection, z} from "astro:content";

const curriculum = defineCollection({
  schema: z.object({
    code: z.string(),
    name: z.string(),
    description: z.string(),
    semester: z.number(),
    difficulty: z.enum([
      "fundamental",
      "beginner",
      "intermediate",
      "advanced",
      "expert",
      "master",
    ]),
    time: z.string(),
    programming: z.array(z.string()),
    references: z.array(z.string()),
    topics: z.array(z.string()),
    availability: z.enum(["available", "in-progress", "planned"]),
  }),
});

export const collections = {curriculum};
