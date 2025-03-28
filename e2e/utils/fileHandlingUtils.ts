import * as path from "path";
import * as fs from "fs";
import { readJsonFile, writeJsonFile } from "./jsonUtils";


// export function saveDataToFile(positionNumber: string, jprNumberText: string) {
//   const outputFile = path.resolve(
//     __dirname,
//     "..",
//     "testdata",
//     "RRFormTestData",
//     "rrform_path1_testdata.json"
//   );
//   const result = {
//     positionNumber,
//     jprNumberText,
//     timestamp: new Date().toISOString(),
//   };

//   try {
//     // Check if the file exists
//     if (fs.existsSync(outputFile)) {
//       // Read the existing data
//       const fileData = fs.readFileSync(outputFile, "utf8");
//       const jsonData = JSON.parse(fileData);

//       // Update specific fields
//       if (jsonData.output) {
//         jsonData.output.position_number = positionNumber;
//         jsonData.output.jpr = jprNumberText;
//         jsonData.output.timestamp = result.timestamp; // Add or overwrite the timestamp
//       } else {
//         throw new Error("output not found in TestData1.json");
//       }

//       // Write the updated JSON back to the file
//       fs.writeFileSync(outputFile, JSON.stringify(jsonData, null, 2));
//       console.log("Successfully updated TestData1.json:", jsonData);
//     } else {
//       // If the file doesn't exist, create a new one with the structure
//       const newData = {
//         output: {
//           position_number: positionNumber,
//           jpr: jprNumberText,
//           timestamp: result.timestamp,
//         },
//       };
//       fs.writeFileSync(outputFile, JSON.stringify(newData, null, 2));
//       console.log("File not found. Created new TestData1.json:", newData);
//     }
//   } catch (error) {
//     console.error("Error saving data to file:", error);
//   }
// }



export function saveDataToFile(jpr: string, testData: any, testDataFilePath: string) {
  try {
    const resolvedFilePath = path.resolve(process.cwd(), testDataFilePath);
    // Read the existing JSON data
    const jsonData = readJsonFile(resolvedFilePath);

    // Extract position number from inputData
    const position_number = testData.inputData.position_number;

    // Create the new output data
    const output = {
      position_number,
      jpr,
      timestamp: new Date().toISOString(),
    };

    // Update the JSON data with the output
    if (!jsonData.output) {
      jsonData.output = {}; // Add an output field if it doesn't exist
    }
    jsonData.output = { ...jsonData.output, ...output }; // Merge output into existing data

    // Write the updated JSON data back to the file
    writeJsonFile(resolvedFilePath, jsonData);
    console.log("Successfully updated JSON file:", resolvedFilePath);
  } catch (error) {
    console.error("Error saving data to JSON file:", error instanceof Error ? error.message : error);
  }
}




