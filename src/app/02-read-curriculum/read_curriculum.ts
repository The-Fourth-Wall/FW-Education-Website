import {readFileSync} from "fs";
import {resolve} from "path";
import type {Course} from "@models/course.model";
import {parse_curriculum} from "@app/01-curriculum-parser/parser";

export function read_curriculum(filename: string): Course[] {
  const file_path = resolve(process.cwd(), filename);
  const content = readFileSync(file_path, "utf-8");
  return parse_curriculum(content);
}
