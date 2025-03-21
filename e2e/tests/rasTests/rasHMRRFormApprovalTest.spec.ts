import { test, expect } from "../../fixtures/pageFixtures";
import * as fs from 'fs';
import path from 'path';
import testData from "../../testdata/loginTestData/TestData1.json"
import configData from "../../testdata/loginTestData/config.json"
import { readJsonFile, writeJsonFile } from "../../utils/jsonUtils";
import {
  setTestFileName,
  logTestStart,
  logStep,
  finalizeLogFile,
} from "../../utils/logger";
import {
  saveDataToFile,
} from "../../utils/fileHandlingUtils";

test.beforeEach(async ({ page,intellaFOLoginPage }) => {
  await logStep("logging into intell Fo as HM", async () => {
    await intellaFOLoginPage.loginToIntellaFO(process.env.HM_USER_NAME ?? "",
    process.env.HM_PASSWORD ?? "",
    );
  });
});

/**
 * Hook to finalize the log file after all tests have run.
 * This function is called after all tests are completed and ensures that the log file is
 * properly closed and finalized. It is used to ensure that all log entries are written
 * to the file and no data is lost.
 */
test.afterAll(async () => {
  finalizeLogFile(); // Finalize the log file after all tests
});

test('RRform Approval test by HM', async ({page,rasHomePage}) => {

  console.log("started to move into the actual test ...")
  //test.setTimeout(30000);
  // Resolve the path to "test_results.json"
const filePath = path.resolve(__dirname, '../../utils/test_results.json');
// Read and parse the JSON file
const testDataArray = JSON.parse(fs.readFileSync(filePath, 'utf8')); 
  for (const testData of testDataArray) {
    try {
          await rasHomePage.navigateToMyRequests();
          await rasHomePage.searchOpenRequestsAndApprove(testData.jprNumberText);
    } catch (error) {
      console.error(`Error during login for ${testData.username}:`, error);
    }
  }
});
