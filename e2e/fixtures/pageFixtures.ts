import { test as base } from "@playwright/test";
//import LoginPage from "../pages/LoginPage";
//import HomePage from "../pages/HomePage";
import RasLoginPage from "../pages/rasPages/RasLoginPage";
// import CreateTripPage from "../pages/CreateTripPage";
// import FooterBarComponent from "../pages/components/FooterBarComponent";
// import HeaderBarComponent from "../pages/components/HeaderBarComponent";
// import SearchDialogComponent from "../pages/components/SearchDialogComponent";





interface PageFixtures {
  loginPage: RasLoginPage;
  //homePage: HomePage;
}
export const test = base.extend<PageFixtures>({
  //page object creation
  loginPage: async ({ page }, use) => {
    await use(new RasLoginPage(page));
  },
  // homePage: async ({ page }, use) => {
  //   await use(new HomePage(page));
  // },

});

export { expect } from "@playwright/test";
