import { test, expect, chromium } from '@playwright/test';
// import { test, expect, chromium } from "D:/UnicefAutomation/UnicefRASAutomation/e2e/fixtures/pageFixtures.ts";
import * as fs from 'fs';
import testData from "../../../testdata/loginTestData/TestData.json";
import configData from "../../../testdata/loginTestData/config.json";
import path from 'path';
import { RasLoginPage } from "../../../pages/rasPages/RasLoginPage.ts";
import { RasHomePage } from "../../../pages/rasPages/RasHomePage.ts";
import { RegularRecruitmentPage } from "../../../pages/rasPages/RegularRecruitmentPage.ts";

import {
  logStep
} from "D:/UnicefAutomation/UnicefRASAutomation/e2e/utils/logger.ts";

function saveDataToFile(positionNumber: string, jprNumberText: string) {
  const outputFile = path.resolve(__dirname, 'test_results.json');
  const result = { positionNumber, jprNumberText, timestamp: new Date().toISOString() };

  try {
    // Check if the file exists
    if (fs.existsSync(outputFile)) {
      // Append to the existing file
      const fileData = fs.readFileSync(outputFile, 'utf8');
      const jsonData = JSON.parse(fileData);
      jsonData.push(result);
      fs.writeFileSync(outputFile, JSON.stringify(jsonData, null, 2));
    } else {
      // Create a new file with the data
      fs.writeFileSync(outputFile, JSON.stringify([result], null, 2));
    }
    console.log('Successfully saved data to file:', result);
  } catch (error) {
    console.error('Error saving data to file:', error);
  }
}


test('login to RasLoginPage', async () => {
  test.setTimeout(300000);
  const config = configData;
  const testDataArray = testData;
    const browser = await chromium.launch({
      channel: 'chrome',
      headless: false,
      timeout: 60000,
      args: ['--start-maximized']
    });

  const context = await browser.newContext({
    viewport: null // Correct way to disable viewport
  });
    const page = await context.newPage();
        if(config.env === 'test'){
          await page.goto(config.test1, { waitUntil: 'domcontentloaded' });
          console.log("TEST env picked...")
        }else if(config.env === 'dev'){
          await page.goto(config.dev, { waitUntil: 'domcontentloaded' });
          console.log("DEV env picked...")
        }
        await page.waitForTimeout(1000);  // Optional: you may remove this as it might not be needed

  const rasLoginPage = new RasLoginPage(page);
  const rasHomePage = new RasHomePage(page);
  const regularRecruitmentPage = new RegularRecruitmentPage(page);
  await logStep("Login as HRBP", async () => {
    await rasLoginPage.loginToApplication(
      configData.username ?? "",
      configData.password ?? ""
    );
  });

        await page.waitForTimeout(3000); // Added a longer wait for the login process to complete
        await page.goto(config.test2);

  for (const testData of testDataArray) {


    try {
       await logStep("Navigating to RasHomePage", async () => {
         await rasHomePage.navigatingToRasHomePage();
       });

       await logStep("fillBasicInformation", async () => {
         await regularRecruitmentPage.fillBasicInformation(testData.vaccancy_announcement_duration_in_days ?? "",
         testData.batch_recruitment ?? "",
         testData.position_number ?? "",
         testData.position_numbers ?? [],
         testData.primary_contact ?? "",
         testData.hr_manager ?? "",
         testData.hiring_manager ?? "",
         );
       });

       await logStep("fillContactsInformation", async () => {
         await regularRecruitmentPage.fillContactsInformation(
         testData.primary_contact ?? "",
         testData.hr_manager ?? "",
         testData.hiring_manager ?? "",
         );
       });

       await logStep("fillVAJobSpecification", async () => {
         await regularRecruitmentPage.fillVAJobSpecification(
         testData.batch_recruitment ?? "",
         testData.contract_duration_months ?? "",
         testData.areas_of_education ?? "",
         testData.areas_of_work ?? ""
         );
       });

       await logStep("fillVAMinimumRequirementsDesirables", async () => {
         await regularRecruitmentPage.fillVAMinimumRequirementsDesirables(
         testData.tagline_for_every_child ?? ""
         );
       });

       await logStep("fillFullVacancyAnnouncementText", async () => {
         await regularRecruitmentPage.fillFullVacancyAnnouncementText();
       });

       await logStep("submitForm", async () => {
         await regularRecruitmentPage.submitForm();
       });

        const JPR_NUMBER =  '//*[@id="uiNotificationContainer"]/div/span/a/b';
        const jprNumberText = await page.textContent(JPR_NUMBER);
        console.log('Extracted JPR Number:', jprNumberText);

        saveDataToFile(testData.position_number, jprNumberText);
        await page.waitForTimeout(5000);
    } catch (error) {
      console.error(`Error during login for ${testData.username}:`, error);
    }
//     finally {
//       if (browser) {
//         console.log(`Closing browser for position: ${testData.position_number}`);
//         await browser.close();
//       }
//     }
  }
});
