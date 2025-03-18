import * as path from "path";
import * as fs from 'fs';

export function saveDataToFile(positionNumber: string, jprNumberText: string) {

    // this functions takes two args - position_number, JPr Number
    //and saves them to a file - "test_results.json"

    const outputFile = path.resolve(__dirname, 'test_results.json');
    const result = { positionNumber, jprNumberText, timestamp: new Date().toISOString() };
  
    try {
      // Check if the file exists
      if (fs.existsSync(outputFile)) {
        // Append to the existing file
        const fileData = fs.readFileSync(outputFile, 'utf8');
        const jsonData = JSON.parse(fileData);
        jsonData.push(result);
        fs.writeFileSync(outputFile, JSON.stringify(jsonData, null, 2));
      } else {
        // Create a new file with the data
        fs.writeFileSync(outputFile, JSON.stringify([result], null, 2));
      }
      console.log('Successfully saved data to file:', result);
    } catch (error) {
      console.error('Error saving data to file:', error);
    }
  }