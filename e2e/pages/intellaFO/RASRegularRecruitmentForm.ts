import { Page } from "@playwright/test";
import { Browser } from "@playwright/test";
import * as path from "path";
import { logStep } from "../../utils/logger";

class RegularRecruitmentPage {
  constructor(private readonly page: Page) {}
//   private readonly va_job_labelSelector = '//*[@id="va_job_specification"]';
//   private readonly uploadButtonSelector = 'button[aria-label="Upload Attachment for Attach JD/TOR Required"]';
  private readonly vacancyAnnouncementDurationTextBox = this.page.getByLabel('Vacancy Announcement (VA) duration in days.', { exact: true });
  
  async fillBasicInformation(vacancy_announcement_duration_in_days: string,
   batch_recruitment: string,
   position_number: string,
   position_numbers: string[]) {
    await logStep("fillBasicInformation TextBox", async () => {
    console.log('batch_recruitment');
    console.log(batch_recruitment);
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
                  await this.browser.close();
                  process.exit(1);
              } else {
                  console.log('"Position already exists" element is not visible. Continuing...');
              }
          }
          console.log('No issues detected. Proceeding with further steps...');
        }
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

    async fillVAJobSpecification(batch_recruitment: string, contract_duration_months: string,
    areas_of_education: string,
    areas_of_work: string) {
      await logStep("fillVAJobSpecification", async () => {
        console.log('Step: Clicking the va_job_specification label...');
        const va_job_labelSelector = '//*[@id="va_job_specification"]';
        await this.page.click(va_job_labelSelector);
        await this.page.waitForTimeout(3000);
//         await this.page.getByLabel('form', { exact: true }).getByText('I hereby declare that all the').click();
//         await this.page.waitForTimeout(5000);
//         await this.page.fill('input[name="contract_duration_months"]', contract_duration_months);
//         await this.page.waitForTimeout(3000);

        if (batch_recruitment === 'Yes') {
                await this.page.getByLabel('form', { exact: true }).getByText('I hereby declare that all the').click();
                await this.page.waitForTimeout(5000);
                await this.page.fill('input[name="contract_duration_months"]', contract_duration_months);
                await this.page.waitForTimeout(3000);
                console.log('File upload completed successfully.');
        } else {
                await this.page.fill('input[name="contract_duration_months"]', contract_duration_months);
                await this.page.waitForTimeout(3000);
        }
                console.log('Step 2: Trigger the file upload dialog...');
               const uploadButtonSelector = '//button[contains(@aria-label, "Upload Attachment")]';
               await this.page.waitForSelector(uploadButtonSelector, { state: 'visible', timeout: 7000 });

                console.log('Step 3: Identify the hidden file input element...');
                const fileInputSelector = 'input[type="file"]'; // Adjust selector if necessary

                console.log('Step 4: Upload the file...');
                const fileName = 'jd.doc';
                //const filePath = path.resolve(__dirname, fileName);
                const filePath = path.resolve(__dirname, "../../testdata/RRFormTestData/upload_file/jd.doc");
                console.log(`Resolved file path: ${filePath}`);
                await this.page.setInputFiles(fileInputSelector, filePath);

                // Wait for a few seconds to ensure the file upload completes
                await this.page.waitForTimeout(7000);
                console.log('File upload completed successfully.');

                const iframeSelector = '(//iframe[@title="Rich Text Area" and contains(@class, "tox-edit-area__iframe")])[2]';
                const iframeElement = await this.page.waitForSelector(iframeSelector);
                const frame = await iframeElement.contentFrame();

               if (frame) {
                     const contentEditableSelector = 'body#tinymce.mce-content-body';
                     await frame.fill(contentEditableSelector, 'This section is the purpose of the position. You are providing a snapshot of what the job entails, rather than simply cutting and pasting paragraphs from the JD. Add the key accountabilities, inserting only the headings (rather than all bullet points) elaborating where a full sentence is needed.\nLanguage tips: you may personalize this to the reader, e.g. "Join our team", and do not use impersonal, generic terms such as "the incumbent".');

                     console.log('Text has been successfully entered into the iframe.');
                 } else {
                     console.log('Failed to access the iframe content.');
                 }
                await this.page.waitForTimeout(6000);
                console.log('ENTERED => Purpose and roles & responsibilities');
                console.log('Hitting TAB from hey board....');
                await this.page.keyboard.press('Tab');
                console.log('Hitting TAB from hey board....DONE');

                await this.page.click('//*[@id="s2id_sp_formfield_areas_of_education"]/ul/li/input');
                console.log('Clicked on Accounting dropdown')
                await this.page.fill('//*[@id="s2id_sp_formfield_areas_of_education"]/ul/li/input', areas_of_education);
                console.log('Filled on Accounting')
                await this.page.waitForTimeout(5000);
                await this.page.click(`//div[text()="${areas_of_education}"]`);
                await this.page.waitForTimeout(5000);
                console.log('Clicked on Accounting')

                await this.page.click('//*[@id="s2id_sp_formfield_areas_of_work"]/ul/li/input');
                console.log('Clicked on Accounting and Auditing')
                await this.page.fill('//*[@id="s2id_sp_formfield_areas_of_work"]/ul/li/input', areas_of_work);
                console.log('Filled on Accounting and Auditing')
                await this.page.waitForTimeout(2000);
                await this.page.click(`//div[text()="${areas_of_work}"]`);
                await this.page.waitForTimeout(3000);
                console.log('Clicked on Accounting and Auditing')
//         }

      });
  }

