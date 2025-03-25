import { Page } from "@playwright/test";
import { expect } from "../../../fixtures/pageFixtures";
import { logStep } from "../../../utils/logger";


class IntellaBOHomePage {
  constructor(private readonly page: Page) {}

  async publishToTMS(jprNumber: string,valid_till: string){
                  console.log("clicking on Favorites...");
                  await this.page.getByLabel('Favorites', { exact: true }).click();
                  console.log("clicked on Favorites...");
                  await this.page.waitForTimeout(2000);
                  await this.page.getByRole('link', { name: 'Recruitment Tracking - All' }).click();
                  await this.page.waitForTimeout(5000);
                  await this.page.locator('iframe[name="gsft_main"]').contentFrame().getByLabel('Search', { exact: true }).click();
                  await this.page.locator('iframe[name="gsft_main"]').contentFrame().getByLabel('Search', { exact: true }).fill(jprNumber);
                  await this.page.locator('iframe[name="gsft_main"]').contentFrame().getByLabel('Search', { exact: true }).press('Enter');
                  await this.page.waitForTimeout(5000);
                  await this.page.locator('iframe[name="gsft_main"]').contentFrame().getByLabel(`Open record: ${jprNumber}`).click();
                  await this.page.waitForTimeout(5000);

                  const frame = await this.page.frameLocator('iframe[name="gsft_main"]');
                  const isSaveButtonVisible = await frame
                    .locator('[id="x_adsr_recruit_job_position_request\\.form_header"]')
                    .getByRole('button', { name: 'Save' })
                    .isVisible();

                  expect(isSaveButtonVisible).toBeTruthy();

                  const isDiscussButtonVisible = await frame
                    .locator('[id="x_adsr_recruit_job_position_request\\.form_header"]')
                    .getByRole('button', { name: 'Discuss' })
                    .isVisible();

                  expect(isDiscussButtonVisible).toBeTruthy();

                  await this.page.locator('iframe[name="gsft_main"]').contentFrame().getByRole('searchbox', { name: 'Mandatory - must be populated' }).click();
                  await this.page.waitForTimeout(5000);
                  await this.page.locator('iframe[name="gsft_main"]').contentFrame().getByRole('cell', { name: 'QA_RAS_ agent1' }).click();
                  await this.page.waitForTimeout(5000);
                  //await page.locator('iframe[name="gsft_main"]').contentFrame().getByRole('button', { name: 'Select Date' }).click();
                  await this.page.waitForTimeout(5000);
                  console.log("starting to enter valid till date..")
                  await this.page.frameLocator('iframe[name="gsft_main"]').getByLabel('Valid Till').fill('16/03/2025');
                  await this.page.frameLocator('iframe[name="gsft_main"]').getByText('Valid Till').click();

                  console.log("finished entering  till date..")

                  await this.page.waitForTimeout(2000);
                  await this.page.locator('iframe[name="gsft_main"]').contentFrame().locator('[id="x_adsr_recruit_job_position_request\\.form_header"]').getByRole('button', { name: 'Save' }).click();
                  await this.page.waitForTimeout(5000);
                  const isPublishButtonVisible = await frame
                    .locator('[id="x_adsr_recruit_job_position_request\\.form_header"]')
                    .getByRole('button', { name: 'Publish' })
                    .isVisible();

                  expect(isPublishButtonVisible).toBeTruthy();
                  await this.page.locator('iframe[name="gsft_main"]').contentFrame().locator('#approve_request').click();
                  await this.page.waitForTimeout(8000);
                  const isSaveButtonVisible1 = await frame
                    .locator('[id="x_adsr_recruit_job_position_request\\.form_header"]')
                    .getByRole('button', { name: 'Save' })
                    .isVisible();

                  expect(isSaveButtonVisible1).toBeTruthy();
                  await this.page.waitForTimeout(8000);

  }
}
export default  IntellaBOHomePage ;