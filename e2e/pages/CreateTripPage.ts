import { Page, expect, Locator } from "@playwright/test";
import FooterBarComponent from "./components/FooterBarComponent";
import { create } from "domain";
import { exec } from "child_process";
import * as path from "path";
import { logStep } from "../utils/logger";

class CreateTripPage {
  //Trip Details Title Locators
  private readonly tripNumber = this.page
    .locator('//span[contains(@id,"ObjectPageDynamicHeaderTitle-inner")]')
    .first();

  private readonly tripStatus = this.page.locator(".sapMObjStatusText").last();

  private readonly closeButton = this.page.getByRole("button", {
    name: "Close",
  });

  private readonly deleteButton = this.page
    .getByLabel("Object header: Use screen")
    .getByRole("button", { name: "Delete" });

  private readonly editButton = this.page.getByRole("button", { name: "Edit" });

  //Trip Details Locators
  private readonly departureDate = this.page
    .getByLabel("Object details")
    .getByRole("textbox", { name: "Departure Date" });

  private readonly arrivalDate = this.page.getByRole("textbox", {
    name: "Return Date",
  });
  private readonly travelType = this.page.locator(
    '//input[contains(@id,"ZtvTrvTypeTxt")]',
  );

  private readonly travelSubtype = this.page.locator(
    '//input[contains(@id,"ZtvTrvSubtypeTxt")]',
  );

  private readonly travelSchemaLookUp = this.page
    .locator('//span[contains(@id,"TActypeName")]')
    .first();

    private readonly travelSchemaScrollBar = this.page
    .locator('//div[contains(@aria-owns,"TActypeName")]/div[7]')

    async clickTripReason(tripReason: string): Promise<void> {
      await this.page.locator(`//span[@title='${tripReason}']`).click();
    }
    

  // private readonly tripReason = this.page.getByText(
  //   "Mission International Travel",
  // );

  private travelSchemaLocator!: Locator;

  async setTravelSchema(travelSchema: string): Promise<void> {
    this.travelSchemaLocator = this.page.locator(`//span[@title='${travelSchema}']`);

    if (await this.travelSchemaLocator.isVisible()) {
        await this.travelSchemaLocator.waitFor({ state: 'attached' });
        await this.travelSchemaLocator.click();
    } else {
        console.log("Element not visible. Scrolling to make it visible...");

        const tableScrollBar = this.page.locator('//*[@class="sapUiTableVSb"]');
        await tableScrollBar.scrollIntoViewIfNeeded();

        // Re-locate the element in case it got detached
        this.travelSchemaLocator = this.page.locator(`//span[@title='${travelSchema}']`);
        await this.travelSchemaLocator.waitFor({ state: 'attached' });
        await this.travelSchemaLocator.click();
    }
}

  



  

  private readonly personalDays_Checkbox = this.page.getByRole("checkbox", {
    name: "Personal Days Involved",
  });

  private readonly tripComments = this.page.locator(
    '//textarea[contains(@id,"Editor")]',
  );

  private readonly requestLumpSum = this.page.getByRole("textbox", {
    name: "Request Lump Sum",
  });

  private readonly purposeOfTravel = this.page
  .locator('//input[contains(@id, "Customer")]')


  private readonly countryNameLookUp = this.page
    .locator('//span[contains(@id,"ZtvCountryName")]')
    .first();
  private readonly searchCountryName = this.page
    .locator('//input[contains(@id,"ZtvCountryName")]')
    .first();

  private readonly DSARate = this.page
    .locator('//span[contains(@id,"ZtvEstDsaamtUsd")]')
    .last();

  private readonly DSACurrency = this.page.locator(
    '//input[contains(@id,"ZtvDsaCurrency")]',
  );
  private readonly tripReasonLookup = this.page
    .locator('//span[contains(@id,"ZtvTripReason")]')
    .first();

  private readonly HL_Country = this.page.locator(
    "//div[contains(@id,'ZtvHmLvCounrty')]/span",
  );

  private readonly duty_Station = this.page.locator(
    "//div[contains(@id,'ZtvStfDtStnFull')]/span",
  );

  //Get Travellers Locators

  private readonly getTravellersLink = this.page.getByRole("button", {
    name: "Get Travelers",
  });

  private readonly travelers_checkbox = this.page.locator(
    '//td[contains(@id,"StaffDependantSet")]/span/div/div',
  );

  private readonly depaturePlace_Traveler = (index: number) =>
    this.page.locator(
      `(//input[contains(@aria-labelledby,"PlaceDept")])[${index + 1}]`,
    );

  private readonly depatureDate_Traveler = (index: number) =>
    this.page.locator(
      `(//input[contains(@aria-labelledby,"DateDept")])[${index + 1}]`,
    );

  private readonly arrivalPlace_Traveler = (index: number) =>
    this.page.locator(
      `(//input[contains(@aria-labelledby,"PlaceArrive")])[${index + 1}]`,
    );

  private readonly arrivalDate_Traveler = (index: number) =>
    this.page.locator(
      `(//input[contains(@aria-labelledby,"DateArrive")])[${index + 1}]`,
    );

  private readonly returnDate_Traveler = (index: number) =>
    this.page.locator(
      `(//input[contains(@aria-labelledby,"DateReturn")])[${index + 1}]`,
    );

  // Cost Estimates Locators

  private readonly ca_list = this.page
    .locator('//tbody[contains(@id,"CostAssignmentSetId")]//td')
    .last();

    private readonly ca_accountingObject = this.page
    .locator('//span[contains(@id,"Select-arrow")]')

    private readonly ca_wbsOption = this.page.
    getByRole('option', { name: 'WBS Element' })

  private readonly ca_addIcon = this.page
    .getByRole("region", { name: "Cost Assignment" })
    .getByLabel("Add", { exact: true });

  private readonly ca_Percent = this.page.getByRole("textbox", {
    name: "Percentage %",
  });

  private readonly ca_companyCode = this.page.getByRole("textbox", {
    name: "Company Code",
  });

  private readonly ca_businessArea = this.page.getByRole("textbox", {
    name: "Business Area",
  });

  private readonly ca_WBS = this.page.getByRole("textbox", {
    name: "WBS Element",
  });

  private readonly ca_Grant = this.page.getByRole("textbox", {
    name: "Grant",
  });

  private readonly ca_Fund = this.page.getByRole("textbox", {
    name: "Fund",
  });

  private readonly ca_BRDO = this.page.getByRole("textbox", {
    name: "Budget Owner (To Be Notified)",
  });

  private readonly ca_Apply = this.page.getByRole("button", { name: "Apply" });

  private readonly errorMessagePopUp = this.page.locator(
    '(//div[contains(@class,"sapMFlexItemAlignAuto")]/span)[1]',
  );

  private readonly errorMessageCloseButton = this.page.locator(
    '  //bdi[contains(@id,"ErrorMessageDialogFragmentID")]',
  );

  private readonly errorPopupClose = this.page.getByLabel("Close");

  //Add Expense Locators
  private readonly add_Expense = this.page
    .getByRole("region", { name: "Expenses" })
    .getByLabel("Add", { exact: true });

