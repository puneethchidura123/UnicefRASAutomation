import { Page } from "@playwright/test";
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
}
export { RasHomePage };
