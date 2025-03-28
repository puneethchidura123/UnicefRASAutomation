import { Page } from "@playwright/test";
import { Browser } from "@playwright/test";
import * as path from "path";
import { logStep } from "../../utils/logger";
import { test, expect } from "@playwright/test"; 

class RegularRecruitmentPage {
  [x: string]: any;
  constructor(private readonly page: Page) {}
//   private readonly va_job_labelSelector = '//*[@id="va_job_specification"]';
//   private readonly uploadButtonSelector = 'button[aria-label="Upload Attachment for Attach JD/TOR Required"]';
  private readonly vacancyAnnouncementDurationTextBox = this.page.getByLabel('Vacancy Announcement (VA) duration in days.', { exact: true });
  
  async fillBasicInformation(
   testData
  ) {
    await logStep("filling BasicInformation TextBox", async () => {

  const sourcing = testData.inputData.basic_information.sourcing;
  const vacancy_announcement_duration_in_days = testData.inputData.basic_information.vaccancy_announcement_duration_in_days;
  const please_confirm_where_the_advertised_position_belongs_to = testData.inputData.basic_information.please_confirm_where_the_advertised_position_belongs_to;
  const batch_recruitment =  testData.inputData.basic_information.batch_recruitment;
  const position_number= testData.inputData.basic_information.position_number;
  const position_numbers= testData.inputData.basic_information.position_numbers;

    if(sourcing){
      this.fillSourcing(sourcing)
    }
    else{
      console.log('sourcing is MT ');
    }
    await this.vacancyAnnouncementDurationTextBox.fill(vacancy_announcement_duration_in_days);
    await this.page.waitForTimeout(1000);
    await this.page.locator('#s2id_sp_formfield_is_this_batch_recruitment a').click();
    await this.page.getByRole('option', { name: batch_recruitment }).click();

    if(please_confirm_where_the_advertised_position_belongs_to){
      await this.fillplease_confirm_where_the_advertised_position_belongs_to(please_confirm_where_the_advertised_position_belongs_to)
    }else{
      console.log('please_confirm_where_the_advertised_position_belongs_to is MT ');
    }

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

// Start of basic info utils
async fillSourcing(sourcing: string){
    console.log('sourcing to be selected is :: ',sourcing);
    await this.page.locator('//*[@id="s2id_sp_formfield_sourcing"]/a/span[2]/b').click();
    const generated_locator_for_sourcing = "//div[text()='"+sourcing+"']";
    console.log('generated_locator_for_sourcing is :: ',generated_locator_for_sourcing)
    await this.page.locator("//div[text()='"+sourcing+"']").click();
}

async fillplease_confirm_where_the_advertised_position_belongs_to(please_confirm_where_the_advertised_position_belongs_to: string){
  console.log('please_confirm_where_the_advertised_position_belongs_to to be selected is :: ',please_confirm_where_the_advertised_position_belongs_to);
  console.log('expanding the **please_confirm_where_the_advertised_position_belongs_to** dropdown')
  await this.page.locator('//*[@id="s2id_sp_formfield_please_confirm_where_the_advertised_position_belongs_to"]/a/span[2]/b').click();
  console.log('selecting the required option i.e :: ',please_confirm_where_the_advertised_position_belongs_to)
  await this.page.locator("//div[text()='"+please_confirm_where_the_advertised_position_belongs_to+"']").click();
}
// end of basic info utils

async fillChildSafegaurdingInformation(
  testData
){
  const child_safeguarding = testData.inputData.child_safeguarding.elevated_risk_role;
  console.log('child_safeguarding to be selected is :: ',child_safeguarding);
  if (child_safeguarding.trim().toLowerCase() === "yes") {
    console.log("Child safeguarding information is Yes.");
    await this.page.locator('//span[text()="Child Safeguarding" and @class="ng-binding"]').click();
    await this.page.locator('//*[@id="s2id_sp_formfield_elevated_risk_role_from_a_child_safeguarding_perspective"]').click();
    await this.page.locator('//ul[contains(@aria-label,"from a child safeguarding perspective?")]/li[1]/div').click(); /// selecting Yes in child safe gaurding
    await this.assertChildSafegaurdingDependantFields();
  }
}

// Start of child safegaurding utils
async assertChildSafegaurdingDependantFields(){
  console.log('starting to assert ChildSafegaurdingDependantFields');
  const errors: string[] = []; 
  
  try { 
    console.log('checking if "Direct contact role" filed is visible');
    await this.page.waitForSelector('//span[text()="Direct contact role"]', { state: 'visible' });
    const isVisible = await this.page.isVisible('//span[text()="Direct contact role"]');
    expect(isVisible).toBeTruthy(); // Asserts that the element is visible
  } catch (e) { 
    const error = e as Error;
    errors.push("Direct contact role is not visible " + error.message); 
  }
  
  try { 
    console.log('checking if "Child data role" filed is visible');
    await this.page.waitForSelector('//span[text()="Child data role"]', { state: 'visible' });
    const isVisible = await this.page.isVisible('//span[text()="Child data role"]');
    expect(isVisible).toBeTruthy(); // Asserts that the element is visible
  } catch (e) { 
    const error = e as Error;
    errors.push("Child data role is not visible " + error.message); 
  }

  try { 
    console.log('checking if " Safeguarding response role:" filed is visible');
    await this.page.waitForSelector('//span[text()=" Safeguarding response role:"]', { state: 'visible' });
    const isVisible = await this.page.isVisible('//span[text()=" Safeguarding response role:"]');
    expect(isVisible).toBeTruthy(); // Asserts that the element is visible
  } catch (e) { 
    const error = e as Error;
    errors.push("Safeguarding response role is not visible " + error.message); 
  }

  try { 
    console.log('checking if " Assessed risk role" filed is visible');
    await this.page.waitForSelector('//span[text()=" Assessed risk role"]', { state: 'visible' });
    const isVisible = await this.page.isVisible('//span[text()=" Assessed risk role"]');
    expect(isVisible).toBeTruthy(); // Asserts that the element is visible
  } catch (e) { 
    const error = e as Error;
    errors.push("Assessed risk role is not visible " + error.message); 
  }

  if (errors.length > 0) { 
  console.error("ChildSafegaurdingDependantFields assertion failures:", errors); 
  throw new Error("ChildSafegaurdingDependantFields asserions failed"); 
  } 
  console.log('finished to assert ChildSafegaurdingDependantFields');
}
// End of child safegaurding utils

  async fillContactsInformation(
    testData
  ) {
    await logStep("fillContactsInformation", async () => {

      const primary_contact = testData.inputData.contacts.primary_contact;
      const hr_manager = testData.inputData.contacts.hr_manager;
      const hiring_manager = testData.inputData.contacts.hiring_manager;

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
    
  async fillVAJobSpecification(
    testData) {
    await logStep("fillVAJobSpecification", async () => {
    const batch_recruitment=testData.inputData.basic_information.batch_recruitment;
    const contract_duration_months=testData.inputData.va_job_specification.contract_duration_months;
    const areas_of_education=testData.inputData.va_job_specification.areas_of_education;
    const areas_of_work=testData.inputData.va_job_specification.areas_of_work;
    const flexibility=testData.inputData.va_job_specification.flexibility;

        console.log('Step: Clicking the va_job_specification label...');
        const va_job_labelSelector = '//*[@id="va_job_specification"]';
        await this.page.click(va_job_labelSelector);
        await this.page.waitForTimeout(3000);
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
                if(flexibility){
                  this.fillFlexibiltyAndValidateAddiitonalFiledsPopulation(flexibility);
                }
                else{
                  console.log('sourcing is MT ');
                }
      });
  }

// start of VAJobSpecification utils
async fillFlexibiltyAndValidateAddiitonalFiledsPopulation(flexibility: string){
  console.log('flexibility to be selected is :: ',flexibility);
  const flexibilityLocator = this.page.locator('//*[@id="s2id_sp_formfield_flexibility_clause"]/a/span[2]/b');
  console.log("Checking if the element is visible and clickable...");
  const isVisible = await flexibilityLocator.isVisible();
  if (!isVisible) {
      //throw new Error("flexibility option is not visible on the page");
      console.error('Terminating the test: Flexibility option is not visible on the page.');
      //expect(isVisible).toBeTruthy();
  }else{
    flexibilityLocator.click();
  }
  //await this.page.locator('//*[@id="s2id_sp_formfield_flexibility_clause"]/a/span[2]/b').click();
  const generated_locator_for_flexibility = "//div[text()='"+flexibility+"']";
  console.log('generated_locator_for_flexibility is :: ',generated_locator_for_flexibility)
  try {
    // Wait for the element to be visible and clickable
    await this.page.waitForSelector(generated_locator_for_flexibility, { state: "visible" });
    // Click the element
    await this.page.locator(generated_locator_for_flexibility).click();
    console.log("Clicked on the flexibility option successfully.");
  } catch (error) {
    console.error("Error clicking the flexibility option:", error);
  }
  // Locate the file input element (hidden input element)
  const fileInput = await this.page.locator('//*[@id="flexibility_clause_supporting_document"]/div/div/span/div/input'); 
  // Path to the file to be uploaded
  const filePath = path.resolve(__dirname, "../../testdata/RRFormTestData/upload_file/approval.doc");
  // Set the file to upload
  await fileInput.setInputFiles(filePath);
  console.log('File upload completed successfully.');

  console.log('starting to assert VAJobSpecification - Flexibility post upload ');
  const errors: string[] = []; 
  try { 
    console.log('checking if delete button is visible');
    await this.page.waitForSelector('//button[contains(@aria-label,"Delete Attachment")]', { state: 'visible' });
    const isVisible = await this.page.isVisible('//button[contains(@aria-label,"Delete Attachment")]');
    expect(isVisible).toBeTruthy(); // Asserts that the element is visible
  } catch (e) { 
    const error = e as Error;
    errors.push("delete button is not visible " + error.message); 
  }

  if (errors.length > 0) { 
    console.error("VAJobSpecification - Flexibility post upload assertion failures:", errors); 
    throw new Error("VAJobSpecification - Flexibility post upload asserions failed"); 
    } 
    console.log('finished to assert VAJobSpecification - Flexibility post upload');

  //await this.page.waitForTimeout(1000000);
}
//end of VAJobSpecification utils

    async fillVAMinimumRequirementsDesirables(
      testData
    ) {
      await logStep("fillVAMinimumRequirementsDesirables", async () => {
        const tagline_for_every_child=testData.inputData.va_minimum_requiremenets_and_desirables.tagline_for_every_child;
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
