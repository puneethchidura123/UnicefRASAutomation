import { test, expect, chromium } from '@playwright/test';
import * as fs from 'fs';
import path from 'path';
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

test('RRform Approval test by HM', async () => {
  test.setTimeout(3000);
  // Resolve the path to "test_results.json"
const filePath = path.resolve(__dirname, '../../utils/test_results.json');
// Read and parse the JSON file
const testDataArray = JSON.parse(fs.readFileSync(filePath, 'utf8'));
 
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
  // Loop through the test data for multiple login attempts

        // Step 1: Navigate to the login page
 // Added a longer wait for the login process to complete

  for (const testData of testDataArray) {


    try {
        await page.goto(process.env.test1 ?? "");
        await page.waitForTimeout(1000);  // Optional: you may remove this as it might not be needed
        await page.getByLabel('User name').fill(process.env.HM_USER_NAME ?? "");
        await page.getByLabel('Password', { exact: true }).fill(process.env.HM_PASSWORD ?? "");
        await page.waitForTimeout(1000);

        await page.click('button[type="submit"]');
        await page.waitForTimeout(3000);
         await page.goto('https://uniceftest.service-now.com/mp');
         await page.waitForTimeout(3000);
          await page.getByRole('menuitem', { name: 'Job Positions' }).click();
          await page.waitForTimeout(3000);
          await page.getByRole('menuitem', { name: 'My Requests' }).click();
          await page.waitForTimeout(3000);
          await page.getByPlaceholder('Search Open Requests').click();
          await page.getByPlaceholder('Search Open Requests').fill(testData.jprNumberText);
          await page.waitForTimeout(3000);
          await page.getByRole('button', { name: 'Search Open Requests' }).click();
          await page.getByLabel(`${testData.jprNumberText} , ${testData.jprNumberText}`).click();
          await page.locator('section').click();
          await page.getByRole('button', { name: 'Approve' }).click();
          await page.waitForTimeout(500000);
    } catch (error) {
      console.error(`Error during login for ${testData.username}:`, error);
    }
  }
});
