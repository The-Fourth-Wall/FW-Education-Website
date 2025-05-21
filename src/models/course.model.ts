export type Topic = {
  name: string;
  subtopics: Topic[];
};

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
  semester: string;
  difficulty: Difficulty;
  time: string;
  programming: string[];
  references: string[];
  topics: Topic[];
  availability: Availability;
};