  private readonly add_Receipts = this.page
    .getByLabel("Contains Multi-Selectable")
    .getByLabel("Item Selection");

  private readonly selectButton = this.page.getByRole("button", {
    name: "Select",
    exact: true,
  });

  private readonly document_Currency = this.page.getByRole("textbox", {
    name: "Amount (Document Currency) USD",
  });

  private readonly document_Currency_Code = this.page.getByRole("textbox", {
    name: "Currency Amount (Document",
  });

  private readonly applyButton = this.page.getByRole("button", {
    name: "Apply",
  });

  private readonly expense_deleteButton = this.page
  .locator("//span[contains(@id,'deleteEntryReceipts')]/span")
  .first();

  private readonly expense_RadioButton = this.page.locator(
    "//*[@class='sapMRbBInn']",
  ).last();

  //Add Destination Locators
  private readonly add_Destination = this.page
    .getByRole("region", { name: "Additional Destination/" })
    .getByLabel("Add", { exact: true });

  private readonly add_destinationType = this.page.getByRole("textbox", {
    name: "Destination Type",
  });

  private readonly tripBegainDate = this.page.locator(
    "(//input[contains(@id,'Datedep')])[3]",
  );

  private readonly destination_Apply = this.page.getByRole("button", {
    name: "Apply",
  });

  // private readonly meals_Yes = this.page
  // .locator(".sapMSwtLabel.sapMSwtLabelOn");

  // private readonly accomodation_Yes = this.page
  // .locator(".sapMSwtLabel.sapMSwtLabelOn");

  //Add Deductions Locators

  private readonly deductionsLink = this.page.getByRole("button", {
    name: "Enter deductions",
  });

  private readonly deductionsApply = this.page.getByRole("button", {
    name: "Apply and Close",
  });

  //Attachment locators

  private readonly attachmentIcon = this.page.getByLabel("Upload Attachment", {
    exact: true,
  });

  private readonly hyperlinkText = this.page.locator(
    '//a[contains(@data-sap-ui,"fileupload")]',
  );

  //Save Trip Locators

  private readonly savePlannedButton = this.page.getByRole("button", {
    name: "Save as Planned",
  });

  private readonly saveButton = this.page.getByRole("button", { name: "Save" });

  private readonly okButton = this.page.getByRole("button", { name: "OK" });

  private readonly submitPopUpTitle = this.page.locator(
    '//span[contains(@id,"SubmitDialogV2-title-inner")]',
  );

  private readonly termsText = this.page.locator(
    '//bdi[contains(@id,"SubmitCheckbox-label-bdi")]',
  );

  private readonly submitApprovalButton = this.page.getByRole("button", {
    name: "Submit for Approval",
  });

  private readonly termsCheckbox_SubmitApproval = this.page.getByRole(
    "checkbox",
    { name: "I have read, understood, and" },
  );

  private readonly submitApprovalButtonInPopUp = this.page
    .getByLabel("Expense Report", { exact: true })
    .getByRole("button", { name: "Submit for Approval" });

  //ErrorMessage
  private readonly errorMessagesIcon = this.page.locator(
    '//button[contains(@id,"showMessages")]',
  );

  private readonly errorMessages = this.page.locator(
    '//*[contains(@class,"sapMSLIInfoMiddle")]/div[1]',
  );

  private readonly deleteMessage = this.page.locator(
    '//div[contains(@class,"sapMDialogScrollCont")]/span',
  );

  
  private footerBarComponent: FooterBarComponent;

  constructor(private readonly page : Page) {
    this.footerBarComponent = new FooterBarComponent(page);
  }

  async enterTripDetails(
    data: any,
    departureDate: string,
    arrivalDate: string,
  ) {
    await logStep("Enter Trip Details", async () => {
      await this.page.waitForLoadState("networkidle");
  
      const defaultTripNumber = this.getTripNumber();
      const defaultTripStatus = this.getTripStatus();
      console.log("Default Trip Number:", await defaultTripNumber);
      console.log("Default Trip Status:", await defaultTripStatus);
  
      await this.departureDate.waitFor({ state: 'visible' });
      await this.departureDate.pressSequentially(departureDate);
      await this.page.waitForTimeout(1000);
      await this.departureDate.press("Tab")     
      await this.arrivalDate.pressSequentially(arrivalDate);
      await this.page.waitForTimeout(1000);
      await this.departureDate.press("Tab")     
      await this.travelType.pressSequentially(data.tripDetailsData.travelType);
      await this.page.waitForTimeout(1000);
      await this.travelType.press("Tab")
      await this.countryNameLookUp.click();
      await this.searchCountryName.pressSequentially(data.tripDetailsData.countryName);
      await this.searchCountryName.press("Enter");
  
      await this.selectRegionName(data);
      await this.page.waitForTimeout(5000);
  
      await this.travelSubtype.waitFor({ state: 'visible' });
      await this.travelSubtype.pressSequentially(data.tripDetailsData.travelSubtype);
      await this.page.waitForTimeout(1000);
      await this.travelSubtype.press("Tab")
      await this.enterTripSchema(data);
      await expect(this.DSARate).toContainText(data.tripDetailsData.dsaRate);
      await this.DSACurrency.pressSequentially(data.tripDetailsData.dsaCurrency);
      await this.page.waitForTimeout(1000);
      await this.DSACurrency.press("Tab")
      await this.tripReasonLookup.click();
      await this.page.waitForTimeout(3000);
      await this.clickTripReason(data.tripDetailsData.tripReason);
      await this.page.waitForTimeout(3000);
      await this.page.keyboard.press("Tab");
      await this.page.waitForTimeout(3000);
      await this.clickPersonalDaysCheckBox();
      await this.page.waitForTimeout(2000);  
      await this.purposeOfTravel.pressSequentially("DT Travel");
      await this.page.waitForTimeout(1000);
      await this.tripComments.pressSequentially(data.tripDetailsData.tripComments);
      await this.page.waitForTimeout(1000);
      await this.page.keyboard.press("Tab");
      await this.page.waitForTimeout(2000);  
      await this.clickSavePlanned();
      await this.page.waitForTimeout(5000);  
      await this.getAdditionalDestinationError();
    });
  }
  
  

  async clickPersonalDaysCheckBox() {
    await logStep("Clicking on Personal Days CheckBox", async () => {
      await this.personalDays_Checkbox.click();
    });
  }


