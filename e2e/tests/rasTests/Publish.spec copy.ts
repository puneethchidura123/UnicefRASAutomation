import { test, expect, chromium } from '@playwright/test';
import * as fs from 'fs';
import path from 'path';

test('RR Form publish by RAS Agent Test', async () => {
  test.setTimeout(300000);
  //const config =  JSON.parse(fs.readFileSync('config.json', 'utf8'));

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
                  await page.goto('https://uniceftest.service-now.com/login.do');
                  await page.getByLabel('User name').fill(process.env.RAS_Agent_USER_NAME ?? "");
                  await page.getByLabel('Password', { exact: true }).fill(process.env.RAS_Agent_PASSWORD ?? "");
                  await page.getByRole('button', { name: 'Log in' }).click();
                  await page.waitForTimeout(5000);
                  await page.getByLabel('Favorites', { exact: true }).click();
                  await page.waitForTimeout(5000);
                  await page.getByRole('link', { name: 'Recruitment Tracking - All' }).click();
                  await page.waitForTimeout(5000);
                  await page.locator('iframe[name="gsft_main"]').contentFrame().getByLabel('Search', { exact: true }).click();
                  await page.locator('iframe[name="gsft_main"]').contentFrame().getByLabel('Search', { exact: true }).fill(testData.jprNumberText);
                  await page.locator('iframe[name="gsft_main"]').contentFrame().getByLabel('Search', { exact: true }).press('Enter');
                  await page.waitForTimeout(5000);
                  await page.locator('iframe[name="gsft_main"]').contentFrame().getByLabel(`Open record: ${testData.jprNumberText}`).click();
                  await page.waitForTimeout(5000);
                  await page.locator('iframe[name="gsft_main"]').contentFrame().getByRole('searchbox', { name: 'Mandatory - must be populated' }).click();
                  await page.waitForTimeout(5000);
                  await page.locator('iframe[name="gsft_main"]').contentFrame().getByRole('cell', { name: 'QA_RAS_ agent1' }).click();
                  await page.waitForTimeout(5000);
                  //await page.locator('iframe[name="gsft_main"]').contentFrame().getByRole('button', { name: 'Select Date' }).click();
                  await page.waitForTimeout(5000);
                  console.log("starting to enter valid till date..")
                  await page.frameLocator('iframe[name="gsft_main"]').getByLabel('Valid Till').fill('16/03/2025');
                  await page.frameLocator('iframe[name="gsft_main"]').getByText('Valid Till').click();

                  console.log("finished entering  till date..")

                  await page.waitForTimeout(2000);
                  await page.locator('iframe[name="gsft_main"]').contentFrame().locator('[id="x_adsr_recruit_job_position_request\\.form_header"]').getByRole('button', { name: 'Save' }).click();
                  await page.waitForTimeout(5000);
                  await page.locator('iframe[name="gsft_main"]').contentFrame().locator('#approve_request').click();
                  await page.waitForTimeout(8000);
    } catch (error) {
      console.error(`Error during login for ${testData.username}:`, error);
    }
  }
});
