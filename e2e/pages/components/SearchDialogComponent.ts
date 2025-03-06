import { Page } from "@playwright/test";

class SearchDialogComponent {
  constructor(private readonly page: Page) {
    this.page = page;
  }
}
export default SearchDialogComponent;
