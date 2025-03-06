import * as path from "path";
import { test, expect } from "../fixtures/pageFixtures";
import { readJsonFile, writeJsonFile } from "./jsonUtils";

// Path to the JSON file
const jsonFilePath = path.resolve(__dirname, "../testdata/dutyTravelMESS.json");

export async function planTrip(
  page,
  loginPage,
  homePage,
  tripListViewPage,
  createTripPage,
  testData,
  departureDate,
  arrivalDate,
  tripBeginDate,
) {
  await createTripPage.enterTripDetails(testData, departureDate, arrivalDate);
  await createTripPage
    .getFooterBarComponent()
    .validateWorkflowButtons([
      "Submit for Approval",
      "Save as Planned",
      "Cancel",
    ]);
  await createTripPage.enterCostAssignment(testData);
  await createTripPage.enterExpensesDetails(testData);
  await createTripPage.enterDestinationDetails(testData, tripBeginDate);
  await createTripPage.enterDeductionDetails();
  await createTripPage.clickSavePlanned();
  await page.waitForTimeout(10000);
  const tripNumber = createTripPage.getTripNumber();
  const tripStatus = createTripPage.getTripStatus();
  console.log(
    "Trip Number generated after clicking on Save as Planned:",
    await tripNumber,
  );
  console.log(
    "Trip Status after clicking on Save as Planned:",
    await tripStatus,
  );
  await expect(await tripStatus).toBe("Planned");
  return { tripNumber, tripStatus };
}

export async function planTrip_Doc_type_ZT(
  page,
  loginPage,
  homePage,
  tripListViewPage,
  createTripPage,
  testData,
  departureDate,
  arrivalDate,
  tripBeginDate,
) {
  await createTripPage.enterTripDetailsWithoutPersonalDetails(testData, departureDate, arrivalDate);
  await createTripPage
    .getFooterBarComponent()
    .validateWorkflowButtons([
      "Submit for Approval",
      "Save as Planned",
      "Cancel",
    ]);
  await createTripPage.enterCostAssignment(testData);
  await page.waitForTimeout(3000);
  await createTripPage.clickSavePlanned();
  await page.waitForTimeout(3000);
  await createTripPage.getCostAssignmentError_ZFI_NON_PAYRL_NON_SC_4();
  await createTripPage.reEnterCostAssignment(testData);
  await createTripPage.clickSavePlanned();
  await page.waitForTimeout(10000);
  const tripNumber = createTripPage.getTripNumber();
  const tripStatus = createTripPage.getTripStatus();
  console.log(
    "Trip Number generated after clicking on Save as Planned:",
    await tripNumber,
  );
  console.log(
    "Trip Status after clicking on Save as Planned:",
    await tripStatus,
  );
  await expect(await tripStatus).toBe("Planned");
  return { tripNumber, tripStatus };
}


export async function planTripWithoutCostAssignment(
  page,
  loginPage,
  homePage,
  tripListViewPage,
  createTripPage,
  testData,
  departureDate,
  arrivalDate,
  tripBeginDate,
) {
  await createTripPage.enterTripDetailsWithoutPersonalDetails(testData, departureDate, arrivalDate);
  await createTripPage
    .getFooterBarComponent()
    .validateWorkflowButtons([
      "Submit for Approval",
      "Save as Planned",
      "Cancel",
    ]);
  // await createTripPage.enterCostAssignment(testData);
  // await page.waitForTimeout(3000);
  await createTripPage.clickSavePlanned();
  await page.waitForTimeout(5000);
  await createTripPage.getDefaultCostAssingmentError();
  await createTripPage.enterCostAssignment(testData);
  await createTripPage.clickSavePlanned();
  await page.waitForTimeout(10000);
  const tripNumber = createTripPage.getTripNumber();
  const tripStatus = createTripPage.getTripStatus();
  console.log(
    "Trip Number generated after clicking on Save as Planned:",
    await tripNumber,
  );
  console.log(
    "Trip Status after clicking on Save as Planned:",
    await tripStatus,
  );
  await expect(await tripStatus).toBe("Planned");
  return { tripNumber, tripStatus };
}


