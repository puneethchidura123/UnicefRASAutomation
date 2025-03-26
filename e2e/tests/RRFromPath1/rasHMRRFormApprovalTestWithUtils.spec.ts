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
import { approveRequisition } from "../../utils/intellaFOUtils";
//import rasHomePage from "../../pages/intellaFO/RasHomePage";


test.beforeEach(async ({ page,intellaFOLoginPage,rasHomePage}) => {
  // await logStep("logging into intell Fo as HM", async () => {
  //   await intellaFOLoginPage.loginToIntellaFO(process.env.HM_USER_NAME ?? "",
  //   process.env.HM_PASSWORD ?? "",
  //   );
  // });
});

test.afterAll(async () => {
  finalizeLogFile(); // Finalize the log file after all tests
});

test('RRform Approval test by HM', async ({page,intellaFOLoginPage,rasHomePage}) => {

  // console.log("started to move into the actual test ...")
  //   try {
  //         await rasHomePage.navigateToMyRequests();
  //         await rasHomePage.searchOpenRequestsAndApprove(testData.output.jpr);
  //   } catch (error) {
  //     console.error(`Error during login for ${process.env.HM_USER_NAME}:`, error);
  //   }
  await approveRequisition(
    intellaFOLoginPage,
    process.env.HM_USER_NAME ?? "",
    process.env.HM_PASSWORD ?? "",
    rasHomePage,
    testData.output.jpr
  );
});
