import { test as base } from "@playwright/test";
import IntellaFOLoginPage from "../pages/intellaFO/IntellaFOLoginPage";
import IntellaBOLoginPage from "../pages/intellaBO/IntellaBOLoginPage";
import RasHomePage from "../pages/intellaFO/RasHomePage";
import RASRegularRecruitmentForm from "../pages/intellaFO/RASRegularRecruitmentForm";
import IntellaBOHomePage from "../pages/intellaBO/IntellaBOHomePage";

interface PageFixtures {
  intellaFOLoginPage: IntellaFOLoginPage;
  intellaBOLoginPage: IntellaBOLoginPage;
  rasHomePage: RasHomePage;
  rASRegularRecruitmentForm: RASRegularRecruitmentForm;
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
  rASRegularRecruitmentForm: async ({ page }, use) => {
    await use(new RASRegularRecruitmentForm(page));
  },
  intellaBOHomePage: async ({ page }, use) => {
    await use(new IntellaBOHomePage(page));
  },
});

export { expect } from "@playwright/test";
