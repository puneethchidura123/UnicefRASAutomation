import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://uniceftest.service-now.com/mp');
  await page.getByPlaceholder('User name').click();
  await page.getByPlaceholder('User name').fill('QA_RAS_hrbp_1');
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('Hrbp@123');
  await page.getByRole('button', { name: 'Log in' }).click();
 });