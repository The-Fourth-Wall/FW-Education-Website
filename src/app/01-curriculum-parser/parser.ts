import type {Course, Topic, Difficulty} from "@models/course.model";

export function parse_curriculum(content: string): Course[] {
  const courses: Course[] = [];
  const lines = content.split("\n");
  let current_course: Course = {
    code: "",
    name: "",
    description: "",
    semester: "1",
    difficulty: "fundamental",
    time: "0",
    programming: [],
    references: [],
    topics: [],
  };
  let current_section = "";
  let topic_stack: {topic: Topic; indent: number}[] = [];

  const get_difficulty = (code: string): Difficulty => {
    const difficulty_digit = code.slice(-2, -1);
    switch (difficulty_digit) {
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
        return "advanced";
    }
  };

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      continue;
    }

    if (trimmed.startsWith("- FW-")) {
      if (current_course.code) {
        courses.push(current_course);
      }
      const [_, code, name] = trimmed.match(/- (FW-\d+)\s*\((.*?)\)/) as [
        string,
        string,
        string,
      ];
      current_course = {
        code,
        name,
        description: "",
        semester: code.replace("FW-", "").slice(0, -2),
        difficulty: get_difficulty(code),
        time: "0",
        programming: [],
        references: [],
        topics: [],
      };
      continue;
    }

    const indent = line.search(/\S/);

    if (trimmed.startsWith("- time:")) {
      current_section = "time";
      const time_match = trimmed.match(/- time:\s*(\d+)/);
      if (time_match) {
        current_course.time = time_match[1];
      }
    } else if (trimmed.startsWith("- description:")) {
      current_section = "description";
      const inline_desc = trimmed.substring("- description:".length).trim();
      if (inline_desc) {
        current_course.description = inline_desc;
      }
    } else if (trimmed.startsWith("- programming:")) {
      current_section = "programming";
      const inline_prog = trimmed.substring("- programming:".length).trim();
      if (inline_prog) {
        current_course.programming.push(inline_prog);
      }
    } else if (trimmed.startsWith("- references:")) {
      current_section = "references";
    } else if (trimmed.startsWith("- topics:")) {
      current_section = "topics";
    } else if (trimmed.startsWith("- ")) {
      switch (current_section) {
        case "time":
          current_course.time = trimmed.substring(2);
          break;
        case "description":
          current_course.description = trimmed.substring(2);
          break;
        case "programming":
          current_course.programming.push(trimmed.substring(2));
          break;
        case "references":
          current_course.references.push(trimmed.substring(2));
          break;
        case "topics": {
          const topic: Topic = {name: trimmed.substring(2), subtopics: []};
          while (
            topic_stack.length > 0 &&
            topic_stack[topic_stack.length - 1].indent >= indent
          ) {
            topic_stack.pop();
          }
          if (topic_stack.length === 0) {
            current_course.topics.push(topic);
          } else {
            topic_stack[topic_stack.length - 1].topic.subtopics.push(topic);
          }
          topic_stack.push({topic, indent});
        }
      }
    }
  }

  if (current_course.code) {
    courses.push(current_course);
  }

  return courses;
}