  async enterTripDetailsWithoutPersonalDetails(
    data: { tripDetailsData: { [key: string]: string } },
    departureDate: string,
    arrivalDate: string
  ) {
    await logStep("Enter Trip Details", async () => {
      await this.page.waitForLoadState("networkidle");
  
      const defaultTripNumber = await this.getTripNumber();
      const defaultTripStatus = await this.getTripStatus();
      console.log("Default Trip Number:", defaultTripNumber);
      console.log("Default Trip Status:", defaultTripStatus);
  
      // Ensure fields are interactable before filling them
      await this.departureDate.waitFor({ state: "visible" });
      await this.departureDate.fill(departureDate);
      await this.departureDate.press("Tab");
  
      await this.arrivalDate.waitFor({ state: "visible" });
      await this.arrivalDate.fill(arrivalDate);
      await this.arrivalDate.press("Tab");
  
      if (data.tripDetailsData.travelType) {
        await this.travelType.waitFor({ state: "visible" });
        await this.travelType.fill(data.tripDetailsData.travelType);
      }
  
      await this.countryNameLookUp.waitFor({ state: "visible" });
      await this.countryNameLookUp.click();
  
      if (data.tripDetailsData.countryName) {
        await this.searchCountryName.waitFor({ state: "visible" });
        await this.searchCountryName.fill(data.tripDetailsData.countryName);
        await this.searchCountryName.press("Enter");
      }
  
      await this.selectRegionName(data);
      await this.page.waitForTimeout(2000);
  
      if (data.tripDetailsData.travelSubtype) {
        await this.travelSubtype.waitFor({ state: "visible" });
        await this.page.waitForTimeout(2000);
        await this.travelSubtype.fill(data.tripDetailsData.travelSubtype);
      }
  
      await this.enterTripSchema(data);
  
      await this.DSARate.waitFor({ state: "attached" });
      await expect(this.DSARate).toContainText(data.tripDetailsData.dsaRate, { timeout: 5000 });
  
      if (data.tripDetailsData.dsaCurrency) {
        await this.DSACurrency.waitFor({ state: "visible" });
        await this.DSACurrency.fill(data.tripDetailsData.dsaCurrency);
      }
  
      await this.tripReasonLookup.waitFor({ state: "visible" });
      await this.tripReasonLookup.click();
  
      if (data.tripDetailsData.tripReason) {
        await this.clickTripReason(data.tripDetailsData.tripReason);
      }
  
      await this.purposeOfTravel.waitFor({ state: "visible" });
      await this.purposeOfTravel.fill("DT Travel");  
        await this.tripComments.waitFor({ state: "visible" });
        await this.tripComments.fill(data.tripDetailsData.tripComments);
      
    });
  }
  
  

  async enterCostAssignment(data: any) {
    await logStep("Enter Cost Assignment", async () => {
      await this.ca_list.click();
  
      // Wait for the WBS field to be visible
      await this.ca_WBS.waitFor({ state: 'visible' });
  
      // Clear and enter values
      await this.ca_WBS.fill(""); // Clear field
      await this.ca_WBS.fill(data.costAssignmentData.wbs);
      await this.page.waitForTimeout(2000);
      await this.ca_WBS.press("Tab");
  
      await this.ca_Grant.fill(""); // Clear field
      await this.ca_Grant.fill(data.costAssignmentData.grant);
      await this.page.waitForTimeout(2000);
      await this.ca_WBS.press("Tab");
  
      await this.ca_Fund.fill(""); // Clear field
      await this.ca_Fund.fill(data.costAssignmentData.fund);
      await this.page.waitForTimeout(2000);
      await this.ca_WBS.press("Tab");
  
      await this.ca_BRDO.fill(""); // Clear field
      await this.ca_BRDO.fill(data.costAssignmentData.approver);
      await this.page.waitForTimeout(2000);
      await this.ca_WBS.press("Tab");
  
      await this.ca_Apply.waitFor();
      await this.ca_Apply.click();
      await this.page.waitForTimeout(3000);
  });
  
  }
  
  
  async enterMultipleCostAssignment(data: any) {
    await logStep("Enter Multiple Cost Assignment", async () => {
      await this.ca_list.click();
  
      // Helper function for pressSequentiallying and pressing fields sequentially
      const pressSequentiallyAndPressSequentially = async (field, value: string) => {
        await field.pressSequentially(value);
        await field.press("Enter");
      };
  
      // First entry
      await this.ca_Percent.pressSequentially("50");
      await this.page.keyboard.press("Tab");
      await pressSequentiallyAndPressSequentially(this.ca_WBS, data.costAssignmentData.wbs1);
      await pressSequentiallyAndPressSequentially(this.ca_Grant, data.costAssignmentData.grant1);
      await pressSequentiallyAndPressSequentially(this.ca_Fund, data.costAssignmentData.fund1);
      await pressSequentiallyAndPressSequentially(this.ca_BRDO, data.costAssignmentData.approver1);
      
      // Wait for Apply button before clicking
      await this.ca_Apply.waitFor();
      await this.ca_Apply.click();
      await this.page.waitForTimeout(5000);

      // Wait for the next entry to be available
      await this.ca_addIcon.waitFor();
      await this.ca_addIcon.click();
  
      // Second entry
      await pressSequentiallyAndPressSequentially(this.ca_WBS, data.costAssignmentData.wbs2);
      await pressSequentiallyAndPressSequentially(this.ca_Grant, data.costAssignmentData.grant2);
      await pressSequentiallyAndPressSequentially(this.ca_Fund, data.costAssignmentData.fund2);
      await pressSequentiallyAndPressSequentially(this.ca_BRDO, data.costAssignmentData.approver2);
  
      await this.ca_Apply.waitFor();
      await this.ca_Apply.click();
      await this.page.waitForTimeout(5000);

    });
  }
  
  

  async getCostAssignmentErrorForSepearation() {
    await logStep("Get Cost Assignment Error", async () => {
      await expect(this.errorMessagePopUp).toContainText(
        'Repatriation travel must have a Cost Assignment with fund "FSE" and grant "NON-GRANT". Please note that "FSE" will not be part of the picklist and will need to be typed on the field manually.'
      );
      const errorMessagePopUpText = await this.errorMessagePopUp.textContent();
      console.log("Error Message:", errorMessagePopUpText);
      await this.errorMessageCloseButton.click();
    });
  }
  

  async getCostAssignmentError_ZFI_PAYRL_SC_1() {
    await logStep("Get Cost Assignment Error", async () => {
      await expect(this.errorMessagePopUp).toContainText(
        "ZFI_PAYRL_SC_1-Invalid Combination ZT",
      );
      const errorMessagePopUpText = await this.errorMessagePopUp.textContent();
      console.log("Error Message:", errorMessagePopUpText);
      await this.errorMessageCloseButton.click();
    });
  }


  async getCostAssignmentError_ZFI_PAYRL_SC_3() {
    await logStep("Get Cost Assignment Error", async () => {
      await expect(this.errorMessagePopUp).toContainText(
        'must have a Cost Assignment with fund "SLF" and grant "NON-GRANT". Please note that "SLF" will not be part of the picklist and will need to be typed in manually.',
      );
      const errorMessagePopUpText = await this.errorMessagePopUp.textContent();
      console.log("Error Message:", errorMessagePopUpText);
      await this.errorMessageCloseButton.click();
    });
  }

  async getCostAssignmentError_ZT() {
    await logStep("Get Cost Assignment Error", async () => {
      await expect(this.errorMessagePopUp).toContainText(
        "not allowed against SLF(Sa lary fund)",
      );
      const errorMessagePopUpText = await this.errorMessagePopUp.textContent();
      console.log("Error Message:", errorMessagePopUpText);
      await this.errorMessageCloseButton.click();
    });
  }

