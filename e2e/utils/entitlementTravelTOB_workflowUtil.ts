import { test, expect } from "../fixtures/pageFixtures";
export async function submit_ESS_HomeLeave(
  page,
  tripDetailsviewPage,
  createTripPage,
  testData,
  departureDate,
  arrivalDate,
  tripBeginDate,
) {
  await createTripPage.enterEntitlementTripDetails_ESS_HomeLeave(
    testData,
    departureDate,
    arrivalDate,
  );

  await createTripPage
    .getFooterBarComponent()
    .validateWorkflowButtons([
      "Submit for Approval",
      "Save as Planned",
      "Cancel",
    ]);
await page.pause();
  //await createTripPage.enterCostAssignment(testData);
  await createTripPage.clickSavePlanned();
  await page.waitForTimeout(3000);
  await createTripPage.getCostAssignmentError_HomeLeave();
  await createTripPage.reEnterCostAssignment(testData);
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
  expect(await tripStatus).toBe("Planned");
  await createTripPage.clickEditbutton();
  await page.waitForTimeout(10000);
  // Set default value for UPLOAD_ENABLED to true if not defined
  const uploadEnabled = process.env.UPLOAD_ENABLED !== "false";

  // Check the environment variable before calling uploadAttachment
  if (uploadEnabled) {
    await createTripPage.uploadAttachment(testData);
  }

  await createTripPage.clickSubmitApproval();
  await page.waitForTimeout(10000);
  const tripStatus1 = createTripPage.getTripStatus();
  console.log(
    "Trip Status after clicking on Submit for Approval",
    await tripStatus1,
  );
  return { tripNumber, tripStatus1 };
}


export async function submit_SECTO(
  page,
  tripDetailsviewPage,
  createTripPage,
  testData,
  departureDate,
  arrivalDate,
  tripBeginDate,
) {
  await createTripPage.enterEntitlementTripDetails_ESS_HomeLeave(
    testData,
    departureDate,
    arrivalDate,
  );

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
  expect(await tripStatus).toBe("Planned");
  
  return { tripNumber, tripStatus };
}

export async function planTripWithoutCostAssignment(
  page,
  tripDetailsviewPage,
  createTripPage,
  testData,
  departureDate,
  arrivalDate,
  tripBeginDate,
) {
  await createTripPage.enterEntitlementTripDetails_ESS_HomeLeave(
    testData,
    departureDate,
    arrivalDate,
  );

  await createTripPage
    .getFooterBarComponent()
    .validateWorkflowButtons([
      "Submit for Approval",
      "Save as Planned",
      "Cancel",
    ]);

    const tripSchema = testData.tripDetailsData.travelSchema;

if (tripSchema === "Assignment/Reassn Travel (TA)" || tripSchema === "Assignment/Reassignn Travel") {
    await createTripPage.clickSavePlanned();
    await page.waitForTimeout(3000); 
    await createTripPage.getDefaultCostAssingmentError(); 
    await createTripPage.enterCostAssignment(testData); 
    await createTripPage.clickSavePlanned(); 
    await page.waitForTimeout(10000);
} else {
    await createTripPage.clickSavePlanned(); 
    await page.waitForTimeout(10000);
}

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
  expect(await tripStatus).toBe("Planned");
  
  return { tripNumber, tripStatus };
}



export async function submit_ZFI_PAYRL_SC_3(
  page,
  tripDetailsviewPage,
  createTripPage,
  testData,
  departureDate,
  arrivalDate,
  tripBeginDate,
) {
  await createTripPage.enterEntitlementTripDetails_ESS_HomeLeave(
    testData,
    departureDate,
    arrivalDate,
  );

  await createTripPage
    .getFooterBarComponent()
    .validateWorkflowButtons([
      "Submit for Approval",
      "Save as Planned",
      "Cancel",
    ]);
  //await createTripPage.enterCostAssignment(testData);
  await createTripPage.clickSavePlanned();
  await page.waitForTimeout(3000);
  await createTripPage.getCostAssignmentError_ZFI_PAYRL_SC_3();
  await createTripPage.enterCostAssignment(testData);
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
  expect(await tripStatus).toBe("Planned");
  await createTripPage.clickEditbutton();
  await page.waitForTimeout(10000);
  await createTripPage.clickSubmitApproval();
  await page.waitForTimeout(10000);
  const tripStatus1 = createTripPage.getTripStatus();
  console.log(
    "Trip Status after clicking on Submit for Approval",
    await tripStatus1,
  );
  return { tripNumber, tripStatus1 };
}