export async function ZFI_NON_PAYRL_NON_SC_4(
  page,
  loginPage,
  homePage,
  tripListViewPage,
  createTripPage,
  testData,
  departureDate,
  arrivalDate,
  tripBeginDate,
) {
  await createTripPage.enterTripDetailsWithoutPersonalDetails(testData, departureDate, arrivalDate);
  await createTripPage
    .getFooterBarComponent()
    .validateWorkflowButtons([
      "Submit for Approval",
      "Save as Planned",
      "Cancel",
    ]);
  await createTripPage.enterCostAssignment(testData);
  await page.waitForTimeout(3000);
  await createTripPage.clickSavePlanned();
  await page.waitForTimeout(3000);
  await createTripPage.getCostAssignmentError_ZFI_NON_PAYRL_NON_SC_4();
  await createTripPage.reEnterCostAssignment(testData);
  await createTripPage.clickSavePlanned();
  await page.waitForTimeout(10000);
  const tripNumber = createTripPage.getTripNumber();
  const tripStatus = createTripPage.getTripStatus();
  console.log(
    "Trip Number generated after clicking on Save as Planned:",
    await tripNumber,
  );
  console.log(
    "Trip Status after clicking on Save as Planned:",
    await tripStatus,
  );
  await expect(await tripStatus).toBe("Planned");
  return { tripNumber, tripStatus };
}




export async function planTrip_ZFI_NON_PAYRL_SC_3(
  page,
  loginPage,
  homePage,
  tripListViewPage,
  createTripPage,
  testData,
  departureDate,
  arrivalDate,
  tripBeginDate,
) {
  await createTripPage.enterTripDetailsWithoutPersonalDetails(testData, departureDate, arrivalDate);
  await createTripPage
    .getFooterBarComponent()
    .validateWorkflowButtons([
      "Submit for Approval",
      "Save as Planned",
      "Cancel",
    ]);
  await createTripPage.enterCostAssignment(testData);
 // await createTripPage.enterExpensesDetails(testData);
  //await createTripPage.enterDestinationDetails(testData, tripBeginDate);
  //await createTripPage.enterDeductionDetails();
  await createTripPage.clickSavePlanned();
  await page.waitForTimeout(3000);
  await createTripPage.getCostAssignmentError_ZFI_PAYRL_SC_3();
  await createTripPage.reEnterCostAssignment(testData);
  await createTripPage.clickSavePlanned();
  await page.waitForTimeout(10000);
  const tripNumber = createTripPage.getTripNumber();
  const tripStatus = createTripPage.getTripStatus();
  console.log(
    "Trip Number generated after clicking on Save as Planned:",
    await tripNumber,
  );
  console.log(
    "Trip Status after clicking on Save as Planned:",
    await tripStatus,
  );
  await expect(await tripStatus).toBe("Planned");
  return { tripNumber, tripStatus };
}


export async function submitTrip(
  page,
  loginPage,
  homePage,
  tripListViewPage,
  tripDetailsviewPage,
  createTripPage,
  footerBarComponent,
  testData,
) {
  await tripListViewPage.clickTripNumber(testData);
  await createTripPage.clickEditbutton();
  const tripNumber = await testData.tripData.tripNumber;
  await page.waitForTimeout(10000);
  await createTripPage
    .getFooterBarComponent()
    .validateWorkflowButtons([
      "Submit for Approval",
      "Save as Planned",
      "Cancel",
    ]);

  // Set default value for UPLOAD_ENABLED to true if not defined
  const uploadEnabled = process.env.UPLOAD_ENABLED !== "false";

  // Check the environment variable before calling uploadAttachment
  if (uploadEnabled) {
    await createTripPage.uploadAttachment(testData);
  }

  // //Delete Additional Destination and Add again
  // await tripDetailsviewPage.deleteAdditonalDestination();
  // await page.waitForTimeout(3000);
  // await tripDetailsviewPage.clickSaveButton();
  // await tripDetailsviewPage.getAdditionalDestinationError();
  // await page.waitForTimeout(3000);
  // await tripDetailsviewPage.enterDestinationDetails(
  //   testData,
  //   testData.dates.tripBeginDate,
  // );
  await tripDetailsviewPage.clickSaveButton();
  await page.waitForTimeout(5000);
  await createTripPage.clickEditbutton();
  await page.waitForTimeout(10000);
  await createTripPage.clickSubmitApproval();
  await page.waitForTimeout(15000);
  const updated_TripStatus = createTripPage.getTripStatus();
  console.log(
    "Trip Status after clicking on Submit for Approval",
    await updated_TripStatus,
  );

  testData.tripData = {
    tripNumber: await tripNumber,
    tripStatus: await updated_TripStatus,
  };
  await expect(await updated_TripStatus).toBe("Submitted");
}

