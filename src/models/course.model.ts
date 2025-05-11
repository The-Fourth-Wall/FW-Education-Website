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
  semester: number;
  difficulty: Difficulty;
  programming: string;
  references: string[];
  topics: Topic[];
};