export async function submit_ESS_Separation(
  page,
  loginPage,
  homePage,
  tripListViewPage,
  createTripPage,
  testData,
  departureDate,
  arrivalDate,
) {
  await createTripPage.enterEntitlementTripDetails_ESS_Seperation(
    testData,
    departureDate,
    arrivalDate,
  );
  await createTripPage
    .getFooterBarComponent()
    .validateWorkflowButtons([
      "Submit for Approval",
      "Save as Planned",
      "Cancel",
    ]);

  //await createTripPage.enterCostAssignment(testData);
  await createTripPage.clickSavePlanned();
  await page.waitForTimeout(3000);
  await createTripPage.getCostAssignmentErrorForSepearation();
  await createTripPage.reEnterCostAssignment(testData);
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
  expect(await tripStatus).toBe("Planned");
  await createTripPage.clickEditbutton();
  await page.waitForTimeout(10000);
  // Set default value for UPLOAD_ENABLED to true if not defined
  const uploadEnabled = process.env.UPLOAD_ENABLED !== "false";

  // Check the environment variable before calling uploadAttachment
  if (uploadEnabled) {
    await createTripPage.uploadAttachment(testData);
  }
  await createTripPage.clickSubmitApproval();
  await page.waitForTimeout(10000);
  const tripStatus1 = createTripPage.getTripStatus();
  console.log(
    "Trip Status after clicking on Submit for Approval",
    await tripStatus1,
  );
  return { tripNumber, tripStatus1 };
}

export async function submit_TOB_HomeLeave(
  page,
  loginPage,
  homePage,
  tripListViewPage,
  createTripPage,
  testData,
  departureDate,
  arrivalDate,
) {
  await createTripPage.enterEntitlementTripDetails_TOB_HomeLeave(
    testData,
    departureDate,
    arrivalDate,
  );
  await createTripPage
    .getFooterBarComponent()
    .validateWorkflowButtons([
      "Submit for Approval",
      "Save as Planned",
      "Cancel",
    ]);

  await createTripPage.enterCostAssignment(testData);
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
  expect(await tripStatus).toBe("Planned");
  await createTripPage.clickEditbutton();
  await page.waitForTimeout(10000);
  // Set default value for UPLOAD_ENABLED to true if not defined
  const uploadEnabled = process.env.UPLOAD_ENABLED !== "false";

  // Check the environment variable before calling uploadAttachment
  if (uploadEnabled) {
    await createTripPage.uploadAttachment(testData);
  }
  await createTripPage.clickSubmitApproval();
  await page.waitForTimeout(10000);
  const tripStatus1 = createTripPage.getTripStatus();
  console.log(
    "Trip Status after clicking on Submit for Approval",
    await tripStatus1,
  );
  return { tripNumber, tripStatus1 };
}

export async function submit_TOB_Separation(
  page,
  loginPage,
  homePage,
  tripListViewPage,
  createTripPage,
  testData,
  departureDate,
  arrivalDate,
) {
  await createTripPage.enterEntitlementTripDetails_TOB_Seperation(
    testData,
    departureDate,
    arrivalDate,
  );
  await createTripPage
    .getFooterBarComponent()
    .validateWorkflowButtons([
      "Submit for Approval",
      "Save as Planned",
      "Cancel",
    ]);

  await createTripPage.enterCostAssignment(testData);
  await createTripPage.clickSavePlanned();
  await createTripPage.getCostAssignmentErrorForSepearation();
  await createTripPage.reEnterCostAssignment(testData);
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
  expect(await tripStatus).toBe("Planned");
  await createTripPage.clickEditbutton();
  await page.waitForTimeout(10000);
  // Set default value for UPLOAD_ENABLED to true if not defined
  const uploadEnabled = process.env.UPLOAD_ENABLED !== "false";

  // Check the environment variable before calling uploadAttachment
  if (uploadEnabled) {
    await createTripPage.uploadAttachment(testData);
  }
  await createTripPage.clickSubmitApproval();
  await page.waitForTimeout(10000);
  const tripStatus1 = createTripPage.getTripStatus();
  console.log(
    "Trip Status after clicking on Submit for Approval",
    await tripStatus1,
  );
  return { tripNumber, tripStatus1 };
}

