import { test, expect, chromium } from '@playwright/test';
// import { test, expect, chromium } from "D:/UnicefAutomation/UnicefRASAutomation/e2e/fixtures/pageFixtures.ts";
import * as fs from 'fs';
import testData from "D:/UnicefAutomation/UnicefRASAutomation/e2e/testdata/loginTestData/TestData.json";
import configData from "D:/UnicefAutomation/UnicefRASAutomation/e2e/testdata/loginTestData/config.json";
import path from 'path';
import { RasLoginPage } from "D:/UnicefAutomation/UnicefRASAutomation/e2e/pages/rasPages/RasLoginPage.ts";
import { RasHomePage } from "D:/UnicefAutomation/UnicefRASAutomation/e2e/pages/rasPages/RasHomePage.ts";

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
        // Step 8: Fill in "Vacancy Announcement Duration"
       await logStep("Navigating to RasHomePage", async () => {
         await rasHomePage.navigatingToRasHomePage();
       });

        await page.fill('input[name="vaccancy_announcement_duration_in_days"]', testData.vaccancy_announcement_duration_in_days);
        await page.waitForTimeout(1000);
  await page.locator('#s2id_sp_formfield_is_this_batch_recruitment a').click();
  await page.getByRole('option', { name: testData.batch_recruitment }).click();
        // Step 9: Select an option from the dropdown
        await page.click('#s2id_sp_formfield_please_confirm_where_the_advertised_position_belongs_to .select2-choice');
        await page.waitForTimeout(1000);
        const optionSelector = '//div[contains(@class, "select2-result-label") and text()="Headquarter with GS and IP positions"]';
        await page.waitForSelector(optionSelector, { state: 'visible', timeout: 10000 });
        await page.click(optionSelector);
        await page.waitForTimeout(1000);

        if (testData.batch_recruitment === 'Yes') {
          await page.getByRole('heading', { name: 'Multiple Position Details ' }).click();

            for (const posNum of testData.position_numbers) {
              await page.getByLabel('Add a row for Multiple').click();
              await page.getByLabel('Position number').click();
              await page.getByLabel('Position number').fill(posNum);
              await page.keyboard.press('Tab');
              await page.waitForTimeout(5000);
              await page.getByRole('button', { name: 'Add' }).click();
              await page.waitForTimeout(3000);
            }
        } else {
          await page.fill('input[name="position_number"]', testData.position_number);
          await page.waitForTimeout(1000);
          await page.keyboard.press('Tab');
          await page.waitForTimeout(10000);
         const positionAlreadyExistsXPath = '//div[contains(text(), "There is already an active request/draft for this position number.")]';
          console.log('Checking if "Position already exists" message is present...');
          const elementHandle = await page.$(positionAlreadyExistsXPath);

          if (!elementHandle) {
              console.log('"Position already exists" message is not present. Continuing the flow...');
          } else {
              const isVisible = await elementHandle.isVisible();
              console.log(`Element visibility: ${isVisible}`);
              if (isVisible) {
                  console.error('Error: Position already exists. Closing the browser...');
                  await browser.close();
                  process.exit(1);
              } else {
                  console.log('"Position already exists" element is not visible. Continuing...');
              }
          }

          // Step 7: Continue the flow if no error
          console.log('No issues detected. Proceeding with further steps...');
        }

        console.log('Step: Clicking the "Contacts" label...');
        const labelSelector = '//label[contains(@class, "accordion-label") and @id="contacts"]';
        await page.click(labelSelector);

        console.log('"Contacts" label clicked successfully.');

        await page.click('//*[@id="s2id_sp_formfield_hrbp"]/a/span[2]/b');
        await page.fill('//label[contains(text(), "Primary Selection Support")]//following-sibling::input', testData.primary_contact);
        await page.click(`//div[text()="${testData.primary_contact}"]`);
        console.log('Clicked on primary_contact');

        await page.click('//*[@id="s2id_sp_formfield_hr_representative"]/a/span[2]/b');
        await page.fill('//label[contains(text(), "HR Representative")]//following-sibling::input', testData.hr_manager);
        await page.click(`//div[text()="${testData.hr_manager}"]`);

        await page.click('//*[@id="s2id_sp_formfield_hiring_manager"]/a/span[2]/b');
        await page.fill('//label[contains(text(), "Hiring manager")]//following-sibling::input', testData.hiring_manager);
        await page.click(`//div[text()="${testData.hiring_manager}"]`);
        await page.waitForTimeout(7000);

        console.log('Step: Clicking the va_job_specification label...');
        const va_job_labelSelector = '//*[@id="va_job_specification"]';
        await page.click(va_job_labelSelector);
        await page.waitForTimeout(3000);
        await page.getByLabel('form', { exact: true }).getByText('I hereby declare that all the').click();
        await page.waitForTimeout(5000);
        await page.fill('input[name="contract_duration_months"]', testData.contract_duration_months);
        await page.waitForTimeout(3000);

        if (testData.batch_recruitment === 'Yes') {
                console.log('Step 2: Trigger the file upload dialog...Bulk');
                const uploadButtonSelector = 'button[aria-label="Upload Attachment for Attach classified JD/classification notice and JD Required"]';
                await page.waitForSelector(uploadButtonSelector, { state: 'visible', timeout: 7000 });

                console.log('Step 3: Identify the hidden file input element...');
                // Assumes the file input is a sibling of the button or dynamically added
                const fileInputSelector = 'input[type="file"]'; // Adjust selector if necessary

                console.log('Step 4: Upload the file...');
                const fileName = 'jd.doc';
                const filePath = path.resolve(__dirname, fileName);
                console.log(`Resolved file path: ${filePath}`);
                await page.setInputFiles(fileInputSelector, filePath);

                // Wait for a few seconds to ensure the file upload completes
                await page.waitForTimeout(7000);
                console.log('File upload completed successfully.');
        } else {
                console.log('Step 2: Trigger the file upload dialog...');
                const uploadButtonSelector = 'button[aria-label="Upload Attachment for Attach JD/TOR Required"]';
                await page.waitForSelector(uploadButtonSelector, { state: 'visible', timeout: 7000 });

                console.log('Step 3: Identify the hidden file input element...');
                // Assumes the file input is a sibling of the button or dynamically added
                const fileInputSelector = 'input[type="file"]'; // Adjust selector if necessary

                console.log('Step 4: Upload the file...');
                const fileName = 'jhansi.doc';
                const filePath = path.resolve(__dirname, fileName);
                console.log(`Resolved file path: ${filePath}`);
                await page.setInputFiles(fileInputSelector, filePath);

                // Wait for a few seconds to ensure the file upload completes
                await page.waitForTimeout(7000);
                console.log('File upload completed successfully.');
        }

        const iframeSelector = '(//iframe[@title="Rich Text Area" and contains(@class, "tox-edit-area__iframe")])[2]';
        const iframeElement = await page.waitForSelector(iframeSelector);
        const frame = await iframeElement.contentFrame();

       if (frame) {
             const contentEditableSelector = 'body#tinymce.mce-content-body';
             await frame.fill(contentEditableSelector, 'This section is the purpose of the position. You are providing a snapshot of what the job entails, rather than simply cutting and pasting paragraphs from the JD. Add the key accountabilities, inserting only the headings (rather than all bullet points) elaborating where a full sentence is needed.\nLanguage tips: you may personalize this to the reader, e.g. "Join our team", and do not use impersonal, generic terms such as "the incumbent".');

             console.log('Text has been successfully entered into the iframe.');
         } else {
             console.log('Failed to access the iframe content.');
         }
        await page.waitForTimeout(6000);
        console.log('ENTERED => Purpose and roles & responsibilities');
        console.log('Hitting TAB from hey board....');
        await page.keyboard.press('Tab');
        console.log('Hitting TAB from hey board....DONE');

        await page.click('//*[@id="s2id_sp_formfield_areas_of_education"]/ul/li/input');
        console.log('Clicked on Accounting dropdown')
        await page.fill('//*[@id="s2id_sp_formfield_areas_of_education"]/ul/li/input', testData.areas_of_education);
        console.log('Filled on Accounting')
        await page.waitForTimeout(5000);
        await page.click(`//div[text()="${testData.areas_of_education}"]`);
        await page.waitForTimeout(5000);
        console.log('Clicked on Accounting')

        await page.click('//*[@id="s2id_sp_formfield_areas_of_work"]/ul/li/input');
        console.log('Clicked on Accounting and Auditing')
        await page.fill('//*[@id="s2id_sp_formfield_areas_of_work"]/ul/li/input', testData.areas_of_work);
        console.log('Filled on Accounting and Auditing')
        await page.waitForTimeout(2000);
        await page.click(`//div[text()="${testData.areas_of_work}"]`);
        await page.waitForTimeout(3000);
        console.log('Clicked on Accounting and Auditing')

        await page.waitForTimeout(7000);
        await page.click('//*[@id="va_minimum_requirements_desirables"]');
        console.log('Clicked on va_minimum_requirements_desirables')
        await page.waitForTimeout(2000);

        console.log('Setting For every child, [insert tagline]....')
        await page.click('//*[@id="s2id_sp_formfield_for_every_child"]');
        await page.fill('//label[text()="For every child, [insert tagline]"]/following-sibling::input', testData.tagline_for_every_child);
        await page.click(`//ul[@class="select2-results" and @role="listbox"]//div[@role="option" and contains(., "${testData.tagline_for_every_child}")]`);
        console.log('Setting For every child, [insert tagline].... COMPLETED')

        await page.waitForTimeout(8000);
        const full_vacancy_announcement_text = '//*[@id="full_vacancy_announcement_text"]';
        console.log('clicking... on  full_vacancy_announcement_text');
        await page.click(full_vacancy_announcement_text);
        console.log('clicked on  full_vacancy_announcement_text');


        await page.evaluate(() => {
          const checkbox = document.getElementById('sp_formfield_remarks_checkbox');
          if (checkbox && !checkbox.checked) {
              checkbox.click();
          }
        });
        console.log('Clicked on Acknowledgement checkbox');


        const submit_button = '(//button[text()="Submit"])[2]'
        await page.click(submit_button);
        console.log('clicked on submit button')

        const JPR_NUMBER =  '//*[@id="uiNotificationContainer"]/div/span/a/b';
        // Wait for the element to be present and extract its text content
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