  async getDefaultCostAssingmentError() {
    await logStep("Get Cost Assignment Error", async () => {
      await expect(this.errorMessagePopUp).toContainText(
        "Enter a true account assignment relevant to cost accounting",
      );
      const errorMessagePopUpText = await this.errorMessagePopUp.textContent();
      console.log("Error Message:", errorMessagePopUpText);
      await this.errorMessageCloseButton.click();
    });
  }

  async getCostAssignmentError_ZFI_NON_PAYRL_NON_SC_4() {
    await logStep("Get Cost Assignment Error", async () => {
      await expect(this.errorMessagePopUp).toContainText(
        'Cost Assignment with fund "SLF" is invalid for this trip schema.',
      );
      const errorMessagePopUpText = await this.errorMessagePopUp.textContent();
      console.log("Error Message:", errorMessagePopUpText);
      await this.errorMessageCloseButton.click();
    });
  }


  async getCostAssignmentError_HomeLeave() {
    await logStep("Get Cost Assignment Error", async () => {
      await expect(this.errorMessagePopUp).toContainText(
        'must have a Cost Assignment with fund "SLF" and grant "NON-GRANT". Please note that "SLF" will not be part of the picklist and will need to be typed in manually.'
      );
      const errorMessagePopUpText = await this.errorMessagePopUp.textContent();
      console.log("Error Message:", errorMessagePopUpText);
      await this.errorMessageCloseButton.click();
    });
  }
  


  async getAdditionalDestinationError() {
    await logStep("Get Additional Destination Error", async () => {
      await expect(this.errorMessagePopUp).toContainText(
        "Please provide more details about your personal days",
      );
      const errorMessagePopUpText = await this.errorMessagePopUp.textContent();
      console.log("Error Message:", errorMessagePopUpText);
      await this.errorMessageCloseButton.click();
    });
  }

  async getMiscExpensesError() {
    await logStep("Get Misc Expenses Error", async () => {
      await expect(this.errorMessagePopUp).toContainText(
        'Miscellaneous travel expenses cannot be more than the equivalent of 250 USD'
      );
      const errorMessagePopUpText = await this.errorMessagePopUp.textContent();
      console.log("Error Message:", errorMessagePopUpText);
      await this.errorMessageCloseButton.click();
    });
  }

  async getConfirmMsgForDeletingExpense() {
    await logStep("Get Confirm message for Expenses delete", async () => {
      await expect(this.errorMessagePopUp).toContainText(
        'Receipt will be deleted. Do you want to continue?'
      );
      const errorMessagePopUpText = await this.errorMessagePopUp.textContent();
      console.log("Error Message:", errorMessagePopUpText);
      await this.errorMessageCloseButton.click();
    });
  }


  async deleteMiscExpense() {
    await logStep("Deleting the Misc Expense", async () => {
      // Store the locator in a variable
      const receiptCheckbox = this.page.locator("//div[contains(@aria-labelledby,'Receipts')]/div/input").last();
  
      // Check if the checkbox is selected
      const isChecked = await receiptCheckbox.getAttribute("checked") !== null;
  
      if (!isChecked) {
        console.log("Receipt checkbox is not selected. Selecting it now.");
        await this.expense_RadioButton.click();
        await this.page.waitForTimeout(1000); // Allow UI to update
      }
  
      // Check if delete button is enabled
      const isDeleteEnabled = await this.expense_deleteButton.isEnabled();
      if (isDeleteEnabled) {
        console.log("Delete button is enabled. Proceeding with deletion.");
        await this.expense_deleteButton.click();
  
        await expect(this.deleteMessage).toContainText(
          "Receipt will be deleted. Do you want to continue?"
        );
  
        const errorMessagePopUpText = await this.deleteMessage.textContent();
        console.log("Warning Message:", errorMessagePopUpText);
  
        await this.okButton.click();
        await this.page.waitForTimeout(5000);
      } else {
        console.log("Delete button is disabled. Cannot proceed with deletion.");
      }
    });
  }

  async clickSaveButton() {
    await logStep("Click Save Button", async () => {
      await this.saveButton.click();
    });
  }
  

  async reEnterCostAssignment(data: any) {
    await logStep("Re-enter Cost Assignment", async () => {
      await this.ca_list.click();
  
      // Helper function to clear and enter text reliably
      const clearAndFill = async (locator: Locator, text: string, fieldName: string) => {
        await locator.waitFor({ state: "visible", timeout: 3000 }); // Ensure field is visible
        await locator.clear(); // Clear previous input
        await locator.fill(text); // Enter new value
        await this.page.waitForTimeout(500); // Small delay to stabilize
  
        // Verify entered value and retry if needed
        const enteredText = await locator.inputValue();
        if (enteredText !== text) {
          console.warn(`${fieldName} did not enter correctly, retrying...`);
          await locator.fill(text);
        }
        await locator.press("Enter"); // Press Enter after filling the field
      };
  
      await clearAndFill(this.ca_WBS, data.costAssignmentData1.wbs, "WBS");
      await this.page.waitForTimeout(1000);
  
      await clearAndFill(this.ca_Grant, data.costAssignmentData1.grant, "Grant");
      await this.page.waitForTimeout(1000);
  
      await clearAndFill(this.ca_Fund, data.costAssignmentData1.fund, "Fund");
      await this.page.waitForTimeout(1000);
  
      await clearAndFill(this.ca_BRDO, data.costAssignmentData1.approver, "Approver");
  
      // Click the Apply button
      await this.ca_Apply.click();
    });
  }
  


async enterExpensesDetails(data: any) {
  await logStep("Enter Expenses Details", async () => {
    await this.add_Expense.click();
    await this.add_Receipts.click();
    await this.selectButton.click();
    await this.page.waitForTimeout(10000);
    
    // Change: Use pressSequentially instead of pressSequentially
    await this.document_Currency.fill(data.expensesData.document_Currency);
    await this.page.keyboard.press("Tab");
    await this.document_Currency_Code.fill(data.expensesData.document_Currency_Code);
    
    await this.page.keyboard.press("Tab");
    await this.page.waitForTimeout(10000);
    await this.applyButton.click();
    await this.page.waitForTimeout(5000);
  });
}

async enterDestinationDetails(data: any, tripBeginDate: string) {
  await logStep("Enter Destination Details", async () => {
    await this.page.waitForTimeout(10000);
    await this.add_Destination.click();
    await this.page.waitForTimeout(5000);

    // Change: Use pressSequentially instead of pressSequentially
    await this.add_destinationType.pressSequentially(data.destinationtData.destinationtype2);
    await this.page.waitForTimeout(2000);
    await this.page.keyboard.press("Tab");

    await this.tripBegainDate.pressSequentially(tripBeginDate);  
    await this.page.keyboard.press("Tab");
    await this.page.waitForTimeout(10000);
    await this.destination_Apply.click();

    await this.page.waitForTimeout(2000);
    await this.clickSavePlanned();
    await this.page.waitForTimeout(3000);
    await this.getAdditionalDestinationError();

    await this.add_Destination.click();
    await this.page.waitForTimeout(5000);

    // Change: Use pressSequentially instead of pressSequentially
    await this.add_destinationType.pressSequentially(data.destinationtData.destinationtype1);
    await this.page.waitForTimeout(2000);
    await this.page.keyboard.press("Tab");

    await this.tripBegainDate.pressSequentially(tripBeginDate);
    await this.page.keyboard.press("Tab");
    await this.page.waitForTimeout(10000);
    await this.destination_Apply.click();
  });
}


async enterMultipleDestinationDetails(data: any, tripBeginDate: string) {
  await logStep("Enter Destination Details", async () => {
    await this.page.waitForTimeout(10000);
    await this.add_Destination.click();
    await this.page.waitForTimeout(5000);

    // Change: Use pressSequentially instead of pressSequentially
    await this.add_destinationType.pressSequentially(data.destinationtData.destinationtype2);
    await this.page.waitForTimeout(2000);
    await this.page.keyboard.press("Tab");

    await this.tripBegainDate.pressSequentially(tripBeginDate);  
    await this.page.keyboard.press("Tab");
    await this.page.waitForTimeout(10000);
    await this.destination_Apply.click();   

    await this.add_Destination.click();
    await this.page.waitForTimeout(5000);

    // Change: Use pressSequentially instead of pressSequentially
    await this.add_destinationType.pressSequentially(data.destinationtData.destinationtype1);
    await this.page.waitForTimeout(2000);
    await this.page.keyboard.press("Tab");

    await this.tripBegainDate.pressSequentially(tripBeginDate);
    await this.page.keyboard.press("Tab");
    await this.page.waitForTimeout(10000);
    await this.destination_Apply.click();
  });
}



