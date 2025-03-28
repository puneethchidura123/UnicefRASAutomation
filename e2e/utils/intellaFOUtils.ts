import * as path from "path";
import { test, expect } from "../fixtures/pageFixtures";
import { Page } from "@playwright/test";
import {
  setTestFileName,
  logTestStart,
  logStep,
  finalizeLogFile,
} from "../utils/logger";
import {
  saveDataToFile,
  saveDataToFileLatest,
} from "../utils/fileHandlingUtils";

export async function loginToIntellaFO(
  page, 
  intellaFOLoginPage,
  hrbp_user_name,
  hrbp_password,
){
  await intellaFOLoginPage.loginToIntellaFO(hrbp_user_name,hrbp_password);
}

export async function submitRRF(
  page,
  rasHomePage,
  rASRegularRecruitmentForm,
  testData
  ) {
    console.log('started the submitRRFLatest method....')
    await rasHomePage.openRegularRecruitmentForm();

    await logStep("fillingBasicInformation", async () => {
      await rASRegularRecruitmentForm.fillBasicInformation(
        testData
      );
    });

    await logStep("fillingChildSafegaurdingInformation", async () => {
      await rASRegularRecruitmentForm.fillChildSafegaurdingInformation(
        testData
        );
    });

    await logStep("fillingContactsInformation", async () => {
      await rASRegularRecruitmentForm.fillContactsInformation(
        testData
      );
    });

    await logStep("fillingVAJobSpecification", async () => {
      await rASRegularRecruitmentForm.fillVAJobSpecification(
        testData
      );
    });

    await logStep("fillingVAMinimumRequirementsDesirables", async () => {
      await rASRegularRecruitmentForm.fillVAMinimumRequirementsDesirables(
        testData
      );
    });

    await logStep("fillingFullVacancyAnnouncementText", async () => {
      await rASRegularRecruitmentForm.fillFullVacancyAnnouncementText();
    });

    await logStep("submitting RR Form", async () => {
      await rASRegularRecruitmentForm.submitForm();
      //console.log("commented the submission and started waiting for the mentioned timeout...");
      //await page.waitForTimeout(1000000);
    });
  }


  export async function printJPRAndSaveToTestDataFile(
    rASRegularRecruitmentForm,
    testData: any,
    testDataPath: string
  ){
    const jprNumber = await rASRegularRecruitmentForm.printGeneratedJPRInConsole();
    saveDataToFile(jprNumber ?? "",testData,testDataPath);
  }

  
  export async function approveRequisition(
    intellaFOLoginPage,
    hm_user_name,
    hm_password,
    rasHomePage,
    requisition_number
  ){
    console.log('received jpr to approve is :: ',requisition_number);
    await logStep("logging into intella FO as a Hiring Manager", async () => {
      await intellaFOLoginPage.loginToIntellaFO(hm_user_name,hm_password);
    });
    await logStep("navigating to My Requests", async () => {
      await rasHomePage.navigateToMyRequests();
    });
    await logStep("searching in open requisition and approve", async () => {
      await rasHomePage.searchOpenRequestsAndApprove(requisition_number);
    });
  }