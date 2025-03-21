import { test as base } from "@playwright/test";
import IntellaFOLoginPage from "../pages/rasPages/intellaFO/IntellaFOLoginPage";
import IntellaBOLoginPage from "../pages/rasPages/intellaBO/IntellaBOLoginPage";
import RasHomePage from "../pages/rasPages/RasHomePage";
import RegularRecruitmentPage from "../pages/rasPages/RegularRecruitmentPage";
import IntellaBOHomePage from "../pages/rasPages/intellaBO/IntellaBOHomePage";

interface PageFixtures {
  intellaFOLoginPage: IntellaFOLoginPage;
  intellaBOLoginPage: IntellaBOLoginPage;
  rashomePage: RasHomePage;
  regularRecruitmentPage: RegularRecruitmentPage;
  intellaBOHomePage: IntellaBOHomePage;
}

export const test = base.extend<PageFixtures>({
  //page object creation
  intellaFOLoginPage: async ({ page }, use) => {
    await use(new IntellaFOLoginPage(page));
  },
  intellaBOLoginPage: async ({ page }, use) => {
    await use(new IntellaBOLoginPage(page));
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
