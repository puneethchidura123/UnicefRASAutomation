import { test as base } from "@playwright/test";
//import LoginPage from "../pages/LoginPage";
import RasLoginPage from "../pages/rasPages/RasLoginPage";
import RasHomePage from "../pages/rasPages/RasHomePage";
import RegularRecruitmentPage from "../pages/rasPages/RegularRecruitmentPage";
// import CreateTripPage from "../pages/CreateTripPage";
// import FooterBarComponent from "../pages/components/FooterBarComponent";
// import HeaderBarComponent from "../pages/components/HeaderBarComponent";
// import SearchDialogComponent from "../pages/components/SearchDialogComponent";


interface PageFixtures {
  rasLoginPage: RasLoginPage;
  rashomePage: RasHomePage;
  regularRecruitmentPage: RegularRecruitmentPage;
}

export const test = base.extend<PageFixtures>({
  //page object creation
  rasLoginPage: async ({ page }, use) => {
    await use(new RasLoginPage(page));
  },
  rasHomePage: async ({ page }, use) => {
    await use(new RasHomePage(page));
  },
  regularRecruitmentPage: async ({ page }, use) => {
    await use(new RegularRecruitmentPage(page));
  },

});

export { expect } from "@playwright/test";
