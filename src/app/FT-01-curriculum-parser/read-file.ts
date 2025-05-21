import {readFileSync} from "fs";
import {resolve} from "path";

export function read_file(filename: string) {
  const file_path = resolve(process.cwd(), filename);
  return readFileSync(file_path, "utf-8");
}
