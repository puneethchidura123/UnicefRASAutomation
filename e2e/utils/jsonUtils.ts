import * as fs from "fs";
import * as path from "path";

// Function to read JSON data
export function readJsonFile(filePath: string) {
  const rawData = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(rawData);
}

// Function to write JSON data
export function writeJsonFile(filePath: string, data: any) {
  const jsonData = JSON.stringify(data, null, 2); // Pretty print with 2 spaces
  fs.writeFileSync(filePath, jsonData, "utf-8");
}