  async enterDeductionDetails() {
    await logStep("Enter Deduction Details", async () => {
      await this.deductionsLink.click();
      await this.deductionsApply.click();
    });
  }

  async enterTripSchema(data: any) {
    await logStep("Enter Trip Schema", async () => {
      await this.travelSchemaLookUp.click();
      await this.page.waitForTimeout(3000);
      this.setTravelSchema(data.tripDetailsData.travelSchema);
      await this.travelSchemaLocator.click();
      await this.page.waitForTimeout(3000);
    });
  }

  async selectRegionName(data: any) {
    await logStep("Select Region Name", async () => {
      const regionName = data.tripDetailsData.regionName;
  
      try {
        // Attempt to locate and click the region directly
        await this.page.getByText(regionName, { exact: true }).click();
      } catch (error) {
        console.log("Region locator not found. Scrolling the table...");
        
        // Scroll the table using the scroll bar locator
        const tableScrollBar = this.page.locator('//*[@class="sapUiTableVSb"]');
        await tableScrollBar.scrollIntoViewIfNeeded();
  
        // Retry clicking the region after scrolling
        await this.page.waitForTimeout(1000); // Wait for the table to update
        await this.page.getByText(regionName, { exact: true }).click();
      }
    });
  }
  

  async clickSavePlanned() {
    await logStep("clicked on Save as Planned button", async () => {
      await this.savePlannedButton.waitFor({ state: 'visible' });  // Waits until the button is visible
      await this.savePlannedButton.isEnabled();  // Checks if the button is enabled
       await this.savePlannedButton.click();
    });
  }
  

  async clickSubmitApproval() {
    await logStep("clicked on Submit for Approval button", async () => {
      await this.submitApprovalButton.click();
      await expect(this.submitPopUpTitle).toContainText("Expense Report");
      await expect(this.termsText).toContainText("all supporting details");
      await this.termsCheckbox_SubmitApproval.click();
      await this.page.waitForTimeout(5000);
      await this.submitApprovalButtonInPopUp.click();
      await this.page.waitForTimeout(5000);
    });
  }

  async isDeleteButtonVisible(): Promise<boolean> {
    return await logStep("isDeleteButtonVisible", async () => {
      return await this.deleteButton.isVisible();
    });
  }

  async clickOkbutton() {
    await logStep("clicked on Ok button in Trip Details", async () => {
      await this.okButton.click();
    });
  }

  async clickClosebutton() {
    await logStep("clicked on Close button in Trip Details", async () => {
      await this.closeButton.click();
    });
  }

  async clickErrorClosebutton() {
    await logStep("clicked on Error Close button in Trip Details", async () => {
      await this.errorPopupClose.click();
    });
  }

  async clickDeletebutton() {
    await logStep("clicked on Delete button in Trip Details", async () => {
      await this.deleteButton.click();
    });
  }

  async clickEditbutton() {
    await logStep("clicked on Editbutton in Trip Details", async () => {
      await this.editButton.click();
    });
  }

  getTripNumber() {
    return logStep("getTripNumber", async () => {
      return this.tripNumber.textContent();
    });
  }

  getTripStatus() {
    return logStep("getTripStatus", async () => {
      return this.tripStatus.textContent();
    });
  }

  getFooterBarComponent() {
    return this.footerBarComponent;
  }

  private async getTravelerCount(): Promise<number> {
    const travelers = await this.travelers_checkbox;
    return travelers.count();
  }

  public async EnterTravelerDetails(
    index: number,
    data: any,
    departureDate: string,
    arrivalDate: string,
  ) {
    await logStep(`Entering details for traveler ${index + 1}`, async () => {
      await this.page.waitForTimeout(1000); // Small delay before starting
  
      // Helper function to enter text reliably
      const enterText = async (locator: Locator, text: string, fieldName: string) => {
        await locator.waitFor({ state: "visible", timeout: 3000 }); // Ensure field is visible
        await locator.clear(); // Clear any pre-filled values
        await locator.fill(text); // Use fill() for more reliable input
        await this.page.waitForTimeout(500); // Short stabilization wait
  
        // Verify entered value
        const enteredText = await locator.inputValue();
        if (enteredText !== text) {
          console.warn(`${fieldName} did not enter correctly, retrying...`);
          await locator.fill(text); // Retry if needed
        }
      };
  
      await enterText(this.depaturePlace_Traveler(index), data.tripDetailsData.depaturePlace, "Departure Place");
      await enterText(this.depatureDate_Traveler(index), departureDate, "Departure Date");
      await enterText(this.arrivalPlace_Traveler(index), data.tripDetailsData.arrivalPlace, "Arrival Place");
      await enterText(this.arrivalDate_Traveler(index), arrivalDate, "Arrival Date");
      await enterText(this.returnDate_Traveler(index), arrivalDate, "Return Date");
    });
  }
  
  

  public async fillTravelerDetailsWithoutReturnDate(
    index: number,
    data: any,
    departureDate: string,
    arrivalDate: string,
) {
    await logStep(`Filling details for traveler ${index + 1}`, async () => {
        await this.depaturePlace_Traveler(index).fill(
            data.tripDetailsData.depaturePlace,
        );
        await this.depatureDate_Traveler(index).fill(departureDate);
        await this.arrivalPlace_Traveler(index).fill(
            data.tripDetailsData.arrivalPlace,
        );
        await this.arrivalDate_Traveler(index).fill(arrivalDate);
    });
}


