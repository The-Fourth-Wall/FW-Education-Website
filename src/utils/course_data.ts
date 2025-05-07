import fs from "node:fs";
import path from "node:path";
import type {Course} from "../models/types";
import {parse_curriculum_file_content} from "./parser";

export interface ProcessedCourseData {
  courses: Course[];
  grouped_courses: Record<string, Course[]>;
  sorted_semester_keys: string[];
  unique_semesters: string[];
  sorted_difficulties: string[];
  semester_options: {value: string; text: string}[];
  difficulty_options: {value: string; text: string}[];
}

export function fetch_and_process_course_data(): ProcessedCourseData {
  const courses: Course[] = (() => {
    try {
      return parse_curriculum_file_content(
        fs.readFileSync(path.resolve(process.cwd(), "curriculum.md"), "utf-8"),
      );
    } catch (error) {
      console.error(
        "Error reading or parsing curriculum.md:",
        error instanceof Error ? error.message : String(error),
      );
      return [];
    }
  })();

  const grouped_courses: Record<string, Course[]> = courses.reduce(
    (acc: Record<string, Course[]>, course: Course) => {
      (acc[course.semester] ??= []).push(course);
      return acc;
    },
    {} as Record<string, Course[]>,
  );

  const sorted_semester_keys: string[] = Object.keys(grouped_courses).sort(
    (a, b) => Number(a) - Number(b),
  );

  const unique_semesters: string[] = [
    ...new Set(courses.map((c: Course) => c.semester)),
  ].sort((a, b) => Number(a) - Number(b));

  const sorted_difficulties: string[] = [
    "Fundamental",
    "Beginner",
    "Intermediate",
    "Advanced",
    "Unknown",
  ].filter(d => courses.some((c: Course) => c.difficulty === d));

  const semester_options = unique_semesters.map(s => ({value: s, text: s}));
  const difficulty_options = sorted_difficulties.map(d => ({
    value: d,
    text: d,
  }));

  return {
    courses,
    grouped_courses,
    sorted_semester_keys,
    unique_semesters,
    sorted_difficulties,
    semester_options,
    difficulty_options,
  };
}