export async function submit_MultipleCostAssignments(
  page,
  loginPage,
  homePage,
  tripListViewPage,
  createTripPage,
  testData,
  departureDate,
  arrivalDate,
  tripBeginDate,
) {
  await createTripPage.enterTripDetails(testData, departureDate, arrivalDate);
  await createTripPage
    .getFooterBarComponent()
    .validateWorkflowButtons([
      "Submit for Approval",
      "Save as Planned",
      "Cancel",
    ]);
  await createTripPage.enterMultipleCostAssignment(testData);
  await createTripPage.enterExpensesDetails(testData);
  await createTripPage.enterDestinationDetails(testData, tripBeginDate);
  await createTripPage.enterDeductionDetails();
  await createTripPage.clickSavePlanned();
  await page.waitForTimeout(15000);
  const tripNumber = createTripPage.getTripNumber();
  const tripStatus = createTripPage.getTripStatus();
  console.log(
    "Trip Number generated after clicking on Save as Planned:",
    await tripNumber,
  );

  console.log(
    "Trip Status after clicking on Save as Planned:",
    await tripStatus,
  );
  await expect(await tripStatus).toBe("Planned");
  await createTripPage.clickEditbutton();
  await page.waitForTimeout(10000);
  await createTripPage
    .getFooterBarComponent()
    .validateWorkflowButtons([
      "Submit for Approval",
      "Save as Planned",
      "Cancel",
    ]);

  // Set default value for UPLOAD_ENABLED to true if not defined
  const uploadEnabled = process.env.UPLOAD_ENABLED !== "false";

  // Check the environment variable before calling uploadAttachment
  if (uploadEnabled) {
    await createTripPage.uploadAttachment(testData);
  }
  await createTripPage.clickSubmitApproval();

  const updated_TripStatus = createTripPage.getTripStatus();
  console.log(
    "Trip Status after clicking on Submit for Approval",
    await updated_TripStatus,
  );

  expect(await updated_TripStatus).toBe("Submitted");
  return { tripNumber, tripStatus };
}

export async function submit_TOB(
  page,
  loginPage,
  homePage,
  tripListViewPage,
  createTripPage,
  tripDetailsviewPage,
  testData,
  departureDate,
  arrivalDate,
  tripBeginDate,
) {
  await createTripPage.enterTripDetails(testData, departureDate, arrivalDate);
  await createTripPage
    .getFooterBarComponent()
    .validateWorkflowButtons([
      "Submit for Approval",
      "Save as Planned",
      "Cancel",
    ]);
  await createTripPage.enterCostAssignment(testData);
  await createTripPage.enterExpensesDetails(testData);
  await createTripPage.enterDestinationDetails(testData, tripBeginDate);
  await createTripPage.enterDeductionDetails();
  await createTripPage.clickSavePlanned();
  await page.waitForTimeout(15000);
  const tripNumber = createTripPage.getTripNumber();
  const tripStatus = createTripPage.getTripStatus();
  console.log(
    "Trip Number generated after clicking on Save as Planned:",
    await tripNumber,
  );

  console.log(
    "Trip Status after clicking on Save as Planned:",
    await tripStatus,
  );
  await expect(await tripStatus).toBe("Planned");
  await createTripPage.clickEditbutton();
  await page.waitForTimeout(10000);
  await createTripPage
    .getFooterBarComponent()
    .validateWorkflowButtons([
      "Submit for Approval",
      "Save as Planned",
      "Cancel",
    ]);
  // Set default value for UPLOAD_ENABLED to true if not defined
  const uploadEnabled = process.env.UPLOAD_ENABLED !== "false";
  // Check the environment variable before calling uploadAttachment
  if (uploadEnabled) {
    await createTripPage.uploadAttachment(testData);
  }
  
  await page.waitForTimeout(10000);
  await createTripPage.clickSubmitApproval();

  //TestMerge

  const updated_TripStatus = createTripPage.getTripStatus();
  console.log(
    "Trip Status after clicking on Submit for Approval",
    await updated_TripStatus,
  );

  expect(await updated_TripStatus).toBe("Submitted");
  return { tripNumber, tripStatus };
}

