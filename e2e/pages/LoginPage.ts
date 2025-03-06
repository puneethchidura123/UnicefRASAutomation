import { Page } from "@playwright/test";
import { logStep } from "../utils/logger";

class LoginPage {
  constructor(private readonly page: Page) {}

  private readonly userNameTextBox = this.page.getByPlaceholder("User");
  private readonly passwordTextBox = this.page.getByPlaceholder("Password");
  private readonly loginButton = this.page.getByRole("button", {
    name: "Log On",
  });

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
}
export default LoginPage;
