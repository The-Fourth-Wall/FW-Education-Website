import {read_curriculum} from "../02-read-curriculum/read_curriculum.ts";

const courses = read_curriculum("curriculum.md");

const sample = courses.filter(course =>
  ["FW-101", "FW-202", "FW-323", "FW-934"].includes(course.code),
);

console.log(JSON.stringify(sample, null, 2));
