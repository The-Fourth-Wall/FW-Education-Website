import {expect, test} from "vitest";
import {parse_curriculum} from "./parser";

test("parses course code and name", () => {
  const content = `- FW-101 (Introduction to Programming)
- programming: Python 3.8+
- references:
- topics:`;

  const result = parse_curriculum(content);
  expect(result).toHaveLength(1);
  expect(result[0].code).toBe("FW-101");
  expect(result[0].name).toBe("Introduction to Programming");
});

test("parses semester and difficulty", () => {
  const content = `- FW-201 (Data Structures)
- programming: C++17
- references:
- topics:`;

  const result = parse_curriculum(content);
  expect(result[0].semester).toBe(2);
  expect(result[0].difficulty).toBe("intermediate");
});

test("parses programming requirements", () => {
  const content = `- FW-101 (Introduction to Programming)
- programming: Python 3.8+
- references:
- topics:`;

  const result = parse_curriculum(content);
  expect(result[0].programming).toBe("Python 3.8+");
});

test("parses references", () => {
  const content = `- FW-101 (Introduction to Programming)
- programming: Python 3.8+
- references:
  - Book 1
  - Book 2
- topics:`;

  const result = parse_curriculum(content);
  expect(result[0].references).toEqual(["Book 1", "Book 2"]);
});

test("parses topics with subtopics", () => {
  const content = `- FW-101 (Introduction to Programming)
- programming: Python 3.8+
- references:
- topics:
  - Variables
    - Integer
    - String
  - Functions
    - Parameters
      - Default Values`;

  const result = parse_curriculum(content);
  expect(result[0].topics).toHaveLength(2);
  expect(result[0].topics[0].name).toBe("Variables");
  expect(result[0].topics[0].subtopics).toHaveLength(2);
  expect(result[0].topics[1].name).toBe("Functions");
  expect(result[0].topics[1].subtopics[0].name).toBe("Parameters");
  expect(result[0].topics[1].subtopics[0].subtopics[0].name).toBe(
    "Default Values",
  );
});
