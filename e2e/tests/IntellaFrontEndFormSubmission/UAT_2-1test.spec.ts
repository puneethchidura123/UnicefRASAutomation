import { test, expect } from "../../fixtures/pageFixtures";
import * as fs from 'fs';
import path from 'path';
import testData from "../../testdata/RRFormTestData/UAT_2-1RRF_With_External_and_Internal_Fixed-Term(IP)_Rotational_Child Safeguarding.spec.json"
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
      testData.inputData.sourcing ?? "",
      testData.inputData.vaccancy_announcement_duration_in_days ?? "",
      testData.inputData.please_confirm_where_the_advertised_position_belongs_to ?? "",
           testData.inputData.batch_recruitment ?? "",
           testData.inputData.position_number ?? "",
           testData.inputData.position_numbers ?? [],
           testData.inputData.child_safeguarding,
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
