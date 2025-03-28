import { test, expect } from "../../fixtures/pageFixtures";
import * as fs from 'fs';
import path from 'path';
import testData from "../../testdata/RRFormTestData/UAT_2-2RRF_With_External_and_Internal_Fixed-Term(NO)_HQ_Out_Posted.spec.json"
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
import {
  loginToIntellaFO,
    printJPRAndSaveToTestDataFile,
    submitRRF
 } from "../../utils/intellaFOUtils";
 import {
    publishRequisition
  } from "../../utils/intellaBOUtils";

const testDataPath = "e2e/testdata/RRFormTestData/UAT_2-2RRF_With_External_and_Internal_Fixed-Term(NO)_HQ_Out_Posted.spec.json"; 

test.beforeEach(async ({ page,intellaFOLoginPage,rasHomePage}) => {
    
  });

test.afterAll(async () => {
    finalizeLogFile(); // Finalize the log file after all tests
  });

test('RRFrom Submission Test by HRBP', async ({page,intellaFOLoginPage,rasHomePage,rASRegularRecruitmentForm}) => {


  await logStep("Logging into intella FO", async () => {
    await loginToIntellaFO(
      page,
      intellaFOLoginPage,
      process.env.HRBP_USER_NAME ?? "",
    process.env.HRBP_PASSWORD ?? "",
  );
  });

    await logStep("Starting to Submit the RRF with the Data provided", async () => {
      await submitRRF(page,
      rasHomePage,
      rASRegularRecruitmentForm,
      testData
    );
    });

    await logStep("printing the generate JPR and saving to test data file",async () =>{
      await printJPRAndSaveToTestDataFile(
        rASRegularRecruitmentForm,
        testData,
        testDataPath
      );
    });
  
  });
