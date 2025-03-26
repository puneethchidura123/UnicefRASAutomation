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
import { printJPRAndSaveToTestDataFile,
    approveRequisition,
    submitRRF
 } from "../../utils/intellaFOUtils";
 import {
    publishRequisition
  } from "../../utils/intellaBOUtils";

test.beforeEach(async ({ page,intellaFOLoginPage,rasHomePage}) => {
    
  });

test.afterAll(async () => {
    finalizeLogFile(); // Finalize the log file after all tests
  });

test('RRFrom Submission Test by HRBP', async ({page,intellaFOLoginPage,rasHomePage,rASRegularRecruitmentForm}) => {

    await logStep("Starting to Submit the RRF with the Data provided", async () => {
      await submitRRF(page,
        intellaFOLoginPage,
        process.env.HRBP_USER_NAME ?? "",
      process.env.HRBP_PASSWORD ?? "",
      rasHomePage,
      rASRegularRecruitmentForm,
      testData.inputData.vaccancy_announcement_duration_in_days ?? "",
           testData.inputData.batch_recruitment ?? "",
           testData.inputData.position_number ?? "",
           testData.inputData.position_numbers ?? [],
           testData.inputData.primary_contact ?? "",
           testData.inputData.hr_manager ?? "",
           testData.inputData.hiring_manager ?? "",
           testData.inputData.contract_duration_months ?? "",
           testData.inputData.areas_of_education ?? "",
           testData.inputData.areas_of_work ?? "",
           testData.inputData.tagline_for_every_child ?? "",
    );
    });
  
    await logStep("printing the generate JPR and saving to test data file",async () =>{
      await printJPRAndSaveToTestDataFile(
        rASRegularRecruitmentForm,
        testData.inputData.position_number ?? "",
      );
    });
  
  }); 

test('RRform Approval test by HM', async ({page,intellaFOLoginPage,rasHomePage}) => {
    await approveRequisition(
      intellaFOLoginPage,
      process.env.HM_USER_NAME ?? "",
      process.env.HM_PASSWORD ?? "",
      rasHomePage,
      testData.output.jpr
    );
});

test('RR Form publish by RAS Agent Test', async ({page,intellaBOHomePage,intellaBOLoginPage}) => {
    await publishRequisition(page,
      intellaBOLoginPage,
      process.env.RAS_Agent_USER_NAME ?? "",
      process.env.RAS_Agent_PASSWORD ?? "",
      intellaBOHomePage,
      testData.output.jpr,
      testData.inputData.valid_till ?? ""
    );
});