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

test.afterAll(async () => {
  finalizeLogFile(); // Finalize the log file after all tests
});

test('RRform Approval test by HM', async ({page,rasHomePage}) => {

  console.log("started to move into the actual test ...")
    try {
          await rasHomePage.navigateToMyRequests();
          await rasHomePage.searchOpenRequestsAndApprove(testData.output.jpr);
    } catch (error) {
      console.error(`Error during login for ${process.env.HM_USER_NAME}:`, error);
    }
});
