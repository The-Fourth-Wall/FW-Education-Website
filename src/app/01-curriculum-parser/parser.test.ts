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
  expect(result[0].semester).toBe("2");
  expect(result[0].difficulty).toBe("fundamental");
});

test("parses description", () => {
  const content = `- FW-101 (Introduction to Programming)
- description:
  - A comprehensive introduction to programming concepts and practices.
- programming: Python 3.8+
- references:
- topics:`;

  const result = parse_curriculum(content);
  expect(result[0].description).toBe(
    "A comprehensive introduction to programming concepts and practices.",
  );
});

test("parses programming requirements", () => {
  const content = `- FW-101 (Introduction to Programming)
- description: some introduction
- programming: Python 3.8+
- references:
- topics:`;

  const result = parse_curriculum(content);
  expect(result[0].programming).toEqual(["Python 3.8+"]);
});

test("parses references", () => {
  const content = `- FW-101 (Introduction to Programming)
- programming: Python 3.8+
- references:
  - Book 1
  - Book 2
- topics:`;

  const result = parse_curriculum(content);
  expect(result[0].references).toHaveLength(2);
  expect(result[0].references[0]).toBe("Book 1");
  expect(result[0].references[1]).toBe("Book 2");
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

test("parses multiple courses", () => {
  const content = `- FW-101 (Introduction to Programming)
- programming: Python 3.8+
- topics:
  - Basic Concepts

- FW-202 (Advanced Programming)
- programming: C++17
- topics:
  - Advanced Concepts`;

  const result = parse_curriculum(content);
  expect(result).toHaveLength(2);
  expect(result[0].code).toBe("FW-101");
  expect(result[1].code).toBe("FW-202");
});

test("handles empty lines correctly", () => {
  const content = `- FW-101 (Introduction to Programming)

- programming: Python 3.8+

- topics:
  - Basic Concepts

  - Advanced Concepts`;

  const result = parse_curriculum(content);
  expect(result[0].topics).toHaveLength(2);
});

test("parses different difficulty levels correctly", () => {
  const content = `- FW-100 (Fundamental Course)
- topics:

- FW-211 (Beginner Course)
- topics:

- FW-322 (Intermediate Course)
- topics:

- FW-433 (Advanced Course)
- topics:

- FW-544 (Expert Course)
- topics:

- FW-555 (Master Course)
- topics:`;

  const result = parse_curriculum(content);
  expect(result[0].difficulty).toBe("fundamental");
  expect(result[1].difficulty).toBe("beginner");
  expect(result[2].difficulty).toBe("intermediate");
  expect(result[3].difficulty).toBe("advanced");
  expect(result[4].difficulty).toBe("expert");
  expect(result[5].difficulty).toBe("master");
});

test("parses time field correctly", () => {
  const content = `- FW-101 (Introduction to Programming)
- time: 120
- topics:`;

  const result = parse_curriculum(content);
  expect(result[0].time).toBe("120");
});

test("parses inline description correctly", () => {
  const content = `- FW-101 (Introduction to Programming)
- description: This is an inline description
- topics:`;

  const result = parse_curriculum(content);
  expect(result[0].description).toBe("This is an inline description");
});

test("parses multiple programming requirements", () => {
  const content = `- FW-101 (Introduction to Programming)
- programming:
  - Python 3.8+
  - JavaScript ES6+
- topics:`;

  const result = parse_curriculum(content);
  expect(result[0].programming).toHaveLength(2);
  expect(result[0].programming).toContain("Python 3.8+");
  expect(result[0].programming).toContain("JavaScript ES6+");
});

test("handles deeply nested topics", () => {
  const content = `- FW-101 (Introduction to Programming)
- topics:
  - Level 1
    - Level 2
      - Level 3
        - Level 4
          - Level 5`;

  const result = parse_curriculum(content);
  const topic = result[0].topics[0];
  expect(topic.name).toBe("Level 1");
  expect(topic.subtopics[0].name).toBe("Level 2");
  expect(topic.subtopics[0].subtopics[0].name).toBe("Level 3");
  expect(topic.subtopics[0].subtopics[0].subtopics[0].name).toBe("Level 4");
  expect(topic.subtopics[0].subtopics[0].subtopics[0].subtopics[0].name).toBe(
    "Level 5",
  );
});
