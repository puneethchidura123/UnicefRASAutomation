import { Page } from "@playwright/test";
import { expect } from "../../fixtures/pageFixtures";
//import { logStep } from "D:/UnicefAutomation/UnicefRASAutomation/e2e/utils/logger.ts";
import { logStep } from "../../utils/logger";

class RasHomePage {
  constructor(private readonly page: Page) {}

  async navigatingToRasHomePage() {
    await logStep("Ras home page", async () => {
        await this.page.waitForSelector('//span[text()="Job Positions"]', { timeout: 20000 });
        await this.page.waitForTimeout(1000);
    });

    await logStep("Navigating to Job Positions Page", async () => {
        await this.page.click('//span[text()="Job Positions"]');
        await this.page.waitForTimeout(1000);
    });

    await logStep("Navigating to RAS Recruitment Regular Form", async () => {
        await this.page.click('//span[text()="RAS Recruitment Regular Form"]');
        await this.page.waitForTimeout(1000);
    });
  }

  async navigateToMyRequests(){
    console.log("starting to navigate to my request...")
    await this.page.getByRole('menuitem', { name: 'Job Positions' }).click();
    await this.page.waitForTimeout(3000);
    await this.page.getByRole('menuitem', { name: 'My Requests' }).click();
    await this.page.waitForTimeout(3000);
    console.log("completed navigating to my requestes...")
  }

  async searchOpenRequestsAndApprove(jprNumber: string){
          console.log("starting to search for the required request...")
          await this.page.getByPlaceholder('Search Open Requests').click();
          await this.page.getByPlaceholder('Search Open Requests').fill(jprNumber);
          await this.page.waitForTimeout(3000);
          await this.page.getByRole('button', { name: 'Search Open Requests' }).click();
          console.log("completed searching for the required request...")
          await this.page.waitForTimeout(5000);
          const approvalStateLocator = await this.page.locator("//span[@class='ng-binding' and normalize-space(text())='Awaiting Approval']");
          await expect(approvalStateLocator).toBeVisible();

          await this.page.getByLabel(`${jprNumber} , ${jprNumber}`).click();
          await this.page.locator('section').click();
          await this.page.getByRole('button', { name: 'Approve' }).click();
          await this.page.waitForTimeout(5000);
          this.navigateToMyRequests();
          await this.page.getByPlaceholder('Search Open Requests').click();
          await this.page.getByPlaceholder('Search Open Requests').fill(jprNumber);
          await this.page.waitForTimeout(3000);
          await this.page.getByRole('button', { name: 'Search Open Requests' }).click();
          console.log("completed searching for the required request...")
          await this.page.waitForTimeout(5000);
          const pendingStateLocator = await this.page.locator("//span[@class='ng-binding' and normalize-space(text())='Pending RAS Validation']");
          await expect(pendingStateLocator).toBeVisible();
  }

  async openDrafts(){
    console.log("starting to navigate to my request...")
    await this.page.click('//span[text()="My Draft"]');
    console.log("completed navigating to my requestes...")
  }

}
export default  RasHomePage ;