export async function submit_RS_Self(
  page,
  loginPage,
  homePage,
  tripListViewPage,
  createTripPage,
  testData,
  departureDate,
  arrivalDate,
) {
  await createTripPage.enterEntitlementTripDetails_RS_Self(
    testData,
    departureDate,
    arrivalDate,
  );
  await createTripPage
    .getFooterBarComponent()
    .validateWorkflowButtons([
      "Submit for Approval",
      "Save as Planned",
      "Cancel",
    ]);

  await createTripPage.enterCostAssignment(testData);
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
  expect(await tripStatus).toBe("Planned");
  await createTripPage.clickEditbutton();
  await page.waitForTimeout(10000);
  // Set default value for UPLOAD_ENABLED to true if not defined
  const uploadEnabled = process.env.UPLOAD_ENABLED !== "false";

  // Check the environment variable before calling uploadAttachment
  if (uploadEnabled) {
    await createTripPage.uploadAttachment(testData);
  }
  await createTripPage.clickSubmitApproval();
  await page.waitForTimeout(10000);
  const tripStatus1 = createTripPage.getTripStatus();
  console.log(
    "Trip Status after clicking on Submit for Approval",
    await tripStatus1,
  );
  return { tripNumber, tripStatus1 };
}

export async function approveTrip(
  page,
  loginPage,
  homePage,
  tripDetailsviewPage,
  createTripPage,
  headerBarComponent,
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
  await expect(await workFlowStatus).toBe("HRMN");
  const { departureDate, arrivalDate } =
    await tripApprovalListViewPage.getDates();
  console.log(
    "Departure date and Arrival Date from Trip Approval List page is :",
    departureDate,
    arrivalDate,
  );
  await tripApprovalListViewPage.clickTripNumber();
  await page.waitForTimeout(10000);
  await createTripPage.clickEditbutton();
  await page.waitForTimeout(10000);
  await createTripPage
    .getFooterBarComponent()
    .validateWorkflowButtons(["Submit for Approval", "Save", "Cancel"]);

  await tripDetailsviewPage.enterHRClearance(
    testData,
    await departureDate,
    await arrivalDate,
  );
  await tripDetailsviewPage.clickSaveButton();
  await page.waitForTimeout(20000);
  await headerBarComponent.clickBackButton();
  await page.waitForTimeout(5000);
  await tripApprovalListViewPage.searchTripNumber(testData);
  await tripApprovalListViewPage.selectTripCheckBox();
  await createTripPage
    .getFooterBarComponent()
    .validateWorkflowButtons(["Approve", "Reject"]);
  await tripApprovalListViewPage.clickOnApproveButton();
  await createTripPage
    .getFooterBarComponent()
    .validateWorkflowButtons(["Submit", "Cancel"]);
  await tripApprovalListViewPage.enterNote(testData);
  await tripApprovalListViewPage.clickOnSubmitButton();
  await page.waitForTimeout(10000);
  await tripApprovalListViewPage.clickOnOkButton();
}

export async function costEstimateTRAA_ESS(
  page,
  loginPage,
  homePage,
  createTripPage,
  tripDetailsviewPage,
  tripListViewPage,
  headerBarComponent,
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
  await expect(await workFlowStatus).toBe("TRAA");
  await tripApprovalListViewPage.clickTripNumber();
  await page.waitForTimeout(10000);
  await createTripPage.clickEditbutton();
  await page.waitForTimeout(10000);
  //await createTripPage.enterTripComments(testData);
  await createTripPage
    .getFooterBarComponent()
    .validateWorkflowButtons(["Submit for Approval", "Save", "Cancel"]);
  await tripDetailsviewPage.enterCostEstimatesTRAA(testData);
  await tripDetailsviewPage.clickSaveButton();
  await page.waitForTimeout(15000);
  await headerBarComponent.logout();
  await page.waitForTimeout(10000);
  await page.goto(process.env.URL ?? "");
  await loginPage.loginToApplication(
    process.env.TRAVELLER_USERID ?? "",
    process.env.TRAVELLER_PASSWORD ?? "",
  );
  await homePage.navigateToTripListView();
  await tripListViewPage.clickTripNumber(testData);
  await createTripPage.clickEditbutton();
  await tripDetailsviewPage.acceptReview();
  await tripDetailsviewPage.clickSaveButton();
  await page.waitForTimeout(20000);
}