export async function approveTrip(
  page,
  loginPage,
  homePage,
  tripApprovalListViewPage,
  testData,
  phase: string,
) {
  await tripApprovalListViewPage.searchTripNumber(testData);
  await tripApprovalListViewPage.selectTripCheckBox();
  const tripPhase = await tripApprovalListViewPage.getTripPhase();
  console.log("Trip Phase :", tripPhase);
  await expect(await tripPhase).toBe(phase);
  const workFlowStatus = await tripApprovalListViewPage.getWorkFlowStatus();
  console.log("Work Status :", workFlowStatus);
  await expect(await workFlowStatus).toBe("BUDO");
  await tripApprovalListViewPage.clickOnApproveButton();
  await tripApprovalListViewPage.enterNote(testData);
  await tripApprovalListViewPage.clickOnSubmitButton();
  await page.waitForTimeout(5000);
  await tripApprovalListViewPage.clickOnOkButton();
}

export async function approveTrip_MultiBUDO(
  page,
  loginPage,
  headerBarComponent,
  homePage,
  tripApprovalListViewPage,
  testData,
  phase: string,
) {
  await loginPage.loginToApplication(
    process.env.BUDO_USERID ?? "",
    process.env.BUDO_PASSWORD ?? "",
  );

  await homePage.navigateToTripApproverView();
  await tripApprovalListViewPage.searchTripNumber(testData);
  await tripApprovalListViewPage.selectTripCheckBox();
  const tripPhase = await tripApprovalListViewPage.getTripPhase();
  console.log("Trip Phase :", tripPhase);
  await expect(await tripPhase).toBe(phase);
  const workFlowStatus = await tripApprovalListViewPage.getWorkFlowStatus();
  console.log("Work Status :", workFlowStatus);

  await expect(await workFlowStatus).toBe("BUDO");
  await tripApprovalListViewPage.clickOnApproveButton();
  await tripApprovalListViewPage.enterNote(testData);
  await tripApprovalListViewPage.clickOnSubmitButton();
  await page.waitForTimeout(10000);
  await tripApprovalListViewPage.clickOnErrorMessage();
  await headerBarComponent.logout();
  await page.waitForTimeout(5000);
  await page.goto(process.env.URL ?? "");
  await loginPage.loginToApplication(
    process.env.BUDO_USERID1 ?? "",
    process.env.BUDO_PASSWORD1 ?? "",
  );
  await homePage.navigateToTripApproverView();
  await tripApprovalListViewPage.searchTripNumber(testData);
  await tripApprovalListViewPage.selectTripCheckBox();
  const tripPhase1 = await tripApprovalListViewPage.getTripPhase();
  console.log("Trip Phase :", tripPhase1);
  await expect(await tripPhase1).toBe(phase);
  const workFlowStatus1 = await tripApprovalListViewPage.getWorkFlowStatus();
  console.log("Work Status :", workFlowStatus1);
  await expect(await workFlowStatus1).toBe("BUDO");
  await tripApprovalListViewPage.clickOnApproveButton();
  await tripApprovalListViewPage.enterNote(testData);
  await tripApprovalListViewPage.clickOnSubmitButton();
  await page.waitForTimeout(10000);
  await tripApprovalListViewPage.clickOnOkButton();
}

export async function rejectTrip(
  page,
  loginPage,
  homePage,
  tripApprovalListViewPage,
  testData,
  phase: string,
) {
  await tripApprovalListViewPage.searchTripNumber(testData);
  await tripApprovalListViewPage.selectTripCheckBox();
  const tripPhase = await tripApprovalListViewPage.getTripPhase();
  console.log("Trip Phase :", tripPhase);
  await expect(await tripPhase).toBe(phase);
  const workFlowStatus = await tripApprovalListViewPage.getWorkFlowStatus();
  console.log("Work Status :", workFlowStatus);
  await expect(await workFlowStatus).toBe("BUDO");
  await tripApprovalListViewPage.clickOnRejectButton();
  await tripApprovalListViewPage.enterNote(testData);
  await tripApprovalListViewPage.clickOnSubmitButton();
  await page.waitForTimeout(5000);
  await tripApprovalListViewPage.clickOnOkButton();
}

