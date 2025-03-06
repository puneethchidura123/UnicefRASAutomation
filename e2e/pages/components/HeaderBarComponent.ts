import { Page } from "@playwright/test";
import { logStep } from "../../utils/logger";

class HeaderBarComponent {
  constructor(private readonly page: Page) {}

  private readonly profileIcon = this.page.getByLabel("Me Area");
  private readonly logoutButton = this.page.getByText("Sign Out");
  private readonly signoutButton = this.page.getByRole("button", {
    name: "OK",
  });
  private readonly backButton = this.page.getByLabel("Back");

  private readonly homeButton = this.page.getByLabel("Home", { exact: true });
  async logout() {
    await logStep("logout", async () => {
      await this.profileIcon.click();
      console.log("Clicked on profile icon.");
      await this.logoutButton.click();
      console.log("Clicked on logout button.");
      await this.signoutButton.click();
      console.log("Clicked on sign out button.");
    });
  }

  async clickBackButton() {
    await logStep("clickBackButton", async () => {
      await this.backButton.click();
      console.log("Clicked on back button.");
    });
  }

  async clickHomeButton() {
    await logStep("clickHomeButton", async () => {
      await this.homeButton.click();
      console.log("Clicked on home button.");
    });
  }
}
export default HeaderBarComponent;
