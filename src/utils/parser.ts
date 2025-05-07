import type {Course, SimpleListItem} from "../types";

// Helper map for difficulty
const difficulty_map: {[key: string]: string} = {
  "0": "Fundamental",
  "1": "Beginner",
  "2": "Intermediate",
  "3": "Advanced",
};

// List of languages to look for in the programming section header line
const target_languages = [
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
];

export function parse_curriculum_file_content(
  file_content_param: string,
): Course[] {
  const lines = file_content_param.split("\n");
  const parsed_courses: Course[] = [];
  let current_course: Course | null = null;
  let current_section_name: "programming" | "references" | "topics" | null =
    null;
  let parent_item_stack: SimpleListItem[] = [];

  const course_header_regex = /^- (FW-(\d)(\d)\d) \((.*)\)/;
  const section_header_regex =
    /^\s{2}-\s+(programming|references|topics):\s*(.*)/;
  const list_item_regex = /^(\s*)-\s+(.*)/;

  for (const line of lines) {
    const course_match = line.match(course_header_regex);
    if (course_match) {
      if (current_course) parsed_courses.push(current_course);

      const course_code_full = course_match[1];
      const semester_digit = course_match[2];
      const difficulty_digit = course_match[3];
      const course_name_match = course_match[4].trim();

      current_course = {
        course_code: course_code_full,
        course_name: course_name_match,
        semester: parseInt(semester_digit, 10),
        difficulty: difficulty_map[difficulty_digit] || "Unknown",
        description: "",
        programming_language: undefined, // Initialize language
        programming_details: [],
        references_list: [],
        topics_list: [],
      };
      current_section_name = null;
      parent_item_stack = [];
      continue;
    }

    if (!current_course) continue;

    const section_match = line.match(section_header_regex);
    if (section_match) {
      current_section_name = section_match[1] as
        | "programming"
        | "references"
        | "topics";
      parent_item_stack = [];
      const inline_content = section_match[2]?.trim();

      // Try to extract language if this is the programming section header line
      if (current_section_name === "programming" && inline_content) {
        for (const lang of target_languages) {
          // Use word boundaries to avoid partial matches (e.g., 'C' in 'Calculus')
          const lang_regex = new RegExp(`\\b${lang}\\b`, "i");
          if (lang_regex.test(inline_content)) {
            current_course.programming_language = lang;
            break; // Take the first matched language
          }
        }
      }
      continue;
    }

    if (
      !current_section_name &&
      !line.match(list_item_regex) &&
      line.trim().length > 0
    ) {
      if (current_course.description) {
        current_course.description += " " + line.trim();
      } else {
        current_course.description = line.trim();
      }
      continue;
    }

    if (current_section_name) {
      const list_item_match = line.match(list_item_regex);
      if (list_item_match) {
        const leading_spaces = list_item_match[1].length;
        const text = list_item_match[2].trim();

        if (!text) continue;

        const new_item: SimpleListItem = {text, sub_items: []};

        const indent_level = Math.max(0, (leading_spaces - 4) / 2);

        parent_item_stack = parent_item_stack.slice(0, indent_level);

        if (parent_item_stack.length === 0) {
          if (leading_spaces >= 4) {
            if (current_section_name === "programming")
              current_course.programming_details.push(new_item);
            else if (current_section_name === "references")
              current_course.references_list.push(new_item);
            else if (current_section_name === "topics")
              current_course.topics_list.push(new_item);
            parent_item_stack.push(new_item);
          }
        } else {
          const parent_item = parent_item_stack[parent_item_stack.length - 1];
          if (!parent_item.sub_items) parent_item.sub_items = [];
          parent_item.sub_items.push(new_item);
          parent_item_stack.push(new_item);
        }
      } else {
        if (
          current_section_name === "programming" &&
          line.trim().length > 0 &&
          parent_item_stack.length === 0
        ) {
          // This was for non-dashed programming lines, current logic favors dashed lists.
        }
      }
    }
  }

  if (current_course) parsed_courses.push(current_course);
  return parsed_courses;
}