export async function costEstimateTRAA(
  page,
  loginPage,
  homePage,
  createTripPage,
  tripDetailsviewPage,
  tripListViewPage,
  headerBarComponent,
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
  await expect(await workFlowStatus).toBe("TRAA");
  await tripApprovalListViewPage.clickTripNumber();
  await page.waitForTimeout(10000);
  await createTripPage.clickEditbutton();
  await page.waitForTimeout(10000);
  //await createTripPage.enterTripComments(testData);
  await createTripPage
    .getFooterBarComponent()
    .validateWorkflowButtons(["Submit for Approval", "Save", "Cancel"]);
  await tripDetailsviewPage.enterCostEstimatesTRAA(testData);
  await tripDetailsviewPage.clickSaveButton();
  await page.waitForTimeout(10000);
}

export async function costEstimateTRAA_ESS_Seperate(
  page,
  loginPage,
  homePage,
  tripDetailsviewPage,
  createTripPage,
  tripListViewPage,
  headerBarComponent,
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
  await expect(await workFlowStatus).toBe("TRAA");
  await tripApprovalListViewPage.clickTripNumber();
  await page.waitForTimeout(10000);
  await createTripPage.clickEditbutton();
  await page.waitForTimeout(10000);
  //await createTripPage.enterTripComments(testData);
  await createTripPage
    .getFooterBarComponent()
    .validateWorkflowButtons(["Submit for Approval", "Save", "Cancel"]);
  await tripDetailsviewPage.enterCostEstimatesTRAA_Adult(testData);
  await tripDetailsviewPage.clickSaveButton();
  await page.waitForTimeout(10000);
  await headerBarComponent.logout();
  await page.waitForTimeout(10000);
  await page.goto(process.env.URL ?? "");
  await loginPage.loginToApplication(
    process.env.TRAVELLER_USERID ?? "",
    process.env.TRAVELLER_PASSWORD ?? "",
  );
  await homePage.navigateToTripListView();
  await tripListViewPage.clickTripNumber(testData);
  await createTripPage.clickEditbutton();
  await page.waitForTimeout(10000);
  await tripDetailsviewPage.acceptReview();
  await tripDetailsviewPage.clickSaveButton();
  await page.waitForTimeout(10000);
}

export async function costEstimateTRAA_TOB(
  page,
  loginPage,
  homePage,
  tripDetailsviewPage,
  createTripPage,
  tripListViewPage,
  headerBarComponent,
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
  await expect(await workFlowStatus).toBe("TRAA");
  await tripApprovalListViewPage.clickTripNumber();
  await page.waitForTimeout(10000);
  await createTripPage.clickEditbutton();
  await page.waitForTimeout(10000);
  //await createTripPage.enterTripComments(testData);
  await createTripPage
    .getFooterBarComponent()
    .validateWorkflowButtons(["Submit for Approval", "Save", "Cancel"]);
  await tripDetailsviewPage.enterCostEstimatesTRAA(testData);
  await tripDetailsviewPage.clickSaveButton();
  await page.waitForTimeout(10000);

  await headerBarComponent.logout();
  await page.waitForTimeout(10000);
  await page.goto(process.env.URL ?? "");
  await loginPage.loginToApplication(
    process.env.TOB_USERID ?? "",
    process.env.TOB_PASSWORD ?? "",
  );
  await homePage.navigateToTripListView();
  await tripListViewPage.clickTripNumber(testData);
  await createTripPage.clickEditbutton();
  await page.waitForTimeout(10000);
  await tripDetailsviewPage.acceptReview();
  await tripDetailsviewPage.clickSaveButton();
  await page.waitForTimeout(10000);
}

export async function costEstimateTRAA_TOB_Adult(
  page,
  loginPage,
  homePage,
  tripDetailsviewPage,
  createTripPage,
  tripListViewPage,
  headerBarComponent,
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
  await expect(await workFlowStatus).toBe("TRAA");
  await tripApprovalListViewPage.clickTripNumber();
  await page.waitForTimeout(10000);
  await createTripPage.clickEditbutton();
  await page.waitForTimeout(10000);
  //await createTripPage.enterTripComments(testData);
  await createTripPage
    .getFooterBarComponent()
    .validateWorkflowButtons(["Submit for Approval", "Save", "Cancel"]);
  await tripDetailsviewPage.enterCostEstimatesTRAA_Adult(testData);
  await tripDetailsviewPage.clickSaveButton();
  await page.waitForTimeout(10000);

  await headerBarComponent.logout();
  await page.waitForTimeout(10000);
  await page.goto(process.env.URL ?? "");
  await loginPage.loginToApplication(
    process.env.TOB_USERID ?? "",
    process.env.TOB_PASSWORD ?? "",
  );
  await homePage.navigateToTripListView();
  await tripListViewPage.clickTripNumber(testData);
  await createTripPage.clickEditbutton();
  await tripDetailsviewPage.acceptReview();
  await tripDetailsviewPage.clickSaveButton();
  await page.waitForTimeout(10000);
}

