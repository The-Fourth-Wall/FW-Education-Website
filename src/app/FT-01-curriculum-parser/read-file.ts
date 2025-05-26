import {readFileSync} from "fs";
import {resolve} from "path";

export async function read_file(filename: string) {
  try {
    if (import.meta.env.PROD) {
      const response = await fetch(`/${filename}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch ${filename}: ${response.statusText}`);
      }
      return await response.text();
    } else {
      const file_path = resolve(process.cwd(), filename);
      return readFileSync(file_path, "utf-8");
    }
  } catch (error) {
    console.error(`Failed to read file ${filename}:`, error);
    return "";
  }
}