  public async EnterTravelDetails(
    data: any,
    departureDate: string,
    arrivalDate: string,
  ) {
    const travelerCount = await this.getTravelerCount();
    console.log("Total number of travellers:", travelerCount);
  
    // Get all traveler checkboxes
    const checkboxes = await this.travelers_checkbox;
     for (let i = 0; i < travelerCount; i++) {
      // Ensure the checkbox is checked before entering details
      const isChecked = await checkboxes.nth(i).isChecked();
      if (!isChecked) {
        await checkboxes.nth(i).click();
        await this.page.waitForTimeout(3000);
      }
  
      // Enter traveler details
      await this.EnterTravelerDetails(i, data, departureDate, arrivalDate);
    }
  }
  
  private async manageTravelersCheckboxes(count: number) {
    for (let i = 0; i < count; i++) {
      const checkbox = this.travelers_checkbox.nth(i);
      const isChecked = await checkbox.evaluate((node: HTMLElement) =>
        node.classList.contains("sapMCbMarkChecked"),
      );

      if (i < 2) {
        // Ensure first 2 travelers are checked
        if (!isChecked) {
          await checkbox.click();
        }
      } else {
        // Uncheck other travelers
        if (isChecked) {
          await checkbox.click();
        }
      }
    }
  }

  public async removeTravellersForErrorValidation() {
    const travelerCount = await this.getTravelerCount();

    if (travelerCount > 0) {
      await this.manageTravelersCheckboxes(travelerCount);
    }
  }

  async enterEntitlementTripDetails_ESS_HomeLeave(
    data: any,
    departureDate: string,
    arrivalDate: string,
  ) {
    await logStep("enterEntitlementTripDetails_ESS_HomeLeave", async () => {
      await this.page.waitForLoadState("networkidle");
      const defaultTripNumber = await this.getTripNumber();
      const defaultTripStatus = await this.getTripStatus();
      console.log("Default Trip Number:", defaultTripNumber);
      console.log("Default Trip Status:", defaultTripStatus);

      await this.departureDate.pressSequentially(departureDate);
      await this.departureDate.press("Tab"); // Press Enter after pressSequentiallying departure date
      await this.arrivalDate.pressSequentially(arrivalDate);
      await this.arrivalDate.press("Tab"); // Press Enter after pressSequentiallying arrival date

      await this.travelType.pressSequentially(data.tripDetailsData.travelType);
      await this.travelType.press("Enter");
      await this.page.waitForTimeout(3000);

      await this.enterTripSchema(data);

      // await expect(this.HL_Country).toContainText(data.tripDetailsData.HL_Country);
      // await expect(this.duty_Station).toContainText(data.tripDetailsData.duty_Station);

      await this.requestLumpSum.pressSequentially("Yes");
      await this.page.keyboard.press("Tab");
      await this.tripComments.pressSequentially(data.tripDetailsData.tripComments);
      await this.page.waitForTimeout(3000);
      await this.getTravellersLink.click();
      await this.page.waitForTimeout(10000);

      await this.enterGetTravellerDetails_ESS_HomeLeave(
        data,
        departureDate,
        arrivalDate,
      );
    });
  }

  async enterEntitlementTripDetails_ESS_Seperation(
    data: any,
    departureDate: string,
    arrivalDate: string,
  ) {
    await logStep("enterEntitlementTripDetails_ESS_Seperation", async () => {
      await this.page.waitForLoadState("networkidle");
      const defaultTripNumber = await this.getTripNumber();
      const defaultTripStatus = await this.getTripStatus();
      console.log("Default Trip Number:", defaultTripNumber);
      console.log("Default Trip Status:", defaultTripStatus);

      await this.departureDate.fill(departureDate);
      await this.departureDate.press("Enter"); // Press Enter after pressSequentiallying departure date
      await this.arrivalDate.fill(arrivalDate);
      await this.arrivalDate.press("Enter"); // Press Enter after pressSequentiallying arrival date

      await this.travelType.pressSequentially(data.tripDetailsData.travelType);
      await this.travelType.press("Enter");
      await this.page.waitForTimeout(3000);

      await this.enterTripSchema(data);

      // await expect(this.HL_Country).toContainText(data.tripDetailsData.HL_Country);
      // await expect(this.duty_Station).toContainText(data.tripDetailsData.duty_Station);

      await this.requestLumpSum.pressSequentially("Yes");
      await this.page.keyboard.press("Tab");

      await this.tripComments.pressSequentially(data.tripDetailsData.tripComments);
      await this.page.waitForTimeout(3000);

      await this.getTravellersLink.click();
      await this.page.waitForTimeout(10000);

      await this.enterGetTravellerDetails_Self(
        data,
        departureDate,
        arrivalDate,
      );
    });
  }

  async enterEntitlementTripDetails_TOB_Seperation(
    data: any,
    departureDate: string,
    arrivalDate: string,
  ) {
    await logStep("enterEntitlementTripDetails_TOB_Seperation", async () => {
      await this.page.waitForLoadState("networkidle");
      const defaultTripNumber = await this.getTripNumber();
      const defaultTripStatus = await this.getTripStatus();
      console.log("Default Trip Number:", defaultTripNumber);
      console.log("Default Trip Status:", defaultTripStatus);

      await this.departureDate.type(departureDate);
      await this.departureDate.press("Enter"); // Press Enter after pressSequentiallying departure date
      await this.arrivalDate.type(arrivalDate);
      await this.arrivalDate.press("Enter"); // Press Enter after pressSequentiallying arrival date

      await this.travelType.pressSequentially(data.tripDetailsData.travelType);
      await this.travelType.press("Enter");
      await this.page.waitForTimeout(3000);

      await this.enterTripSchema(data);

      // await expect(this.HL_Country).toContainText(data.tripDetailsData.HL_Country);
      // await expect(this.duty_Station).toContainText(data.tripDetailsData.duty_Station);

      await this.requestLumpSum.pressSequentially("Yes");
      await this.page.keyboard.press("Tab");

      await this.tripComments.pressSequentially(data.tripDetailsData.tripComments);
      await this.page.waitForTimeout(3000);

      await this.getTravellersLink.click();
      await this.page.waitForTimeout(10000);

      await this.enterGetTravellerDetails_Self_TOB(
        data,
        departureDate,
        arrivalDate,
      );
    });
  }
  async enterEntitlementTripDetails_TOB_HomeLeave(
    data: any,
    departureDate: string,
    arrivalDate: string,
  ) {
    await logStep("enterEntitlementTripDetails_TOB_HomeLeave", async () => {
      await this.page.waitForLoadState("networkidle");
      const defaultTripNumber = await this.getTripNumber();
      const defaultTripStatus = await this.getTripStatus();
      console.log("Default Trip Number:", defaultTripNumber);
      console.log("Default Trip Status:", defaultTripStatus);

      await this.departureDate.fill(departureDate);
      await this.departureDate.press("Enter"); // Press Enter after pressSequentiallying departure date
      await this.arrivalDate.fill(arrivalDate);
      await this.arrivalDate.press("Enter"); // Press Enter after pressSequentiallying arrival date

      await this.travelType.pressSequentially(data.tripDetailsData.travelType);
      await this.travelType.press("Enter");
      await this.page.waitForTimeout(3000);

      await this.enterTripSchema(data);

      // await expect(this.HL_Country).toContainText(data.tripDetailsData.HL_Country);
      // await expect(this.duty_Station).toContainText(data.tripDetailsData.duty_Station);

      await this.requestLumpSum.pressSequentially("Yes");
      await this.page.keyboard.press("Tab");

      await this.tripComments.pressSequentially(data.tripDetailsData.tripComments);
      await this.page.waitForTimeout(3000);

      await this.getTravellersLink.click();
      await this.page.waitForTimeout(10000);

      await this.enterGetTravellerDetails_TOB_HomeLeave(
        data,
        departureDate,
        arrivalDate,
      );
    });
  }

