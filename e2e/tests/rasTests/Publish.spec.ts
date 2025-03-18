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


test.beforeEach(async ({ page,rasLoginPage }) => {
  await logStep("logging into intell Bo as RAS Agent", async () => {
    await rasLoginPage.loginToIntellaBOAsRasAgent(process.env.RAS_Agent_USER_NAME ?? "",
    process.env.RAS_Agent_PASSWORD ?? "",
    );
  });
  await page.waitForTimeout(5000);
});

test('RR Form publish by RAS Agent Test', async ({page,rasLoginPage,intellaBOHomePage}) => {
  //test.setTimeout(30000);
  // Resolve the path to "test_results.json"
const filePath = path.resolve(__dirname, '../../utils/test_results.json');
// Read and parse the JSON file
const testDataArray = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  for (const testDataElement of testDataArray) {
    try {
      //await page.waitForTimeout(5000);
      await intellaBOHomePage.publishToTMS(testDataElement.jprNumberText,testData.valid_till ?? "");
                  // await page.goto('https://uniceftest.service-now.com/login.do');
                  // await page.getByLabel('User name').fill(process.env.RAS_Agent_USER_NAME ?? "");
                  // await page.getByLabel('Password', { exact: true }).fill(process.env.RAS_Agent_PASSWORD ?? "");
                  // await page.getByRole('button', { name: 'Log in' }).click();
                  // await page.waitForTimeout(5000);
                  // await page.getByLabel('Favorites', { exact: true }).click();
                  // await page.waitForTimeout(5000);
                  // await page.getByRole('link', { name: 'Recruitment Tracking - All' }).click();
                  // await page.waitForTimeout(5000);
                  // await page.locator('iframe[name="gsft_main"]').contentFrame().getByLabel('Search', { exact: true }).click();
                  // await page.locator('iframe[name="gsft_main"]').contentFrame().getByLabel('Search', { exact: true }).fill(testData.jprNumberText);
                  // await page.locator('iframe[name="gsft_main"]').contentFrame().getByLabel('Search', { exact: true }).press('Enter');
                  // await page.waitForTimeout(5000);
                  // await page.locator('iframe[name="gsft_main"]').contentFrame().getByLabel(`Open record: ${testData.jprNumberText}`).click();
                  // await page.waitForTimeout(5000);
                  // await page.locator('iframe[name="gsft_main"]').contentFrame().getByRole('searchbox', { name: 'Mandatory - must be populated' }).click();
                  // await page.waitForTimeout(5000);
                  // await page.locator('iframe[name="gsft_main"]').contentFrame().getByRole('cell', { name: 'QA_RAS_ agent1' }).click();
                  // await page.waitForTimeout(5000);
                  // //await page.locator('iframe[name="gsft_main"]').contentFrame().getByRole('button', { name: 'Select Date' }).click();
                  // await page.waitForTimeout(5000);
                  // console.log("starting to enter valid till date..")
                  // await page.frameLocator('iframe[name="gsft_main"]').getByLabel('Valid Till').fill('16/03/2025');
                  // await page.frameLocator('iframe[name="gsft_main"]').getByText('Valid Till').click();

                  // console.log("finished entering  till date..")

                  // await page.waitForTimeout(2000);
                  // await page.locator('iframe[name="gsft_main"]').contentFrame().locator('[id="x_adsr_recruit_job_position_request\\.form_header"]').getByRole('button', { name: 'Save' }).click();
                  // await page.waitForTimeout(5000);
                  // await page.locator('iframe[name="gsft_main"]').contentFrame().locator('#approve_request').click();
                  // await page.waitForTimeout(8000);
    } catch (error) {
      console.error(`Error during login for ${testData.username}:`, error);
    }
  }
});
