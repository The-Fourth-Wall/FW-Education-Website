export type Difficulty =
  | "fundamental"
  | "beginner"
  | "intermediate"
  | "advanced"
  | "expert"
  | "master";

export type Availability = "available" | "in-progress" | "planned";

export type Course = {
  code: string;
  name: string;
  description: string;
  semester: number;
  difficulty: Difficulty;
  time: string;
  programming: string[];
  references: string[];
  topics: string[];
  availability: Availability;
};
