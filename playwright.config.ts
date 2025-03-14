import { defineConfig, devices } from "@playwright/test";
import { config } from "dotenv";

// Load environment variables
if (process.env.ENVIRONMENT) {
  console.log("Environment variables loaded from .env file");
  config({ path: `.env.${process.env.ENVIRONMENT}`, override: true });
} else {
  config();
}

export default defineConfig({
  testDir: "./e2e/tests",
  reporter: [
    ["html", { outputFolder: "playwright-report" }],
    ["junit", { outputFile: "test-results/e2e-junit-results.xml" }],
    ["allure-playwright"],
  ],
  workers: 1,
  expect: { timeout: 15_000 },
  timeout: 1_000_000,
  use: {
    trace: "on",
    video: "on",
    screenshot: "only-on-failure",
    headless: true,
    actionTimeout: 1_000_000,
    navigationTimeout: 1_000_000,
  },
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        launchOptions: {
          args: ["--start-maximized"], // Maximize browser on launch
        },
        viewport: null, // Ensure viewport size is not overridden
        deviceScaleFactor: undefined,
      },
    },
  ],
});