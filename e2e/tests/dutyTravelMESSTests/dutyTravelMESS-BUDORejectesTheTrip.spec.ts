import { test, expect } from "../../fixtures/pageFixtures";
import testData from "../../testdata/dutyTravelMESS/dutyTravelMESS_rejectBUDO.json";
import * as path from "path";
import { readJsonFile, writeJsonFile } from "../../utils/jsonUtils";
import {
  setTestFileName,
  logTestStart,
  logStep,
  finalizeLogFile,
} from "../../utils/logger";

/**
 * Define the JSON file path to write the updated trip number to the JSON.
 */
const jsonFilePath = path.resolve(
  __dirname,
  "../../testdata/dutyTravelMESS/dutyTravelMESS_rejectBUDO.json",
);

/**
 * Importing duty travel methods from the dutyTravelMESSTests_workflowUtil module.
 */
import {
  approveTrip,
  planTrip,
  postTrip,
  rejectTrip,
  submitTrip,
} from "../../utils/dutyTravelMESSTests_workflowUtil";
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
test.beforeEach(async ({ page, loginPage, homePage }) => {
  await page.goto(process.env.URL ?? "");
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

/**
 * Test: Verifying whether BUDO is able to reject the trip submitted by the Traveller.
 */
test("BUDO Rejects the Trip", async ({
  page,
  loginPage,
  homePage,
//   tripListViewPage,
//   tripApprovalListViewPage,
  createTripPage,
  headerBarComponent,
}) => {
  await logTestStart("BUDO Rejects the Trip");

  await logStep("Login as Traveller", async () => {
    await loginPage.loginToApplication(
      process.env.TRAVELLER_USERID ?? "",
      process.env.TRAVELLER_PASSWORD ?? "",
    );
  });

  await logStep("Navigate to Trip List View", async () => {
    await homePage.navigateToTripListView();
  });

//   const {
//     departureDate: departureDate1,
//     tripBeginDate: tripBeginDate1,
//     arrivalDate: arrivalDate1,
//   } = await logStep(
//     "Generate Trip Dates",
//     async () => await tripListViewPage.generateTripDates(),
//   );

//   await logStep(
//     "Click Create Button",
//     async () => await tripListViewPage.clickCreateButton(),
//   );

  const { tripNumber, tripStatus } = await logStep(
    "Plan Trip",
    async () =>
      await planTrip(
        page,
        loginPage,
        homePage,
//         tripListViewPage,
        createTripPage,
        testData,
        departureDate1,
        arrivalDate1,
        tripBeginDate1,
      ),
  );

  testData.tripData = {
    tripNumber: await tripNumber,
    tripStatus: await tripStatus,
  };

  await logStep("Write Test Data to JSON", async () =>
    writeJsonFile(jsonFilePath, testData),
  );

  await logStep("Click Edit Button", async () => {
    await createTripPage.clickEditbutton();
    await page.waitForTimeout(5000);
  });

  // Set default value for UPLOAD_ENABLED to true if not defined
  const uploadEnabled = process.env.UPLOAD_ENABLED !== "false";

  // Check the environment variable before calling uploadAttachment
  if (uploadEnabled) {
    await createTripPage.uploadAttachment(testData);
  }
  await logStep("Click Submit Approval", async () => {
    await createTripPage.clickSubmitApproval();
    await page.waitForTimeout(5000);
  });

  const updated_TripStatus = await logStep(
    "Get Updated Trip Status",
    async () => createTripPage.getTripStatus(),
  );
  console.log("Updated Trip Status: ", await updated_TripStatus);

  await expect(await updated_TripStatus).toBe("Submitted");
  await page.waitForTimeout(5000);

  await logStep("Logout as Traveller", async () => {
    await headerBarComponent.logout();
    await page.waitForTimeout(15000);
  });

  await logStep("Login as BUDO", async () => {
    await page.goto(process.env.URL ?? "");
    await loginPage.loginToApplication(
      process.env.BUDO_USERID ?? "",
      process.env.BUDO_PASSWORD ?? "",
    );
  });

  await logStep("Navigate to Trip Approver View", async () => {
    await homePage.navigateToTripApproverView();
  });

  await logStep("Reject Trip", async () => {
    await rejectTrip(
      page,
      loginPage,
      homePage,
//       tripApprovalListViewPage,
      testData,
      "1",
    );
  });
});
