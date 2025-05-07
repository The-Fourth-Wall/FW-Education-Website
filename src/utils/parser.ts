import type {Course, SimpleListItem} from "../models/types";

const difficulty_map: Record<number, string> = {
  0: "Fundamental",
  1: "Beginner",
  2: "Intermediate",
  3: "Advanced",
};

export function parse_curriculum_file_content(
  file_content_param: string,
): Course[] {
  const lines = file_content_param.split("\n");
  const parsed_courses: Course[] = [];
  let current_course: Course | null = null;
  let current_section:
    | keyof Pick<
        Course,
        "programming_details" | "references_list" | "topics_list"
      >
    | null = null;
  let parent_items: SimpleListItem[] = [];

  for (const line of lines) {
    const course_match = line.match(/^- (FW-(\d)(\d)\d) \((.*)\)/);
    if (course_match) {
      if (current_course) parsed_courses.push(current_course);
      current_course = {
        course_code: course_match[1],
        course_name: course_match[4].trim(),
        semester: parseInt(course_match[2], 10),
        difficulty: difficulty_map[parseInt(course_match[3], 10)] || "Unknown",
        description: "",
        programming_language: undefined,
        programming_details: [],
        references_list: [],
        topics_list: [],
      };
      current_section = null;
      parent_items = [];
      continue;
    }

    if (!current_course) continue;

    const section_match = line.match(
      /^\s{2}-\s+(programming|references|topics):\s*(.*)/,
    );
    if (section_match) {
      current_section =
        `${section_match[1]}_${section_match[1] === "programming" ? "details" : "list"}` as keyof Pick<
          Course,
          "programming_details" | "references_list" | "topics_list"
        >;
      parent_items = [];
      const content = section_match[2]?.trim();
      if (section_match[1] === "programming" && content) {
        current_course.programming_language = [
          "C",
          "Ruby",
          "Java",
          "Bash",
          "Lua",
          "Python",
          "Crystal",
          "Erlang",
          "APL",
          "Solidity",
          "Rust",
          "Scheme",
          "Prolog",
          "SmallTalk",
          "SystemVerilog",
          "Algol",
        ].find(lang => new RegExp(`\\b${lang}\\b`, "i").test(content));
      }
      continue;
    }

    const list_item_match = line.match(/^(\s*)-\s+(.*)/);
    if (list_item_match && current_section && current_course[current_section]) {
      const spaces = list_item_match[1].length;
      const text = list_item_match[2].trim();
      if (!text) continue;

      const new_item: SimpleListItem = {text, sub_items: []};
      const level = Math.max(0, (spaces - 4) / 2);
      parent_items = parent_items.slice(0, level);

      if (!parent_items.length && spaces >= 4) {
        (current_course[current_section] as SimpleListItem[]).push(new_item);
        parent_items.push(new_item);
      } else if (parent_items.length > 0) {
        const last_parent = parent_items[parent_items.length - 1];
        if (last_parent?.sub_items) {
          last_parent.sub_items.push(new_item);
          parent_items.push(new_item);
        }
      }
    } else if (!current_section && line.trim()) {
      current_course.description = current_course.description
        ? `${current_course.description} ${line.trim()}`
        : line.trim();
    }
  }

  if (current_course) parsed_courses.push(current_course);
  return parsed_courses;
}
