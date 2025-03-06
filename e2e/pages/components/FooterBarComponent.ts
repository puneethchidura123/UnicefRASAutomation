import { Page } from "@playwright/test";
import { logStep } from "../../utils/logger";

class FooterBarComponent {
  constructor(private readonly page: Page) {}

  private readonly footerButtons = (btnName: string) =>
    //this.page.locator(`//bdi[contains(text(),'${btnName}')]`);
    this.page.getByRole("button", { name: btnName });

  async validateWorkflowButtons(buttons: string[]) {
    await logStep("validateWorkflowButtons", async () => {
      for (const button of buttons) {
        await this.footerButtons(button).isVisible();
        console.log(`Button "${button}" is visible.`);
      }
    });
  }

  async clickOnWorkflowButton(buttonName: string) {
    await logStep("clickOnWorkflowButton", async () => {
      await this.footerButtons(buttonName).click();
      console.log(`Clicked on workflow button "${buttonName}".`);
    });
  }

  //  function for alert message validation
  async validateFooterAlertMessage(alertMessage: string) {}
}
export default FooterBarComponent;