  async enterEntitlementTripDetails_RS_Self(
    data: any,
    departureDate: string,
    arrivalDate: string,
  ) {
    await logStep("enterEntitlementTripDetails_RS_Self", async () => {
      await this.page.waitForLoadState("networkidle");
      const defaultTripNumber = await this.getTripNumber();
      const defaultTripStatus = await this.getTripStatus();
      console.log("Default Trip Number:", defaultTripNumber);
      console.log("Default Trip Status:", defaultTripStatus);

      await this.departureDate.type(departureDate);
      await this.departureDate.press("Enter"); // Press Enter after pressSequentiallying departure date
      await this.arrivalDate.type(arrivalDate);
      await this.arrivalDate.press("Enter"); // Press Enter after pressSequentiallying arrival date

      await this.travelType.pressSequentially(data.tripDetailsData.travelType);
      await this.travelType.press("Enter");
      await this.page.waitForTimeout(3000);

      await this.enterTripSchema(data);

      // await expect(this.HL_Country).toContainText(data.tripDetailsData.HL_Country);
      // await expect(this.duty_Station).toContainText(data.tripDetailsData.duty_Station);

      await this.requestLumpSum.pressSequentially("Yes");
      await this.page.keyboard.press("Tab");

      await this.tripComments.pressSequentially(data.tripDetailsData.tripComments);
      await this.page.waitForTimeout(3000);

      await this.getTravellersLink.click();
      await this.page.waitForTimeout(10000);

      await this.enterGetTravellerDetails_Self(
        data,
        departureDate,
        arrivalDate,
      );
    });
  }

  async enterGetTravellerDetails_ESS_HomeLeave(
    data: any,
    departureDate: string,
    arrivalDate: string,
  ) {
    await logStep("enterGetTravellerDetails_ESS_HomeLeave", async () => {
      await this.EnterTravelDetails(data, departureDate, arrivalDate);
      await this.page.waitForTimeout(3000);
    });
  }
  async enterGetTravellerDetails_Self(
    data: any,
    departureDate: string,
    arrivalDate: string,
  ) {
    await logStep("enterGetTravellerDetails_Self", async () => {
      await this.EnterTravelDetailsForOneTraveler(
        data,
        departureDate,
        arrivalDate,
      );
      await this.page.waitForTimeout(3000);
    });
  }

  async enterGetTravellerDetails_Self_TOB(
    data: any,
    departureDate: string,
    arrivalDate: string,
  ) {
    await logStep("enterGetTravellerDetails_Self_TOB", async () => {
      await this.EnterTravelDetailsForOneTraveler(
        data,
        departureDate,
        arrivalDate,
      );
      await this.page.waitForTimeout(3000);
    });
  }

  public async uncheckOtherTravelers(count: number) {
    for (let i = 1; i < count; i++) {
      const checkbox = this.travelers_checkbox.nth(i);
      // Ensure the checkbox is checked before unchecking
      if (await checkbox.isChecked()) {
        await checkbox.uncheck();
      }
    }
  }

  public async EnterTravelDetailsForOneTraveler(
    data: any,
    departureDate: string,
    arrivalDate: string
  ) {
    const travelerCount = await this.getTravelerCount();
    console.log("Total number of travellers:", travelerCount);
  
    const firstCheckbox = this.travelers_checkbox.nth(0); // Select only the first checkbox
  
    // Ensure the first checkbox is checked before entering details
    const isChecked = await firstCheckbox.isChecked();
    if (!isChecked) {
      await firstCheckbox.click();
      await this.page.waitForTimeout(3000);
    }
  
    // Enter details for the first traveler only
    await this.EnterTravelerDetails(0, data, departureDate, arrivalDate);
  }
  

  async enterGetTravellerDetails_TOB_HomeLeave(
    data: any,
    departureDate: string,
    arrivalDate: string,
  ) {
    await logStep("enterGetTravellerDetails_TOB_HomeLeave", async () => {
      await this.EnterTravelDetails(data, departureDate, arrivalDate);
      await this.page.waitForTimeout(3000);
    });
  }

  async enterTripComments(data: any) {
    await logStep("entering Trip Comments", async () => {
      await this.tripComments.pressSequentially(data.tripDetailsData.tripComments);
      await this.page.keyboard.press("Tab");
    });
  }

  /**
   * Uploads an attachment using the specified data.
   * This method clicks the attachment icon, runs an AutoIt script to handle the file dialog,
   * waits for the upload to complete, and verifies the uploaded file's name. *
   */

