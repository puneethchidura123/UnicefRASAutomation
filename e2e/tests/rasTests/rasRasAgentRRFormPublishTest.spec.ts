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


test.beforeEach(async ({ page,intellaBOLoginPage }) => {
  await logStep("logging into intell Bo as RAS Agent", async () => {
    await intellaBOLoginPage.loginToIntellaBO(process.env.RAS_Agent_USER_NAME ?? "",
    process.env.RAS_Agent_PASSWORD ?? "",
    );
  });
  await page.waitForTimeout(5000);
});

test('RR Form publish by RAS Agent Test', async ({page,intellaBOHomePage}) => {
  //test.setTimeout(30000);
  // Resolve the path to "test_results.json"
const filePath = path.resolve(__dirname, '../../utils/test_results.json');
// Read and parse the JSON file
const testDataArray = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  for (const testDataElement of testDataArray) {
    try {
      //await page.waitForTimeout(5000);
      await intellaBOHomePage.publishToTMS(testDataElement.jprNumberText,testData.valid_till ?? "");
    } catch (error) {
      console.error(`Error during login for ${testData.username}:`, error);
    }
  }
});