export async function postTrip(
  page,
  createTripPage,
  tripApprovalListViewPage,
  testData,
) {
  await tripApprovalListViewPage.searchTripNumber(testData);
  await tripApprovalListViewPage.selectTripCheckBox();
  await createTripPage
    .getFooterBarComponent()
    .validateWorkflowButtons(["Post", "Reject"]);

  await tripApprovalListViewPage.clickOnPostButton();
  await createTripPage
    .getFooterBarComponent()
    .validateWorkflowButtons(["Submit", "Cancel"]);

  await tripApprovalListViewPage.clickOnSubmitButton();
  await page.waitForTimeout(10000);
  await tripApprovalListViewPage.clickOnOkButton();
}

export async function postTripWithoutTravelerReview(
  page,
  loginPage,
  homePage,
  createTripPage,
  tripListViewPage,
  tripApprovalListViewPage,
  tripDetailsviewPage,
  headerBarComponent,
  testData,
) {
  await tripApprovalListViewPage.searchTripNumber(testData);
  await tripApprovalListViewPage.selectTripCheckBox();
  await createTripPage
    .getFooterBarComponent()
    .validateWorkflowButtons(["Post", "Reject"]);

  await tripApprovalListViewPage.clickOnPostButton();
  await createTripPage
    .getFooterBarComponent()
    .validateWorkflowButtons(["Submit", "Cancel"]);

  await tripApprovalListViewPage.clickOnSubmitButtonWithoutTravelerReview();
  await tripApprovalListViewPage.selectTripCheckBox();
  await createTripPage
    .getFooterBarComponent()
    .validateWorkflowButtons(["Post", "Reject"]);
  await tripApprovalListViewPage.clickOnRejectButton();
  await tripApprovalListViewPage.enterNote(testData);
  await tripApprovalListViewPage.clickOnSubmitButton();
  await page.waitForTimeout(10000);
  await tripApprovalListViewPage.clickOnOkButton();
}

export async function travellerAttemptsReviewBeforeTRAACostEstimation(
  page,
  loginPage,
  homePage,
  tripListViewPage,
  createTripPage,
  tripDetailsviewPage,
  footerBarComponent,
  testData,
) {
  await tripListViewPage.clickTripNumber(testData);
  await createTripPage.clickEditbutton();
  await tripDetailsviewPage.acceptReview();
  await tripDetailsviewPage.clickSaveButtonBeforeTRAACost();
  await tripDetailsviewPage.rejectReview();
  await tripDetailsviewPage.clickSaveButtonBeforeTRAACost();
  await tripDetailsviewPage.clearReview();
}

export async function costEstimateTRAA_ESS_WithSingleExpense(
  page,
  loginPage,
  homePage,
  tripApprovalListViewPage,
  createTripPage,
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
  await page.waitForTimeout(10000);
  await createTripPage
    .getFooterBarComponent()
    .validateWorkflowButtons(["Submit for Approval", "Save", "Cancel"]);
  await tripDetailsviewPage.enterCostEstimatesTRAA_Adult(testData);
  await tripDetailsviewPage.enterSingleExpensesDetails(testData);
  await tripDetailsviewPage.clickSaveButton();
  await page.waitForTimeout(10000);
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
  await tripApprovalListViewPage.clickOnRejectButton();
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
  await expect(await workFlowStatus).toBe("HRMN");
  await tripApprovalListViewPage.clickOnRejectButton();
  await page.waitForTimeout(5000);
  await tripApprovalListViewPage.enterNote(testData);
  await page.waitForTimeout(5000);
  await tripApprovalListViewPage.clickOnSubmitButton();
  await page.waitForTimeout(10000);
  await tripApprovalListViewPage.clickOnOkButton();
}