  async uploadAttachment(data: any) {
    await logStep("uploadAttachment", async () => {
      const filePath = path.resolve(__dirname, "../../", data?.file?.filePath);
      console.log(`Resolved file path: ${filePath}`);

      let fileName = filePath.split("\\").pop() as string;
      if (fileName.includes(".")) {
        fileName = fileName.substring(0, fileName.lastIndexOf("."));
      }
      console.log(`File name to check: ${fileName}`);
      await this.attachmentIcon.click();
      console.log("Attachment icon clicked, waiting for AutoIt script to run.");

      // Path to the compiled AutoIt executable
      const autoItExePath = path.resolve(
        __dirname,
        "../AutoITScripts",
        "file_upload.exe",
      );
      console.log(`AutoIt executable path: ${autoItExePath}`);

      await this.page.waitForTimeout(5000);

      // Run the AutoIt executable to handle the file dialog
      exec(`"${autoItExePath}" "${filePath}"`, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error running AutoIt script: ${error.message}`);
          return;
        }
        if (stderr) {
          console.error(`AutoIt script stderr: ${stderr}`);
          return;
        }
        console.log(`AutoIt script stdout: ${stdout}`);
      });

      await this.page.waitForTimeout(10000);

      const textContent = await this.hyperlinkText.textContent();
      console.log("Attached File Name:", textContent);

      await expect(this.hyperlinkText).toContainText(fileName);
    });
  }

  async validateMandatoryErrorMessages(departureDate: any) {
    await logStep("validateMandatoryErrorMessages", async () => {
        const errorMessagesToCheck = [
            'Required entry field "Return Date" is empty.',
            'Required entry field "Travel Type" is empty.',
            'Required entry field "Travel SubType" is empty.',
            'Required entry field "Trip Schema" is empty.',
            'Required entry field "DSA Currency of Payment" is empty.',
            'Required entry field "Trip Reason" is empty.',
            'Required entry field "Purpose of Travel" is empty.', 
            'Required entry field "Trip Comments" is empty.',
            // New error messages can be added here
        ];

        await this.errorMessagesIcon.click();
        await expect(this.errorMessages).toContainText(
            'Required entry field "Departure Date" is empty.'
        );
        await this.errorMessagesIcon.click();

        await this.departureDate.pressSequentially(departureDate);
        await this.page.keyboard.press("Tab");
        await this.page.waitForTimeout(5000);

        const isVisible = await this.errorMessagesIcon.isVisible();
        expect(isVisible).toBe(false);

        await this.clickSavePlanned();
        await this.page.waitForTimeout(5000);
        await this.errorMessagesIcon.click();

        const missingMessages: string[] = [];

        for (const errorMessage of errorMessagesToCheck) {
            const locator = this.page.getByText(errorMessage, { exact: true });
            const isVisible = await locator.isVisible();

            if (isVisible) {
                console.log(`Error message "${errorMessage}" is displayed.`);
            } else {
                console.log(`Error message "${errorMessage}" is NOT displayed.`);
                missingMessages.push(errorMessage);
            }

            // Assert that the error message is visible
            expect(isVisible).toBe(true); // This will throw an error if false
        }

        // Log any missing messages at the end of the loop
        if (missingMessages.length > 0) {
            throw new Error(`Missing error messages: ${missingMessages.join(", ")}`);
        }

        await this.errorMessagesIcon.click();
        await this.page.waitForTimeout(5000);
    });
}

  async validateDateErrorMessages(
    departureDate1: any,
    arrivalDate1: any,
    startDate: any,
    endDate: any,
  ) {
    await logStep("validateDateErrorMessages", async () => {
      const expectedErrorMessage1 = new RegExp(
        `Trip data for the period from ${startDate}.* to ${endDate}.* already exists`,
      );
      const expectedErrorMessage2 = new RegExp(
        `Trip end time ${endDate}.* must be later than trip start time ${departureDate1}.*`,
      );

      await this.departureDate.pressSequentially(startDate);
      await this.departureDate.press("Enter");
      await this.arrivalDate.fill(endDate);
      await this.arrivalDate.press("Enter");
      await this.page.waitForTimeout(3000);

      await this.errorMessagesIcon.click();
      const errormsg1 = await this.errorMessages.textContent();
      console.log(`Text of errorMessages: ${errormsg1}`);
      await expect(this.errorMessages).toContainText(expectedErrorMessage1);

      await this.departureDate.pressSequentially(departureDate1);
      await this.departureDate.press("Enter");
      await this.page.waitForTimeout(3000);

      await this.errorMessagesIcon.click();
      const errormsg2 = await this.errorMessages.textContent();
      console.log(`Text of errorMessages: ${errormsg2}`);
      await expect(this.errorMessages).toContainText(expectedErrorMessage2);
    });
  }

  async errorValidations_ESS_HomeLeave(
    data: any,
    departureDate: string,
    arrivalDate: string,
  ) {
    await logStep("errorValidations_ESS_HomeLeave", async () => {
      await this.page.waitForLoadState("networkidle");
      const defaultTripNumber = this.getTripNumber();
      const defaultTripStatus = this.getTripStatus();
      console.log("Default Trip Number:", await defaultTripNumber);
      console.log("Default Trip Status:", await defaultTripStatus);
      await this.departureDate.fill(departureDate);
      await this.departureDate.press("Enter"); // Press Enter after pressSequentiallying departure date
      await this.arrivalDate.fill(arrivalDate);
      await this.arrivalDate.press("Enter"); // Press Enter after pressSequentiallying arrival date
      await this.travelType.pressSequentially(data.tripDetailsData.travelType);
      await this.travelType.press("Enter");
      await this.page.waitForTimeout(3000);
      await this.enterTripSchema(data);
      // await expect(this.HL_Country).toContainText(
      //   data.tripDetailsData.HL_Country,
      // );
      // await expect(this.duty_Station).toContainText(
      //   data.tripDetailsData.duty_Station,
      // );
      await this.requestLumpSum.pressSequentially("Yes");
      await this.page.keyboard.press("Tab");
      await this.tripComments.pressSequentially(data.tripDetailsData.tripComments);
      await this.page.waitForTimeout(3000);
      await this.getTravellersLink.click();
      await this.page.waitForTimeout(5000);
      await this.removeTravellersForErrorValidation();
      await this.page.waitForTimeout(3000);
      await this.clickSubmitApproval();
      await this.clickErrorClosebutton();
      await expect(this.errorMessagePopUp).toContainText(
        "For the selected travelers, please enter the departure and arrival info.",
      );
      await this.errorMessageCloseButton.click();
      await this.EnterTravelerDetails(0, data, departureDate, arrivalDate);
      await this.clickSubmitApproval();
      await this.clickErrorClosebutton();
      await expect(this.errorMessagePopUp).toContainText(
        "For the selected travelers, please enter the departure and arrival info.",
      );
      await this.errorMessageCloseButton.click();
      await this.fillTravelerDetailsWithoutReturnDate(
        1,
        data,
        departureDate,
        arrivalDate,
      );
      await this.clickSubmitApproval();
      await this.clickErrorClosebutton();
      await expect(this.errorMessagePopUp).toContainText(
        "Return date for the selected travelers is mandatory for this trip schema.",
      );
    });
  }
  async enterMiscExpensesDetails(amount: string, currencyCode: string) {
    await logStep("Enter Misc Expenses Details", async () => {
      
      // Click Add Expense
      await logStep("Click Add Expense", async () => {
        await this.add_Expense.click();
      });

      // Click the checkbox with the text "Miscellaneous Trav. Expenses"
      const checkboxText = "Miscellaneous Trav. Expenses";
      await logStep(`Click Checkbox with text: ${checkboxText}`, async () => {
        const checkboxLabel = this.checkboxLocator(checkboxText);
        await checkboxLabel.click();
      });

      // Click Select Button
      await logStep("Click Select Button", async () => {
        await this.selectButton.click();
      });

      // Wait for stability
      await logStep("Wait for 5 seconds", async () => {
        await this.page.waitForTimeout(5000);
      });

      // Fill Document Currency dynamically from test script
      await logStep(`Fill Document Currency: ${amount}`, async () => {
        await this.document_Currency.fill(amount);
      });

      // Fill Currency Code dynamically from test script
      await logStep(`Fill Document Currency Code: ${currencyCode}`, async () => {
        await this.document_Currency_Code.fill(currencyCode);
      });

     

      // Press Tab key
      await logStep("Press Tab Key", async () => {
        await this.page.keyboard.press("Tab");
      });

      // Wait for stability
      await logStep("Wait for 5 seconds", async () => {
        await this.page.waitForTimeout(5000);
      });

      // Click Apply Button
      await logStep("Click Apply Button", async () => {
        await this.applyButton.click();
      });
    });
  }

  
  private readonly checkboxLocator = (
    checkboxText: string | undefined,
  ): Locator =>
    this.page.locator(
      `//div[@class='sapMSLITitleOnly' and text()="${checkboxText}"]`,
    );


}

export default CreateTripPage;
