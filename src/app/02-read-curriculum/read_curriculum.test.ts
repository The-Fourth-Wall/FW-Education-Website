import {expect, test} from "vitest";
import {read_curriculum} from "./read_curriculum";

test("reads curriculum and parses fundamental course correctly", () => {
  const courses = read_curriculum("curriculum.md");
  const calculus = courses.find(course => course.code === "FW-101");

  expect(calculus).toBeDefined();
  expect(calculus?.name).toBe("Calculus I");
  expect(calculus?.description).toBe(
    "An introduction to the foundations of Algebra for understanding of changing systems, a basic requirement for STEM.",
  );
  expect(calculus?.semester).toBe(1);
  expect(calculus?.difficulty).toBe("fundamental");
  expect(calculus?.programming).toBe(
    "optional examples in C as extras lectures",
  );
  expect(calculus?.references).toContain(
    "Calculus by Larson, Hostetler & Edwards",
  );
  expect(calculus?.topics).toHaveLength(5);
  expect(calculus?.topics[0].name).toBe(
    "numbers, cartesian plane and functions",
  );
});

test("reads curriculum and parses advanced course correctly", () => {
  const courses = read_curriculum("curriculum.md");
  const pentesting = courses.find(course => course.code === "FW-934");

  expect(pentesting).toBeDefined();
  expect(pentesting?.name).toBe("Penetration Testing and Offensive Security");
  expect(pentesting?.semester).toBe(9);
  expect(pentesting?.difficulty).toBe("advanced");
  expect(pentesting?.programming).toBe(
    "lots of tools, maybe Python for scripts.",
  );
  expect(pentesting?.references).toContain("Metasploit book");
  expect(pentesting?.topics).toContainEqual({
    name: "pipeline of pentesting",
    subtopics: [],
  });
});

test("reads curriculum and verifies course with complex topics structure", () => {
  const courses = read_curriculum("curriculum.md");
  const science = courses.find(course => course.code === "FW-103");

  expect(science).toBeDefined();
  expect(science?.name).toBe("Foundational Science for Computing");
  expect(science?.description).toBe(
    "A high level foray into the fields of physics, chemistry, materials science and biology, enabling the connection of computing to the real world.",
  );

  const physics_topic = science?.topics.find(t => t.name === "physics");
  expect(physics_topic).toBeDefined();

  const thermodynamics = physics_topic?.subtopics.find(
    t => t.name === "basic thermodynamics",
  );
  expect(thermodynamics).toBeDefined();
  expect(thermodynamics?.subtopics).toContainEqual({
    name: "first law of thermodynamics (ΔU = Q - W) energy conservation, heat, work",
    subtopics: [],
  });
});
