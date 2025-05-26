import {readFile} from "node:fs/promises";
import {resolve} from "node:path";

export async function read_file(filename: string) {
  try {
    const filePath = resolve(process.cwd(), filename);
    const content = await readFile(filePath, "utf-8");
    return content;
  } catch (error) {
    console.error(`Failed to read file ${filename}:`, error);
    return "";
  }
}