export async function postTrip(
  page,
  loginPage,
  homePage,
  tripApprovalListViewPage,
  headerBarComponent,
  testData,
  phase: string,
) {
  await tripApprovalListViewPage.searchTripNumber(testData);
  await tripApprovalListViewPage.selectTripCheckBox();
  const tripPhase = await tripApprovalListViewPage.getTripPhase();
  console.log("Trip Phase :", tripPhase);
  await expect(await tripPhase).toBe(phase);
  const workFlowStatus = await tripApprovalListViewPage.getWorkFlowStatus();
  console.log("Work Status :", workFlowStatus);
  await expect(await workFlowStatus).toBe("TRAA");
  await tripApprovalListViewPage.clickOnPostButton();
  await tripApprovalListViewPage.clickOnSubmitButton();
  await page.waitForTimeout(5000);
  await tripApprovalListViewPage.clickOnOkButton();
  //await tripApprovalListViewPage.clickTripNumber(testData);
  const tripStatus = tripApprovalListViewPage.getTripStatus();
  console.log("Trip Status: ", await tripStatus);
  await expect(await tripStatus).toBe("Posted");
}


export async function postTripByModifyingDestination(
  page,
  loginPage,
  homePage,
  tripApprovalListViewPage,
  headerBarComponent,
  createTripPage,
  tripDetailsviewPage,
  testData,
  phase: string,
) {
  await tripApprovalListViewPage.searchTripNumber(testData);
  await tripApprovalListViewPage.selectTripCheckBox();
  const tripPhase = await tripApprovalListViewPage.getTripPhase();
  console.log("Trip Phase :", tripPhase);
  await expect(await tripPhase).toBe(phase);
  const workFlowStatus = await tripApprovalListViewPage.getWorkFlowStatus();
  console.log("Work Status :", workFlowStatus);
  await expect(await workFlowStatus).toBe("TRAA");
  await tripApprovalListViewPage.clickTripNumber();
  await page.waitForTimeout(10000);
  await createTripPage.clickEditbutton();
  await page.waitForTimeout(10000);
  await tripDetailsviewPage.deleteAdditonalDestination();
  await tripDetailsviewPage.editDestinationDetails(testData, testData.dates.tripBeginDate);
  await page.waitForTimeout(5000);  
  await headerBarComponent.clickHomeButton();
  await page.waitForTimeout(5000);
  await homePage.navigateToTripApproverView();
  await tripApprovalListViewPage.searchTripNumber(testData);
  await tripApprovalListViewPage.selectTripCheckBox();   
  await tripApprovalListViewPage.clickOnPostButton();
  await tripApprovalListViewPage.clickOnSubmitButton();
  await page.waitForTimeout(10000);
  await tripApprovalListViewPage.clickOnOkButton();
  //await tripApprovalListViewPage.clickTripNumber(testData);
  const tripStatus = tripApprovalListViewPage.getTripStatus();
  console.log("Trip Status: ", await tripStatus);
  await expect(await tripStatus).toBe("Posted");
}


export async function rejectTripTRAA(
  page,
  loginPage,
  homePage,
  tripApprovalListViewPage,
  headerBarComponent,
  testData,
  phase: string,
) {
  await tripApprovalListViewPage.searchTripNumber(testData);
  await tripApprovalListViewPage.selectTripCheckBox();
  const tripPhase = await tripApprovalListViewPage.getTripPhase();
  console.log("Trip Phase :", tripPhase);
  await expect(await tripPhase).toBe(phase);
  const workFlowStatus = await tripApprovalListViewPage.getWorkFlowStatus();
  console.log("Work Status:", workFlowStatus);
  await expect(await workFlowStatus).toBe("TRAA");
  await tripApprovalListViewPage.clickOnRejectButton();
  await tripApprovalListViewPage.enterNote(testData);
  await tripApprovalListViewPage.clickOnSubmitButton();
  await page.waitForTimeout(5000);
  await tripApprovalListViewPage.clickOnOkButton();
  //await tripApprovalListViewPage.clickTripNumber(testData);
}

