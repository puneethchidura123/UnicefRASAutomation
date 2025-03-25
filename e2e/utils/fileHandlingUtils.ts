import * as path from "path";
import * as fs from "fs";

export function saveDataToFile(positionNumber: string, jprNumberText: string, reqState: string) {
  const outputFile = "D:\\UnicefAutomation\\UnicefRASAutomation\\e2e\\testdata\\loginTestData\\TestData1.json";
  const result = {
    positionNumber,
    jprNumberText,
    timestamp: new Date().toISOString(),
    reqState
  };

  try {
    // Check if the file exists
    if (fs.existsSync(outputFile)) {
      // Read the existing data
      const fileData = fs.readFileSync(outputFile, "utf8");
      const jsonData = JSON.parse(fileData);

      // Update specific fields
      if (jsonData.output) {
        jsonData.output.position_number = positionNumber;
        jsonData.output.jpr = jprNumberText;
        jsonData.output.timestamp = result.timestamp; // Add or overwrite the timestamp
        jsonData.output.reqState = result.reqState; // Add or overwrite the timestamp
      } else {
        throw new Error("output not found in TestData1.json");
      }

      // Write the updated JSON back to the file
      fs.writeFileSync(outputFile, JSON.stringify(jsonData, null, 2));
      console.log("Successfully updated TestData1.json:", jsonData);
    } else {
      // If the file doesn't exist, create a new one with the structure
      const newData = {
        output: {
          position_number: positionNumber,
          jpr: jprNumberText,
          timestamp: result.timestamp,
          reqState: result.reqState,
        },
      };
      fs.writeFileSync(outputFile, JSON.stringify(newData, null, 2));
      console.log("File not found. Created new TestData1.json:", newData);
    }
  } catch (error) {
    console.error("Error saving data to file:", error);
  }
}
