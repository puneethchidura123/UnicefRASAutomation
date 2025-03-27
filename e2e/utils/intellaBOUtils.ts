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


export async function publishRequisition(
    page,
    intellaBOLoginPage,
    rasagent_user_name,
    rasagent_password,
    intellaBOHomePage,
    requisition,
    valid_till

){
    await logStep("logging into intell BO as RAS Agent", async () => {
    await intellaBOLoginPage.loginToIntellaBO(process.env.RAS_Agent_USER_NAME ?? "",
    process.env.RAS_Agent_PASSWORD ?? "",
    rasagent_user_name,
    rasagent_password,
    );
    });

    await logStep("publishing requisition to TMS", async () => {
    try {
        await intellaBOHomePage.publishToTMS(requisition, valid_till);
      } catch (error) {
        console.error(`Error occured`, error);
      }
    });
}