export async function submitTripWithoutExpense(
  page,
  loginPage,
  homePage,
  tripListViewPage,
  createTripPage,
  testData,
  departureDate,
  arrivalDate,
  tripBeginDate,
) {
  await createTripPage.enterTripDetails(testData, departureDate, arrivalDate);
  await createTripPage
    .getFooterBarComponent()
    .validateWorkflowButtons([
      "Submit for Approval",
      "Save as Planned",
      "Cancel",
    ]);
  await createTripPage.enterCostAssignment(testData);
  await createTripPage.enterDestinationDetails(testData, tripBeginDate);
  await createTripPage.enterDeductionDetails();
  await createTripPage.clickSavePlanned();
  await page.waitForTimeout(15000);
  const tripNumber = createTripPage.getTripNumber();
  let tripStatus = createTripPage.getTripStatus();
  console.log(
    "Trip Number generated after clicking on Save as Planned:",
    await tripNumber,
  );

  console.log(
    "Trip Status after clicking on Save as Planned:",
    await tripStatus,
  );
  await expect(await tripStatus).toBe("Planned");
  // Click Edit button
  await createTripPage.clickEditbutton();
  await page.waitForTimeout(5000);
  // // Set default value for UPLOAD_ENABLED to true if not defined
  const uploadEnabled = process.env.UPLOAD_ENABLED !== "false";

  // Check the environment variable before calling uploadAttachment
  if (uploadEnabled) {
    await createTripPage.uploadAttachment(testData);
  }
  // Click Submit Approval
  await createTripPage.clickSubmitApproval();
  await page.waitForTimeout(5000);
  tripStatus = createTripPage.getTripStatus();
  await expect(await tripStatus).toBe("Submitted");
  return { tripNumber, tripStatus };
}

export async function postTripWithSingleExpense(
  page,
  loginPage,
  homePage,
  createTripPage,
  tripApprovalListViewPage,
  headerBarComponent,
  tripListViewPage,
  tripDetailsviewPage,
  testData,
  phase: string,
) {
  await tripApprovalListViewPage.searchTripNumber(testData);
  await tripApprovalListViewPage.selectTripCheckBox();
  const tripPhase = await tripApprovalListViewPage.getTripPhase();
  console.log("Trip Phase :", tripPhase);
  await expect(await tripPhase).toBe(phase);
  const workFlowStatus = await tripApprovalListViewPage.getWorkFlowStatus();
  console.log("Work Status :", workFlowStatus);
  await expect(await workFlowStatus).toBe("TRAA");
  await tripListViewPage.clickTripNumber(testData);
  await createTripPage.clickEditbutton();
  await tripDetailsviewPage.enterSingleExpensesDetails(testData);
  await tripDetailsviewPage.clickSaveButton();
  await page.waitForTimeout(30000);
  await tripDetailsviewPage.checkCurrencyValuesForSingleExpense();
  await tripDetailsviewPage.validateAmountsForSingleExpense();  
  await createTripPage.clickEditbutton();
  await page.waitForTimeout(10000);
  await tripDetailsviewPage.editSingleExpenseEntryBeforePost(testData);
  await tripDetailsviewPage.clickSaveButton();
  await page.waitForTimeout(30000);
  await tripDetailsviewPage.checkCurrencyValuesForSingleExpense();
  await tripDetailsviewPage.validateAmountsForSingleExpense(); 
  await headerBarComponent.clickHomeButton();
  await page.waitForTimeout(5000);
  await homePage.navigateToTripApproverView();
  await tripApprovalListViewPage.searchTripNumber(testData);
  await tripApprovalListViewPage.selectTripCheckBox();
  await tripApprovalListViewPage.clickOnPostButton();
  await tripApprovalListViewPage.clickOnSubmitButton();
  await page.waitForTimeout(10000);
  await tripApprovalListViewPage.clickOnOkButton();
}

