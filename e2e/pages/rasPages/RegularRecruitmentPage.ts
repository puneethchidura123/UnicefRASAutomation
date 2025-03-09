import { Page } from "@playwright/test";
import { Browser } from "@playwright/test";
import { logStep } from "D:/UnicefAutomation/UnicefRASAutomation/e2e/utils/logger.ts";
import path from 'path';

class RegularRecruitmentPage {
  constructor(private readonly page: Page, private readonly browser: Browser) {}
//   private readonly va_job_labelSelector = '//*[@id="va_job_specification"]';
//   private readonly uploadButtonSelector = 'button[aria-label="Upload Attachment for Attach JD/TOR Required"]';
  private readonly vacancyAnnouncementDurationTextBox = this.page.getByLabel('Vacancy Announcement (VA) duration in days.', { exact: true });
  async fillBasicInformation(vacancy_announcement_duration_in_days: string,
   batch_recruitment: string,
   position_number: string,
   position_numbers: string[]) {
    await logStep("fillBasicInformation TextBox", async () => {
    await this.vacancyAnnouncementDurationTextBox.fill(vacancy_announcement_duration_in_days);
    await this.page.waitForTimeout(1000);
    await this.page.locator('#s2id_sp_formfield_is_this_batch_recruitment a').click();
    await this.page.getByRole('option', { name: batch_recruitment }).click();

    await this.page.click('#s2id_sp_formfield_please_confirm_where_the_advertised_position_belongs_to .select2-choice');
    await this.page.waitForTimeout(1000);
    const optionSelector = '//div[contains(@class, "select2-result-label") and text()="Headquarter with GS and IP positions"]';
    await this.page.waitForSelector(optionSelector, { state: 'visible', timeout: 10000 });
    await this.page.click(optionSelector);
    await this.page.waitForTimeout(1000);

        if (batch_recruitment === 'Yes') {
          await this.page.getByRole('heading', { name: 'Multiple Position Details ' }).click();

            for (const posNum of position_numbers) {
              await this.page.getByLabel('Add a row for Multiple').click();
              await this.page.getByLabel('Position number').click();
              await this.page.getByLabel('Position number').fill(posNum);
              await this.page.keyboard.press('Tab');
              await this.page.waitForTimeout(5000);
              await this.page.getByRole('button', { name: 'Add' }).click();
              await this.page.waitForTimeout(3000);
            }
        } else {
          await this.page.fill('input[name="position_number"]', position_number);
          await this.page.waitForTimeout(1000);
          await this.page.keyboard.press('Tab');
          await this.page.waitForTimeout(10000);
         const positionAlreadyExistsXPath = '//div[contains(text(), "There is already an active request/draft for this position number.")]';
          console.log('Checking if "Position already exists" message is present...');
          const elementHandle = await this.page.$(positionAlreadyExistsXPath);

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
          console.log('No issues detected. Proceeding with further steps...');
        }
        //position_number things are done
    });
}
  async fillContactsInformation(primary_contact: string, hr_manager: string, hiring_manager: string) {
    await logStep("fillContactsInformation", async () => {
        console.log('Step: Clicking the "Contacts" label...');
        const labelSelector = '//label[contains(@class, "accordion-label") and @id="contacts"]';
        await this.page.click(labelSelector);

        console.log('"Contacts" label clicked successfully.');

        await this.page.click('//*[@id="s2id_sp_formfield_hrbp"]/a/span[2]/b');
        await this.page.fill('//label[contains(text(), "Primary Selection Support")]//following-sibling::input', primary_contact);
        await this.page.click(`//div[text()="${primary_contact}"]`);
        console.log('Clicked on primary_contact');

        await this.page.click('//*[@id="s2id_sp_formfield_hr_representative"]/a/span[2]/b');
        await this.page.fill('//label[contains(text(), "HR Representative")]//following-sibling::input', hr_manager);
        await this.page.click(`//div[text()="${hr_manager}"]`);

        await this.page.click('//*[@id="s2id_sp_formfield_hiring_manager"]/a/span[2]/b');
        await this.page.fill('//label[contains(text(), "Hiring manager")]//following-sibling::input', hiring_manager);
        await this.page.click(`//div[text()="${hiring_manager}"]`);
        await this.page.waitForTimeout(7000);
    });

  }

    async fillVAJobSpecification(batch_recruitment: string, contract_duration_months: string) {
      await logStep("fillVAJobSpecification", async () => {
        console.log('Step: Clicking the va_job_specification label...');
        const va_job_labelSelector = '//*[@id="va_job_specification"]';
        await this.page.click(va_job_labelSelector);
        await this.page.waitForTimeout(3000);
        await this.page.getByLabel('form', { exact: true }).getByText('I hereby declare that all the').click();
        await this.page.waitForTimeout(5000);
        await this.page.fill('input[name="contract_duration_months"]', contract_duration_months);
        await this.page.waitForTimeout(3000);

        if (batch_recruitment === 'Yes') {
                console.log('Step 2: Trigger the file upload dialog...Bulk');
                const uploadButtonSelector = 'button[aria-label="Upload Attachment for Attach JD/TOR Required"]';
                await this.page.waitForSelector(uploadButtonSelector, { state: 'visible', timeout: 7000 });

                console.log('Step 3: Identify the hidden file input element...');
                // Assumes the file input is a sibling of the button or dynamically added
                const fileInputSelector = 'input[type="file"]'; // Adjust selector if necessary

                console.log('Step 4: Upload the file...');
                const fileName = 'jd.doc';
                const filePath = path.resolve(__dirname, fileName);
                console.log(`Resolved file path: ${filePath}`);
                await this.page.setInputFiles(fileInputSelector, filePath);

                // Wait for a few seconds to ensure the file upload completes
                await this.page.waitForTimeout(7000);
                console.log('File upload completed successfully.');
        } else {
                console.log('Step 2: Trigger the file upload dialog...');
//                 const uploadButtonSelector = 'button[aria-label="Upload Attachment for Attach JD/TOR Required"]';
                await this.page.waitForSelector(uploadButtonSelector, { state: 'visible', timeout: 7000 });

                console.log('Step 3: Identify the hidden file input element...');
                const fileInputSelector = 'input[type="file"]'; // Adjust selector if necessary

                console.log('Step 4: Upload the file...');
                const fileName = 'jd.doc';
                const filePath = path.resolve(__dirname, fileName);
                console.log(`Resolved file path: ${filePath}`);
                await this.page.setInputFiles(fileInputSelector, filePath);

                // Wait for a few seconds to ensure the file upload completes
                await this.page.waitForTimeout(7000);
                console.log('File upload completed successfully.');
        }

      });
  }
}
export { RegularRecruitmentPage };
