import { Page } from "@playwright/test";
import { logStep } from "../../utils/logger";


class RasLoginPage {
  constructor(private readonly page: Page) {}

  private readonly userNameTextBox = this.page.getByLabel('User name');
  private readonly passwordTextBox = this.page.getByLabel('Password', { exact: true });
  private readonly loginButton = this.page.getByRole("button", {
    name: "Log in",
  });



  // log in to Intella FO(portal)
  async loginToApplication(username: string, password: string) {
    await logStep("Click Username Textbox", async () => {
      await this.userNameTextBox.click();
    });

    await logStep("Fill Username", async () => {
      await this.userNameTextBox.fill(username);
      await this.page.waitForTimeout(2000);
      console.log("Logged in as: ", username);
    });

    await logStep("Fill Password", async () => {
      await this.passwordTextBox.fill(password);
    });

    await logStep("Click Login Button", async () => {
      await this.loginButton.click();
    });
  }

  async loginToIntellaFOAsHM(username: string, password: string) {

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
export default  RasLoginPage ;