export async function postTripWithMultipleExpense(
  page,
  loginPage,
  homePage,
  createTripPage,
  tripApprovalListViewPage,
  headerBarComponent,
  tripListViewPage,
  tripDetailsviewPage,
  testData,
  phase: string,
) {
  await tripApprovalListViewPage.searchTripNumber(testData);
  await tripApprovalListViewPage.selectTripCheckBox();
  const tripPhase = await tripApprovalListViewPage.getTripPhase();
  console.log("Trip Phase :", tripPhase);
  await expect(await tripPhase).toBe(phase);
  const workFlowStatus = await tripApprovalListViewPage.getWorkFlowStatus();
  console.log("Work Status :", workFlowStatus);
  await expect(await workFlowStatus).toBe("TRAA");
  await tripListViewPage.clickTripNumber(testData);
  await createTripPage.clickEditbutton();
  await tripDetailsviewPage.enterMultipleExpensesDetails(testData);
  await tripDetailsviewPage.clickSaveButton();
  await page.waitForTimeout(30000);
  await tripDetailsviewPage.checkCurrencyValuesForMultipleExpense();
  await tripDetailsviewPage.validateAmountsForMultipleExpense();
  await createTripPage.clickEditbutton();
  await tripDetailsviewPage.editMultipleExpenseEntryBeforePost(testData);
  await tripDetailsviewPage.clickSaveButton();
  await page.waitForTimeout(30000);
  await tripDetailsviewPage.checkCurrencyValuesForMultipleExpense();
  await tripDetailsviewPage.validateAmountsForMultipleExpense();
  await headerBarComponent.clickHomeButton();
  await page.waitForTimeout(5000);
  await homePage.navigateToTripApproverView();
  await tripApprovalListViewPage.searchTripNumber(testData);
  await tripApprovalListViewPage.selectTripCheckBox();
  await tripApprovalListViewPage.clickOnRejectButton();
  await tripApprovalListViewPage.clickOnSubmitButton();
  await page.waitForTimeout(5000);
  await tripApprovalListViewPage.clickOnOkButton();
}

export async function addExpenseAfterPosting(
  page,
  tripApprovalListViewPage,
  tripListViewPage,
  createTripPage,
  tripDetailsviewPage,
  headerBarComponent,
  homePage,
  testData,
) {
  await tripApprovalListViewPage.searchTripNumber(testData);
  await tripApprovalListViewPage.selectTripCheckBox();
  await tripListViewPage.clickTripNumber(testData);
  await createTripPage.clickEditbutton();
  await tripDetailsviewPage.enterExpensesAfterPost(testData);
  await tripDetailsviewPage.clickSaveButton();
  await page.waitForTimeout(30000);
  await tripDetailsviewPage.checkCurrencyValuesForExpenseAfterPosting();
  await tripDetailsviewPage.validateAmountsForSingleExpenseAfterPost();
  await createTripPage.clickEditbutton();
  await tripDetailsviewPage.editExpensesAfterPost(testData);
  await tripDetailsviewPage.clickSaveButton();
  await page.waitForTimeout(30000);
  await tripDetailsviewPage.checkCurrencyValuesForExpenseAfterPosting();
  await tripDetailsviewPage.validateAmountsForSingleExpenseAfterPost();

}

export async function postTripWithExpenseInPhase2(
  page,
  loginPage,
  homePage,
  createTripPage,
  tripApprovalListViewPage,
  headerBarComponent,
  tripListViewPage,
  tripDetailsviewPage,
  testData,
  phase: string,
) {
  await tripApprovalListViewPage.searchTripNumber(testData);
  await tripApprovalListViewPage.selectTripCheckBox();
  const tripPhase = await tripApprovalListViewPage.getTripPhase();
  console.log("Trip Phase :", tripPhase);
  await expect(await tripPhase).toBe(phase);
  const workFlowStatus = await tripApprovalListViewPage.getWorkFlowStatus();
  console.log("Work Status :", workFlowStatus);
  await expect(await workFlowStatus).toBe("TRAA");
  await tripListViewPage.clickTripNumber(testData);
  await createTripPage.clickEditbutton();
  await tripDetailsviewPage.enterExpensesAfterPost(testData);
  await tripDetailsviewPage.clickSaveButton();
  await page.waitForTimeout(30000);
  await tripDetailsviewPage.checkCurrencyValuesForExpenseAfterPosting();
  await tripDetailsviewPage.validateAmountsForSingleExpenseAfterPost();
  await createTripPage.clickEditbutton();
  await tripDetailsviewPage.editExpensesAfterPost(testData);
  await tripDetailsviewPage.clickSaveButton();
  await page.waitForTimeout(30000);
  await tripDetailsviewPage.checkCurrencyValuesForExpenseAfterPosting();
  await tripDetailsviewPage.validateAmountsForSingleExpenseAfterPost();
  await headerBarComponent.clickHomeButton();
  await page.waitForTimeout(5000);
  await homePage.navigateToTripApproverView();
  await tripApprovalListViewPage.searchTripNumber(testData);
  await tripApprovalListViewPage.selectTripCheckBox();
  await tripApprovalListViewPage.clickOnPostButton();
  await tripApprovalListViewPage.clickOnSubmitButton();
  await page.waitForTimeout(5000);
  await tripApprovalListViewPage.clickOnOkButton();
}

