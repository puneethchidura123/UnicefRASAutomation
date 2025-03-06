import { Page } from "@playwright/test";
import { logStep } from "../utils/logger";

class HomePage {
  constructor(private readonly page: Page) {}

  private readonly travelApplicationTile = this.page.getByLabel(
    "e-Travel Dashboard\nSubmit trip requests, approve, certify, etc.",
  );
  private readonly travelRequestTile = this.page.getByRole("button", {
    name: "Travel Request Click here to",
  });

  // private readonly travelApprovalTile = this.page.getByRole("button", {
  //   name: "/Trip Approval/",
  //   // name: 'Trip Approval Click here to'
  // });
  private readonly travelApprovalTile = this.page.locator(
    "//span[@aria-label='Trip Approval']",
  );

  private readonly tripCertificateTile = this.page.getByRole("button", {
    name: "Trip Certification Click here",
  });


  private readonly tripStatusTile = this.page.getByRole('button', { name: 'Trips By Status Report' })

  private readonly tripItineraryTile = this.page.getByRole('button', { name: 'Travel Itinerary Report' })

  private readonly tripExpenseTile = this.page.getByRole('button', { name: 'Travel Expense Report' })

  private readonly travelHistoryTile = this.page.getByRole('button', { name: 'Travel History Report' })



  async navigateToTripListView() {
    await this.page.waitForLoadState("networkidle");
    await logStep("Navigate to Trip List View", async () => {
      await this.travelApplicationTile.click();
      await this.navigateToTravelRequestView();
    });
  }

  async navigateToTravelRequestView() {
    await this.page.waitForLoadState("networkidle");
    await logStep("Navigate to Travel Request View", async () => {
      await this.travelRequestTile.click();
    });
  }

  async navigateToTripCertificateView() {
    await this.page.waitForLoadState("networkidle");
    await logStep("Navigate to Trip Certificate View", async () => {
      await this.travelApplicationTile.click();
      await this.tripCertificateTile.click();
    });
  }

  async navigateToTripApproverView() {
    await this.page.waitForLoadState("networkidle");
    await logStep("Navigate to Trip Approver View", async () => {
      await this.travelApplicationTile.click();
      await this.travelApprovalTile.click();
    });
  }


async navigateToTripStatusView() {
  await this.page.waitForLoadState("networkidle");
  await logStep("Navigate to Trip Status View", async () => {
    await this.travelApplicationTile.click();
    await this.tripStatusTile.click();
  });
}


async navigateToTripItineraryView() {
  await this.page.waitForLoadState("networkidle");
  await logStep("Navigate to Trip Itinerary View", async () => {

    await this.travelApplicationTile.click();
    
    await this.tripItineraryTile.scrollIntoViewIfNeeded();
    
    await this.tripItineraryTile.waitFor({ state: "visible" });

    await this.tripItineraryTile.click();
  });
}


async navigateToTripExpensesView() {
  await this.page.waitForLoadState("networkidle");
  await logStep("Navigate to Trip Expenses View", async () => {
    
    await this.travelApplicationTile.click();
    
    await this.tripExpenseTile.scrollIntoViewIfNeeded();
    
    await this.tripExpenseTile.waitFor({ state: "visible" });

    await this.tripExpenseTile.click();
  });
}

async navigateToTripHistoryView() {
  await this.page.waitForLoadState("networkidle");
  await logStep("Navigate to Trip History View", async () => {
    
    await this.travelApplicationTile.click();
    
    await this.travelHistoryTile.scrollIntoViewIfNeeded();
    
    await this.travelHistoryTile.waitFor({ state: "visible" });

    await this.travelHistoryTile.click();
  });
}




}

export default HomePage;
