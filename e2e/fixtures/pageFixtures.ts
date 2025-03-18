import { test as base } from "@playwright/test";
import RasLoginPage from "../pages/rasPages/RasLoginPage";
import RasHomePage from "../pages/rasPages/RasHomePage";
import RegularRecruitmentPage from "../pages/rasPages/RegularRecruitmentPage";
import IntellaBOHomePage from "../pages/rasPages/IntellaBOHomePage";


interface PageFixtures {
  rasLoginPage: RasLoginPage;
  rashomePage: RasHomePage;
  regularRecruitmentPage: RegularRecruitmentPage;
  intellaBOHomePage: IntellaBOHomePage;
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
  intellaBOHomePage: async ({ page }, use) => {
    await use(new IntellaBOHomePage(page));
  },
});

export { expect } from "@playwright/test";