export async function postTripWithoutTaboutSingleExpense(
  page,
  loginPage,
  homePage,
  createTripPage,
  tripApprovalListViewPage,
  headerBarComponent,
  tripListViewPage,
  tripDetailsviewPage,
  testData,
  phase: string,
) {
  await tripApprovalListViewPage.searchTripNumber(testData);
  await tripApprovalListViewPage.selectTripCheckBox();
  const tripPhase = await tripApprovalListViewPage.getTripPhase();
  console.log("Trip Phase :", tripPhase);
  await expect(await tripPhase).toBe(phase);
  const workFlowStatus = await tripApprovalListViewPage.getWorkFlowStatus();
  console.log("Work Status :", workFlowStatus);
  await expect(await workFlowStatus).toBe("TRAA");
  await tripListViewPage.clickTripNumber(testData);
  await createTripPage.clickEditbutton();
  await tripDetailsviewPage.enterSingleExpensesDetailsWithoutTabout(testData);
  await tripDetailsviewPage.clickSaveButton();
  await page.waitForTimeout(30000);
  await tripDetailsviewPage.compareAmounts();
  await tripDetailsviewPage.checkCurrencyValuesForSingleExpense();
  await tripDetailsviewPage.validateAmountsForSingleExpense();    
  await headerBarComponent.clickHomeButton();
  await page.waitForTimeout(5000);
  await homePage.navigateToTripApproverView();
  await tripApprovalListViewPage.searchTripNumber(testData);
  await tripApprovalListViewPage.selectTripCheckBox();
  await tripApprovalListViewPage.clickOnRejectButton();
  await tripApprovalListViewPage.clickOnSubmitButton();
  await page.waitForTimeout(5000);
  await tripApprovalListViewPage.clickOnOkButton();

}


export async function postTripWithMiscExpenseInPhase2(
  page,
  loginPage,
  homePage,
  createTripPage,
  tripApprovalListViewPage,
  headerBarComponent,
  tripListViewPage,
  tripDetailsviewPage,
  testData,
  phase: string,
) {
  await tripApprovalListViewPage.searchTripNumber(testData);
  await tripApprovalListViewPage.selectTripCheckBox();
  const tripPhase = await tripApprovalListViewPage.getTripPhase();
  console.log("Trip Phase :", tripPhase);
  await expect(await tripPhase).toBe(phase);
  const workFlowStatus = await tripApprovalListViewPage.getWorkFlowStatus();
  console.log("Work Status :", workFlowStatus);
  await expect(await workFlowStatus).toBe("TRAA");
  await tripListViewPage.clickTripNumber(testData);
  await createTripPage.clickEditbutton();
  await createTripPage.enterMiscExpensesDetails("50.01", "USD");
  await tripDetailsviewPage.clickSaveButton();
  await page.waitForTimeout(3000);
  await createTripPage.getMiscExpensesError();
  await createTripPage.deleteMiscExpense();
  await page.waitForTimeout(5000);
  await createTripPage.enterMiscExpensesDetails("300", "EUR");
  await tripDetailsviewPage.clickSaveButton();
  await page.waitForTimeout(3000);
  await createTripPage.getMiscExpensesError();
  await createTripPage.deleteMiscExpense();
  await page.waitForTimeout(5000);
  await createTripPage.enterMiscExpensesDetails("50", "USD");
  await tripDetailsviewPage.clickSaveButton();
  await page.waitForTimeout(3000);
  await headerBarComponent.clickHomeButton();
  await page.waitForTimeout(5000);
  await homePage.navigateToTripApproverView();
  await tripApprovalListViewPage.searchTripNumber(testData);
  await tripApprovalListViewPage.selectTripCheckBox();
  await tripApprovalListViewPage.clickOnPostButton();
  await tripApprovalListViewPage.clickOnSubmitButton();
  await page.waitForTimeout(5000);
  await tripApprovalListViewPage.clickOnOkButton();
}