    async fillVAMinimumRequirementsDesirables(tagline_for_every_child: string) {
      await logStep("fillVAMinimumRequirementsDesirables", async () => {
        await this.page.waitForTimeout(7000);
        await this.page.click('//*[@id="va_minimum_requirements_desirables"]');
        console.log('Clicked on va_minimum_requirements_desirables')
        await this.page.waitForTimeout(2000);

        console.log('Setting For every child, [insert tagline]....')
        await this.page.click('//*[@id="s2id_sp_formfield_for_every_child"]');
        await this.page.fill('//label[text()="For every child, [insert tagline]"]/following-sibling::input', tagline_for_every_child);
        await this.page.click(`//ul[@class="select2-results" and @role="listbox"]//div[@role="option" and contains(., "${tagline_for_every_child}")]`);
        console.log('Setting For every child, [insert tagline].... COMPLETED')
      });
    }

    async fillFullVacancyAnnouncementText() {
      await logStep("fillFullVacancyAnnouncementText", async () => {
        await this.page.waitForTimeout(8000);
        const full_vacancy_announcement_text = '//*[@id="full_vacancy_announcement_text"]';
        console.log('clicking... on  full_vacancy_announcement_text');
        await this.page.click(full_vacancy_announcement_text);
        console.log('clicked on  full_vacancy_announcement_text');
        await this.page.evaluate(() => {
          const checkbox = document.getElementById('sp_formfield_remarks_checkbox') as HTMLInputElement | null;
        //   if (checkbox) {
        //     const isChecked = await checkbox.isChecked(); // Check its state
        //     if (!isChecked) {
        //         await checkbox.click(); // Click if unchecked
        //     }
        // } else {
        //     console.error('Checkbox not found!');
        // }
          if (checkbox && !checkbox.checked) {
              checkbox.click();
          }
        });
        console.log('Clicked on Acknowledgement checkbox');
      });
    }

    async submitForm() {
      await logStep("submitForm", async () => {
        const submit_button = '(//button[text()="Submit"])[2]'
        await this.page.click(submit_button);
        console.log('clicked on submit button')
      });
    }

    async saveAsDraft() {
      await logStep("saving as draft", async () => {
        const saveAsDraftButton = '//button[text()=" Save as Draft "]'
        await this.page.click(saveAsDraftButton);
        console.log('clicked on Save_As_Draft Button')
        await this.page.fill(' //*[@id="draftName"]', 'RR Form Draft');
        console.log('entered draft name..')
        await this.page.click('//*[@id="saveDraftButton"]')
        console.log('clicked on Save button..')
        this.page.waitForTimeout(10000)
      });
    }

    // async printGeneratedJPRInConsole(){
    //   await logStep("submitForm", async () => {
    //     const JPR_NUMBER =  '//*[@id="uiNotificationContainer"]/div/span/a/b';
    //     const jprNumberText = await this.page.textContent(JPR_NUMBER);
    //     console.log('Extracted JPR Number is :', jprNumberText);
    //   });
    // }

    async printGeneratedJPRInConsole() {
      return await logStep("Extracting the generated JPR", async () => {
        const JPR_NUMBER = '//*[@id="uiNotificationContainer"]/div/span/a/b';
        const jprNumberText = await this.page.textContent(JPR_NUMBER);
        console.log('Extracted JPR Number is:', jprNumberText);
        return jprNumberText; // Return the extracted JPR number
      });
    }

    async printPositionNumberFromNotificationMessage() {
      return await logStep("Extracting Position Number From Sucess Message", async () => {
        console.log("starting printPositionNumberFromNotificationMessage method...");
        const Notification_Message = '//*[@id="uiNotificationContainer"]/div/span/text()[2]';
        let notificationMessageText: string | null = null; // Properly declare the variable with a nullable type
        try {
          console.log("inside try block..");
        notificationMessageText = await this.page.textContent(Notification_Message); // Await for the async operation
        console.log("notificationMessageText extracted...");
        console.log('Notification Message Text:', notificationMessageText);
          } catch (error) {
          if (error instanceof Error) {
            console.error('An error occurred:', error.message);
          } else {
            console.error('An unknown error occurred:', error);
          }
        }
        

        var extracted_position_number = '';
        if (notificationMessageText) {
          console.log('notificationMessageText is:', notificationMessageText);
          const words = notificationMessageText.split(" ");
          console.log('Words after splitting:', words);
          extracted_position_number = words[words.length-1];
        } else {
          console.error('Notification message text is null or undefined');
        }
        console.log('extracted_position_number :', extracted_position_number);
        return extracted_position_number; // Return the extracted JPR number
      });

      //*[@id="uiNotificationContainer"]/div/span/text()[2]   => Position Number
      //*[@id="uiNotificationContainer"]/div  => Notification Contaier
    }



    async checkIfRequisitionIsAvailableInDrafts(JPR_NUMBER:string) {
       await logStep("submitForm", async () => {
        // code to check if requisition is available in drafts
      });
    }
    

}
export default  RegularRecruitmentPage ;
