import { Page } from "@playwright/test";
import { logStep } from "../../utils/logger";


class IntellaFOLoginPage {
  constructor(private readonly page: Page) {}

  private readonly userNameTextBox = this.page.getByLabel('User name');
  private readonly passwordTextBox = this.page.getByLabel('Password', { exact: true });
  private readonly loginButton = this.page.getByRole("button", {
    name: "Log in",
  });

  async loginToIntellaFO(username: string, password: string) {
    console.log("staring to login in as HM...")
        await this.page.goto(process.env.test1 ?? "");
        await this.page.waitForTimeout(1000);  // Optional: you may remove this as it might not be needed
        await this.page.getByLabel('User name').fill(username);
        await this.page.getByLabel('Password', { exact: true }).fill(password);
        await this.page.waitForTimeout(1000);

        await this.page.click('button[type="submit"]');
        await this.page.waitForTimeout(3000);
         await this.page.goto(process.env.test2 ?? "");
         await this.page.waitForTimeout(3000);
         console.log("completed  to login in as HM...")
  }

  async loginToIntellaBOAsRasAgent(username: string, password: string){
    await this.page.goto(process.env.test1 ?? "");
    await this.page.getByLabel('User name').fill(username);
    await this.page.getByLabel('Password', { exact: true }).fill(password);
    await this.page.getByRole('button', { name: 'Log in' }).click();
    await this.page.waitForTimeout(5000);
  }
}
export default  IntellaFOLoginPage ;
