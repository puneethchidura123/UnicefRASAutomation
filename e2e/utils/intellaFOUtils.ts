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
} from "../utils/fileHandlingUtils";


export async function submitRRF( 
  page, 
  intellaFOLoginPage,
  hrbp_user_name,
  hrbp_password,
  rasHomePage,
  rASRegularRecruitmentForm,
  vaccancy_announcement_duration_in_days,
  batch_recruitment,
  position_number,
  position_numbers,
  primary_contact,
  hr_manager,
  hiring_manager,
  contract_duration_months,
  areas_of_education,
  areas_of_work,
  tagline_for_every_child,
  ) {
    await intellaFOLoginPage.loginToIntellaFO(hrbp_user_name,hrbp_password);
    
    await rasHomePage.openRegularRecruitmentForm();
    await page.waitForTimeout(2000);

    await logStep("fillingBasicInformation", async () => {
      await rASRegularRecruitmentForm.fillBasicInformation(vaccancy_announcement_duration_in_days,
      batch_recruitment,
      position_number,
      position_numbers,
      );
    });

    await logStep("fillingContactsInformation", async () => {
      await rASRegularRecruitmentForm.fillContactsInformation(
      primary_contact,
      hr_manager,
      hiring_manager,
      );
    });

    await logStep("fillingVAJobSpecification", async () => {
      await rASRegularRecruitmentForm.fillVAJobSpecification(
      batch_recruitment,
      contract_duration_months,
      areas_of_education,
      areas_of_work
      );
    });

    await logStep("fillingVAMinimumRequirementsDesirables", async () => {
      await rASRegularRecruitmentForm.fillVAMinimumRequirementsDesirables(
      tagline_for_every_child
      );
    });

    await logStep("fillingFullVacancyAnnouncementText", async () => {
      await rASRegularRecruitmentForm.fillFullVacancyAnnouncementText();
    });

    await logStep("submitting RR Form", async () => {
      await rASRegularRecruitmentForm.submitForm();
    });
  }


  export async function printJPRAndSaveToTestDataFile(
    rASRegularRecruitmentForm,
    position_number,
  ){
    const jprNumber = await rASRegularRecruitmentForm.printGeneratedJPRInConsole();
    await logStep("priniting the generated JPR Number ", async () => {
      await rASRegularRecruitmentForm.printGeneratedJPRInConsole()
    });
    saveDataToFile(position_number,jprNumber ?? "");
  }

  
  export async function approveRequisition(
    intellaFOLoginPage,
    hm_user_name,
    hm_password,
    rasHomePage,
    requisition_number
  ){
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