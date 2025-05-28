import {defineCollection, z} from "astro:content";

const curriculum = defineCollection({
  schema: z.object({
    code: z.string(),
    name: z.string(),
    description: z.string(),
    availability: z.enum(["available", "in-progress", "planned"]),
    time: z.string(),
    programming: z.array(z.string()),
    references: z.array(z.string()),
    topics: z.array(z.string()),
  }),
});

export const collections = {curriculum};
