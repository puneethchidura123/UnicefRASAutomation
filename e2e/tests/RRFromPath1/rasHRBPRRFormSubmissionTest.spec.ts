import { test, expect } from "../../fixtures/pageFixtures";
import testData from "../../testdata/RRFormTestData/rrform_path1_testdata.json"
import * as path from "path";
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




/**
 * Hook to set the test file name dynamically before running all tests.
 * This function extracts the base file name (without extension) from the current test file
 * and uses it to set the file name for logging. This ensures that logs are written to a
 * file specific to the current test file.
 */
test.beforeAll(async () => {
  const testFileName = path.basename(__filename, path.extname(__filename));
  setTestFileName(testFileName);
});

/**
 * Hook to navigate to the base URL before each test.
 * This function is called before each test runs and ensures that the browser is navigated
 * to the specified URL. It uses the `process.env.URL` environment variable to determine
 * the URL to navigate to, ensuring that the tests start from a known state.
 *
 * @param {Object} params - The parameters for the hook.
 * @param {Object} params.page - The Playwright Page object used to interact with the browser.
 * @param {Object} params.loginPage - Page object for the login page.
 * @param {Object} params.homePage - Page object for the home page.
 */
test.beforeEach(async ({ page,intellaFOLoginPage }) => {
  await logStep("logging into intell Fo as HM", async () => {
    await intellaFOLoginPage.loginToIntellaFO(process.env.HRBP_USER_NAME ?? "",
    process.env.HRBP_PASSWORD ?? "",
    );
  });
});

/**
 * Hook to finalize the log file after all tests have run.
 * This function is called after all tests are completed and ensures that the log file is
 * properly closed and finalized. It is used to ensure that all log entries are written
 * to the file and no data is lost.
 */
test.afterAll(async () => {
  finalizeLogFile(); // Finalize the log file after all tests
});

test('RRFrom Submission Test', async ({ page,rasHomePage,rASRegularRecruitmentForm}) => {
  await rasHomePage.openRegularRecruitmentForm();
  await page.waitForTimeout(2000);

       await logStep("fillBasicInformation", async () => {
         await rASRegularRecruitmentForm.fillBasicInformation(testData.inputData.vaccancy_announcement_duration_in_days ?? "",
         testData.inputData.batch_recruitment ?? "",
         testData.inputData.position_number ?? "",
         testData.inputData.position_numbers ?? [],
         );
       });

       await logStep("fillContactsInformation", async () => {
         await rASRegularRecruitmentForm.fillContactsInformation(
         testData.inputData.primary_contact ?? "",
         testData.inputData.hr_manager ?? "",
         testData.inputData.hiring_manager ?? "",
         );
       });

       await logStep("fillVAJobSpecification", async () => {
         await rASRegularRecruitmentForm.fillVAJobSpecification(
         testData.inputData.batch_recruitment ?? "",
         testData.inputData.contract_duration_months ?? "",
         testData.inputData.areas_of_education ?? "",
         testData.inputData.areas_of_work ?? ""
         );
       });

       await logStep("fillVAMinimumRequirementsDesirables", async () => {
         await rASRegularRecruitmentForm.fillVAMinimumRequirementsDesirables(
         testData.inputData.tagline_for_every_child ?? ""
         );
       });

       await logStep("fillFullVacancyAnnouncementText", async () => {
         await rASRegularRecruitmentForm.fillFullVacancyAnnouncementText();
       });

       await logStep("submitting RR Form", async () => {
         await rASRegularRecruitmentForm.submitForm();
       });

       const jprNumber = await rASRegularRecruitmentForm.printGeneratedJPRInConsole();
       
       await logStep("priniting the generated JPR Number ", async () => {
        await rASRegularRecruitmentForm.printGeneratedJPRInConsole()
      });

      saveDataToFile(testData.inputData.position_number ?? "",jprNumber ?? "");
      await page.waitForTimeout(100000000);

});