export type Topic = {
  name: string;
  subtopics: Topic[];
};

export type Difficulty =
  | "fundamental"
  | "beginner"
  | "intermediate"
  | "advanced";

export type Course = {
  code: string;
  name: string;
  description: string;
  semester: string;
  difficulty: Difficulty;
  time: string;
  programming: string;
  references: string[];
  topics: Topic[];
};
