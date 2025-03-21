import { Page } from "@playwright/test";
import { logStep } from "../../../utils/logger";

class IntellaBOLoginPage {
  constructor(private readonly page: Page) {}
  async loginToIntellaBO(username: string, password: string){
    await this.page.goto(process.env.test1 ?? "");
    await this.page.getByLabel('User name').fill(username);
    await this.page.getByLabel('Password', { exact: true }).fill(password);
    await this.page.getByRole('button', { name: 'Log in' }).click();
    await this.page.waitForTimeout(5000);
  }
}
export default IntellaBOLoginPage ;
