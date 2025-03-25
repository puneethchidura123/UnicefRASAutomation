import { test, expect } from "../../fixtures/pageFixtures";
import * as fs from 'fs';
import path from 'path';
import testData from "../../testdata/RRFormTestData/rrform_path1_testdata.json"
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
    try {
      await intellaBOHomePage.publishToTMS(testData.output.jpr, testData.inputData.valid_till ?? "");
    } catch (error) {
      console.error(`Error during login for ${testData.username}:`, error);
    }
});
