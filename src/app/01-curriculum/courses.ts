import type {Course, Difficulty} from "@models";
import {getCollection} from "astro:content";

function get_difficulty(digit: string): Difficulty {
  switch (digit) {
    case "0":
      return "fundamental";
    case "1":
      return "beginner";
    case "2":
      return "intermediate";
    case "3":
      return "advanced";
    case "4":
      return "expert";
    case "5":
      return "master";
    default:
      return "master";
  }
}

async function retrieve_all_courses() {
  return (await getCollection("curriculum")).map(course => {
    const id = course.data.code.split("-")[1];
    return {
      ...course.data,
      semester: parseInt(id.slice(0, id.length - 2)),
      difficulty: get_difficulty(id[id.length - 2]),
    };
  });
}

export async function get_course(code?: string) {
  return (await retrieve_all_courses()).find(
    c => c.code.split("-")[1] === code,
  );
}

export async function get_semesters() {
  return Object.entries(
    (await retrieve_all_courses()).reduce(
      (acc, c) => {
        if (!acc[c.semester]) {
          acc[c.semester] = [c];
        } else {
          acc[c.semester].push(c);
        }
        return acc;
      },
      {} as Record<number, Course[]>,
    ),
  )
    .sort(([s1], [s2]) => parseInt(s1) - parseInt(s2))
    .map(([_, courses]) =>
      courses.sort((c1, c2) =>
        c1.code.split("-")[1][2].localeCompare(c2.code.split("-")[1][2]),
      ),
    );
}
