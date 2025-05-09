import type {Course, Topic, Difficulty} from "@models/course.model";

export function parse_curriculum(content: string): Course[] {
  const courses: Course[] = [];
  const lines = content.split("\n");
  let current_course: Course = {
    code: "",
    name: "",
    semester: 1,
    difficulty: "fundamental",
    programming: "",
    references: [],
    topics: [],
  };
  let current_section = "programming";
  let topic_stack: {topic: Topic; indent: number}[] = [];

  const get_difficulty = (code: string): Difficulty => {
    const level = parseInt(code[4]);
    switch (level) {
      case 0:
        return "fundamental";
      case 1:
        return "beginner";
      case 2:
        return "intermediate";
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
      const [_, code, name] = trimmed.match(/- (FW-\d{3})\s*\((.*?)\)/) as [
        string,
        string,
        string,
      ];
      current_course = {
        code,
        name,
        semester: parseInt(code[3]),
        difficulty: get_difficulty(code),
        programming: "",
        references: [],
        topics: [],
      };
      continue;
    }

    const indent = line.search(/\S/);

    if (trimmed.startsWith("- programming:")) {
      current_section = "programming";
    } else if (trimmed.startsWith("- references:")) {
      current_section = "references";
    } else if (trimmed.startsWith("- topics:")) {
      current_section = "topics";
    } else if (trimmed.startsWith("- ")) {
      switch (current_section) {
        case "programming":
          current_course.programming = trimmed.substring(2);
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
